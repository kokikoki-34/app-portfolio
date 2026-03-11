# ---------------------------------------------------------
# IAM & Service Account
# ---------------------------------------------------------
# Create a single Service Account for all Cloud Run services
resource "google_service_account" "cloudrun_sa" {
  account_id   = "sa-app-portfolio${var.env}"
  display_name = "Service Account for Portfolio App Cloud Run (${var.env})"
}

# Create a separate Service Account for GitHub Actions
resource "google_service_account" "github_actions_sa" {
  account_id   = "sa-github-actions${var.env}"
  display_name = "GitHub Actions Deployment Account (${var.env})"
}

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

resource "google_project_iam_member" "github_actions_roles" {
  for_each = toset([
    "roles/artifactregistry.writer",
    "roles/run.developer",
    "roles/iam.serviceAccountUser",
    "roles/run.viewer"
  ])
  project = var.project_id
  role    = each.key
  member  = "serviceAccount:${google_service_account.github_actions_sa.email}"
}

# ---------------------------------------------------------
# Workload Identity Federation
# ---------------------------------------------------------
resource "google_iam_workload_identity_pool" "github_pool" {
  workload_identity_pool_id = "github-pool${var.env}"
  display_name              = "GitHub Pool (${var.env})"
}
resource "google_iam_workload_identity_pool_provider" "github_provider" {
  workload_identity_pool_id          = google_iam_workload_identity_pool.github_pool.workload_identity_pool_id
  workload_identity_pool_provider_id = "github-provider${var.env}"

  attribute_mapping = {
    "google.subject"       = "assertion.sub"
    "attribute.repository" = "assertion.repository"
    "attribute.owner"      = "assertion.repository_owner"
  }

  attribute_condition = "attribute.repository == 'kokikoki-34/app-portfolio'"

  oidc {
    issuer_uri = "https://token.actions.githubusercontent.com"
  }
}

resource "google_service_account_iam_member" "wif_sa_user" {
  service_account_id = google_service_account.github_actions_sa.name
  role               = "roles/iam.workloadIdentityUser"
  member             = "principalSet://iam.googleapis.com/${google_iam_workload_identity_pool.github_pool.name}/attribute.repository/kokikoki-34/app-portfolio"
}

# ---------------------------------------------------------
# Outputs (GitHub Actions)
# ---------------------------------------------------------
output "wif_provider_name" {
  value = google_iam_workload_identity_pool_provider.github_provider.name
}

output "github_actions_sa_email" {
  value = google_service_account.github_actions_sa.email
}

# ---------------------------------------------------------
# Artifact Registry
# ---------------------------------------------------------
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
      egress = "PRIVATE_RANGES_ONLY"
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

# ---------------------------------------------------------
# Cloud Run Domain Mapping
# ---------------------------------------------------------
resource "google_cloud_run_domain_mapping" "proxy_domain" {
  location = var.region
  name     = var.domain

  metadata {
    namespace = var.project_id
  }

  spec {
    route_name = google_cloud_run_v2_service.proxy.name
  }
}

# ---------------------------------------------------------
# Outputs
# ---------------------------------------------------------
output "proxy_url" {
  value       = google_cloud_run_v2_service.proxy.uri
  description = "The public URL of the IAM Auth Proxy"
}
