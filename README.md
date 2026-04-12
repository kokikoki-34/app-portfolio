# Portfolio

## About

This repository is dedicated to the development of my personal portfolio website.

## Project Goals

### Core Features (Must)

- **Simple SPA Portfolio**: Accessible at `www.kokiyasui.com`.
- **Secure Admin Console**: A dedicated management interface for administrative tasks.
- **Managed Database**: Integration with a managed DB service and a console for data management.
- **Infrastructure as Code (IaC)**: Provisioning and management via Terraform.
- **Cloud-Native Development**: Fully leveraging Google Cloud Platform (GCP).
- **Flexible Environment**: Support for both containerized and local development.
- **CI/CD Pipeline**: Automated testing and document generation.

### Future Enhancements (Optional)

- **Digital Business Card**:
  - Apple Pay integration.
  - Virtual Contact File (`.vcf`) support.
- **On-premise Infrastructure**:
  - Dedicated database server.

## Objectives

The primary purposes of this project are:

- **Personal Branding**: Build and host my portfolio on my own domain (`www.kokiyasui.com`).
- **Technical Growth**: Learn and implement a modern tech stack from scratch.
- **Best Practices**: Master modern development workflows, including:
  - Task management via GitHub Projects.
  - Infrastructure management with Terraform.
  - Automated CI/CD pipelines.
  - Modern branching strategies (e.g., GitLab Flow).

## Tech Stack & Architecture

This project prioritizes two principle to ensure maintainability and scalability.

- **Separation of Concerns**
- **Single Source of Truth (SSOT)** principle

### Technologies

| Domain | Technology | Rationale (Trade-offs & Benefits) |
| :--- | :--- | :--- |
| **Frontend** | React (Vite, TypeScript) | Lightweight SPA. Types for Go and DB are auto-generated via OpenAPI to eliminate redundant manual type management. |
| **Backend** | Go (Golang) | Focused on simplicity and transparency. Acts as a lean API server that processes requests explicitly without hidden "magic." |
| **Database** | Neon (PostgreSQL) | Serverless DB to minimize operational overhead. Branching features align perfectly with development environments. |
| **DB Access** | `sqlc` (Schema-First) | Adheres to Go's philosophy by using static code generation from raw SQL instead of an ORM, providing full transparency. |
| **Infrastructure** | GCP Cloud Run | Decoupled frontend and backend containers. Optimizes costs through scale-to-zero capabilities. |
| **IaC** | Terraform | Industry-standard structure with `modules` and `envs(dev/prod)` directories. Physically isolates states to protect production environments. |
| **Security / Network** | Cloudflare Workers + GCP IAM | Zero-trust architecture. Cloud Run is set to "Require Authentication," with Cloudflare Workers injecting OIDC tokens for secure access. |

### Branching Strategy & CI/CD

- **Branching Model**
  - `main`: Production environment.
  - `develop`: Staging/Development environment.

- **Development Workflow**
  - All changes (features, CI, or infrastructure) are managed via temporary `feature/*` branches and integrated into `develop` through Pull Requests.

- **Automation**
  - GitHub Actions handles automated testing and deployment pipelines.

- **Hybrid Development Strategy**
  - Leverages containers for testing and deployment to ensure portability, while allowing local environments for rapid debugging and lightweight development.

## Implementation Roadmap

### Phase 1: Foundation & Deployment Pipeline (MVP)

- **Repository Setup**: Initialize project structure for Go and React.
- **Local Development**: Configure Vite Proxy to seamlessly communicate with the Go backend.
- **Infrastructure as Code**: Design Terraform modules (`modules` / `envs`) and provision baseline Dev/Prod environments.
- **CI/CD Pipeline**: Set up GitHub Actions for automated deployment to Google Cloud Run.
- **Hybrid Environment**: Establish a dual-mode workflow supporting both containerized (Test/Prod) and local (Debugging) execution.

### Phase 2: Security & Infrastructure Integration (Zero Trust)

- **IAM Hardening**: Secure Cloud Run services by disabling unauthenticated access.
- **Zero Trust Proxy**: Deploy Cloudflare Workers to handle OIDC token injection for decoupled authentication.
- **Custom Domain**: Configure `kokiyasui.com` with SSL/TLS encryption.

### Phase 3: Core Features, Automation & DB Integration

- **Automated Testing**: Integrate Unit/Integration tests into the CI pipeline.
- **Design-First API Development**:
  - Establish OpenAPI as the SSOT.
  - Automate code generation for the Go backend (e.g., `oapi-codegen`) and TypeScript types for the frontend.
- **Database Automation**: Implement automated DB documentation and CI checks (tool selection TBD).
- **Database Integration**:
  - Provision Neon DB and set up `sqlc` for Schema-First development.
  - Implement CRUD operations and API endpoints in Go.
- **Frontend Development**: Build the public portfolio UI and the Zero-Trust protected admin console.

### Phase 4: Future Enhancements (Backlog)

- **Digital Business Card**: Implement dynamic generation of Apple Wallet passes (`.pkpass`) and Virtual Contact Files (`.vcf`).
- **Infrastructure Deep-Dive**: Migrate from managed DB (Neon) to self-hosted PostgreSQL on Google Compute Engine (GCE) to deepen on-premise infrastructure knowledge.
