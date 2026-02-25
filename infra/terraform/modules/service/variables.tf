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

variable "invoker_member" {
  type        = string
  description = "Member to grant invoker role"
  default     = null
}

variable "invoker_members" {
  type    = list(string)
  default = []
}

variable "ingress" {
  type = string
  default = "INGRESS_TRAFFIC_INTERNAL_ONLY"
}

variable "service_account" {
  type    = string
  default = null
}
