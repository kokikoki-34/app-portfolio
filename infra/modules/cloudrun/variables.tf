variable "project_id" {
  type        = string
  description = "The GCP Project ID"
}

variable "region" {
  type        = string
  description = "The GCP region to deploy to"
  default     = "asia-northeast1"
}

variable "service_name" {
  type        = string
  description = "The name of the Cloud Run service"
}

variable "image" {
  type        = string
  description = "The container image to deploy initially"
}
