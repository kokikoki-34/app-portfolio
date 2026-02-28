
# ---------------------------------------------------------
# IAM & Service Account
# ---------------------------------------------------------
# Create a single Service Account for all Cloud Run services
resource "google_service_account" "cloudrun_sa" {
  account_id   = "sa-app-portfolio${var.env}"
  display_name = "Service Account for Portfolio App Cloud Run (${var.env})"
}

resource "google_artifact_registry_repository" "portfolio_repo" {
  location      = var.region
  repository_id = "app-portfolio-repo${var.env}"
  format        = "DOCKER"
}

# ---------------------------------------------------------
# Network (Direct VPC Egress)
# ---------------------------------------------------------
resource "google_compute_network" "vpc_network" {
  name                    = "vpc-app-portfolio${var.env}"
  auto_create_subnetworks = false
}

# Subnet for Direct VPC Egress requires Private Google Access to route
# requests to internal Cloud Run services (*.run.app) via the VPC.
resource "google_compute_subnetwork" "vpc_subnet" {
  name                     = "subnet-app-portfolio${var.env}"
  ip_cidr_range            = var.subnet_cidr_range
  region                   = var.region
  network                  = google_compute_network.vpc_network.id
  private_ip_google_access = true
}

# ---------------------------------------------------------
# Cloud Run Services
# ---------------------------------------------------------
# 1. Backend API (Internal Only)
resource "google_cloud_run_v2_service" "backend" {
  name     = "app-portfolio-backend${var.env}"
  location = var.region
  ingress  = "INGRESS_TRAFFIC_INTERNAL_ONLY"

  template {
    service_account = google_service_account.cloudrun_sa.email
    containers {
      # Placeholder image: Replace with your actual backend artifact URL later
      image = "us-docker.pkg.dev/cloudrun/container/hello"
    }
    vpc_access {
      network_interfaces {
        network    = google_compute_network.vpc_network.id
        subnetwork = google_compute_subnetwork.vpc_subnet.id
      }
      egress = "ALL_TRAFFIC"
    }
  }
}

# 2. Frontend (Internal Only)
resource "google_cloud_run_v2_service" "frontend" {
  name     = "app-portfolio-frontend${var.env}"
  location = var.region
  ingress  = "INGRESS_TRAFFIC_INTERNAL_ONLY"

  template {
    service_account = google_service_account.cloudrun_sa.email
    containers {
      # Placeholder image: Replace with your actual frontend artifact URL later
      image = "us-docker.pkg.dev/cloudrun/container/hello"
    }
    vpc_access {
      network_interfaces {
        network    = google_compute_network.vpc_network.id
        subnetwork = google_compute_subnetwork.vpc_subnet.id
      }
      egress = "ALL_TRAFFIC"
    }
  }
}

# 3. IAM Authorization Proxy (Public Ingress)
resource "google_cloud_run_v2_service" "proxy" {
  name     = "app-portfolio-proxy${var.env}"
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    service_account = google_service_account.cloudrun_sa.email
    containers {
      # Placeholder image: Replace with your actual proxy artifact URL later
      image = "us-docker.pkg.dev/cloudrun/container/hello"

      # Inject Backend and Frontend URIs dynamically
      env {
        name  = "URL_BACKEND"
        value = google_cloud_run_v2_service.backend.uri
      }
      env {
        name  = "URL_FRONTEND"
        value = google_cloud_run_v2_service.frontend.uri
      }
    }
    vpc_access {
      network_interfaces {
        network    = google_compute_network.vpc_network.id
        subnetwork = google_compute_subnetwork.vpc_subnet.id
      }
      # Route all traffic through VPC to access INTERNAL_ONLY services
      egress = "ALL_TRAFFIC"
    }
  }
}

# ... (以前の Service Account, Network, Cloud Run Services の定義はそのまま) ...

# ---------------------------------------------------------
# IAM Policies (Resource-level)
# ---------------------------------------------------------

resource "google_cloud_run_v2_service_iam_member" "proxy_public_access" {
  name     = google_cloud_run_v2_service.proxy.name
  location = google_cloud_run_v2_service.proxy.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

resource "google_cloud_run_v2_service_iam_member" "backend_invoker" {
  name     = google_cloud_run_v2_service.backend.name
  location = google_cloud_run_v2_service.backend.location
  role     = "roles/run.invoker"
  member   = "serviceAccount:${google_service_account.cloudrun_sa.email}"
}

resource "google_cloud_run_v2_service_iam_member" "frontend_invoker" {
  name     = google_cloud_run_v2_service.frontend.name
  location = google_cloud_run_v2_service.frontend.location
  role     = "roles/run.invoker"
  member   = "serviceAccount:${google_service_account.cloudrun_sa.email}"
}

# ---------------------------------------------------------
# Outputs
# ---------------------------------------------------------
output "proxy_url" {
  value       = google_cloud_run_v2_service.proxy.uri
  description = "The public URL of the IAM Auth Proxy"
}
