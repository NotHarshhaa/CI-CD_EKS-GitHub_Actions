terraform {
  backend "s3" {
    bucket         = "my-terraform-state-bucket"  # ✅ Replace with your actual S3 bucket name
    key            = "terraform/state.tfstate"    # ✅ Define the path for storing the state file
    region         = "ap-southeast-1"
    encrypt        = true                          # ✅ Enable encryption for security
    dynamodb_table = "terraform-lock"             # ✅ Replace with your DynamoDB table for state locking
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.14.0"
    }

    random = {
      source  = "hashicorp/random"
      version = "~> 3.5.1"
    }

    tls = {
      source  = "hashicorp/tls"
      version = "~> 4.0.4"
    }
  }
}

provider "aws" {
  region = "ap-southeast-1"
}
