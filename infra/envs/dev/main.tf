locals {
  project_id = "app-portfolio-488310"
}

# 1. Frontend Service
module "cloudrun_frontend" {
  source       = "../../modules/cloudrun"
  project_id   = local.project_id
  service_name = "app-portfolio-frontend-dev"

  # Deploy a dummy image initially to solve the "Chicken and Egg" problem
  image        = "us-docker.pkg.dev/cloudrun/container/hello"
}

# 2. Backend Service
module "cloudrun_backend" {
  source       = "../../modules/cloudrun"
  project_id   = local.project_id
  service_name = "app-portfolio-backend-dev"

  # Deploy a dummy image initially to solve the "Chicken and Egg" problem
  image        = "us-docker.pkg.dev/cloudrun/container/hello"
}
