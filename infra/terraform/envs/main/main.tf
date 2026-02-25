module "app" {
  source = "../../modules/app"
  env = ""
  domain_name = "kokiyasui.com"

  invoker_member = "user:kokiyasui.dev@gmail.com"
  invoker_members = [
    "user:kokiyasui.dev@gmail.com",
    "serviceAccount:app-portfolio-proxy-sa@app-portfolio-488310.iam.gserviceaccount.com"
  ]
}
