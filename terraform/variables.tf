# Defines the environment (dev, staging, prod)
variable "environment" {
  description = "Deployment environment (e.g., dev, staging, prod)"
  type        = string
}

# Defines the AWS region where resources will be deployed
variable "region" {
  description = "AWS region for deployment"
  type        = string
  default     = "ap-southeast-1"
}

variable "kubeconfig_path" {
  description = "Path to the kubeconfig file for Kubernetes authentication"
  type        = string
  default     = "~/.kube/config" # Default path for kubeconfig
}

# Namespace for Ingress NGINX
variable "ingress_nginx_namespace" {
  description = "Namespace for the NGINX Ingress Controller (created if not existing)"
  type        = string
  default     = "ingress-nginx"
}

# Define cluster name dynamically based on the environment
locals {
  cluster_name = "e2ecicd-eks-${var.environment}"

  # CIDR blocks for each environment
  vpc_cidrs = {
    dev     = "10.0.0.0/16"
    staging = "10.1.0.0/16"
    prod    = "10.2.0.0/16"
  }

  # Private subnets for each environment
  private_subnets = {
    dev     = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
    staging = ["10.1.1.0/24", "10.1.2.0/24", "10.1.3.0/24"]
    prod    = ["10.2.1.0/24", "10.2.2.0/24", "10.2.3.0/24"]
  }

  # Public subnets for each environment
  public_subnets = {
    dev     = ["10.0.4.0/24", "10.0.5.0/24", "10.0.6.0/24"]
    staging = ["10.1.4.0/24", "10.1.5.0/24", "10.1.6.0/24"]
    prod    = ["10.2.4.0/24", "10.2.5.0/24", "10.2.6.0/24"]
  }

  # Instance types based on environment
  instance_type = {
    dev     = "t3.small"
    staging = "t3.medium"
    prod    = "t3.large"
  }

  # Desired node count per environment
  desired_instance_count = {
    dev     = 1
    staging = 2
    prod    = 3
  }
}
