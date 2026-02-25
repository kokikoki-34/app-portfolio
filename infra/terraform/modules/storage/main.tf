resource "google_storage_bucket" "tfstate" {
  name     = var.bucket_name
  location = "ASIA-NORTHEAST1"

  force_destroy = false

  versioning {
    enabled = true
  }
}
