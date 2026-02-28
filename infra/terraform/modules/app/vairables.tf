variable "region" {
  type        = string
  default     = "asia-northeast1"
  description = "Default GCP region"
}

variable "env" {
  type =  string
  default = ""
  description = "Environment"
}

variable "subnet_cidr_range" {
  type = string
}
