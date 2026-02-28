module "app" {
  source = "../../modules/app"
  project_id =  var.project_id
  region = var.region
  domain = "dev.kokiyasui.com"
  env = "-dev"
  subnet_cidr_range = "10.0.0.0/24"
}
