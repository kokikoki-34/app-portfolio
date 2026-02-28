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
