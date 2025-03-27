# Kubernetes provider using a configurable kubeconfig path
provider "kubernetes" {
  config_path = var.kubeconfig_path # Using a variable instead of a hardcoded path
}

# Helm provider for deploying charts
provider "helm" {
  kubernetes {
    config_path = var.kubeconfig_path
  }
}

# Updates the kubeconfig to interact with the EKS cluster
resource "null_resource" "update_kubeconfig" {
  provisioner "local-exec" {
    command = "aws eks --region ${var.region} update-kubeconfig --name ${local.cluster_name}"
  }
  depends_on = [module.eks]
}

# Deploys the NGINX Ingress Controller using Helm
resource "helm_release" "ingress_nginx" {
  name       = "ingress-nginx"
  repository = "https://kubernetes.github.io/ingress-nginx"
  chart      = "ingress-nginx"

  namespace        = var.ingress_nginx_namespace
  create_namespace = true

  # Configuring Helm chart values
  set {
    name  = "controller.service.type"
    value = "LoadBalancer"
  }

  set {
    name  = "controller.metrics.enabled"
    value = "true"
  }

  depends_on = [
    module.eks,
    null_resource.update_kubeconfig
  ]
}

# Waits for the Ingress NGINX controller to become ready
resource "null_resource" "wait_for_ingress_nginx" {
  triggers = {
    key = uuid()
  }

  provisioner "local-exec" {
    command = <<EOF
      echo "🔄 Waiting for the NGINX Ingress Controller to be ready..."
      kubectl wait --namespace ${helm_release.ingress_nginx.namespace} \
        --for=condition=ready pod \
        --selector=app.kubernetes.io/component=controller \
        --timeout=120s
      echo "✅ Ingress NGINX Controller is ready!"
    EOF
  }

  depends_on = [helm_release.ingress_nginx]
}
