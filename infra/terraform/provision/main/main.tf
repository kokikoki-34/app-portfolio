module "app" {
  source = "../../modules/app"
  region = var.region
  env = ""
  subnet_cidr_range = "10.0.0.0/24"
}
