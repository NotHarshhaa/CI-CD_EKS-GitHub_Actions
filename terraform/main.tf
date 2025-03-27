# Fetch available AWS Availability Zones (AZs) with opt-in not required
data "aws_availability_zones" "available" {
  filter {
    name   = "opt-in-status"
    values = ["opt-in-not-required"]
  }
}

# Generate a unique suffix for resource naming to avoid conflicts
resource "random_string" "suffix" {
  length  = 8
  special = false
}

# ✅ VPC Module - Configuring the VPC with NAT Gateway, DNS, and Subnet Tagging
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.0.0"

  name = "e2ecicd-vpc-${var.environment}"
  cidr = lookup(local.vpc_cidrs, var.environment)

  # Select the first three AZs dynamically
  azs = slice(data.aws_availability_zones.available.names, 0, 3)

  private_subnets = lookup(local.private_subnets, var.environment)
  public_subnets  = lookup(local.public_subnets, var.environment)

  enable_nat_gateway   = true
  single_nat_gateway   = true
  enable_dns_hostnames = true

  # Tag public subnets for Kubernetes ELB
  public_subnet_tags = {
    "kubernetes.io/cluster/${local.cluster_name}" = "shared"
    "kubernetes.io/role/elb"                      = "1"
  }

  # Tag private subnets for internal Kubernetes load balancing
  private_subnet_tags = {
    "kubernetes.io/cluster/${local.cluster_name}" = "shared"
    "kubernetes.io/role/internal-elb"             = "1"
  }
}

# ✅ EKS Cluster Module - Deploying an EKS Cluster with Managed Node Groups
module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "19.15.3"

  cluster_name    = local.cluster_name
  cluster_version = "1.27"

  vpc_id                         = module.vpc.vpc_id
  subnet_ids                     = module.vpc.private_subnets
  cluster_endpoint_public_access = true

  # Set default configurations for EKS managed nodes
  eks_managed_node_group_defaults = {
    ami_type = "AL2_x86_64" # Amazon Linux 2 optimized for EKS
  }

  # Managed Node Group Configuration
  eks_managed_node_groups = {
    eks_nodes = {
      name = "node-group-${var.environment}"

      instance_types = [lookup(local.instance_type, var.environment)]

      min_size     = 1
      max_size     = lookup(local.desired_instance_count, var.environment)
      desired_size = lookup(local.desired_instance_count, var.environment)

      tags = {
        "Environment"  = var.environment
        "Terraform"    = "true"
        "Kubernetes"   = "EKS"
        "NodeGroup"    = "managed"
      }
    }
  }
}
