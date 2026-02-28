module "app" {
  source = "../../modules/app"
  project_id =  var.project_id
  region = var.region
  domain = "kokiyasui.com"
  env = ""
  subnet_cidr_range = "10.0.0.0/24"
}
