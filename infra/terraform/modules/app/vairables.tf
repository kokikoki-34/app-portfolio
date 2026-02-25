variable "env" {
  type = string
  description = "Environment (Main or Dev)"
  default = ""
}

variable "domain_name" {
  type = string
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

variable "project_id"{
  type    =  string
  default = "app-portfolio-488310"
}
