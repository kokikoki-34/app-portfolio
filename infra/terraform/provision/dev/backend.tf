terraform {
  # Configure Google Cloud Storage (GCS) as the backend for tfstate
  backend "gcs" {
    # Replace this with your actual bucket name created in the previous step
    bucket = "app-portfolio-489910-tfstate"

    # Prefix ensures that dev and prod states are stored in separate folders within the same bucket
    prefix = "terraform/state/dev"
  }
}
