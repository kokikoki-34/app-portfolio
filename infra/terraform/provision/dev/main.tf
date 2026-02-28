module "app" {
  source = "../../modules/app"
  region = var.region
  env = "-dev"
  subnet_cidr_range = "10.0.0.0/24"
}
