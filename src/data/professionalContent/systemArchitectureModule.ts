import { ProfessionalModule, CaseStudy, InteractiveExercise, Framework } from '@/types/enhancedContentTypes';

// Comprehensive System Architecture & Design Module Content
export const systemArchitectureModule: ProfessionalModule = {
  id: 'system-architecture-design',
  title: 'System Architecture & Design',
  description: 'Master the art and science of designing scalable, resilient, and maintainable software systems. Learn industry-proven patterns, architectural styles, and decision-making frameworks used by leading tech companies.',
  duration_minutes: 240,
  difficulty_level: 'advanced',
  learning_objectives: [
    'Design scalable systems that handle millions of users',
    'Apply architectural patterns to solve complex technical problems',
    'Make informed trade-offs between consistency, availability, and partition tolerance',
    'Implement microservices and distributed systems effectively',
    'Design APIs and service interfaces for maintainability',
    'Evaluate and select appropriate databases and data stores'
  ],
  prerequisites: [
    'Strong understanding of software development fundamentals',
    'Experience with web applications and APIs',
    'Basic knowledge of databases (SQL and NoSQL)',
    'Familiarity with cloud computing concepts'
  ],
  target_audience: [
    'Senior software engineers moving into architecture roles',
    'Technical leads designing system components',
    'Solutions architects working with clients',
    'Engineering managers overseeing technical decisions'
  ],
  industry_applications: [
    'E-commerce and marketplace platforms',
    'Social media and content platforms',
    'Financial services and payment systems',
    'SaaS and enterprise applications',
    'IoT and real-time systems'
  ],
  competency_level: {
    entry_level: 'Experienced developer familiar with building applications',
    target_level: 'Capable architect who can design complete system architectures',
    mastery_indicators: [
      'Designs systems that scale from 1 to 10M+ users',
      'Makes informed architectural decisions with clear trade-off analysis',
      'Documents architecture decisions effectively',
      'Guides teams in implementing architectural patterns',
      'Anticipates and mitigates technical risks'
    ]
  },
  content_sections: [
    {
      id: 'architecture-fundamentals',
      title: 'Architecture Fundamentals & Design Principles',
      type: 'article',
      duration_minutes: 45,
      description: 'Understand core architectural concepts, design principles, and the architect\'s role',
      is_required: true,
      order_index: 1,
      learning_outcomes: [
        'Understand the role and responsibilities of a software architect',
        'Apply SOLID principles and design patterns at the architectural level',
        'Evaluate quality attributes and architectural trade-offs',
        'Document architectural decisions using ADRs'
      ],
      content_blocks: [
        {
          id: 'architecture-overview',
          type: 'text',
          title: 'What is Software Architecture?',
          content: `Software architecture is the high-level structure of a software system, defining how components interact and how the system achieves its quality attributes like scalability, reliability, and maintainability.

**The Role of a Software Architect:**

A software architect bridges business requirements and technical implementation. They:
- **Design system structure**: Define major components and their interactions
- **Make technology decisions**: Select frameworks, databases, and platforms
- **Manage technical risk**: Identify and mitigate architectural risks early
- **Guide implementation**: Support development teams in realizing the architecture
- **Ensure quality attributes**: Design for scalability, security, performance, and maintainability

**Key Architectural Concerns:**

1. **Functional Requirements**: What the system must do
   - Business logic and features
   - User interactions and workflows
   - Data processing and transformations

2. **Quality Attributes (Non-Functional Requirements)**: How well the system performs
   - **Performance**: Response time, throughput, resource utilization
   - **Scalability**: Ability to handle growing load
   - **Availability**: System uptime and reliability
   - **Security**: Protection against threats and vulnerabilities
   - **Maintainability**: Ease of making changes
   - **Testability**: Ability to verify system behavior

3. **Constraints**: Limitations that shape the architecture
   - Budget and timeline constraints
   - Technology stack requirements
   - Regulatory and compliance requirements
   - Team skills and organization structure

**Architecture vs. Design:**

- **Architecture**: High-level structure, major components, and system-wide decisions
- **Design**: Detailed implementation within components

Both are important, but architecture focuses on the "big picture" decisions that are expensive to change later.`,
          order_index: 1
        },
        {
          id: 'design-principles',
          type: 'key_points',
          title: 'Core Design Principles',
          content: [
            '**Separation of Concerns**: Divide system into distinct sections, each addressing a specific concern',
            '**Single Responsibility**: Each component should have one reason to change',
            '**Open/Closed Principle**: Open for extension, closed for modification',
            '**Dependency Inversion**: Depend on abstractions, not concrete implementations',
            '**Interface Segregation**: Clients shouldn\'t depend on interfaces they don\'t use',
            '**Don\'t Repeat Yourself (DRY)**: Eliminate duplication through abstraction',
            '**Keep It Simple (KISS)**: Simplicity should be a key goal in design',
            '**You Aren\'t Gonna Need It (YAGNI)**: Don\'t add functionality until it\'s necessary'
          ],
          order_index: 2
        },
        {
          id: 'adr-framework',
          type: 'framework',
          title: 'Architecture Decision Records (ADR)',
          content: {
            id: 'adr-framework',
            name: 'Architecture Decision Record Framework',
            description: 'A lightweight documentation format for capturing important architectural decisions and their context',
            steps: [
              {
                step_number: 1,
                title: 'Context',
                description: 'Describe the circumstances and forces at play',
                key_actions: [
                  'Explain the problem or opportunity being addressed',
                  'Document relevant constraints and requirements',
                  'Identify stakeholders and their concerns',
                  'Describe the current situation and its limitations'
                ],
                examples: [
                  'We need to choose a database for our new analytics feature',
                  'Current monolithic architecture is limiting deployment frequency',
                  'API response times are degrading under increasing load'
                ]
              },
              {
                step_number: 2,
                title: 'Decision',
                description: 'State the architectural decision clearly',
                key_actions: [
                  'Make a clear, actionable decision statement',
                  'Specify what will be done and by whom',
                  'Include any decision criteria or principles applied'
                ],
                examples: [
                  'We will use PostgreSQL for the analytics feature database',
                  'We will decompose the monolith into microservices starting with the user service',
                  'We will implement caching using Redis at the API gateway level'
                ]
              },
              {
                step_number: 3,
                title: 'Consequences',
                description: 'Document the outcomes, both positive and negative',
                key_actions: [
                  'List positive consequences and benefits',
                  'Acknowledge negative consequences and trade-offs',
                  'Identify risks and mitigation strategies',
                  'Note any follow-up decisions or actions needed'
                ],
                examples: [
                  'Benefit: Strong consistency and ACID transactions',
                  'Trade-off: More complex scaling compared to NoSQL',
                  'Risk: Team needs PostgreSQL training',
                  'Follow-up: Establish database backup and recovery procedures'
                ]
              }
            ],
            when_to_use: 'Use ADRs for any architectural decision that is significant, affects multiple teams, or is difficult to reverse. Don\'t document every minor decision.',
            benefits: [
              'Creates institutional memory of architectural decisions',
              'Helps new team members understand system design',
              'Prevents repeated discussions of already-decided issues',
              'Provides context for future decision-making'
            ],
            common_pitfalls: [
              'Writing ADRs after decisions are made (write them during decision-making)',
              'Making ADRs too lengthy and formal',
              'Not updating ADRs when decisions change',
              'Documenting implementation details instead of architectural decisions'
            ]
          },
          order_index: 3
        }
      ],
      practical_applications: [
        'Create ADRs for major architectural decisions in your current project',
        'Conduct an architecture review identifying quality attributes',
        'Refactor a component to better follow SOLID principles',
        'Document the current system architecture using C4 diagrams'
      ],
      additional_resources: [
        {
          title: 'Software Architecture Patterns',
          type: 'article',
          description: 'Common architectural patterns and when to use them',
          internal: false
        },
        {
          title: 'Architecture Decision Records Repository',
          type: 'tool',
          description: 'Collection of ADR templates and examples',
          internal: false
        }
      ]
    },
    {
      id: 'scalability-patterns',
      title: 'Scalability & Performance Patterns',
      type: 'interactive',
      duration_minutes: 60,
      description: 'Learn proven patterns for building systems that scale from thousands to millions of users',
      is_required: true,
      order_index: 2,
      learning_outcomes: [
        'Design horizontally scalable systems',
        'Implement caching strategies effectively',
        'Apply load balancing and service discovery',
        'Understand database scaling techniques'
      ],
      content_blocks: [
        {
          id: 'scalability-fundamentals',
          type: 'text',
          title: 'Understanding Scalability',
          content: `Scalability is the ability of a system to handle increased load by adding resources. There are two fundamental approaches to scaling systems:

**Vertical Scaling (Scale Up)**:
Adding more power to existing machines (more CPU, RAM, disk). 

Pros:
- Simpler to implement
- No application changes needed
- Maintains data consistency easily

Cons:
- Limited by hardware constraints
- Single point of failure
- Expensive at large scale

**Horizontal Scaling (Scale Out)**:
Adding more machines to distribute the load.

Pros:
- Nearly unlimited scaling potential
- Better fault tolerance
- Cost-effective with commodity hardware

Cons:
- More complex to implement
- Requires stateless application design
- Data consistency challenges

**Modern systems typically use horizontal scaling as the primary strategy.**

**Key Scalability Patterns:**

1. **Load Balancing**: Distribute requests across multiple servers
   - Round-robin, least connections, IP hash algorithms
   - Health checks and automatic failover
   - Session persistence strategies

2. **Caching**: Store frequently accessed data in fast storage
   - Application-level caching (in-memory)
   - Distributed caching (Redis, Memcached)
   - CDN for static assets
   - Database query result caching

3. **Database Scaling**:
   - Read replicas for read-heavy workloads
   - Sharding for write scalability
   - Connection pooling
   - Database query optimization

4. **Asynchronous Processing**:
   - Message queues for background tasks
   - Event-driven architecture
   - Batch processing for heavy operations

5. **Service Decomposition**:
   - Microservices for independent scaling
   - API gateways for routing and composition
   - Service mesh for service-to-service communication`,
          order_index: 1
        },
        {
          id: 'caching-framework',
          type: 'framework',
          title: 'Comprehensive Caching Strategy Framework',
          content: {
            id: 'caching-strategy-framework',
            name: 'Multi-Layer Caching Strategy',
            description: 'A systematic approach to implementing caching at multiple layers for optimal performance',
            steps: [
              {
                step_number: 1,
                title: 'Cache Evaluation',
                description: 'Identify what to cache and where',
                key_actions: [
                  'Analyze data access patterns and frequency',
                  'Identify expensive computations or queries',
                  'Evaluate data freshness requirements',
                  'Consider cache hit rate potential'
                ],
                examples: [
                  'User profile data: High read, low write - excellent cache candidate',
                  'Real-time stock prices: Frequently changing - poor cache candidate',
                  'Product catalog: Read-heavy, infrequent updates - perfect for caching',
                  'Search results: Expensive to compute - cache with short TTL'
                ]
              },
              {
                step_number: 2,
                title: 'Cache Layer Selection',
                description: 'Choose appropriate caching layers',
                key_actions: [
                  'Browser cache for static assets',
                  'CDN for geographically distributed content',
                  'Application cache for computed results',
                  'Database cache for query results'
                ],
                examples: [
                  'CloudFront/CloudFlare for images and static files',
                  'Redis for session data and API responses',
                  'Application-level LRU cache for expensive calculations',
                  'Database query cache for frequently run queries'
                ]
              },
              {
                step_number: 3,
                title: 'Cache Invalidation Strategy',
                description: 'Ensure cache consistency with source data',
                key_actions: [
                  'Set appropriate TTL based on data volatility',
                  'Implement cache-aside pattern for lazy loading',
                  'Use write-through caching for critical data',
                  'Event-based invalidation for real-time updates'
                ],
                examples: [
                  'TTL of 5 minutes for news articles',
                  'TTL of 24 hours for user profiles',
                  'Invalidate on write for shopping cart data',
                  'Pub/sub notifications for cache invalidation'
                ]
              }
            ],
            when_to_use: 'Apply caching when you have read-heavy workloads, expensive computations, or external API calls that can tolerate some staleness.',
            benefits: [
              'Dramatically reduces latency for users',
              'Decreases load on databases and backend services',
              'Reduces costs by minimizing compute and data transfer',
              'Improves system resilience during backend issues'
            ],
            common_pitfalls: [
              'Caching data that changes too frequently',
              'Not having a clear invalidation strategy',
              'Cache stampede when many requests hit cold cache simultaneously',
              'Inconsistent data due to improper cache invalidation'
            ]
          },
          order_index: 2
        },
        {
          id: 'netflix-case-study',
          type: 'case_study',
          title: 'Netflix\'s Path to Massive Scale',
          content: {
            id: 'netflix-scalability',
            title: 'How Netflix Scaled to 200M+ Users Across 190 Countries',
            scenario: 'Netflix needed to scale their video streaming platform to handle massive global traffic while maintaining high availability and performance',
            background: 'Starting as a DVD rental service, Netflix transformed into a global streaming giant. By 2023, they serve over 200 million subscribers streaming billions of hours of content monthly across 190 countries.',
            challenge: 'Traditional monolithic architecture couldn\'t handle the scale. They needed to serve personalized content to millions of concurrent users with minimal latency and high availability, all while continuing to innovate rapidly.',
            context: {
              industry: 'Media Streaming & Entertainment',
              company_size: '200M+ subscribers, 12,000+ employees',
              timeline: '2008-Present'
            },
            analysis_points: [
              '**Microservices Architecture**: Netflix decomposed their monolith into 700+ microservices, each owned by a small team. Services handle specific functions like recommendations, billing, video encoding, and user authentication.',
              '**AWS Cloud Migration**: Moved entirely from data centers to AWS for elastic scalability. Uses multiple availability zones and regions for redundancy.',
              '**Chaos Engineering**: Created Chaos Monkey to randomly terminate production instances, forcing the system to be resilient. This evolved into Simian Army for comprehensive failure testing.',
              '**CDN and Edge Caching**: Built Open Connect, their own CDN with servers in ISP networks worldwide. Caches content close to users for optimal streaming performance.',
              '**Personalization at Scale**: Recommendation engine processes billions of events daily. Each user sees a personalized homepage generated by multiple microservices working together.',
              '**Zuul API Gateway**: Routes and filters billions of requests per day. Handles authentication, routing, and dynamic request modification.',
              '**EVCache**: Distributed caching layer built on Memcached, used across microservices to reduce latency and database load.'
            ],
            discussion_questions: [
              'How does microservices architecture enable Netflix to deploy thousands of times per day?',
              'What are the trade-offs of building a custom CDN versus using a third-party service?',
              'How does Chaos Engineering build confidence in system reliability?',
              'What organizational changes are needed to support 700+ microservices?'
            ],
            key_takeaways: [
              'Microservices enable independent scaling and rapid innovation',
              'Chaos engineering builds resilience through controlled failure injection',
              'Caching at multiple layers (CDN, application, database) is essential at scale',
              'Cloud infrastructure provides the elasticity needed for global scale',
              'Automated everything - deployment, scaling, recovery, and testing'
            ],
            related_concepts: [
              'Microservices Architecture',
              'Chaos Engineering',
              'API Gateway Pattern',
              'Content Delivery Networks',
              'Distributed Caching'
            ]
          },
          order_index: 3
        },
        {
          id: 'scalability-exercise',
          type: 'interactive',
          title: 'Design a Scalable Social Media Feed',
          content: {
            id: 'social-feed-design',
            title: 'System Design Exercise: Instagram-like Feed',
            type: 'decision_making',
            instructions: `**Scenario**: Design a social media feed system that can handle 100 million daily active users posting and viewing content.

**Requirements**:
- Users can post images and videos
- Feed shows content from users they follow
- Posts are ranked by relevance (not just chronological)
- System must handle viral content (millions of views in minutes)
- Sub-second feed load times for good user experience

**Your Task**:
Design the architecture considering:
1. How will you store and retrieve posts?
2. How will you generate personalized feeds efficiently?
3. How will you handle media storage and delivery?
4. How will you scale for read-heavy workload?
5. How will you cache feed data?`,
            scenarios: [
              {
                id: 'feed-generation',
                situation: 'How should you generate the personalized feed for each user?',
                options: [
                  {
                    text: 'Generate feed on-demand by querying posts from all followed users',
                    outcome: 'Slow and doesn\'t scale',
                    feedback: 'This approach is too slow at scale. Querying hundreds of users for each feed request creates massive database load. For a user following 500 people, you\'d need to fetch and merge 500 queries.'
                  },
                  {
                    text: 'Pre-compute feeds and store in cache (fanout-on-write)',
                    outcome: 'Fast reads, but expensive writes for popular users',
                    feedback: 'Good choice for most users! When someone posts, write to all followers\' caches. Fast reads, but problematic when a celebrity with 100M followers posts - that\'s 100M cache writes. Consider hybrid approach for popular users.'
                  },
                  {
                    text: 'Hybrid: Pre-compute for regular users, compute on-demand for celebrities',
                    outcome: 'Optimal solution',
                    feedback: 'Excellent! This is what Instagram and Twitter use. Regular users get fast pre-computed feeds. Celebrity content is fetched on-demand and merged with the pre-computed feed, avoiding expensive fanout writes.'
                  }
                ]
              },
              {
                id: 'media-storage',
                situation: 'How should you handle image and video storage and delivery?',
                options: [
                  {
                    text: 'Store all media in the application database',
                    outcome: 'Poor performance and expensive',
                    feedback: 'Databases aren\'t optimized for large binary files. This will bloat your database, slow down queries, and make backups expensive. Binary data should be stored in object storage.'
                  },
                  {
                    text: 'Object storage (S3) with CDN (CloudFront) for delivery',
                    outcome: 'Optimal solution',
                    feedback: 'Perfect! Store original media in S3 for durability and cost-effectiveness. Use CDN to cache and deliver media from edge locations close to users. Generate multiple resolutions for responsive delivery. This is industry standard.'
                  },
                  {
                    text: 'Store media on application servers\' local disk',
                    outcome: 'Not scalable or reliable',
                    feedback: 'Local storage doesn\'t scale horizontally and creates single points of failure. If a server dies, media is lost. This approach doesn\'t work for distributed systems.'
                  }
                ]
              }
            ],
            reflection_prompts: [
              'What are the trade-offs between fanout-on-write and fanout-on-read approaches?',
              'How would you handle feed ranking/sorting without killing performance?',
              'What caching strategy would you use at each layer of the system?',
              'How would you ensure high availability if a data center goes down?'
            ],
            success_criteria: [
              'Identified appropriate database for posts and relationships',
              'Designed efficient feed generation strategy',
              'Planned multi-layer caching approach',
              'Considered media storage and CDN delivery',
              'Addressed scalability for both reads and writes'
            ]
          },
          order_index: 4
        }
      ],
      practical_applications: [
        'Implement Redis caching for expensive database queries',
        'Set up load balancing across multiple application servers',
        'Design database sharding strategy for user data',
        'Create an asynchronous job queue for background processing'
      ],
      additional_resources: [
        {
          title: 'High Scalability Blog',
          type: 'article',
          description: 'Real-world architecture case studies from major tech companies',
          internal: false
        },
        {
          title: 'System Design Primer',
          type: 'article',
          description: 'Comprehensive guide to scalable system design',
          internal: false
        }
      ]
    },
    {
      id: 'distributed-systems',
      title: 'Distributed Systems & Microservices',
      type: 'framework_guide',
      duration_minutes: 75,
      description: 'Master distributed systems concepts, microservices patterns, and service communication',
      is_required: true,
      order_index: 3,
      learning_outcomes: [
        'Understand CAP theorem and its implications',
        'Design effective microservices boundaries',
        'Implement service communication patterns',
        'Handle distributed transactions and data consistency'
      ],
      content_blocks: [
        {
          id: 'cap-theorem',
          type: 'text',
          title: 'CAP Theorem and Distributed Systems Trade-offs',
          content: `The CAP theorem is fundamental to understanding distributed systems. It states that in the presence of a network partition, you must choose between consistency and availability.

**CAP Theorem Components:**

**Consistency (C)**: Every read receives the most recent write or an error. All nodes see the same data at the same time.

**Availability (A)**: Every request receives a response (success or failure), without guarantee it contains the most recent write.

**Partition Tolerance (P)**: The system continues to operate despite network failures that partition the system.

**The Reality: Choose 2 of 3**

In distributed systems, network partitions will happen (P is mandatory), so you must choose between:

**CP Systems (Consistency + Partition Tolerance)**:
- Sacrifice availability during partitions
- Examples: MongoDB, HBase, Redis
- Use when: Data consistency is critical (financial transactions, inventory)
- Behavior: Returns errors if latest data can't be guaranteed

**AP Systems (Availability + Partition Tolerance)**:
- Sacrifice consistency during partitions (eventual consistency)
- Examples: Cassandra, DynamoDB, Riak
- Use when: Availability is more important than immediate consistency
- Behavior: Always returns a response, but might be stale data

**CA Systems (Consistency + Availability)**:
- Impossible in distributed systems with partitions
- Only possible in single-node systems
- Example: Traditional single-server RDBMS

**Practical Implications:**

Most modern systems use **eventual consistency** (AP) with strategies to minimize inconsistency windows:
- Read-your-own-writes consistency
- Session consistency
- Causal consistency
- Strong consistency for critical operations only

**Example: E-commerce Shopping Cart**

*AP Approach*: Cart always available. During partition, different nodes might have slightly different cart states, but they eventually converge. Users can always add items.

*CP Approach*: Cart unavailable during partition. Guaranteed consistency but users get errors if they can't reach the master node.

Most e-commerce sites choose AP - better to show slightly stale cart than block users from shopping.`,
          order_index: 1
        },
        {
          id: 'microservices-framework',
          type: 'framework',
          title: 'Microservices Design Framework',
          content: {
            id: 'microservices-design',
            name: 'Effective Microservices Boundaries and Communication',
            description: 'A framework for decomposing monoliths and designing microservices that are loosely coupled and highly cohesive',
            steps: [
              {
                step_number: 1,
                title: 'Identify Service Boundaries',
                description: 'Define microservices based on business capabilities and bounded contexts',
                key_actions: [
                  'Map business capabilities and domains',
                  'Apply Domain-Driven Design (DDD) bounded contexts',
                  'Identify entities and aggregates that belong together',
                  'Ensure each service can be developed independently'
                ],
                examples: [
                  'User Service: Authentication, profile, preferences',
                  'Order Service: Order creation, status, history',
                  'Payment Service: Payment processing, refunds',
                  'Inventory Service: Stock management, reservations',
                  'Notification Service: Email, SMS, push notifications'
                ]
              },
              {
                step_number: 2,
                title: 'Define Service Communication Patterns',
                description: 'Choose appropriate communication strategies between services',
                key_actions: [
                  'Synchronous HTTP/REST for request-response patterns',
                  'Asynchronous messaging for events and background tasks',
                  'gRPC for high-performance service-to-service calls',
                  'GraphQL for flexible client queries across services'
                ],
                examples: [
                  'REST API for user profile queries (synchronous)',
                  'Message queue for order processing workflow (async)',
                  'Event bus for order status changes (pub/sub)',
                  'gRPC for internal service-to-service calls'
                ]
              },
              {
                step_number: 3,
                title: 'Handle Data Management',
                description: 'Each service owns its data with appropriate consistency models',
                key_actions: [
                  'Database per service pattern',
                  'Event sourcing for audit trail and state reconstruction',
                  'CQRS for read/write separation',
                  'Saga pattern for distributed transactions'
                ],
                examples: [
                  'User service has its own user database',
                  'Order service publishes events on state changes',
                  'Reporting service subscribes to events from multiple services',
                  'Saga orchestrates multi-service order fulfillment'
                ]
              },
              {
                step_number: 4,
                title: 'Implement Service Discovery and Resilience',
                description: 'Enable services to find each other and handle failures gracefully',
                key_actions: [
                  'Service registry for dynamic service discovery',
                  'Circuit breakers to prevent cascade failures',
                  'Retry policies with exponential backoff',
                  'Timeout policies for every remote call'
                ],
                examples: [
                  'Consul or Eureka for service registry',
                  'Hystrix or Resilience4j for circuit breakers',
                  'Retry 3 times with exponential backoff',
                  '5-second timeout for all HTTP calls'
                ]
              },
              {
                step_number: 5,
                title: 'Observability and Monitoring',
                description: 'Implement comprehensive monitoring across distributed services',
                key_actions: [
                  'Distributed tracing for request flows',
                  'Centralized logging with correlation IDs',
                  'Metrics and dashboards for each service',
                  'Health checks and alerting'
                ],
                examples: [
                  'Jaeger or Zipkin for distributed tracing',
                  'ELK stack for centralized logging',
                  'Prometheus and Grafana for metrics',
                  'PagerDuty for alerting on critical errors'
                ]
              }
            ],
            when_to_use: 'Use microservices when you have multiple teams, need independent deployment, different scaling requirements per service, or polyglot persistence needs.',
            benefits: [
              'Independent deployment and scaling of services',
              'Technology diversity - use best tool for each service',
              'Team autonomy and faster development cycles',
              'Better fault isolation - failures contained to services'
            ],
            common_pitfalls: [
              'Creating too many microservices (nano-services)',
              'Distributed monolith with tightly coupled services',
              'Ignoring network latency and failure modes',
              'Inadequate monitoring and debugging tools',
              'Not having a clear decomposition strategy'
            ]
          },
          order_index: 2
        },
        {
          id: 'uber-case-study',
          type: 'case_study',
          title: 'Uber\'s Microservices Evolution',
          content: {
            id: 'uber-microservices',
            title: 'Uber\'s Journey from Monolith to 2,200+ Microservices',
            scenario: 'Uber needed to scale their ride-sharing platform globally while enabling rapid feature development',
            background: 'Uber started with a monolithic architecture in 2012. As they expanded to dozens of cities and countries, the monolith became a bottleneck. By 2020, they had decomposed into over 2,200 microservices.',
            challenge: 'The monolith created deployment bottlenecks, made it hard to scale specific features independently, and caused cascade failures when any component had issues.',
            context: {
              industry: 'Transportation & Mobility',
              company_size: '100M+ users, 5M+ drivers',
              timeline: '2012-2020'
            },
            analysis_points: [
              '**Domain-Driven Decomposition**: Services organized around business domains: Rider, Driver, Trip, Payment, Mapping, Pricing, etc.',
              '**API Gateway (APIGW)**: Routes requests from mobile apps to appropriate microservices. Handles authentication, rate limiting, and request transformation.',
              '**Service Mesh**: Implemented Envoy-based service mesh for service-to-service communication, providing observability, traffic management, and security.',
              '**Event-Driven Architecture**: Kafka streams process millions of events per second for real-time features like driver location updates and pricing calculations.',
              '**Database Per Service**: Each service owns its database. Used PostgreSQL, MySQL, Cassandra, and Redis depending on service needs.',
              '**Resilience Patterns**: Implemented circuit breakers, bulkheads, and graceful degradation. If payment service is down, users can still request rides and pay later.',
              '**Observability**: Built custom tracing and monitoring tools. Every request has a trace ID tracking its journey through dozens of services.'
            ],
            discussion_questions: [
              'How does Uber handle a ride request that requires coordination across multiple services?',
              'What happens if the payment service is down when a ride completes?',
              'How do you ensure data consistency when trip data is spread across multiple services?',
              'What organizational changes were needed to support 2,200+ microservices?'
            ],
            key_takeaways: [
              'Start with a monolith, decompose when you hit scaling or team velocity issues',
              'Domain-driven design provides natural service boundaries',
              'Event-driven architecture enables loose coupling between services',
              'Resilience patterns are critical - services will fail',
              'Strong observability is non-negotiable in microservices',
              'Each service should own its data and technology choices'
            ],
            related_concepts: [
              'Domain-Driven Design',
              'API Gateway Pattern',
              'Event-Driven Architecture',
              'Circuit Breaker Pattern',
              'Service Mesh'
            ]
          },
          order_index: 3
        }
      ],
      frameworks: [
        {
          id: 'saga-pattern',
          name: 'Saga Pattern for Distributed Transactions',
          description: 'Handle transactions spanning multiple microservices without distributed transactions',
          steps: [
            {
              step_number: 1,
              title: 'Choreography vs Orchestration',
              description: 'Choose between choreography (services coordinate via events) or orchestration (central coordinator)',
              key_actions: [
                'Choreography: Services publish events, others react',
                'Orchestration: Saga orchestrator directs the flow',
                'Choose based on complexity and coupling tolerance'
              ],
              examples: [
                'Choreography: Order created → Payment processes → Inventory reserves → Shipping initiates',
                'Orchestration: Order saga coordinator calls each service in sequence'
              ]
            },
            {
              step_number: 2,
              title: 'Implement Compensation Logic',
              description: 'Define compensating transactions for rollback',
              key_actions: [
                'Each step has a corresponding compensation',
                'Compensations undo or mitigate previous steps',
                'Handle partial failures gracefully'
              ],
              examples: [
                'Payment captured → Refund payment (compensation)',
                'Inventory reserved → Release reservation (compensation)',
                'Email sent → Send cancellation email (compensation)'
              ]
            }
          ],
          when_to_use: 'Use sagas when you need to coordinate transactions across multiple services without 2PC distributed transactions',
          benefits: [
            'Avoids distributed transactions and their complexity',
            'Each service maintains autonomy',
            'Better scalability than 2PC'
          ],
          common_pitfalls: [
            'Not handling partial failures properly',
            'Compensations aren\'t truly reversible',
            'Saga becomes too complex with many steps'
          ]
        }
      ],
      practical_applications: [
        'Decompose a monolithic feature into microservices',
        'Implement a saga for a multi-step business process',
        'Set up distributed tracing for a service call chain',
        'Design an event-driven communication pattern between services'
      ],
      additional_resources: [
        {
          title: 'Microservices Patterns',
          type: 'article',
          description: 'Comprehensive catalog of microservices patterns',
          internal: false
        },
        {
          title: 'Building Microservices by Sam Newman',
          type: 'article',
          description: 'Definitive guide to microservices architecture',
          internal: false
        }
      ]
    },
    {
      id: 'architecture-assessment',
      title: 'Architecture Design Assessment',
      type: 'assessment',
      duration_minutes: 60,
      description: 'Test your understanding through system design scenarios and architecture decisions',
      is_required: true,
      order_index: 4,
      learning_outcomes: [
        'Apply architectural patterns to real-world scenarios',
        'Make informed trade-off decisions',
        'Design complete system architectures',
        'Evaluate and critique architectural approaches'
      ],
      content_blocks: [
        {
          id: 'assessment-intro',
          type: 'text',
          title: 'System Design Assessment',
          content: 'This assessment tests your ability to apply architectural concepts to realistic scenarios. You\'ll design systems, make trade-off decisions, and evaluate different architectural approaches.',
          order_index: 1
        }
      ],
      assessment_questions: [
        {
          id: 'q1',
          type: 'scenario_based',
          question: 'Design a URL shortener service (like bit.ly) that needs to handle 100M URLs and 1B redirects per month. What architecture would you propose?',
          scenario: 'Your URL shortener needs to: 1) Generate short codes for long URLs, 2) Redirect users from short URL to long URL with low latency, 3) Track click analytics, 4) Handle viral links that get millions of hits in minutes',
          evaluation_criteria: [
            'Identified need for high read-to-write ratio (1000:1)',
            'Proposed caching strategy for hot URLs',
            'Designed short code generation algorithm (base62 encoding or hash)',
            'Separated write path (URL creation) from read path (redirects)',
            'Planned for horizontal scaling of redirect service',
            'Considered analytics as asynchronous processing'
          ]
        },
        {
          id: 'q2',
          type: 'multiple_choice',
          question: 'For a real-time collaborative document editor (like Google Docs), which consistency model is most appropriate?',
          options: [
            'Strong consistency - all users always see the same content',
            'Eventual consistency - accept temporary divergence',
            'Causal consistency - preserve cause-effect relationships',
            'Read-your-writes consistency - users see their own changes immediately'
          ],
          correct_answer: 2,
          explanation: 'Causal consistency is ideal for collaborative editing. It preserves the order of related operations (if I respond to your comment, my response always appears after your comment) while allowing concurrent independent edits. Strong consistency would be too slow for real-time collaboration. Pure eventual consistency could show your response before my original comment. Operational Transformation (OT) or CRDTs implement causal consistency for collaborative editing.'
        },
        {
          id: 'q3',
          type: 'scenario_based',
          question: 'A payment processing service is timing out under load, causing failed payments. How would you diagnose and fix this issue?',
          scenario: 'Users report failed payments during peak hours. Payment service logs show timeouts when calling the external payment gateway. The service handles 1000 payments/second at peak.',
          evaluation_criteria: [
            'Identified external dependency as bottleneck',
            'Proposed circuit breaker to fail fast when gateway is slow',
            'Suggested async processing - accept payment, process later',
            'Recommended connection pooling to payment gateway',
            'Considered fallback payment methods',
            'Proposed monitoring and alerting on timeout rates',
            'Suggested bulkhead pattern to isolate payment processing'
          ]
        },
        {
          id: 'q4',
          type: 'multiple_choice',
          question: 'When should you choose a microservices architecture over a monolith?',
          options: [
            'From day one for any new project',
            'When you have multiple teams working on the same codebase',
            'Only when you have millions of users',
            'Never - monoliths are always better'
          ],
          correct_answer: 1,
          explanation: 'Choose microservices when you have multiple teams needing to work independently. Microservices enable team autonomy, independent deployment, and different scaling requirements per service. Don\'t start with microservices for a new product - begin with a monolith and decompose when you feel the pain of teams blocking each other. Scale isn\'t the primary driver - organizational complexity is.'
        },
        {
          id: 'q5',
          type: 'scenario_based',
          question: 'Design the data model and API for a social media "like" feature that needs to handle millions of likes per minute (like Twitter or Instagram).',
          scenario: 'Requirements: Users can like posts, users can see posts they\'ve liked, posts show like count, like action should feel instant, analytics team needs like data for recommendations.',
          evaluation_criteria: [
            'Proposed write-heavy database (Cassandra, DynamoDB)',
            'Separated like count from individual like records',
            'Used counter for like count with eventual consistency',
            'Proposed caching for "user liked this post" checks',
            'Suggested asynchronous analytics pipeline',
            'Considered race conditions in like count updates',
            'Designed for idempotency (double-like doesn\'t double-count)'
          ]
        }
      ],
      practical_applications: [
        'Practice system design interviews using these scenarios',
        'Conduct architecture reviews using these evaluation criteria',
        'Present design proposals to technical teams',
        'Create design documents with trade-off analysis'
      ],
      additional_resources: [
        {
          title: 'System Design Interview Guide',
          type: 'article',
          description: 'Structured approach to system design interviews',
          internal: false
        },
        {
          title: 'Designing Data-Intensive Applications',
          type: 'article',
          description: 'Comprehensive book on modern system architecture',
          internal: false
        }
      ]
    }
  ],
  capstone_project: {
    title: 'Design a Complete System Architecture',
    description: 'Design a comprehensive architecture for a real-world application of your choice',
    deliverables: [
      'High-level architecture diagram showing all major components',
      'Database schema design with explanation of choices',
      'API design document with key endpoints',
      'Architecture Decision Records (ADRs) for 5 major decisions',
      'Scalability plan covering 10x and 100x growth',
      'Failure mode analysis and mitigation strategies'
    ],
    evaluation_criteria: [
      'Architecture addresses all functional requirements',
      'Quality attributes (scalability, availability, security) are explicitly considered',
      'Technology choices are justified with trade-off analysis',
      'Design scales appropriately for stated requirements',
      'Failure scenarios are identified and mitigated',
      'Documentation is clear and comprehensive'
    ]
  }
};
