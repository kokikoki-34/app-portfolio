terraform {
  # Enforce a minimum Terraform version
  required_version = ">= 1.5.0"

  required_providers {
    # Define the Google Cloud provider
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

# Configure the default project and region for the Google provider
provider "google" {
  # Replace this with your actual project ID
  project = "app-portfolio-488310"
  region  = "asia-northeast1" # Tokyo region
}
