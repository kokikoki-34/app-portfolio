module "app" {
  source            = "../../modules/app"
  project_id        = var.project_id
  region            = var.region
  domain            = "dev.kokiyasui.com"
  env               = "-dev"
  subnet_cidr_range = "10.0.0.0/24"
}

output "wif_provider_name" {
  value = module.app.wif_provider_name
}

output "github_actions_sa_email" {
  value = module.app.github_actions_sa_email
}

output "proxy_url" {
  value = module.app.proxy_url
}
