variable "waifuland-namespace" {
  type      = string
  default   = "infobae-api"
  sensitive = false
}

variable "waifuland-kubeconfig" {
  type      = string
  default   = "~/.kube/config.yaml"
  sensitive = false
}

variable "waifuland-cloud-api-key" {
  type      = string
  default   = ""
  sensitive = true
}

variable "waifuland-cloud-name" {
  type      = string
  default   = ""
  sensitive = true
}

variable "waifuland-cloud-secret" {
  type      = string
  default   = ""
  sensitive = true
}

variable "waifuland-cloudinary-url" {
  type      = string
  default   = ""
  sensitive = true
}

variable "waifuland-db-host" {
  type      = string
  default   = ""
  sensitive = true
}

variable "waifuland-rollbar-token" {
  type      = string
  default   = ""
  sensitive = true
}

variable "waifuland-token" {
  type      = string
  default   = ""
  sensitive = true
}
