locals {
  project_id = "app-portfolio-488310"
}

resource "google_service_account" "proxy_sa" {
  account_id   = "app-portfolio-proxy-sa"
  display_name = "Service Account for Cloud Run Proxy"
}

# 1. Frontend Service
module "cloudrun_frontend" {
  source         = "../../modules/cloudrun"
  project_id     = local.project_id
  service_name   = "app-portfolio-frontend-dev"

  image          = "us-docker.pkg.dev/cloudrun/container/hello"
  invoker_member = "user:kokiyasui.dev@gmail.com"

  invoker_members = [
    "user:kokiyasui.dev@gmail.com",
    "serviceAccount:app-portfolio-proxy-sa@app-portfolio-488310.iam.gserviceaccount.com"
  ]
}

# 2. Backend Service
module "cloudrun_backend" {
  source         = "../../modules/cloudrun"
  project_id     = local.project_id
  service_name   = "app-portfolio-backend-dev"

  image          = "us-docker.pkg.dev/cloudrun/container/hello"
  invoker_member = "user:kokiyasui.dev@gmail.com"

  invoker_members = [
    "user:kokiyasui.dev@gmail.com",
    "serviceAccount:app-portfolio-proxy-sa@app-portfolio-488310.iam.gserviceaccount.com"
  ]
}

module "cloudrun_proxy" {
  source       = "../../modules/cloudrun"
  project_id   = local.project_id
  service_name = "app-portfolio-proxy-dev"
  image        = "us-docker.pkg.dev/cloudrun/container/hello"

  service_account = google_service_account.proxy_sa.email
}

resource "google_cloud_run_domain_mapping" "proxy_domain" {
  location = "asia-northeast1"
  name     = "kokiyasui.com"

  metadata {
    namespace = local.project_id
  }

  spec {
    route_name = module.cloudrun_proxy.service_name
  }
}
