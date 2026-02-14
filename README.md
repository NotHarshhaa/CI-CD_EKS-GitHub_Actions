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
│   ├── ci.yml                 # Pure CI pipeline (testing, linting, security)
│   ├── cd-production.yml      # Production deployment pipeline
│   └── deployment.yml         # Multi-environment deployment with versioning
│
├── 📂 app                     # Application source code  
│   ├── calculator.js          # Business logic for calculations  
│   ├── calculator.test.js     # Unit tests for calculator functions  
│   ├── Dockerfile             # Optimized Dockerfile for Node.js app  
│   ├── index.js               # Main entry point of the Node.js application  
│   └── package.json           # Project dependencies and scripts  
│  
├── 📂 kustomize               # Kubernetes manifests managed with Kustomize  
│   ├── 📂 base                # Base configurations common for all environments  
│   │   ├── deploy.yaml        # Enhanced deployment with health checks & security  
│   │   ├── ingress.yaml       # Ingress configuration for routing traffic  
│   │   ├── kustomization.yaml # Kustomize configuration with image management  
│   │   └── svc.yaml           # Kubernetes Service definition  
│   │  
│   ├── 📂 overlays            # Environment-specific configurations  
│   │   ├── 📂 dev             # Dev environment-specific Kustomize configs  
│   │   ├── 📂 prod            # Production environment with enhanced security  
│   │   └── 📂 staging         # Staging environment-specific configs  
│  
├── 📂 terraform               # Terraform configuration for infrastructure provisioning  
│   ├── ingress-nginx.tf       # Terraform script for setting up NGINX Ingress  
│   ├── main.tf                # Main Terraform file with EKS 1.29 & enhanced security  
│   ├── outputs.tf             # Defines Terraform outputs  
│   ├── terraform.tf           # Backend configuration with latest providers  
│   └── variables.tf           # Input variables for Terraform modules  
│  
├── .eslintrc.js               # Enhanced ESLint with security plugins  
├── .gitignore                 # Optimized gitignore with comprehensive coverage  
├── docker-compose.yml         # Enhanced local development with Redis & SSL  
├── nginx.conf                 # Production-ready Nginx with security headers  
├── README.md                  # Project documentation and setup guide  
└── VERSION                    # Tracks application versioning (Semantic Versioning)  
```

---

## **🚀 Recent Improvements**  

This project has been comprehensively enhanced with modern best practices and security improvements:

### **🔄 GitHub Actions Workflows**
- ✅ **Organized Workflow Structure** - Clear separation: CI, Production CD, Multi-Environment Deployment
- ✅ **Pure CI Pipeline** - Testing, linting, security scanning (ci.yml)
- ✅ **Production CD** - ECR integration, production deployment (cd-production.yml)
- ✅ **Multi-Environment Deployment** - Version management, Terraform, DNS (deployment.yml)
- ✅ **Latest Action Versions** - checkout@v4, setup-node@v4, codecov@v4
- ✅ **Enhanced CI Pipeline** - Multi-node testing (18.x, 20.x) with fail-fast disabled
- ✅ **Security Scanning** - Trivy vulnerability scanning with SARIF upload
- ✅ **Master Branch Support** - Updated workflows to use master branch instead of main

### **🏗️ Terraform Infrastructure**
- ✅ **EKS 1.29** - Latest stable version with enhanced add-ons
- ✅ **Modern Providers** - AWS ~>5.50, Kubernetes ~>2.24, Helm ~>2.12
- ✅ **Enhanced Security** - Encrypted GP3 volumes, private endpoints, CNI policies
- ✅ **Better Tagging** - Comprehensive resource tagging strategy
- ✅ **Version Constraints** - Terraform >=1.5.0 with provider version locking

### **📦 Kustomize Configurations**
- ✅ **Image Management** - Centralized image tagging and updates
- ✅ **Enhanced Production** - 3 replicas, proper secret management, environment configs
- ✅ **Better Structure** - Improved base configuration with replica management
- ✅ **Secret Handling** - Environment-based secret generation

### **🐳 Docker & Development**
- ✅ **Redis Cache** - Added Redis service for improved performance
- ✅ **SSL Support** - HTTPS termination with modern cipher suites
- ✅ **Enhanced Nginx** - Security headers, rate limiting, gzip compression
- ✅ **Health Checks** - Comprehensive health monitoring for all services
- ✅ **Better Networking** - Dedicated bridge network and volume management

### **🔧 Development Tools**
- ✅ **Security ESLint** - Security plugins, import rules, promise handling
- ✅ **Optimized Gitignore** - Clean, organized, comprehensive coverage
- ✅ **Code Quality** - ES2022 standards, security-focused linting
- ✅ **Modern Standards** - Latest Node.js 20 with proper caching

---

## **🔧 Prerequisites**  

Before you proceed, ensure you have the following installed:  

- 🛠 **Node.js (>=20.x)**  
- 🐳 **Docker & Docker Compose**  
- 🏗️ **Terraform (>=1.5.0)**  
- ☸ **kubectl (latest version)**  
- 🎭 **Kustomize**  
- ☁ **AWS CLI & eksctl**  
- ⚙️ **GitHub Actions configured**  
- 🔑 **AWS IAM permissions to manage EKS**  
- 🔒 **Security scanning tools (Trivy, CodeQL)**  

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

The **CI/CD pipeline** is organized into three specialized workflows using **GitHub Actions**:  

### **� CI Pipeline (ci.yml)**  
**Triggers**: Push/PR to master, develop, staging  

1️⃣ **Code Quality Checks**  
- Install **Node.js dependencies** using `npm ci`  
- Run **linting** to ensure code quality standards  

2️⃣ **Testing & Coverage**  
- Execute **unit tests** across Node.js 18.x and 20.x  
- Generate **coverage reports** with Codecov integration  

3️⃣ **Security Scanning**  
- Run **Trivy vulnerability scanner** on codebase  
- Upload **SARIF results** to GitHub Security tab  

### **🚀 Production CD Pipeline (cd-production.yml)**  
**Triggers**: Push to master, tags, manual dispatch  

1️⃣ **Build & Push**  
- **Build Docker image** with production optimizations  
- Push to **Amazon ECR** with SHA tagging  

2️⃣ **Deploy to EKS**  
- Update **Kubernetes manifests** using Kustomize  
- Deploy to **production EKS cluster**  

3️⃣ **Verification**  
- **Health checks** and smoke tests  
- **Security scanning** of deployed image  

### **🌍 Multi-Environment Deployment (deployment.yml)**  
**Triggers**: Push to prod/dev/staging, PR to dev  

1️⃣ **Version Management**  
- **Semantic versioning** based on commit messages  
- Auto-tag and version file updates  

2️⃣ **Infrastructure Provisioning**  
- **Terraform** EKS cluster management  
- Multi-environment infrastructure setup  

3️⃣ **Application Deployment**  
- **Docker builds** for each environment  
- **Kustomize** deployments with environment-specific configs  
- **DNS management** via Cloudflare  

4️⃣ **Notifications**  
- **Slack integration** for deployment status  
- Comprehensive deployment reporting  

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
