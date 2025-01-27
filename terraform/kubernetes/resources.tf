resource "kubernetes_namespace" "example" {
  metadata {
    name = var.waifuland-namespace
  }
}

resource "kubernetes_config_map" "waifuland_prod_env" {
  metadata {
    name = "env"
    labels = {
      "io.kompose.service" = "waifuland-prod-env"
    }
  }

  data = {
    "CLOUD_API_KEY"       = var.waifuland-cloud-api-key
    "CLOUD_NAME"          = var.waifuland-cloud-name
    "CLOUD_SECRET"        = var.waifuland-cloud-secret
    "CLOUDINARY_URL"      = var.waifuland-cloudinary-url
    "DB_HOST"             = var.waifuland-db-host
    "TOKEN"               = var.waifuland-token
    "ROLLBAR_TOKEN"       = var.waifuland-rollbar-token
    "ROLLBAR_ENVIRONMENT" = "production"
  }
}

resource "kubernetes_deployment" "waifuland_prod" {
  metadata {
    name = "waifuland-prod"
    annotations = {
      "kompose.cmd"     = "kompose -f waifuland.yml convert"
      "kompose.version" = "1.34.0 (cbf2835db)"
    }
    labels = {
      "io.kompose.service" = "waifuland-prod"
    }
  }

  spec {
    replicas = 3

    selector {
      match_labels = {
        "io.kompose.service" = "waifuland-prod"
      }
    }

    template {
      metadata {
        annotations = {
          "kompose.cmd"     = "kompose -f waifuland.yml convert"
          "kompose.version" = "1.34.0 (cbf2835db)"
        }
        labels = {
          "io.kompose.service" = "waifuland-prod"
        }
      }

      spec {
        container {
          name  = "waifuland-prod"
          image = "dyallo/waifuland_api:X64_latest"

          port {
            container_port = 4000
            protocol       = "TCP"
          }

          env {
            name = "CLOUDINARY_URL"
            value_from {
              config_map_key_ref {
                name = "env"
                key  = "CLOUDINARY_URL"
              }
            }
          }

          env {
            name = "CLOUD_API_KEY"
            value_from {
              config_map_key_ref {
                name = "env"
                key  = "CLOUD_API_KEY"
              }
            }
          }

          env {
            name = "CLOUD_NAME"
            value_from {
              config_map_key_ref {
                name = "env"
                key  = "CLOUD_NAME"
              }
            }
          }

          env {
            name = "CLOUD_SECRET"
            value_from {
              config_map_key_ref {
                name = "env"
                key  = "CLOUD_SECRET"
              }
            }
          }

          env {
            name = "DB_HOST"
            value_from {
              config_map_key_ref {
                name = "env"
                key  = "DB_HOST"
              }
            }
          }

          env {
            name = "ROLLBAR_ENVIRONMENT"
            value_from {
              config_map_key_ref {
                name = "env"
                key  = "ROLLBAR_ENVIRONMENT"
              }
            }
          }

          env {
            name = "ROLLBAR_TOKEN"
            value_from {
              config_map_key_ref {
                name = "env"
                key  = "ROLLBAR_TOKEN"
              }
            }
          }

          env {
            name = "TOKEN"
            value_from {
              config_map_key_ref {
                name = "env"
                key  = "TOKEN"
              }
            }
          }
        }

        restart_policy = "Always"
      }
    }
  }
}

resource "kubernetes_service" "waifuland_prod" {
  metadata {
    name = "waifuland-prod"
    annotations = {
      "kompose.cmd"     = "kompose -f waifuland.yml convert"
      "kompose.version" = "1.34.0 (cbf2835db)"
    }
    labels = {
      "io.kompose.service" = "waifuland-prod"
    }
  }

  spec {
    type = "NodePort"

    selector = {
      "io.kompose.service" = "waifuland-prod"
    }

    port {
      name        = "4300"
      port        = 4300
      target_port = 4000
      node_port   = 30430
    }
  }
}
