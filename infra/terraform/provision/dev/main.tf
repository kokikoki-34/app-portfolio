module "app" {
  source = "../../modules/app"
  project_id = "app-portfolio-488310"
  env = "-dev"
  region = "asia-northeast1"
  subnet_cidr_range = "10.0.0.0/24"
}
