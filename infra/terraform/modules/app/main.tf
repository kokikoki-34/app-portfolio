

resource "google_service_account" "proxy_sa" {
  account_id   = "app-portfolio-proxy-sa${var.env}"
  display_name = "Service Account for Cloud Run Proxy${var.env}"
}

# Frontend
module "cloudrun_frontend" {
  source         = "../../modules/service"
  project_id     = var.project_id
  service_name   = "app-portfolio-frontend${var.env}"

  image          = "us-docker.pkg.dev/cloudrun/container/hello"

  invoker_member = var.invoker_member
  invoker_members = var.invoker_members
}

# Backend
module "cloudrun_backend" {
  source         = "../../modules/service"
  project_id     = var.project_id
  service_name   = "app-portfolio-backend${var.env}"

  image          = "us-docker.pkg.dev/cloudrun/container/hello"

  invoker_member = var.invoker_member
  invoker_members = var.invoker_members
}

# Proxy
module "cloudrun_proxy" {
  source       = "../../modules/service"
  project_id   = var.project_id
  service_name = "app-portfolio-proxy${var.env}"

  image        = "us-docker.pkg.dev/cloudrun/container/hello"

  service_account = google_service_account.proxy_sa.email
}

resource "google_cloud_run_domain_mapping" "proxy_domain" {
  location = "asia-northeast1"
  name     = var.domain_name

  metadata {
    namespace = var.project_id
  }

  spec {
    route_name = module.cloudrun_proxy.service_name
  }
}
