import { ProfessionalModule, CaseStudy, InteractiveExercise, Framework } from '@/types/enhancedContentTypes';

// Comprehensive DevOps Fundamentals Module Content
export const devOpsFundamentalsModule: ProfessionalModule = {
  id: 'devops-fundamentals-cicd-docker-kubernetes',
  title: 'DevOps Fundamentals: CI/CD, Docker & Kubernetes',
  description: 'Master modern DevOps practices with hands-on experience in CI/CD pipelines, containerization with Docker, and orchestration with Kubernetes. Learn industry-standard tools and techniques used by leading tech companies.',
  duration_minutes: 180,
  difficulty_level: 'intermediate',
  learning_objectives: [
    'Design and implement complete CI/CD pipelines using modern platforms',
    'Create production-ready Docker containers with security best practices',
    'Deploy and manage applications on Kubernetes clusters',
    'Implement monitoring, logging, and observability for containerized applications',
    'Apply GitOps principles and infrastructure as code practices',
    'Understand cloud-native architecture patterns and microservices deployment'
  ],
  prerequisites: [
    'Basic understanding of Git version control',
    'Familiarity with command-line interfaces (CLI)',
    'Basic knowledge of web application architecture',
    'Understanding of software development lifecycle (SDLC)'
  ],
  target_audience: [
    'Software developers transitioning to DevOps roles',
    'System administrators adopting cloud-native technologies',
    'Technical leads implementing DevOps practices',
    'Platform engineers building deployment infrastructure'
  ],
  industry_applications: [
    'Software as a Service (SaaS) platforms',
    'E-commerce and retail technology',
    'Financial services and fintech',
    'Healthcare technology and telemedicine',
    'Media streaming and content delivery'
  ],
  competency_level: {
    entry_level: 'Familiar with basic development workflows and version control',
    target_level: 'Proficient in building CI/CD pipelines and managing containerized deployments',
    mastery_indicators: [
      'Successfully deploys applications using GitOps workflows',
      'Implements zero-downtime deployment strategies',
      'Configures comprehensive monitoring and alerting systems',
      'Applies security scanning and compliance checks in pipelines',
      'Troubleshoots container and orchestration issues independently'
    ]
  },
  content_sections: [
    {
      id: 'cicd-pipeline-mastery',
      title: 'CI/CD Pipeline Mastery',
      type: 'interactive',
      duration_minutes: 60,
      description: 'Learn to build automated, reliable, and secure CI/CD pipelines using modern platforms',
      is_required: true,
      order_index: 1,
      learning_outcomes: [
        'Understand CI/CD principles and benefits',
        'Create pipelines using GitHub Actions and GitLab CI',
        'Implement automated testing and quality gates',
        'Deploy applications with advanced strategies (blue-green, canary)'
      ],
      content_blocks: [
        {
          id: 'cicd-foundations',
          type: 'text',
          title: 'Modern CI/CD Architecture',
          content: `Continuous Integration and Continuous Deployment (CI/CD) transforms software delivery by automating the entire pipeline from code commit to production deployment.

**What is CI/CD?**

**Continuous Integration (CI)**: Developers frequently merge code changes into a central repository, triggering automated builds and tests. This practice catches integration issues early and ensures code quality.

**Continuous Deployment (CD)**: Every code change that passes automated tests is automatically deployed to production. This enables rapid feature delivery and quick bug fixes.

**Key Benefits:**
- **Speed**: Deploy features in minutes instead of weeks
- **Quality**: Automated testing catches bugs before production
- **Reliability**: Consistent, repeatable deployment processes
- **Feedback**: Rapid feedback loops for developers
- **Security**: Automated security scanning and compliance checks

**Modern CI/CD Pipeline Stages:**

1. **Source**: Code commit triggers the pipeline
2. **Build**: Compile code and create artifacts
3. **Test**: Run unit, integration, and security tests
4. **Deploy to Staging**: Automated deployment to staging environment
5. **Integration Testing**: Run end-to-end tests in staging
6. **Deploy to Production**: Automated or manual release to production
7. **Monitor**: Continuous monitoring and alerting

**GitOps Principles:**
GitOps treats Git as the single source of truth for infrastructure and application configuration. All changes flow through Git, enabling:
- Declarative infrastructure and application definitions
- Version-controlled system state
- Automated synchronization between Git and live systems
- Easy rollbacks by reverting Git commits`,
          order_index: 1
        },
        {
          id: 'github-actions-framework',
          type: 'framework',
          title: 'GitHub Actions Pipeline Framework',
          content: {
            id: 'github-actions-pipeline',
            name: 'GitHub Actions CI/CD Pipeline',
            description: 'A complete framework for building production-ready CI/CD pipelines using GitHub Actions',
            steps: [
              {
                step_number: 1,
                title: 'Pipeline Trigger Configuration',
                description: 'Define when and how your pipeline executes',
                key_actions: [
                  'Configure push and pull request triggers',
                  'Set up scheduled runs for nightly builds',
                  'Implement manual workflow dispatch for releases',
                  'Use path filters to trigger only relevant changes'
                ],
                examples: [
                  'on: [push, pull_request] for continuous integration',
                  'on: schedule: - cron: "0 2 * * *" for nightly builds',
                  'paths: ["src/**", "tests/**"] to trigger on specific changes'
                ]
              },
              {
                step_number: 2,
                title: 'Build and Test Automation',
                description: 'Automate code compilation, testing, and quality checks',
                key_actions: [
                  'Set up build matrix for multiple environments',
                  'Run unit, integration, and end-to-end tests',
                  'Generate code coverage reports',
                  'Implement parallel test execution for speed'
                ],
                examples: [
                  'strategy: matrix: node: [16, 18, 20] for multi-version testing',
                  'npm run test:coverage with codecov upload',
                  'Cypress for E2E testing in CI environment'
                ]
              },
              {
                step_number: 3,
                title: 'Security and Quality Gates',
                description: 'Implement automated security scanning and quality checks',
                key_actions: [
                  'Run dependency vulnerability scanning',
                  'Perform static code analysis (SAST)',
                  'Scan container images for vulnerabilities',
                  'Enforce code quality thresholds'
                ],
                examples: [
                  'Snyk or Dependabot for dependency scanning',
                  'SonarQube for code quality analysis',
                  'Trivy for container image scanning',
                  'Fail pipeline if coverage drops below 80%'
                ]
              },
              {
                step_number: 4,
                title: 'Artifact Management',
                description: 'Build, store, and version deployment artifacts',
                key_actions: [
                  'Build Docker images with proper tagging',
                  'Push artifacts to container registries',
                  'Generate semantic version tags',
                  'Create release notes automatically'
                ],
                examples: [
                  'docker build -t myapp:${{ github.sha }}',
                  'Push to GitHub Container Registry (ghcr.io)',
                  'Use semantic-release for automated versioning'
                ]
              },
              {
                step_number: 5,
                title: 'Deployment Strategies',
                description: 'Deploy with zero-downtime and rollback capabilities',
                key_actions: [
                  'Implement blue-green deployment',
                  'Configure canary releases with gradual rollout',
                  'Set up feature flags for controlled releases',
                  'Enable automatic rollback on failure'
                ],
                examples: [
                  'Blue-green: Switch traffic between two identical environments',
                  'Canary: Route 10% traffic to new version, monitor, then scale',
                  'Feature flags: LaunchDarkly or Unleash integration'
                ]
              }
            ],
            when_to_use: 'Use GitHub Actions for projects hosted on GitHub, requiring tight integration with GitHub features, and when you need a cloud-native CI/CD solution with generous free tier.',
            benefits: [
              'Native GitHub integration with no external tools needed',
              'Large marketplace of pre-built actions',
              'Free for public repositories and generous free tier for private',
              'Matrix builds for testing across multiple environments',
              'Secret management built-in'
            ],
            common_pitfalls: [
              'Not caching dependencies, leading to slow builds',
              'Exposing secrets in logs or build outputs',
              'Not implementing proper error handling and notifications',
              'Running too many jobs in parallel, hitting rate limits'
            ]
          },
          order_index: 2
        },
        {
          id: 'cicd-case-study',
          type: 'case_study',
          title: 'Netflix\'s CI/CD Pipeline Evolution',
          content: {
            id: 'netflix-cicd',
            title: 'How Netflix Deploys 4,000+ Times Per Day',
            scenario: 'Netflix needed to deploy thousands of microservices across global infrastructure with zero downtime',
            background: 'With over 200 million subscribers worldwide, Netflix cannot afford deployment failures or downtime. Their engineering teams needed a CI/CD system that could handle massive scale while maintaining reliability.',
            challenge: 'Traditional deployment processes were too slow and risky. Netflix needed to enable autonomous teams to deploy independently while maintaining system reliability and security.',
            context: {
              industry: 'Media Streaming & Entertainment',
              company_size: '10,000+ employees, 200M+ users',
              timeline: '2013-Present'
            },
            analysis_points: [
              '**Spinnaker Platform**: Netflix created Spinnaker, an open-source multi-cloud CD platform that orchestrates deployments across AWS, GCP, and Azure',
              '**Automated Canary Analysis**: Every deployment is automatically monitored. If error rates increase, deployments roll back automatically',
              '**Chaos Engineering**: Netflix Chaos Monkey randomly terminates production instances to ensure system resilience',
              '**Immutable Infrastructure**: Every deployment creates new infrastructure rather than updating existing resources',
              '**Progressive Delivery**: Traffic is gradually shifted to new versions, with automatic rollback if issues are detected'
            ],
            discussion_questions: [
              'How does automated canary analysis reduce deployment risk compared to manual monitoring?',
              'What organizational changes are needed to support 4,000+ deployments per day?',
              'How does immutable infrastructure simplify rollback procedures?',
              'What trade-offs exist between deployment speed and safety?'
            ],
            key_takeaways: [
              'Automation is essential at scale - manual processes become bottlenecks',
              'Progressive delivery with monitoring catches issues before they impact all users',
              'Immutable infrastructure makes deployments predictable and rollbacks simple',
              'Chaos engineering builds confidence in automated deployment systems',
              'Developer autonomy increases when safety mechanisms are automated'
            ],
            related_concepts: [
              'Blue-Green Deployments',
              'Feature Flags',
              'Observability and Monitoring',
              'Site Reliability Engineering (SRE)'
            ]
          },
          order_index: 3
        },
        {
          id: 'cicd-exercise',
          type: 'interactive',
          title: 'Build Your First GitHub Actions Pipeline',
          content: {
            id: 'github-actions-lab',
            title: 'Hands-On: Create a Complete CI/CD Pipeline',
            type: 'skill_practice',
            instructions: `**Objective**: Create a GitHub Actions workflow that builds, tests, and deploys a Node.js application.

**Setup**:
1. Fork a sample Node.js application repository
2. Create a \`.github/workflows/ci-cd.yml\` file
3. Implement the pipeline stages below

**Pipeline Requirements**:
- Trigger on push to main and pull requests
- Run on multiple Node.js versions (16, 18, 20)
- Install dependencies with caching
- Run tests with coverage reporting
- Build Docker image
- Push to GitHub Container Registry
- Deploy to staging environment

**Sample Pipeline Structure**:
\`\`\`yaml
name: CI/CD Pipeline
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16, 18, 20]
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js \${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: \${{ matrix.node-version }}
          cache: 'npm'
      - run: npm ci
      - run: npm test
      - run: npm run test:coverage
  
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build Docker image
        run: docker build -t myapp:\${{ github.sha }} .
      - name: Push to registry
        run: docker push myapp:\${{ github.sha }}
\`\`\``,
            reflection_prompts: [
              'What happens if tests fail in the test job? Does the build job still run?',
              'How does caching improve pipeline performance?',
              'What security considerations are important when pushing to a container registry?',
              'How would you add security scanning to this pipeline?'
            ],
            success_criteria: [
              'Pipeline triggers on push and pull request',
              'Tests run successfully on all Node.js versions',
              'Docker image builds and pushes to registry',
              'Pipeline fails if tests fail',
              'Build time is under 5 minutes with caching'
            ]
          },
          order_index: 4
        }
      ],
      practical_applications: [
        'Set up CI/CD for a web application with automated testing and deployment',
        'Implement blue-green deployment for zero-downtime releases',
        'Create a multi-stage pipeline with security scanning and quality gates',
        'Configure automated rollback based on error rate monitoring'
      ],
      additional_resources: [
        {
          title: 'GitHub Actions Documentation',
          type: 'article',
          description: 'Official GitHub Actions documentation with examples and best practices',
          internal: false
        },
        {
          title: 'GitLab CI/CD Tutorial',
          type: 'video',
          description: 'Comprehensive video series on GitLab CI/CD pipelines',
          internal: false
        },
        {
          title: 'CI/CD Security Best Practices',
          type: 'article',
          description: 'Security considerations for CI/CD pipelines',
          internal: false
        }
      ]
    },
    {
      id: 'docker-containerization',
      title: 'Docker Containerization Excellence',
      type: 'interactive',
      duration_minutes: 60,
      description: 'Master Docker containerization from basics to production-ready images',
      is_required: true,
      order_index: 2,
      learning_outcomes: [
        'Understand container technology and Docker architecture',
        'Write optimized Dockerfiles with multi-stage builds',
        'Implement container security best practices',
        'Use Docker Compose for local development'
      ],
      content_blocks: [
        {
          id: 'docker-fundamentals',
          type: 'text',
          title: 'Container Technology Fundamentals',
          content: `Containers revolutionized application deployment by packaging applications with all dependencies into lightweight, portable units that run consistently across environments.

**What are Containers?**

Containers are lightweight, standalone, executable packages that include everything needed to run an application: code, runtime, system tools, libraries, and settings. Unlike virtual machines, containers share the host OS kernel, making them much more efficient.

**Docker Architecture:**

1. **Docker Engine**: The runtime that builds and runs containers
2. **Docker Images**: Read-only templates with application and dependencies
3. **Docker Containers**: Running instances of images
4. **Docker Registry**: Storage for Docker images (Docker Hub, ECR, etc.)

**Why Containers Matter:**

- **Consistency**: "Works on my machine" becomes "works everywhere"
- **Isolation**: Applications run in isolated environments
- **Efficiency**: Containers are lightweight compared to VMs
- **Scalability**: Start containers in seconds, scale easily
- **Portability**: Run the same container on any Docker-enabled system

**Container vs Virtual Machine:**

| Aspect | Container | Virtual Machine |
|--------|-----------|-----------------|
| Size | MBs | GBs |
| Startup | Seconds | Minutes |
| Resource Usage | Minimal | Significant |
| Isolation | Process-level | Hardware-level |
| Portability | High | Moderate |

**Docker Image Layers:**

Docker images are built in layers. Each instruction in a Dockerfile creates a new layer. Layers are cached and reused, making builds fast and efficient.

\`\`\`dockerfile
FROM node:18-alpine          # Base layer
WORKDIR /app                 # Layer 2
COPY package*.json ./        # Layer 3 (dependencies)
RUN npm ci                   # Layer 4
COPY . .                     # Layer 5 (app code)
CMD ["npm", "start"]         # Layer 6 (command)
\`\`\`

**Best Practice**: Place frequently changing code (like application source) in later layers, and stable dependencies in earlier layers. This maximizes cache usage.`,
          order_index: 1
        },
        {
          id: 'dockerfile-optimization',
          type: 'framework',
          title: 'Production-Ready Dockerfile Framework',
          content: {
            id: 'dockerfile-best-practices',
            name: 'Multi-Stage Docker Build Framework',
            description: 'A comprehensive framework for creating secure, optimized, production-ready Docker images',
            steps: [
              {
                step_number: 1,
                title: 'Choose Appropriate Base Image',
                description: 'Select the right base image for security and size',
                key_actions: [
                  'Use official images from verified publishers',
                  'Prefer Alpine Linux for smaller image sizes',
                  'Pin specific versions, avoid "latest" tag',
                  'Use minimal base images (distroless when possible)'
                ],
                examples: [
                  'node:18-alpine instead of node:latest',
                  'python:3.11-slim for Python applications',
                  'gcr.io/distroless/nodejs for minimal runtime',
                  'nginx:1.25-alpine for web servers'
                ]
              },
              {
                step_number: 2,
                title: 'Implement Multi-Stage Builds',
                description: 'Separate build and runtime stages to minimize final image size',
                key_actions: [
                  'Use build stage for compilation and dependencies',
                  'Use runtime stage with only production files',
                  'Copy only necessary artifacts between stages',
                  'Exclude development dependencies from production'
                ],
                examples: [
                  'Build stage: Install all dependencies and build app',
                  'Runtime stage: Copy only built artifacts and production deps',
                  'Result: 1GB build image → 100MB production image'
                ]
              },
              {
                step_number: 3,
                title: 'Optimize Layer Caching',
                description: 'Structure Dockerfile to maximize build cache efficiency',
                key_actions: [
                  'Copy package files before source code',
                  'Run dependency installation in separate layer',
                  'Combine commands with && to reduce layers',
                  'Order instructions from least to most frequently changing'
                ],
                examples: [
                  'COPY package*.json ./ before COPY . .',
                  'RUN npm ci in separate layer before copying code',
                  'Dependency changes trigger only necessary rebuilds'
                ]
              },
              {
                step_number: 4,
                title: 'Implement Security Best Practices',
                description: 'Harden containers against security vulnerabilities',
                key_actions: [
                  'Run as non-root user',
                  'Scan images for vulnerabilities',
                  'Remove unnecessary packages and files',
                  'Use secrets management, never hardcode credentials'
                ],
                examples: [
                  'USER node after RUN chown -R node:node /app',
                  'RUN npm audit fix to patch vulnerabilities',
                  'Use Docker secrets or environment variables',
                  'Scan with Trivy: trivy image myapp:latest'
                ]
              },
              {
                step_number: 5,
                title: 'Configure Runtime Best Practices',
                description: 'Optimize container runtime configuration',
                key_actions: [
                  'Use ENTRYPOINT for main command, CMD for arguments',
                  'Implement health checks',
                  'Set proper signal handling for graceful shutdown',
                  'Configure resource limits'
                ],
                examples: [
                  'HEALTHCHECK CMD curl -f http://localhost:3000/health',
                  'ENTRYPOINT ["node"] CMD ["server.js"]',
                  'Handle SIGTERM for graceful shutdown',
                  'Set memory limits: docker run -m 512m'
                ]
              }
            ],
            when_to_use: 'Use multi-stage builds for all production applications to minimize image size, reduce attack surface, and improve deployment speed.',
            benefits: [
              'Dramatically reduced image size (often 10x smaller)',
              'Faster deployments and startup times',
              'Smaller attack surface with fewer packages',
              'Separation of build-time and runtime dependencies',
              'Improved security with minimal runtime components'
            ],
            common_pitfalls: [
              'Including build tools in production images',
              'Not scanning images for vulnerabilities',
              'Running containers as root user',
              'Hardcoding secrets in images',
              'Using "latest" tag in production'
            ]
          },
          order_index: 2
        },
        {
          id: 'docker-compose-framework',
          type: 'text',
          title: 'Docker Compose for Local Development',
          content: `Docker Compose enables defining and running multi-container applications with a single YAML file. It's essential for local development environments that mirror production.

**Docker Compose Benefits:**

- **Environment Consistency**: Everyone runs identical development environments
- **Quick Setup**: New developers can start with \`docker-compose up\`
- **Service Orchestration**: Manage multiple services (app, database, cache, etc.)
- **Network Isolation**: Services communicate on isolated networks
- **Volume Management**: Persist data and share files between host and containers

**Sample Docker Compose Configuration:**

\`\`\`yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:password@db:5432/myapp
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      - db
      - redis
    command: npm run dev

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=myapp
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres-data:
\`\`\`

**Key Features Explained:**

- **depends_on**: Ensures db and redis start before app
- **volumes**: Mounts code directory for hot-reloading
- **/app/node_modules**: Anonymous volume prevents overwriting node_modules
- **networks**: Automatic network creation for service communication
- **Named volumes**: Persist database data across container restarts

**Common Commands:**

- \`docker-compose up -d\`: Start all services in background
- \`docker-compose down\`: Stop and remove containers
- \`docker-compose logs -f app\`: View application logs
- \`docker-compose exec app sh\`: Open shell in app container
- \`docker-compose build\`: Rebuild images after Dockerfile changes`,
          order_index: 3
        },
        {
          id: 'docker-security-case-study',
          type: 'case_study',
          title: 'Capital One Data Breach: Container Security Lessons',
          content: {
            id: 'capital-one-breach',
            title: 'How Container Misconfiguration Led to 100M Records Exposed',
            scenario: 'A container misconfiguration and excessive permissions enabled an attacker to access sensitive customer data',
            background: 'In 2019, Capital One suffered a massive data breach affecting 100 million customers. The breach was traced to a misconfigured web application firewall (WAF) running in containers.',
            challenge: 'The attacker exploited overly permissive IAM roles attached to containers, allowing them to access AWS S3 buckets containing customer data.',
            context: {
              industry: 'Financial Services',
              company_size: '50,000+ employees',
              timeline: 'March-July 2019'
            },
            analysis_points: [
              '**Excessive IAM Permissions**: Container had permissions to list all S3 buckets and read their contents',
              '**SSRF Vulnerability**: Server-Side Request Forgery allowed attacker to query AWS metadata service',
              '**Missing Network Segmentation**: Container could reach AWS metadata endpoint without restrictions',
              '**Lack of Monitoring**: Unusual access patterns were not detected or alerted',
              '**Security Scanning Gap**: Vulnerability scanning did not catch the configuration issues'
            ],
            discussion_questions: [
              'How does the principle of least privilege apply to container IAM roles?',
              'What network policies could have prevented access to the metadata endpoint?',
              'How can automated security scanning detect IAM misconfigurations?',
              'What monitoring would detect unusual S3 access patterns?'
            ],
            key_takeaways: [
              'Containers must follow the principle of least privilege',
              'IAM roles should grant only the minimum necessary permissions',
              'Network policies should restrict container egress traffic',
              'Security scanning must include configuration and permission checks',
              'Continuous monitoring is essential for detecting anomalies',
              'Regular security audits of container configurations are critical'
            ],
            related_concepts: [
              'IAM Roles and Policies',
              'Network Segmentation',
              'Security Scanning',
              'Container Security Standards'
            ]
          },
          order_index: 4
        }
      ],
      practical_applications: [
        'Create optimized Docker images for Node.js, Python, or Java applications',
        'Set up Docker Compose for local development with multiple services',
        'Implement multi-stage builds to reduce production image size by 80%+',
        'Configure container health checks and resource limits'
      ],
      additional_resources: [
        {
          title: 'Docker Best Practices Guide',
          type: 'article',
          description: 'Official Docker documentation on production best practices',
          internal: false
        },
        {
          title: 'Container Security Checklist',
          type: 'tool',
          description: 'Comprehensive security checklist for containerized applications',
          internal: false
        },
        {
          title: 'Multi-Stage Build Examples',
          type: 'template',
          description: 'Sample Dockerfiles for common application stacks',
          internal: false
        }
      ]
    },
    {
      id: 'kubernetes-orchestration',
      title: 'Kubernetes Orchestration & Management',
      type: 'interactive',
      duration_minutes: 60,
      description: 'Master Kubernetes for deploying, scaling, and managing containerized applications',
      is_required: true,
      order_index: 3,
      learning_outcomes: [
        'Understand Kubernetes architecture and core concepts',
        'Deploy applications using Kubernetes manifests',
        'Configure services, ingress, and networking',
        'Implement monitoring, logging, and observability'
      ],
      content_blocks: [
        {
          id: 'kubernetes-architecture',
          type: 'text',
          title: 'Kubernetes Architecture & Core Concepts',
          content: `Kubernetes (K8s) is a container orchestration platform that automates deployment, scaling, and management of containerized applications across clusters of machines.

**Kubernetes Architecture:**

**Control Plane Components:**
- **kube-apiserver**: The API frontend for Kubernetes
- **etcd**: Distributed key-value store for cluster data
- **kube-scheduler**: Assigns pods to nodes based on resources
- **kube-controller-manager**: Runs controller processes
- **cloud-controller-manager**: Integrates with cloud providers

**Node Components:**
- **kubelet**: Ensures containers are running in pods
- **kube-proxy**: Maintains network rules on nodes
- **Container Runtime**: Docker, containerd, or CRI-O

**Core Kubernetes Objects:**

1. **Pod**: Smallest deployable unit, contains one or more containers
2. **Deployment**: Manages replica sets and rolling updates
3. **Service**: Stable network endpoint for accessing pods
4. **ConfigMap**: Store configuration data
5. **Secret**: Store sensitive data like passwords
6. **Ingress**: HTTP/HTTPS routing to services
7. **Namespace**: Virtual clusters within a physical cluster
8. **PersistentVolume**: Storage that persists beyond pod lifecycle

**Why Kubernetes?**

- **Self-Healing**: Automatically replaces failed containers
- **Auto-Scaling**: Scales applications based on demand
- **Service Discovery**: Built-in DNS and load balancing
- **Rolling Updates**: Zero-downtime deployments
- **Resource Management**: Efficient CPU and memory allocation
- **Multi-Cloud**: Runs consistently across cloud providers

**Kubernetes Workflow:**

1. Define application in YAML manifests
2. Apply manifests: \`kubectl apply -f deployment.yaml\`
3. Kubernetes schedules pods to nodes
4. kubelet starts containers on nodes
5. Services provide stable networking
6. Ingress routes external traffic`,
          order_index: 1
        },
        {
          id: 'kubernetes-deployment-framework',
          type: 'framework',
          title: 'Production Kubernetes Deployment Framework',
          content: {
            id: 'k8s-production-deployment',
            name: 'Kubernetes Production Deployment Pattern',
            description: 'A complete framework for deploying production applications on Kubernetes with reliability and scalability',
            steps: [
              {
                step_number: 1,
                title: 'Create Deployment Configuration',
                description: 'Define how your application runs in Kubernetes',
                key_actions: [
                  'Specify container image and version',
                  'Configure replica count for high availability',
                  'Set resource requests and limits',
                  'Define health checks (liveness and readiness probes)'
                ],
                examples: [
                  'replicas: 3 for high availability',
                  'resources: requests: memory: 256Mi, cpu: 100m',
                  'livenessProbe: httpGet path /health every 10s',
                  'readinessProbe: initial delay 30s for startup'
                ]
              },
              {
                step_number: 2,
                title: 'Configure Service Discovery',
                description: 'Create Services for stable networking',
                key_actions: [
                  'Create ClusterIP Service for internal communication',
                  'Use LoadBalancer or NodePort for external access',
                  'Configure DNS-based service discovery',
                  'Set up headless services for StatefulSets'
                ],
                examples: [
                  'type: ClusterIP for internal microservices',
                  'type: LoadBalancer for public-facing services',
                  'Service name becomes DNS: myapp.default.svc.cluster.local',
                  'Headless service for database clustering'
                ]
              },
              {
                step_number: 3,
                title: 'Set Up Ingress Routing',
                description: 'Configure HTTP/HTTPS routing to services',
                key_actions: [
                  'Install Ingress controller (NGINX, Traefik)',
                  'Define Ingress rules for path-based routing',
                  'Configure TLS/SSL certificates',
                  'Set up rate limiting and authentication'
                ],
                examples: [
                  'Route /api to backend service, / to frontend',
                  'cert-manager for automatic TLS certificate management',
                  'NGINX Ingress with OAuth2 authentication',
                  'Rate limiting: 100 requests per minute per IP'
                ]
              },
              {
                step_number: 4,
                title: 'Configure Persistent Storage',
                description: 'Manage stateful data in Kubernetes',
                key_actions: [
                  'Create PersistentVolumeClaims for data storage',
                  'Use StorageClasses for dynamic provisioning',
                  'Configure backup and disaster recovery',
                  'Use StatefulSets for stateful applications'
                ],
                examples: [
                  'PVC: accessModes: ReadWriteOnce, storage: 10Gi',
                  'StorageClass: gp3 (AWS EBS) or standard-rwo (GCP)',
                  'Velero for cluster backup and migration',
                  'StatefulSet for databases, Redis, Elasticsearch'
                ]
              },
              {
                step_number: 5,
                title: 'Implement Monitoring & Observability',
                description: 'Monitor application health and performance',
                key_actions: [
                  'Deploy Prometheus for metrics collection',
                  'Configure Grafana for visualization',
                  'Set up log aggregation with ELK or Loki',
                  'Create alerts for critical issues'
                ],
                examples: [
                  'Prometheus ServiceMonitor for scraping metrics',
                  'Grafana dashboards for CPU, memory, request rate',
                  'Fluentd/Fluent Bit for log shipping to Elasticsearch',
                  'AlertManager for PagerDuty/Slack notifications'
                ]
              }
            ],
            when_to_use: 'Use Kubernetes for microservices architectures, applications requiring high availability and auto-scaling, or when deploying across multiple cloud providers.',
            benefits: [
              'Automated scaling and self-healing',
              'Zero-downtime rolling updates',
              'Multi-cloud and hybrid cloud portability',
              'Efficient resource utilization',
              'Rich ecosystem of tools and operators',
              'Industry-standard container orchestration'
            ],
            common_pitfalls: [
              'Not setting resource requests/limits (causes OOM kills)',
              'Missing health checks (unhealthy pods receive traffic)',
              'Running stateful applications without StatefulSets',
              'Not implementing proper RBAC and security policies',
              'Over-complicated configurations for simple applications'
            ]
          },
          order_index: 2
        },
        {
          id: 'kubernetes-manifest-example',
          type: 'text',
          title: 'Complete Kubernetes Deployment Example',
          content: `Here's a production-ready Kubernetes deployment with all essential components:

**Deployment:**
\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
        version: v1
    spec:
      containers:
      - name: myapp
        image: myapp:v1.2.3
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: database-credentials
              key: url
        resources:
          requests:
            memory: "256Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: myapp
  namespace: production
spec:
  selector:
    app: myapp
  ports:
  - port: 80
    targetPort: 3000
  type: ClusterIP
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp
  namespace: production
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
  - hosts:
    - myapp.example.com
    secretName: myapp-tls
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: myapp
            port:
              number: 80
\`\`\`

**Key Features:**
- **3 replicas**: High availability, survives single node failure
- **Resource limits**: Prevents one pod from starving others
- **Health checks**: Automatic restart and traffic management
- **Secret management**: Database credentials stored securely
- **TLS termination**: Automatic HTTPS with cert-manager
- **Namespace isolation**: Production environment separated`,
          order_index: 3
        },
        {
          id: 'kubernetes-case-study',
          type: 'case_study',
          title: 'Spotify\'s Kubernetes Journey: 1000+ Services',
          content: {
            id: 'spotify-kubernetes',
            title: 'How Spotify Migrated to Kubernetes at Scale',
            scenario: 'Spotify needed to modernize infrastructure to support rapid feature development across 1000+ microservices',
            background: 'Spotify ran a custom container orchestration system but faced scalability challenges and needed to adopt industry standards to attract talent and improve developer productivity.',
            challenge: 'Migrate 1000+ microservices from custom orchestration to Kubernetes without disrupting service for 400+ million users',
            context: {
              industry: 'Music Streaming',
              company_size: '6,000+ employees, 400M+ users',
              timeline: '2018-2020'
            },
            analysis_points: [
              '**Gradual Migration**: Migrated services incrementally, not all at once, to minimize risk',
              '**Developer Self-Service**: Built internal platform (Backstage) for developers to deploy to Kubernetes without deep expertise',
              '**Standardized Tooling**: Created standard Helm charts and deployment patterns reducing configuration burden',
              '**Multi-Region Deployment**: Deployed across multiple GCP regions for redundancy and low latency',
              '**Cost Optimization**: Kubernetes resource management reduced cloud costs by 30%',
              '**Observability First**: Implemented comprehensive monitoring before migration to compare performance'
            ],
            discussion_questions: [
              'Why did Spotify choose gradual migration over "big bang" approach?',
              'How does developer self-service reduce bottlenecks in large organizations?',
              'What role does standardization play in scaling Kubernetes adoption?',
              'How can observability help during cloud-native migrations?'
            ],
            key_takeaways: [
              'Incremental migration reduces risk compared to big-bang approaches',
              'Developer tooling and self-service are crucial for scaling adoption',
              'Standardization reduces cognitive load and configuration errors',
              'Observability must precede migration to measure success',
              'Kubernetes provides consistent interface across cloud providers',
              'Platform engineering teams enable developer productivity at scale'
            ],
            related_concepts: [
              'Platform Engineering',
              'Internal Developer Platforms',
              'Multi-Cloud Strategy',
              'Site Reliability Engineering'
            ]
          },
          order_index: 4
        },
        {
          id: 'kubernetes-exercise',
          type: 'interactive',
          title: 'Deploy an Application to Kubernetes',
          content: {
            id: 'k8s-deployment-lab',
            title: 'Hands-On: Deploy a Multi-Tier Application',
            type: 'skill_practice',
            instructions: `**Objective**: Deploy a complete web application with frontend, backend, and database on Kubernetes.

**Prerequisites**:
- Install kubectl and minikube (or access to a K8s cluster)
- Basic understanding of YAML syntax

**Application Architecture**:
- Frontend: React app (3 replicas)
- Backend: Node.js API (3 replicas)
- Database: PostgreSQL (1 replica with persistent storage)

**Tasks**:

1. **Create Namespace**:
\`\`\`bash
kubectl create namespace myapp
\`\`\`

2. **Deploy PostgreSQL**:
- Create PersistentVolumeClaim (10Gi storage)
- Create Secret for database credentials
- Deploy PostgreSQL StatefulSet
- Create ClusterIP Service

3. **Deploy Backend API**:
- Create Deployment with 3 replicas
- Configure environment variables (DB connection)
- Set resource requests/limits
- Add liveness and readiness probes
- Create ClusterIP Service

4. **Deploy Frontend**:
- Create Deployment with 3 replicas
- Configure API endpoint
- Add health checks
- Create ClusterIP Service
- Create Ingress for external access

5. **Verify Deployment**:
\`\`\`bash
kubectl get pods -n myapp
kubectl get services -n myapp
kubectl logs -n myapp deployment/frontend
\`\`\`

6. **Test Scaling**:
\`\`\`bash
kubectl scale deployment/backend --replicas=5 -n myapp
kubectl get pods -n myapp -w
\`\`\``,
            reflection_prompts: [
              'What happens when you delete a frontend pod? How quickly does it recover?',
              'How does Kubernetes distribute traffic across multiple backend replicas?',
              'What would happen if the database pod crashes? How is data preserved?',
              'How would you update the application to a new version with zero downtime?'
            ],
            success_criteria: [
              'All pods are running and healthy',
              'Frontend accessible via Ingress',
              'Backend successfully connects to database',
              'Application survives pod deletion (self-healing)',
              'Scaling increases replicas within 30 seconds',
              'Database data persists across pod restarts'
            ]
          },
          order_index: 5
        }
      ],
      practical_applications: [
        'Deploy a microservices application with multiple components',
        'Configure auto-scaling based on CPU and memory metrics',
        'Set up monitoring with Prometheus and Grafana',
        'Implement blue-green deployment for zero-downtime updates'
      ],
      additional_resources: [
        {
          title: 'Kubernetes Official Documentation',
          type: 'article',
          description: 'Comprehensive Kubernetes documentation and tutorials',
          internal: false
        },
        {
          title: 'Kubernetes Patterns eBook',
          type: 'article',
          description: 'Common patterns and best practices for Kubernetes',
          internal: false
        },
        {
          title: 'kubectl Cheat Sheet',
          type: 'tool',
          description: 'Essential kubectl commands reference',
          internal: false
        },
        {
          title: 'Helm Charts Repository',
          type: 'template',
          description: 'Pre-built Helm charts for common applications',
          internal: false
        }
      ]
    }
  ],
  capstone_project: {
    title: 'Build a Complete DevOps Pipeline',
    description: 'Design and implement a complete CI/CD pipeline that builds Docker images, runs tests, and deploys to Kubernetes',
    deliverables: [
      'GitHub Actions workflow with build, test, and deploy stages',
      'Optimized multi-stage Dockerfile reducing image size by 70%+',
      'Kubernetes manifests for production deployment (Deployment, Service, Ingress)',
      'Monitoring dashboard showing application metrics and health',
      'Documentation explaining pipeline stages and deployment process'
    ],
    evaluation_criteria: [
      'Pipeline successfully builds and deploys application',
      'Docker image follows security best practices (non-root user, vulnerability scanning)',
      'Kubernetes deployment is highly available (multiple replicas, health checks)',
      'Monitoring provides visibility into application performance',
      'Documentation is clear and enables others to replicate the setup',
      'Implementation demonstrates understanding of DevOps principles'
    ]
  }
};
