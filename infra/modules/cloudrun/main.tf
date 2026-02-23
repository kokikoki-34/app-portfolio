# 1. Define the Cloud Run Service (v2)
resource "google_cloud_run_v2_service" "default" {
  name     = var.service_name
  location = var.region
  project  = var.project_id
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    containers {
      image = var.image
    }
  }

  # ⚠️ ARCHITECT'S MAGIC:
  # Ignore image changes so Terraform doesn't overwrite future CI/CD deployments!
  lifecycle {
    ignore_changes = [
      template[0].containers[0].image,
      client,
      client_version
    ]
  }
}

# 2. Allow public access to the service
# resource "google_cloud_run_v2_service_iam_member" "public" {
#   project  = google_cloud_run_v2_service.default.project
#   location = google_cloud_run_v2_service.default.location
#   name     = google_cloud_run_v2_service.default.name
#   role     = "roles/run.invoker"
#   member   = "allUsers"
# }
