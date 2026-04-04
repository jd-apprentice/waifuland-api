variable "waifuland-namespace" {}
variable "waifuland-namespace" {}
variable "waifuland-kubeconfig" {}
variable "waifuland-cloud-api-key" {}
variable "waifuland-cloud-name" {}
variable "waifuland-cloud-secret" {}
variable "waifuland-cloudinary-url" {}
variable "waifuland-db-host" {}
variable "waifuland-rollbar-token" {}
variable "waifuland-token" {}

module "infobae" {
  source = "./kubernetes"

  waifuland-namespace      = var.waifuland-namespace
  waifuland-kubeconfig     = var.waifuland-kubeconfig
  waifuland-cloud-api-key  = var.waifuland-cloud-api-key
  waifuland-cloud-name     = var.waifuland-cloud-name
  waifuland-cloud-secret   = var.waifuland-cloud-secret
  waifuland-cloudinary-url = var.waifuland-cloudinary-url
  waifuland-db-host        = var.waifuland-db-host
  waifuland-rollbar-token  = var.waifuland-rollbar-token
  waifuland-token          = var.waifuland-token
}
