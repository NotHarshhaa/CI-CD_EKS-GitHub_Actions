terraform {
  backend "s3" {
    bucket         = "my-terraform-state-bucket"
    key            = "terraform/state.tfstate"
    region         = "ap-southeast-1"
    encrypt        = true
    dynamodb_table = "terraform-lock"
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.50"
    }

    random = {
      source  = "hashicorp/random"
      version = "~> 3.6"
    }

    tls = {
      source  = "hashicorp/tls"
      version = "~> 4.2"
    }

    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.24"
    }

    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.12"
    }
  }

  required_version = ">= 1.5.0"
}

provider "aws" {
  region = var.region
  
  default_tags {
    tags = {
      Environment = var.environment
      Project     = "CI-CD-EKS"
      ManagedBy   = "Terraform"
    }
  }
}
