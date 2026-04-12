variable "region" {
  type        = string
  default     = "asia-northeast1"
  description = "Default GCP region"
}

variable "project_id" {
  type        = string
  description = "GCP Project ID"
}

variable "env" {
  type        =  string
  default     = ""
  description = "Environment"
}

variable "domain" {
  type        = string
  description = "Custom domain for endpoint"
}

variable "subnet_cidr_range" {
  type = string
}
