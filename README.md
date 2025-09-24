# **🚀 End-to-End CI/CD Pipeline for Node.js App Deployment on EKS using GitHub Actions**  

![eksbanner](https://imgur.com/h87KAuY.png)

---

![CI/CD Pipeline](https://imgur.com/Ctznv2m.png)  

## **📌 Table of Contents**  

- [**🚀 End-to-End CI/CD Pipeline for Node.js App Deployment on EKS using GitHub Actions**](#-end-to-end-cicd-pipeline-for-nodejs-app-deployment-on-eks-using-github-actions)
  - [**📌 Table of Contents**](#-table-of-contents)
  - [**📂 Repository Structure**](#-repository-structure)
  - [**🔧 Prerequisites**](#-prerequisites)
  - [**⚙️ CI/CD Workflow**](#️-cicd-workflow)
    - [**🔨 Build Job**](#-build-job)
    - [**🚀 Deployment Job**](#-deployment-job)
  - [**🏗️ Infrastructure Details**](#️-infrastructure-details)
  - [**📦 Application Deployment Strategy**](#-application-deployment-strategy)
  - [**🔄 GitOps Principles**](#-gitops-principles)
  - [**🔒 Security Best Practices**](#-security-best-practices)
  - [**📢 Notifications \& Alerts**](#-notifications--alerts)
  - [**📊 Monitoring \& Logging**](#-monitoring--logging)
  - [**📜 Contributing**](#-contributing)
  - [**⭐ Support \& Author**](#-support--author)
  - [**⭐ Hit the Star!**](#-hit-the-star)
  - [🛠️ **Author \& Community**](#️-author--community)
  - [📧 **Let's Connect!**](#-lets-connect)
  - [📢 **Stay Updated!**](#-stay-updated)

---

## **📂 Repository Structure**  

The repository is structured for **modularity and maintainability**:

```tree
📂 root  
├── 📂 .github/workflows/      # GitHub Actions CI/CD workflows
│   ├── ci.yml                 # Continuous Integration pipeline
│   └── cd.yml                 # Continuous Deployment pipeline
│
├── 📂 app                     # Application source code  
│   ├── app.py                 # Python application logic (Flask)  
│   ├── calculator.js          # Business logic for calculations  
│   ├── calculator.test.js     # Unit tests for calculator functions  
│   ├── Dockerfile             # Optimized Dockerfile for Node.js app  
│   ├── Dockerfile-python      # Dockerfile for Python Flask version  
│   ├── index.js               # Main entry point of the Node.js application  
│   ├── package.json           # Project dependencies and scripts  
│   └── requirements.txt       # Python dependencies  
│  
├── 📂 kustomize               # Kubernetes manifests managed with Kustomize  
│   ├── 📂 base                # Base configurations common for all environments  
│   │   ├── deploy.yaml        # Enhanced deployment with health checks & security  
│   │   ├── ingress.yaml       # Ingress configuration for routing traffic  
│   │   ├── kustomization.yaml # Kustomize configuration file  
│   │   └── svc.yaml           # Kubernetes Service definition  
│   │  
│   ├── 📂 overlays            # Environment-specific configurations  
│   │   ├── 📂 dev             # Dev environment-specific Kustomize configs  
│   │   │   ├── deploy-dev.yaml        # Dev-specific deployment file  
│   │   │   ├── ingress-dev.yaml       # Dev-specific ingress settings  
│   │   │   ├── kustomization.yaml     # Kustomize configuration for Dev  
│   │   │   └── svc-dev.yaml           # Dev-specific service settings  
│   │   │  
│   │   ├── 📂 prod            # Production environment-specific Kustomize configs  
│   │   │   ├── deploy-prod.yaml       # Production-specific deployment file  
│   │   │   ├── ingress-prod.yaml      # Production-specific ingress settings  
│   │   │   ├── kustomization.yaml     # Kustomize configuration for Prod  
│   │   │   └── svc-prod.yaml          # Production-specific service settings  
│   │   │  
│   │   ├── 📂 staging         # Staging environment-specific Kustomize configs  
│   │   │   ├── deploy-staging.yaml    # Staging-specific deployment file  
│   │   │   ├── ingress-staging.yaml   # Staging-specific ingress settings  
│   │   │   ├── kustomization.yaml     # Kustomize configuration for Staging  
│   │   │   └── svc-staging.yaml       # Staging-specific service settings  
│  
├── 📂 terraform               # Terraform configuration for infrastructure provisioning  
│   ├── ingress-nginx.tf       # Terraform script for setting up NGINX Ingress  
│   ├── main.tf                # Main Terraform file defining AWS infrastructure  
│   ├── outputs.tf             # Defines Terraform outputs (e.g., cluster endpoints)  
│   ├── terraform.tf           # Backend configuration for Terraform state management  
│   └── variables.tf           # Input variables for Terraform modules  
│  
├── .eslintrc.js               # ESLint configuration for code quality  
├── .gitignore                 # Comprehensive gitignore file  
├── docker-compose.yml         # Local development environment  
├── nginx.conf                 # Nginx configuration for local development  
├── README.md                  # Project documentation and setup guide  
└── VERSION                    # Tracks application versioning (Semantic Versioning)  
```

---

## **🚀 Recent Improvements**  

This project has been enhanced with the following improvements:

### **🔧 Application Enhancements**
- ✅ **Enhanced Error Handling** - Better error responses and graceful shutdown
- ✅ **Health Check Endpoints** - `/health` endpoint for monitoring
- ✅ **API Endpoints** - RESTful API at `/api/calculate` for programmatic access
- ✅ **CORS Support** - Cross-origin resource sharing enabled
- ✅ **Improved UI** - Better styling and user experience
- ✅ **Graceful Shutdown** - Proper signal handling for container orchestration

### **🐳 Docker & Security Improvements**
- ✅ **Multi-stage Docker Build** - Optimized image size and security
- ✅ **Non-root User** - Enhanced security with proper user permissions
- ✅ **Health Checks** - Built-in container health monitoring
- ✅ **Signal Handling** - Proper process management with dumb-init

### **☸️ Kubernetes Enhancements**
- ✅ **Liveness & Readiness Probes** - Better container health monitoring
- ✅ **Security Context** - Enhanced security with non-root execution
- ✅ **Resource Management** - Proper CPU and memory limits
- ✅ **Rolling Updates** - Zero-downtime deployments

### **🔄 CI/CD Pipeline**
- ✅ **GitHub Actions Workflows** - Automated CI/CD with security scanning
- ✅ **Multi-Node Testing** - Testing across Node.js 18.x and 20.x
- ✅ **Security Scanning** - Trivy vulnerability scanning
- ✅ **Code Quality** - ESLint integration and coverage reporting

### **🛠️ Development Tools**
- ✅ **Docker Compose** - Local development environment
- ✅ **ESLint Configuration** - Code quality and consistency
- ✅ **Comprehensive .gitignore** - Proper version control
- ✅ **Nginx Configuration** - Local reverse proxy setup

---

## **🔧 Prerequisites**  

Before you proceed, ensure you have the following installed:  

- 🛠 **Node.js (>=18.x)**  
- 🐳 **Docker & Docker Compose**  
- 🏗️ **Terraform (>=1.0)**  
- ☸ **kubectl (latest version)**  
- 🎭 **Kustomize**  
- ☁ **AWS CLI & eksctl**  
- ⚙️ **GitHub Actions configured**  
- 🔑 **AWS IAM permissions to manage EKS**  

---

## **🏃‍♂️ Quick Start (Local Development)**  

### **Option 1: Docker Compose (Recommended)**
```bash
# Clone the repository
git clone https://github.com/NotHarshhaa/CI-CD_EKS-GitHub_Actions.git
cd CI-CD_EKS-GitHub_Actions

# Start the application with Docker Compose
docker-compose up --build

# Access the application
# Web UI: http://localhost:80
# Health Check: http://localhost:80/health
# API: POST http://localhost:80/api/calculate
```

### **Option 2: Local Node.js Development**
```bash
# Navigate to app directory
cd app

# Install dependencies
npm install

# Run in development mode
npm run dev

# Run tests
npm test

# Run linting
npm run lint
```

---

## **⚙️ CI/CD Workflow**  

The **CI/CD pipeline** automates the entire deployment process using **GitHub Actions**.  

### **🔨 Build Job**  

1️⃣ **Set Up the Environment**  

- Install **Node.js dependencies** using `npm install`.  
- Lint the code to ensure quality standards.  

2️⃣ **Run Tests**  

- Execute **unit tests** with `npm test`.  
- Generate test reports for visibility.  

3️⃣ **Version Management**  

- Uses **Semantic Versioning** (`major.minor.patch`).  
- Auto-increments the version based on commit messages.  

4️⃣ **Build & Push Docker Image**  

- **Builds a Docker image** of the application.  
- Pushes it to **Amazon Elastic Container Registry (ECR)**.  

---

### **🚀 Deployment Job**  

1️⃣ **Terraform Setup**  

- Initializes Terraform with `terraform init`.  
- Ensures correct **state management**.  

2️⃣ **Infrastructure Provisioning**  

- Executes `terraform plan` and `terraform apply`.  
- Deploys EKS clusters, networking, and storage.  

3️⃣ **Kubernetes Configuration**  

- Configures `kubectl` to interact with the cluster.  
- Applies `Kustomize` overlays for environment-specific settings.  

4️⃣ **Ingress Controller Setup**  

- Uses **Helm** to install **NGINX Ingress**.  

5️⃣ **Application Deployment**  

- Deploys the latest **Docker image** to Kubernetes.  
- Exposes the service via **Ingress and Load Balancer**.  

---

## **🏗️ Infrastructure Details**  

| Environment | Instance Type | Replica Count |
|-------------|--------------|---------------|
| **Dev**     | `t3.small`    | 1             |
| **Staging** | `t3.medium`   | 3             |
| **Prod**    | `t3.large`    | 3             |

✅ **DNS Automation via Cloudflare**  

- Environment-specific subdomains:  
  - `dev.example.com`  
  - `staging.example.com`  
  - `prod.example.com`  

---

## **📦 Application Deployment Strategy**  

This project supports **multiple deployment strategies**:  

✅ **Rolling Updates** – Default strategy, ensuring zero downtime.  
✅ **Blue-Green Deployment** – Used in production environments.  
✅ **Canary Deployments** – Gradual rollout for safe updates.  

---

## **🔄 GitOps Principles**  

✔ **Git as the Source of Truth**  
✔ **Declarative Infrastructure** (Terraform & Kubernetes)  
✔ **Automated Deployments via GitHub Actions**  

Every infrastructure change must be made via a **Git commit**.  

---

## **🔒 Security Best Practices**  

🔐 **Secrets Management**  

- Uses **AWS Secrets Manager** & GitHub Actions **encrypted secrets**.  

🛡 **Container Security**  

- Uses **Trivy** and **Docker Bench Security** for vulnerability scanning.  

🚧 **IAM & Least Privilege**  

- Uses **AWS IAM roles** with restricted access.  

---

## **📢 Notifications & Alerts**  

🔔 **Slack & Email Notifications**  

- **CI/CD Job Updates** – Pipeline status alerts.  
- **DNS Updates** – Cloudflare integration for alerts.  

📡 **Monitoring & Logging**  

- **AWS CloudWatch** for logs & metrics.  
- **Prometheus & Grafana** for observability.  

---

## **📊 Monitoring & Logging**  

✅ **Application Logs** – Aggregated using **Fluent Bit**.  
✅ **Infrastructure Logs** – Stored in **AWS CloudWatch Logs**.  
✅ **Metrics Monitoring** – Tracked using **Prometheus & Grafana**.  

---

## **📜 Contributing**  

Want to contribute? Here’s how:  

1. **Fork the repository** & create a new branch.  
2. Make your changes and **commit with a descriptive message**.  
3. Open a **Pull Request (PR)** for review.  

---

## **⭐ Support & Author**  

## **⭐ Hit the Star!**  

If you find this repository helpful and plan to use it for learning, please consider giving it a star ⭐. Your support motivates me to keep improving and adding more valuable content! 🚀  

---

## 🛠️ **Author & Community**  

This project is crafted with passion by **[Harshhaa](https://github.com/NotHarshhaa)** 💡.  

I’d love to hear your feedback! Feel free to open an issue, suggest improvements, or just drop by for a discussion. Let’s build a strong DevOps community together!  

---

## 📧 **Let's Connect!**  

Stay connected and explore more DevOps content with me:  

[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/harshhaa-vardhan-reddy)  [![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/NotHarshhaa)  [![Telegram](https://img.shields.io/badge/Telegram-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/prodevopsguy)  [![Dev.to](https://img.shields.io/badge/Dev.to-0A0A0A?style=for-the-badge&logo=dev.to&logoColor=white)](https://dev.to/notharshhaa)  [![Hashnode](https://img.shields.io/badge/Hashnode-2962FF?style=for-the-badge&logo=hashnode&logoColor=white)](https://hashnode.com/@prodevopsguy)  

---

## 📢 **Stay Updated!**  

Want to stay up to date with the latest DevOps trends, best practices, and project updates? Follow me on my blogs and social channels!  

![Follow Me](https://imgur.com/2j7GSPs.png)
