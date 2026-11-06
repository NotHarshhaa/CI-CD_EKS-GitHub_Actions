terraform {
  backend "s3" {
    bucket       = "my-terraform-state-bucket"
    key          = "terraform/state.tfstate"
    region       = "ap-southeast-1"
    encrypt      = true
    use_lockfile = true # S3-native state locking (DynamoDB locking is deprecated)
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

  # use_lockfile in the S3 backend requires Terraform >= 1.10
  required_version = ">= 1.10.0"
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
