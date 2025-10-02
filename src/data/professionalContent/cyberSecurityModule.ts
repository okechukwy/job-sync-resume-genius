import { ProfessionalModule } from '@/types/enhancedContentTypes';

export const cyberSecurityModule: ProfessionalModule = {
  id: 'cybersecurity-excellence',
  title: 'Cybersecurity Excellence Program',
  description: 'Master modern cybersecurity frameworks, threat detection, incident response, and security architecture through comprehensive professional training.',
  duration_minutes: 6000, // 10 weeks * 10 hours/week * 60 min
  difficulty_level: 'intermediate',
  learning_objectives: [
    'Apply industry-standard security frameworks (NIST CSF 2.0, MITRE ATT&CK, Zero Trust)',
    'Design and implement secure architectures using Zero Trust principles',
    'Conduct threat intelligence analysis and security monitoring',
    'Develop and execute comprehensive incident response plans',
    'Implement risk management and compliance frameworks',
    'Prepare for industry certifications (Security+, CISSP, CEH)'
  ],
  prerequisites: [
    'Basic networking knowledge (TCP/IP, DNS, HTTP/HTTPS)',
    'Understanding of operating systems (Windows, Linux)',
    'System administration experience',
    'Familiarity with IT infrastructure concepts'
  ],
  target_audience: [
    'IT professionals transitioning to security roles',
    'Software developers implementing security practices',
    'System administrators enhancing security skills',
    'Security analysts advancing their careers',
    'DevOps engineers adopting DevSecOps'
  ],
  industry_applications: [
    'Enterprise security operations centers (SOC)',
    'Cloud security and infrastructure protection',
    'Application security and DevSecOps',
    'Compliance and risk management',
    'Incident response and digital forensics',
    'Security architecture and engineering'
  ],
  competency_level: {
    entry_level: 'Basic IT and networking knowledge with interest in security',
    target_level: 'Proficient security professional capable of independent security operations',
    mastery_indicators: [
      'Successfully design and implement Zero Trust architectures',
      'Lead incident response and recovery operations',
      'Conduct comprehensive security assessments and risk analysis',
      'Develop security strategies aligned with business objectives',
      'Pass industry certification exams (Security+, CISSP, CEH)'
    ]
  },
  content_sections: [
    {
      id: 'security-foundations',
      title: 'Security Foundations & Risk Management',
      type: 'article',
      duration_minutes: 900, // 2.5 weeks
      description: 'Master fundamental security principles, risk management methodologies, and compliance frameworks essential for modern cybersecurity.',
      is_required: true,
      order_index: 1,
      learning_outcomes: [
        'Apply the CIA Triad and defense-in-depth principles',
        'Conduct comprehensive risk assessments using NIST framework',
        'Implement security governance and policy frameworks',
        'Understand compliance requirements (GDPR, HIPAA, SOC 2, ISO 27001)',
        'Design security controls aligned with business risk tolerance'
      ],
      content_blocks: [
        {
          id: 'cia-triad',
          type: 'text',
          title: 'The CIA Triad and Core Security Principles',
          content: `The foundation of cybersecurity rests on three fundamental pillars: Confidentiality, Integrity, and Availability (CIA Triad). These principles guide every security decision and implementation.

**Confidentiality** ensures that sensitive information is accessible only to authorized individuals. This involves encryption, access controls, and data classification. Modern threats like data breaches at Target (2013) and Equifax (2017) demonstrate the catastrophic impact of confidentiality failures.

**Integrity** maintains the accuracy and trustworthiness of data throughout its lifecycle. Hash functions, digital signatures, and version control ensure data hasn't been tampered with. The SolarWinds attack (2020) compromised integrity by injecting malicious code into trusted software updates.

**Availability** guarantees that systems and data are accessible when needed. Redundancy, disaster recovery, and DDoS protection maintain availability. The Colonial Pipeline ransomware attack (2021) showed how availability disruption can impact critical infrastructure.

Beyond the CIA Triad, modern security incorporates additional principles:
- **Authentication** - Verifying user identity through multi-factor authentication (MFA)
- **Authorization** - Granting appropriate access levels (least privilege principle)
- **Non-repudiation** - Ensuring actions can be traced to individuals
- **Privacy** - Protecting personal information per regulations like GDPR and CCPA`,
          order_index: 1
        },
        {
          id: 'nist-framework',
          type: 'framework',
          title: 'NIST Cybersecurity Framework 2.0',
          content: {
            id: 'nist-csf-2',
            name: 'NIST Cybersecurity Framework 2.0',
            description: 'The National Institute of Standards and Technology (NIST) Cybersecurity Framework provides a comprehensive approach to managing cybersecurity risk. Updated in 2024, version 2.0 adds Govern as a core function and emphasizes supply chain security.',
            steps: [
              {
                step_number: 1,
                title: 'Govern (New in 2.0)',
                description: 'Establish organizational context, risk management strategy, roles, responsibilities, and policies that inform cybersecurity decisions.',
                key_actions: [
                  'Define cybersecurity governance structure and reporting lines',
                  'Establish risk management strategy and risk tolerance levels',
                  'Assign cybersecurity roles and responsibilities across the organization',
                  'Create security policies aligned with business objectives',
                  'Implement supply chain risk management program'
                ],
                examples: [
                  'Creating a Security Steering Committee with C-suite representation',
                  'Developing a Risk Appetite Statement approved by the Board',
                  'Assigning a Chief Information Security Officer (CISO) role',
                  'Establishing vendor security assessment procedures'
                ]
              },
              {
                step_number: 2,
                title: 'Identify',
                description: 'Develop understanding of systems, assets, data, and capabilities to manage cybersecurity risk.',
                key_actions: [
                  'Inventory all hardware, software, and data assets',
                  'Map data flows and identify sensitive information',
                  'Assess business criticality of systems and processes',
                  'Identify threats, vulnerabilities, and potential impact',
                  'Document supply chain dependencies and third-party risks'
                ],
                examples: [
                  'Using asset management tools like ServiceNow or Axonius',
                  'Creating data classification policies (Public, Internal, Confidential, Restricted)',
                  'Conducting Business Impact Analysis (BIA) for critical systems',
                  'Maintaining a Software Bill of Materials (SBOM) for applications'
                ]
              },
              {
                step_number: 3,
                title: 'Protect',
                description: 'Implement safeguards to ensure delivery of critical services and limit cybersecurity impact.',
                key_actions: [
                  'Implement access control and identity management',
                  'Deploy security awareness training programs',
                  'Encrypt data at rest and in transit',
                  'Implement secure configuration management',
                  'Deploy endpoint protection and network security controls'
                ],
                examples: [
                  'Deploying multi-factor authentication (MFA) organization-wide',
                  'Conducting quarterly phishing simulation exercises',
                  'Using TLS 1.3 for all web traffic and AES-256 for storage',
                  'Implementing CIS Benchmarks for system hardening',
                  'Deploying EDR solutions like CrowdStrike or Microsoft Defender'
                ]
              },
              {
                step_number: 4,
                title: 'Detect',
                description: 'Develop and implement activities to identify cybersecurity events in a timely manner.',
                key_actions: [
                  'Deploy security monitoring and logging infrastructure',
                  'Implement SIEM for centralized log analysis',
                  'Configure security alerts and anomaly detection',
                  'Conduct vulnerability scanning and assessments',
                  'Perform threat hunting and intelligence gathering'
                ],
                examples: [
                  'Implementing Splunk, Elastic SIEM, or Microsoft Sentinel',
                  'Creating detection rules based on MITRE ATT&CK framework',
                  'Running weekly vulnerability scans with Tenable or Qualys',
                  'Establishing a Security Operations Center (SOC) with 24/7 monitoring',
                  'Using threat intelligence feeds from CISA, FBI, or commercial providers'
                ]
              },
              {
                step_number: 5,
                title: 'Respond',
                description: 'Take action when a cybersecurity incident is detected to contain and mitigate impact.',
                key_actions: [
                  'Develop and maintain incident response plans',
                  'Establish incident response team with defined roles',
                  'Implement incident tracking and case management',
                  'Coordinate with internal teams and external stakeholders',
                  'Analyze incidents and improve response procedures'
                ],
                examples: [
                  'Creating playbooks for ransomware, data breach, and DDoS scenarios',
                  'Establishing Computer Security Incident Response Team (CSIRT)',
                  'Using ServiceNow Security Operations or Jira for incident tracking',
                  'Conducting tabletop exercises quarterly',
                  'Maintaining relationships with law enforcement and external forensics firms'
                ]
              },
              {
                step_number: 6,
                title: 'Recover',
                description: 'Maintain resilience plans and restore capabilities impaired during cybersecurity incidents.',
                key_actions: [
                  'Develop business continuity and disaster recovery plans',
                  'Implement backup and recovery procedures',
                  'Conduct regular recovery testing and exercises',
                  'Coordinate restoration activities with stakeholders',
                  'Document lessons learned and improve recovery processes'
                ],
                examples: [
                  'Implementing 3-2-1 backup strategy (3 copies, 2 different media, 1 offsite)',
                  'Testing disaster recovery annually with full failover exercises',
                  'Maintaining Recovery Time Objective (RTO) and Recovery Point Objective (RPO) metrics',
                  'Using immutable backups to protect against ransomware',
                  'Conducting post-incident reviews within 30 days of major incidents'
                ]
              }
            ],
            when_to_use: 'Use NIST CSF 2.0 as a comprehensive framework for building and improving your organization\'s cybersecurity posture. It\'s particularly valuable for communicating security strategies to executives, aligning security with business objectives, and demonstrating compliance.',
            benefits: [
              'Industry-standard framework recognized globally',
              'Flexible and adaptable to organizations of any size',
              'Emphasizes risk-based decision making',
              'Facilitates communication between technical and business stakeholders',
              'Helps demonstrate compliance with regulatory requirements',
              'Supports supply chain risk management (critical in 2025)'
            ],
            common_pitfalls: [
              'Treating it as a checklist rather than a continuous risk management process',
              'Implementing without executive buy-in and adequate resources',
              'Ignoring the Govern function (new in 2.0) which provides strategic direction',
              'Failing to tailor the framework to specific organizational context',
              'Not integrating with existing risk management and compliance programs',
              'Underestimating the importance of supply chain security'
            ]
          },
          order_index: 2
        },
        {
          id: 'target-breach-case-study',
          type: 'case_study',
          title: 'Target 2013 Data Breach: Supply Chain Security Lessons',
          content: {
            id: 'target-breach-2013',
            title: 'Target 2013 Data Breach: The $200M Supply Chain Security Failure',
            scenario: 'In December 2013, Target Corporation suffered one of the largest retail data breaches in history, compromising 40 million credit card numbers and 70 million customer records during the peak holiday shopping season.',
            background: `Target was one of the largest retailers in the United States with sophisticated cybersecurity systems including:
- FireEye malware detection system
- Security Operations Center with monitoring capabilities
- Intrusion detection systems
- Security team and incident response procedures

Despite these investments, attackers successfully infiltrated Target's network through a third-party HVAC contractor, Fazio Mechanical Services. The breach went undetected for weeks despite security alerts, resulting in massive financial and reputational damage.

The attack demonstrated critical vulnerabilities in supply chain security and the challenges of managing third-party risk in complex enterprise environments.`,
            challenge: `**The Attack Chain:**
1. **Initial Compromise** - Attackers used stolen credentials from Fazio Mechanical, a small HVAC contractor with network access to Target's systems for energy management and billing
2. **Lateral Movement** - Once inside Target's network, attackers moved laterally from the contractor portal to Target's internal networks
3. **Malware Deployment** - Attackers installed custom point-of-sale (POS) malware called "BlackPOS" on Target's payment terminals
4. **Data Exfiltration** - Malware scraped credit card data from memory during transactions and sent it to attacker-controlled servers

**Critical Failures:**
- Inadequate network segmentation between contractor access and sensitive systems
- Weak third-party security requirements and monitoring
- Ignored security alerts from FireEye malware detection system
- Insufficient security awareness at Fazio Mechanical (phishing victim)
- Delayed incident response despite detection capabilities`,
            context: {
              industry: 'Retail / Payment Card Industry',
              company_size: 'Large enterprise (1,800+ stores, $73 billion annual revenue)',
              timeline: 'Attack began November 27, 2013; discovered December 13, 2013; publicly disclosed December 19, 2013'
            },
            analysis_points: [
              '**Supply Chain Vulnerability**: The weakest link in security is often third-party vendors with access to systems. Fazio Mechanical, a small contractor, became the entry point for a sophisticated attack on a major retailer.',
              '**Network Segmentation Failure**: Target\'s network architecture allowed lateral movement from contractor portals to critical payment systems. Proper segmentation with strict access controls could have contained the breach.',
              '**Alert Fatigue and Process Breakdown**: FireEye systems detected the malware and alerted Target\'s security team in Bangalore, but the alerts were not acted upon. The security team lacked clear escalation procedures and authority to take protective action.',
              '**Third-Party Risk Management**: Target\'s vendor assessment processes failed to ensure Fazio Mechanical maintained adequate security controls, including basic security awareness training to prevent phishing attacks.',
              '**Incident Response Delays**: Despite having security tools and a SOC, Target\'s response was slow. The breach continued for weeks after initial detection, and the company learned about the breach from the U.S. Department of Justice rather than through internal detection.',
              '**Financial and Reputational Impact**: Total costs exceeded $200 million including settlements, legal fees, and remediation. Target\'s CEO resigned, and customer trust was significantly damaged during the critical holiday shopping period.'
            ],
            discussion_questions: [
              'How should organizations balance operational convenience (contractor access) with security requirements? What are practical approaches to network segmentation?',
              'What security requirements should be mandated for third-party vendors? How do you enforce these requirements for small vendors with limited security resources?',
              'How can organizations overcome alert fatigue and ensure critical security alerts receive appropriate attention and action?',
              'What role did organizational culture and communication play in the breach? How could Target have empowered their security team to take decisive action?',
              'If you were Target\'s CISO after the breach, what would be your top 5 priorities for preventing similar incidents?',
              'How has supply chain security evolved since 2013? What frameworks and tools are now available to address these risks?'
            ],
            key_takeaways: [
              'Implement Zero Trust architecture with strict network segmentation and least privilege access',
              'Establish comprehensive third-party risk management program with security assessments, contractual requirements, and continuous monitoring',
              'Create clear incident response procedures with escalation paths and authority to take protective action',
              'Design security systems to reduce alert fatigue through automation, prioritization, and integration',
              'Conduct regular security audits of vendor access and privileged accounts',
              'Implement defense-in-depth with multiple layers of security controls',
              'Maintain current software bill of materials (SBOM) for supply chain visibility',
              'Consider cyber insurance and incident response retainers with external firms'
            ],
            related_concepts: [
              'Supply Chain Risk Management (SCRM)',
              'Third-Party Risk Management (TPRM)',
              'Network Segmentation and Micro-segmentation',
              'Zero Trust Architecture',
              'MITRE ATT&CK - Initial Access and Lateral Movement',
              'PCI-DSS Compliance',
              'Security Operations Center (SOC) Operations',
              'Incident Response and Crisis Management'
            ]
          },
          order_index: 3
        },
        {
          id: 'risk-assessment',
          type: 'key_points',
          title: 'Risk Assessment Methodologies',
          content: [
            '**Quantitative Risk Assessment** - Uses numerical values to calculate risk. Annual Loss Expectancy (ALE) = Single Loss Expectancy (SLE) × Annual Rate of Occurrence (ARO). Provides concrete numbers for cost-benefit analysis of security investments.',
            '**Qualitative Risk Assessment** - Uses descriptive scales (High/Medium/Low) to evaluate risks. Faster and easier to conduct but less precise. Useful when historical data is unavailable.',
            '**NIST Risk Management Framework (RMF)** - 7-step process: Prepare, Categorize, Select, Implement, Assess, Authorize, Monitor. Used extensively in government and critical infrastructure.',
            '**ISO 27005 Risk Management** - International standard providing guidelines for information security risk management. Emphasizes continuous risk assessment and treatment.',
            '**FAIR (Factor Analysis of Information Risk)** - Provides quantitative risk model for cyber risk. Breaks risk into Loss Event Frequency and Loss Magnitude for detailed financial analysis.',
            '**Risk Treatment Options** - Accept (acknowledge and document), Avoid (eliminate the activity), Transfer (insurance or outsourcing), Mitigate (implement controls to reduce impact or likelihood).',
            '**Risk Register** - Central document tracking identified risks, likelihood, impact, owner, treatment plan, and status. Critical for risk management governance and reporting.'
          ],
          order_index: 4
        },
        {
          id: 'compliance-frameworks',
          type: 'text',
          title: 'Compliance and Regulatory Frameworks',
          content: `Modern organizations must navigate a complex landscape of regulatory requirements and industry standards. Understanding these frameworks is essential for cybersecurity professionals.

**GDPR (General Data Protection Regulation)**
The European Union's comprehensive data protection law affects any organization processing EU residents' data. Key requirements include:
- Data protection by design and by default
- Right to erasure ("right to be forgotten")
- Data breach notification within 72 hours
- Appointment of Data Protection Officer (DPO) for certain organizations
- Fines up to €20 million or 4% of global annual turnover

**HIPAA (Health Insurance Portability and Accountability Act)**
U.S. regulation protecting patient health information (PHI):
- Administrative, physical, and technical safeguards required
- Encryption of PHI in transit and at rest
- Business Associate Agreements (BAA) for third parties
- Regular security risk assessments mandated
- Breach notification requirements

**PCI-DSS (Payment Card Industry Data Security Standard)**
Required for organizations handling credit card data:
- 12 requirements organized into 6 control objectives
- Network segmentation of cardholder data environment (CDE)
- Quarterly vulnerability scans and annual penetration testing
- Levels 1-4 based on transaction volume with varying compliance requirements
- Failure to comply can result in loss of ability to process card payments

**SOC 2 (Service Organization Control 2)**
Trust Services Criteria for service providers:
- Type I: Controls designed appropriately at a point in time
- Type II: Controls operating effectively over a period (typically 12 months)
- Five Trust Services Criteria: Security, Availability, Processing Integrity, Confidentiality, Privacy
- Essential for SaaS providers and cloud service companies

**ISO 27001/27002**
International standard for Information Security Management Systems (ISMS):
- 114 controls across 14 domains in ISO 27002
- Requires risk assessment and treatment process
- Certification demonstrates commitment to security
- Widely recognized globally, particularly in Europe and Asia`,
          order_index: 5
        },
        {
          id: 'risk-assessment-exercise',
          type: 'interactive',
          title: 'Risk Assessment Workshop',
          content: {
            id: 'risk-workshop',
            title: 'Practical Risk Assessment Exercise',
            type: 'decision_making',
            instructions: 'You are the newly appointed Security Manager for MedTech Solutions, a healthcare technology company processing sensitive patient data. Conduct a risk assessment and make treatment decisions for the identified risks.',
            scenarios: [
              {
                id: 'scenario-1',
                situation: 'Your development team is using a third-party library (Apache Log4j) in your patient portal application. The recent Log4Shell vulnerability (CVE-2021-44228) has a CVSS score of 10.0 (Critical) and allows remote code execution. Your system is internet-facing and processes Protected Health Information (PHI).',
                options: [
                  {
                    text: 'Accept the risk and continue operations while monitoring for attacks',
                    outcome: 'High likelihood of exploitation. Potential HIPAA violation and massive breach.',
                    feedback: '❌ Unacceptable. Critical vulnerabilities in systems with PHI require immediate action. This violates HIPAA Security Rule requirements for timely security updates.'
                  },
                  {
                    text: 'Immediately take the system offline until the vulnerability is patched',
                    outcome: 'System unavailable for 48 hours during patching and testing. Clinical operations disrupted.',
                    feedback: '⚠️ Overly aggressive. While security is critical, availability is also important for patient care. Consider a balanced approach with compensating controls during patching.'
                  },
                  {
                    text: 'Implement emergency patching with rollback plan, deploy WAF rules to block exploit attempts, and conduct security scans to detect any prior compromise',
                    outcome: 'Vulnerability patched within 24 hours with minimal downtime. Compensating controls provide defense during patching.',
                    feedback: '✅ Excellent. This demonstrates a comprehensive response: immediate mitigation (WAF rules), remediation (patching), and detection (security scans). Balances security and availability.'
                  },
                  {
                    text: 'Transfer the risk by purchasing cyber insurance',
                    outcome: 'Insurance doesn\'t prevent the breach, only helps with financial recovery.',
                    feedback: '❌ Insurance transfers financial risk, not the vulnerability. You still have a duty to protect PHI and cannot transfer compliance obligations.'
                  }
                ]
              },
              {
                id: 'scenario-2',
                situation: 'A third-party medical device vendor needs VPN access to your network for remote support and maintenance. They have not provided any security documentation and use a shared account for all their technicians.',
                options: [
                  {
                    text: 'Grant VPN access as requested to maintain good vendor relationship',
                    outcome: 'High supply chain risk similar to Target breach scenario.',
                    feedback: '❌ This violates basic security principles and likely violates your HIPAA Business Associate Agreement requirements. Shared accounts eliminate accountability.'
                  },
                  {
                    text: 'Require vendor to complete security assessment, provide individual accounts with MFA, limit access to specific devices using network segmentation, and monitor all vendor activity',
                    outcome: 'Vendor access properly secured with visibility and accountability.',
                    feedback: '✅ Excellent. This implements proper third-party risk management with verification, least privilege, and monitoring. Aligns with NIST CSF Govern function.'
                  },
                  {
                    text: 'Deny all vendor remote access and require onsite visits only',
                    outcome: 'Higher costs and slower response times for critical medical equipment issues.',
                    feedback: '⚠️ While secure, this is impractical for modern operations. A risk-based approach with proper controls is better than complete avoidance.'
                  },
                  {
                    text: 'Outsource all vendor management to IT department',
                    outcome: 'Risk responsibility transferred but not the actual risk.',
                    feedback: '❌ Transferring responsibility internally doesn\'t address the security concerns. You still need proper vendor security requirements and oversight.'
                  }
                ]
              }
            ],
            reflection_prompts: [
              'How did you prioritize risks based on likelihood and impact? What factors influenced your decisions?',
              'What role does regulatory compliance play in risk treatment decisions?',
              'How do you balance security, availability, and operational efficiency in healthcare environments?',
              'What additional information would you need to make fully informed risk treatment decisions?',
              'How would you communicate these risks and decisions to executive leadership and the board?'
            ],
            success_criteria: [
              'Demonstrated understanding of risk assessment principles (likelihood × impact)',
              'Applied appropriate risk treatment strategies (avoid, accept, transfer, mitigate)',
              'Considered regulatory compliance requirements (HIPAA, HITECH)',
              'Balanced security requirements with business and operational needs',
              'Recognized supply chain security risks and third-party risk management needs'
            ]
          },
          order_index: 6
        }
      ],
      practical_applications: [
        'Conduct risk assessments for new projects and systems',
        'Develop security policies and procedures aligned with NIST CSF',
        'Perform vendor security assessments and manage third-party risk',
        'Create security awareness training programs',
        'Implement compliance programs for GDPR, HIPAA, or PCI-DSS',
        'Build security governance structure and reporting'
      ],
      additional_resources: [
        {
          title: 'NIST Cybersecurity Framework 2.0',
          type: 'article',
          description: 'Official NIST CSF 2.0 documentation and implementation guidance',
          internal: false
        },
        {
          title: 'ISO 27001 Implementation Guide',
          type: 'article',
          description: 'Comprehensive guide to implementing ISO 27001 ISMS',
          internal: false
        },
        {
          title: 'CIS Controls v8',
          type: 'tool',
          description: 'Center for Internet Security critical security controls',
          internal: false
        },
        {
          title: 'Risk Assessment Template',
          type: 'template',
          description: 'Downloadable risk assessment template with scoring matrix',
          internal: true
        }
      ]
    },
    {
      id: 'threat-intelligence',
      title: 'Threat Intelligence & Detection',
      type: 'article',
      duration_minutes: 900,
      description: 'Master threat intelligence gathering, analysis, and detection using industry-standard frameworks like MITRE ATT&CK and modern SIEM technologies.',
      is_required: true,
      order_index: 2,
      learning_outcomes: [
        'Apply MITRE ATT&CK framework for threat modeling and detection',
        'Implement and tune SIEM solutions for security monitoring',
        'Conduct threat hunting operations to find hidden threats',
        'Analyze threat intelligence from multiple sources',
        'Deploy and manage intrusion detection/prevention systems',
        'Understand AI-powered threat detection and response'
      ],
      content_blocks: [
        {
          id: 'mitre-attack',
          type: 'framework',
          title: 'MITRE ATT&CK Framework',
          content: {
            id: 'mitre-attack-framework',
            name: 'MITRE ATT&CK Framework',
            description: 'MITRE ATT&CK (Adversarial Tactics, Techniques, and Common Knowledge) is a globally-accessible knowledge base of adversary tactics and techniques based on real-world observations. It has become the de facto standard for understanding and defending against cyber threats.',
            steps: [
              {
                step_number: 1,
                title: 'Reconnaissance',
                description: 'Adversaries gather information to plan future operations, including details about the target organization, infrastructure, and personnel.',
                key_actions: [
                  'Monitor for suspicious information gathering attempts',
                  'Limit public exposure of organizational information',
                  'Implement deception technologies (honeypots, honey tokens)',
                  'Analyze logs for reconnaissance patterns (port scans, DNS queries)'
                ],
                examples: [
                  'Active scanning of IP ranges and open ports (T1595)',
                  'Phishing for information to identify targets (T1598)',
                  'Gathering victim organization information from public sources (T1591)',
                  'Searching open technical databases like Shodan or Censys (T1596)'
                ]
              },
              {
                step_number: 2,
                title: 'Initial Access',
                description: 'Techniques adversaries use to gain initial foothold in the target network, often through user interaction or exploiting vulnerabilities.',
                key_actions: [
                  'Deploy email security and anti-phishing solutions',
                  'Implement MFA on all external-facing services',
                  'Conduct vulnerability management and patching programs',
                  'Deploy web application firewalls (WAF)',
                  'Monitor for authentication attempts and anomalies'
                ],
                examples: [
                  'Phishing emails with malicious attachments or links (T1566)',
                  'Exploiting public-facing applications like VPN or web servers (T1190)',
                  'Valid credentials obtained through password spraying or breach databases (T1078)',
                  'Supply chain compromise through trusted software updates (T1195)'
                ]
              },
              {
                step_number: 3,
                title: 'Execution',
                description: 'Techniques that result in adversary-controlled code running on local or remote systems.',
                key_actions: [
                  'Implement application whitelisting (allow-listing)',
                  'Use PowerShell logging and script block logging',
                  'Deploy endpoint detection and response (EDR) solutions',
                  'Restrict execution of scripts and macros',
                  'Monitor for unusual process execution patterns'
                ],
                examples: [
                  'PowerShell and command-line scripting (T1059)',
                  'Windows Management Instrumentation (WMI) execution (T1047)',
                  'Scheduled tasks for code execution (T1053)',
                  'User execution through social engineering (T1204)'
                ]
              },
              {
                step_number: 4,
                title: 'Persistence',
                description: 'Techniques adversaries use to maintain access to systems across restarts, credential changes, and other interruptions.',
                key_actions: [
                  'Monitor Registry keys and startup folder modifications',
                  'Audit scheduled tasks and services regularly',
                  'Review account creation and privilege modifications',
                  'Implement file integrity monitoring (FIM)',
                  'Conduct regular security baseline audits'
                ],
                examples: [
                  'Creating or modifying Windows services (T1543)',
                  'Registry Run Keys for auto-start execution (T1547)',
                  'Scheduled tasks for persistence (T1053)',
                  'Creating new accounts with administrative privileges (T1136)',
                  'Web shells on compromised web servers (T1505)'
                ]
              },
              {
                step_number: 5,
                title: 'Defense Evasion',
                description: 'Techniques adversaries use to avoid detection throughout their operation, including disabling security tools and obfuscating malware.',
                key_actions: [
                  'Implement tamper protection on security tools',
                  'Monitor for security tool disablement attempts',
                  'Use behavioral detection rather than signature-based only',
                  'Deploy deception technologies to detect evasion attempts',
                  'Maintain detailed logs and protect log integrity'
                ],
                examples: [
                  'Disabling or modifying security tools and logs (T1562)',
                  'Obfuscating files or information to hide content (T1027)',
                  'Using valid accounts to blend in with normal activity (T1078)',
                  'Masquerading as legitimate files or processes (T1036)',
                  'Clearing Windows Event Logs to cover tracks (T1070)'
                ]
              },
              {
                step_number: 6,
                title: 'Credential Access',
                description: 'Techniques for stealing credentials like usernames, passwords, and authentication tokens.',
                key_actions: [
                  'Implement credential guard and protected mode on Windows',
                  'Use password managers and enforce strong password policies',
                  'Deploy privileged access management (PAM) solutions',
                  'Monitor for credential dumping tools (Mimikatz)',
                  'Implement MFA everywhere, especially for privileged accounts'
                ],
                examples: [
                  'Dumping credentials from LSASS memory (Mimikatz) (T1003)',
                  'Brute force attacks against accounts (T1110)',
                  'Keylogging to capture credentials (T1056)',
                  'Stealing credentials from password stores and browsers (T1555)',
                  'Network sniffing to capture credentials in transit (T1040)'
                ]
              },
              {
                step_number: 7,
                title: 'Discovery',
                description: 'Techniques adversaries use to gain knowledge about the system and internal network after gaining access.',
                key_actions: [
                  'Implement network segmentation to limit lateral exploration',
                  'Monitor for unusual network and system enumeration',
                  'Deploy deception assets to detect discovery activities',
                  'Analyze patterns of system and network queries',
                  'Restrict access to network mapping tools'
                ],
                examples: [
                  'Network service scanning and enumeration (T1046)',
                  'System and network configuration discovery (T1082, T1016)',
                  'Account and permission discovery (T1087, T1069)',
                  'Remote system discovery (T1018)',
                  'Software and application discovery (T1518)'
                ]
              },
              {
                step_number: 8,
                title: 'Lateral Movement',
                description: 'Techniques adversaries use to move through the network, pivoting between systems to reach their objectives.',
                key_actions: [
                  'Implement network segmentation and Zero Trust architecture',
                  'Use privileged access workstations (PAWs) for admin tasks',
                  'Monitor for unusual remote access and authentication patterns',
                  'Disable unnecessary protocols (SMB, RDP where not needed)',
                  'Implement just-in-time (JIT) privileged access'
                ],
                examples: [
                  'Remote Desktop Protocol (RDP) to access other systems (T1021.001)',
                  'Windows Admin Shares for lateral movement (T1021.002)',
                  'Pass-the-Hash attacks using stolen credentials (T1550)',
                  'Remote services exploitation (T1210)',
                  'SSH for lateral movement in Linux environments (T1021.004)'
                ]
              },
              {
                step_number: 9,
                title: 'Collection',
                description: 'Techniques adversaries use to gather information and data that is relevant to their objectives.',
                key_actions: [
                  'Implement Data Loss Prevention (DLP) solutions',
                  'Monitor for large data transfers and compression activities',
                  'Use file activity monitoring and classification',
                  'Detect screen capture and clipboard monitoring tools',
                  'Implement USB and removable media controls'
                ],
                examples: [
                  'Data from local system drives and folders (T1005)',
                  'Screen capture and keylogging (T1113, T1056)',
                  'Email collection from mailboxes (T1114)',
                  'Data staged for exfiltration (T1074)',
                  'Clipboard data capture (T1115)'
                ]
              },
              {
                step_number: 10,
                title: 'Command and Control (C2)',
                description: 'Techniques adversaries use to communicate with compromised systems to control them.',
                key_actions: [
                  'Implement network egress filtering and proxy controls',
                  'Monitor for unusual outbound connections and protocols',
                  'Block known C2 domains and IP addresses',
                  'Analyze DNS queries for suspicious patterns',
                  'Deploy network traffic analysis (NTA) solutions'
                ],
                examples: [
                  'Web protocols (HTTP/HTTPS) for C2 communication (T1071)',
                  'DNS tunneling for covert communication (T1071.004)',
                  'Encrypted channels to hide C2 traffic (T1573)',
                  'Using remote access software for C2 (T1219)',
                  'Dead drop resolver for dynamic C2 addressing (T1102)'
                ]
              },
              {
                step_number: 11,
                title: 'Exfiltration',
                description: 'Techniques adversaries use to steal data from the target network.',
                key_actions: [
                  'Implement data loss prevention (DLP) on network egress',
                  'Monitor for large or unusual data transfers',
                  'Control and monitor cloud storage access',
                  'Implement network bandwidth monitoring and anomaly detection',
                  'Use email gateway security to detect data exfiltration'
                ],
                examples: [
                  'Exfiltration over web service (cloud storage) (T1567)',
                  'Exfiltration over C2 channel (T1041)',
                  'Transfer data to cloud accounts (Dropbox, OneDrive) (T1567.002)',
                  'Automated exfiltration using scheduled transfers (T1020)',
                  'Physical media exfiltration via USB (T1052)'
                ]
              },
              {
                step_number: 12,
                title: 'Impact',
                description: 'Techniques adversaries use to disrupt availability or compromise integrity by manipulating business and operational processes.',
                key_actions: [
                  'Implement immutable backups with offline copies',
                  'Deploy ransomware-specific detection and prevention',
                  'Monitor for data encryption activities',
                  'Maintain incident response and business continuity plans',
                  'Test backup restoration procedures regularly'
                ],
                examples: [
                  'Data encrypted for ransomware impact (T1486)',
                  'Service stop to disrupt availability (T1489)',
                  'Data destruction or defacement (T1485, T1491)',
                  'Resource hijacking for cryptomining (T1496)',
                  'Disk wipe to destroy systems (T1561)'
                ]
              }
            ],
            when_to_use: 'Use MITRE ATT&CK for threat modeling, detection engineering, red/purple team exercises, security tool evaluation, and creating detection rules. It provides a common language for discussing adversary behavior.',
            benefits: [
              'Industry-standard framework recognized globally',
              'Based on real-world adversary behavior and observations',
              'Comprehensive coverage of attack lifecycle',
              'Regular updates with new techniques and procedures',
              'Extensive community contributions and tools',
              'Helps prioritize security investments and detection capabilities'
            ],
            common_pitfalls: [
              'Trying to detect every technique (focus on high-value techniques)',
              'Not mapping techniques to actual threats facing your organization',
              'Using ATT&CK in isolation without business context',
              'Overwhelming security teams with too many detection rules',
              'Not validating detections through testing (atomic red team)',
              'Forgetting about pre-ATT&CK reconnaissance activities'
            ]
          },
          order_index: 1
        },
        {
          id: 'solarwinds-case-study',
          type: 'case_study',
          title: 'SolarWinds Supply Chain Attack: Advanced Persistent Threat',
          content: {
            id: 'solarwinds-attack',
            title: 'SolarWinds 2020: The Most Sophisticated Supply Chain Attack in History',
            scenario: 'In December 2020, cybersecurity firm FireEye discovered one of the most sophisticated cyber espionage campaigns ever documented: attackers had compromised SolarWinds Orion software updates to distribute malware to approximately 18,000 organizations worldwide, including Fortune 500 companies and multiple U.S. government agencies.',
            background: `SolarWinds Orion is a widely-used network management platform deployed in thousands of organizations globally, including:
- U.S. federal agencies (Department of Homeland Security, Treasury, State, Energy, Commerce)
- Fortune 500 companies across multiple sectors
- Major cybersecurity companies including FireEye
- Critical infrastructure organizations

The attack, attributed to the Russian Foreign Intelligence Service (SVR) and tracked as "SUNBURST" or "Solorigate," demonstrated unprecedented sophistication:
- Long-term strategic planning and operational security
- Compromise of trusted software supply chain
- Highly targeted post-compromise activities
- Advanced detection evasion techniques
- Patient, methodical approach over 8+ months`,
            challenge: `**Attack Timeline and Techniques:**

**September 2019 - February 2020**: Initial compromise of SolarWinds build environment
- Attackers gained access to SolarWinds software development infrastructure
- Studied build processes and quality assurance procedures
- Prepared malicious code injection capability

**March 2020**: SUNBURST backdoor inserted into SolarWinds Orion updates
- Malicious code inserted into Orion software during legitimate build process
- Code digitally signed with valid SolarWinds certificate
- Updates distributed through official SolarWinds channels

**March - June 2020**: Malware distributed to ~18,000 organizations
- Organizations installed updates through normal patch management
- SUNBURST backdoor remained dormant for up to 2 weeks
- After dormancy, malware established C2 communication via DNS

**June - December 2020**: Targeted post-compromise operations
- Attackers selected <100 high-value targets for deeper compromise
- Lateral movement using legitimate credentials and tools
- Deployed additional backdoors (TEARDROP, RAINDROP)
- Exfiltrated sensitive data and maintained persistent access

**December 8, 2020**: FireEye discovers breach
- FireEye detected unauthorized access to its red team tools
- Investigation revealed SolarWinds as initial vector
- Public disclosure on December 13, 2020

**MITRE ATT&CK Techniques Used:**
- Initial Access: Supply Chain Compromise (T1195.002)
- Execution: PowerShell, Windows Command Shell (T1059)
- Persistence: Create or Modify System Process (T1543)
- Defense Evasion: Obfuscated Files, Masquerading (T1027, T1036)
- Credential Access: OS Credential Dumping (T1003)
- Discovery: Account, Network, System Discovery (T1087, T1016, T1082)
- Lateral Movement: Remote Services (T1021)
- Command and Control: Application Layer Protocol, DNS (T1071)
- Exfiltration: Transfer Data to Cloud Account (T1567)`,
            context: {
              industry: 'Technology / Software Supply Chain / Government',
              company_size: 'Enterprise software vendor (~3,000 employees) with 300,000+ customers worldwide',
              timeline: 'Attack spanned October 2019 - December 2020; discovery in December 2020; remediation ongoing through 2021'
            },
            analysis_points: [
              '**Supply Chain as Attack Vector**: The attackers recognized that compromising a widely-deployed software platform would provide access to thousands of high-value targets simultaneously. This represented a force multiplier for cyber espionage operations.',
              '**Sophisticated Operational Security**: The attackers demonstrated exceptional OPSEC with dormancy periods, legitimate-looking network traffic, and careful target selection. They used DNS for C2 to blend with normal traffic and avoid detection.',
              '**Software Build Process Compromise**: Unlike traditional supply chain attacks that compromise finished products, this attack compromised the actual build environment, allowing malicious code to be embedded during compilation and properly signed.',
              '**Detection Challenges**: The malware was digitally signed, used legitimate protocols, and mimicked normal SolarWinds traffic patterns. Traditional security tools struggled to detect it as malicious.',
              '**Cascading Trust Implications**: Organizations trust software vendors and assume digital signatures guarantee authenticity. This attack violated that trust at a fundamental level, forcing reevaluation of supply chain security assumptions.',
              '**Targeted Post-Compromise Activities**: While 18,000 organizations received the malware, attackers carefully selected fewer than 100 organizations for active espionage. This targeted approach reduced detection risk while maximizing intelligence value.',
              '**Nation-State Capabilities**: The sophistication, patience, and resources required suggest nation-state sponsorship. The attack demonstrates the growing threat of advanced persistent threats (APTs) against supply chains.'
            ],
            discussion_questions: [
              'How should organizations verify the integrity of software from trusted vendors? What technologies and processes can help?',
              'What is the appropriate balance between trust in the software supply chain and security verification? How do you avoid analysis paralysis?',
              'How can detection capabilities be improved to identify sophisticated, low-and-slow attacks that mimic legitimate behavior?',
              'What role should government regulation play in software supply chain security? Should vendors be held liable for compromises?',
              'If you were a CISO in an organization using SolarWinds, how would you have detected this attack given its sophistication?',
              'How has this attack changed your organization\'s approach to vendor management and third-party risk?',
              'What are the ethical considerations for cybersecurity vendors when they discover supply chain compromises affecting competitors?'
            ],
            key_takeaways: [
              'Implement Software Bill of Materials (SBOM) for visibility into software components and dependencies',
              'Deploy runtime application self-protection (RASP) and software composition analysis (SCA) tools',
              'Establish vendor security requirements including secure software development lifecycle (SSDLC)',
              'Implement network segmentation to limit lateral movement even if initial access occurs',
              'Use behavioral analytics and anomaly detection instead of relying solely on signatures',
              'Monitor for unusual authentication patterns and privilege escalation',
              'Maintain comprehensive logging and extend log retention for forensic analysis',
              'Conduct regular threat hunting exercises assuming breach has occurred',
              'Test incident response plans with sophisticated APT scenarios',
              'Consider Zero Trust architecture to minimize implicit trust in the network',
              'Implement code signing verification and certificate pinning where possible',
              'Establish relationships with threat intelligence providers for early warning'
            ],
            related_concepts: [
              'Supply Chain Risk Management (SCRM) and secure SDLC',
              'Software Bill of Materials (SBOM)',
              'Advanced Persistent Threats (APT)',
              'MITRE ATT&CK Framework',
              'Threat Hunting and Behavioral Analytics',
              'Zero Trust Architecture',
              'Digital Forensics and Incident Response (DFIR)',
              'Cyber Threat Intelligence (CTI)'
            ]
          },
          order_index: 2
        },
        {
          id: 'siem-implementation',
          type: 'text',
          title: 'Security Information and Event Management (SIEM)',
          content: `A Security Information and Event Management (SIEM) system is the cornerstone of modern security operations, providing centralized logging, correlation, alerting, and analysis capabilities.

**Core SIEM Capabilities:**

**1. Log Collection and Aggregation**
SIEMs collect logs from diverse sources including:
- Operating systems (Windows Event Logs, syslog)
- Network devices (firewalls, routers, switches)
- Security tools (IDS/IPS, endpoint protection, WAF)
- Applications (web servers, databases, custom applications)
- Cloud services (AWS CloudTrail, Azure Active Directory, Google Cloud Audit Logs)
- Identity systems (Active Directory, LDAP, IAM)

Modern SIEMs use agents, APIs, syslog, and native integrations to collect data at scale, often processing billions of events per day.

**2. Normalization and Parsing**
Raw logs are normalized into common schemas:
- Extracting key fields (timestamp, source, destination, user, action)
- Categorizing events (authentication, network traffic, file access)
- Enriching with context (threat intelligence, asset information, user data)

This enables correlation across heterogeneous data sources.

**3. Real-Time Correlation and Detection**
Correlation rules identify suspicious patterns:
- Multiple failed login attempts followed by success (brute force)
- Data transfer to unusual destinations (potential exfiltration)
- Privilege escalation combined with reconnaissance (lateral movement)
- Simultaneous authentication from geographically distant locations (credential compromise)

Example correlation rule (detecting Pass-the-Hash attack):
\`\`\`
IF (EventID = 4624 AND LogonType = 3 AND authentication_package = "NTLM")
AND NOT (source_ip IN whitelist_ips)
AND (COUNT DISTINCT systems accessed by account > 5 IN 10 minutes)
THEN ALERT "Potential Pass-the-Hash lateral movement"
\`\`\`

**4. Security Analytics and Machine Learning**
Modern SIEMs incorporate advanced analytics:
- **User Entity Behavior Analytics (UEBA)**: Detect anomalies in user behavior
- **Statistical anomaly detection**: Identify deviations from baselines
- **ML-powered threat detection**: Recognize patterns indicative of attacks
- **Risk scoring**: Aggregate multiple weak indicators into high-confidence alerts

**5. Incident Response Workflow**
SIEMs integrate with Security Orchestration, Automation, and Response (SOAR):
- Automated alert triage and enrichment
- Playbook-driven response actions
- Case management and investigation tracking
- Integration with ticketing systems (ServiceNow, Jira)

**Popular SIEM Platforms:**

**Splunk Enterprise Security**
- Powerful search processing language (SPL)
- Extensive app ecosystem and community content
- Machine learning toolkit for advanced analytics
- Scales from small businesses to Fortune 500

**Elastic Security (formerly Elastic SIEM)**
- Open-source foundation with commercial features
- Excellent for large-scale data ingestion (built on Elasticsearch)
- Strong support for cloud-native and containerized environments
- Cost-effective for high-volume logging

**Microsoft Sentinel (Cloud-Native SIEM)**
- Native Azure integration and Azure AD logs
- Built on Azure infrastructure with automatic scaling
- AI/ML-powered detections and hunting queries
- Integration with Microsoft security ecosystem (Defender, Intune)

**IBM QRadar**
- Strong correlation engine and risk-based prioritization
- Excellent for regulated industries (healthcare, finance)
- Deep network traffic analysis capabilities
- On-premises and cloud deployment options

**Google Chronicle**
- Unlimited log retention (entire security telemetry history)
- Massive scalability using Google infrastructure
- Fast search across petabytes of data
- MITRE ATT&CK framework integration

**SIEM Implementation Best Practices:**

1. **Define Use Cases First**: Start with specific detection goals (ransomware detection, insider threats, compliance)
2. **Prioritize Log Sources**: Focus on high-value sources (authentication, privileged access, network traffic)
3. **Tune for Your Environment**: Customize rules to reduce false positives and alert fatigue
4. **Establish Baselines**: Understand normal behavior before detecting anomalies
5. **Create Runbooks**: Document response procedures for each alert type
6. **Regular Content Updates**: Continuously add new detection rules based on emerging threats
7. **Measure Effectiveness**: Track metrics like mean time to detect (MTTD) and mean time to respond (MTTR)
8. **Integration is Key**: Connect SIEM with threat intelligence, asset inventory, and response tools`,
          order_index: 3
        },
        {
          id: 'threat-hunting',
          type: 'key_points',
          title: 'Proactive Threat Hunting',
          content: [
            '**Hypothesis-Driven Hunting** - Start with specific hypotheses based on threat intelligence, TTPs, or organizational risk. Example: "Are any systems communicating with newly registered domains?" or "Has any user accessed an unusual number of file shares?"',
            '**Intelligence-Driven Hunting** - Use threat intelligence reports to search for specific Indicators of Compromise (IoCs) or Tactics, Techniques, and Procedures (TTPs) described in threat reports. Focus on TTPs over IoCs as attackers change IoCs frequently.',
            '**Anomaly-Based Hunting** - Search for statistical anomalies and deviations from normal behavior baselines. Examples: unusual login times, abnormal data transfer volumes, new process executions, uncommon parent-child process relationships.',
            '**MITRE ATT&CK-Based Hunting** - Systematically hunt for evidence of specific ATT&CK techniques. Example: Search for credential dumping attempts by looking for LSASS memory access patterns.',
            '**Crown Jewel Analysis** - Focus hunting efforts on systems containing critical data (intellectual property, customer data, financial systems). Assume attackers target your most valuable assets.',
            '**Hunt Loops** - Use iterative hunting process: 1) Create hypothesis, 2) Collect relevant data, 3) Analyze for evidence, 4) Document findings, 5) Create detections, 6) Repeat with new hypothesis.',
            '**Common Hunt Queries** - PowerShell execution with encoded commands, scheduled tasks created recently, new user accounts or permission changes, unusual parent-child process relationships (e.g., Word spawning PowerShell), beaconing network traffic patterns.',
            '**Tools for Threat Hunting** - Splunk, Elastic, EDR platforms (CrowdStrike, SentinelOne), Sysinternals Suite, PowerShell, YARA rules, OSQuery for endpoint querying, Jupyter notebooks for analysis and visualization.'
          ],
          order_index: 4
        },
        {
          id: 'threat-hunting-exercise',
          type: 'interactive',
          title: 'Threat Hunting Exercise with MITRE ATT&CK',
          content: {
            id: 'threat-hunt-simulation',
            title: 'Hunt for APT Activity Using MITRE ATT&CK',
            type: 'skill_practice',
            instructions: 'You are a threat hunter at a financial services company. Recent threat intelligence indicates APT29 (Russian state-sponsored) may be targeting financial institutions. Using MITRE ATT&CK and available log data, hunt for evidence of compromise.',
            scenarios: [
              {
                id: 'hunt-scenario-1',
                situation: 'Intelligence reports indicate APT29 commonly uses spearphishing with malicious Office documents. You have access to email gateway logs, proxy logs, and endpoint logs. How do you hunt for this Initial Access technique?',
                options: [
                  {
                    text: 'Search for all .doc and .docx file attachments in email logs',
                    outcome: 'Thousands of legitimate results. Too broad to be actionable.',
                    feedback: '⚠️ This approach generates too many false positives. You need to narrow the search with additional context.'
                  },
                  {
                    text: 'Search for Office files with macros that were delivered via email and subsequently executed, combined with child processes spawned by Office apps (especially PowerShell, cmd.exe, or network connections)',
                    outcome: 'Identified 3 suspicious events: Excel file spawning PowerShell, Word document making external network connection, PowerPoint downloading executable.',
                    feedback: '✅ Excellent. This focuses on the execution chain after document opening, which is where malicious activity occurs. The combination of attachment + execution + unusual child process is a strong indicator.'
                  },
                  {
                    text: 'Block all email attachments organization-wide',
                    outcome: 'Business operations severely disrupted. Not a hunting approach.',
                    feedback: '❌ This is a preventive control, not threat hunting. Hunting is about finding threats that bypassed existing controls.'
                  },
                  {
                    text: 'Wait for antivirus alerts',
                    outcome: 'APT29 uses custom malware that evades signature-based detection. No alerts generated.',
                    feedback: '❌ Passive monitoring is not threat hunting. Sophisticated adversaries specifically design malware to evade traditional AV.'
                  }
                ]
              },
              {
                id: 'hunt-scenario-2',
                situation: 'You found evidence that a workstation executed suspicious PowerShell. Now you need to hunt for Lateral Movement (MITRE ATT&CK Tactic TA0008). What do you look for next?',
                options: [
                  {
                    text: 'Search for RDP connections, SMB file shares accessed, authentication events from the compromised workstation to other systems, and use of administrative tools like PsExec',
                    outcome: 'Found: Compromised workstation authenticated to 15 other systems in 2 hours using a single administrative account.',
                    feedback: '✅ Excellent. You\'re hunting for the specific techniques adversaries use for lateral movement. The pattern of rapid authentication to multiple systems is a strong indicator of compromise.'
                  },
                  {
                    text: 'Immediately isolate the compromised workstation',
                    outcome: 'Workstation isolated, but attacker has already moved laterally to other systems. Investigation stalled.',
                    feedback: '⚠️ Containment is important but premature isolation can alert the adversary and limit your ability to understand the full scope. Better to gather intelligence first about where they\'ve spread.'
                  },
                  {
                    text: 'Search for all network traffic from the workstation',
                    outcome: 'Millions of network connections found. Too much data to analyze effectively.',
                    feedback: '❌ Too broad. Focus on specific lateral movement techniques described in MITRE ATT&CK (RDP, SMB, WMI, PowerShell Remoting).'
                  },
                  {
                    text: 'Reimage the workstation and consider the incident closed',
                    outcome: 'Workstation cleaned, but attacker remains on 15 other compromised systems. Incident response failure.',
                    feedback: '❌ Critical error. APTs use initial access to establish presence on multiple systems. You must hunt comprehensively across the environment before remediation.'
                  }
                ]
              }
            ],
            reflection_prompts: [
              'How did you use MITRE ATT&CK to guide your hunting hypotheses? Which specific techniques did you focus on?',
              'What additional data sources would have been helpful for this hunt?',
              'How would you differentiate between legitimate administrative activity and malicious lateral movement?',
              'What detections would you create based on your hunt findings to catch similar activity automatically in the future?',
              'How would you present your findings to management to justify additional security investments?'
            ],
            success_criteria: [
              'Applied specific MITRE ATT&CK techniques to guide hunting',
              'Used behavioral indicators rather than simple IoC matching',
              'Considered the full attack lifecycle, not just initial compromise',
              'Recognized the need to understand scope before containment',
              'Created actionable detections from hunt findings'
            ]
          },
          order_index: 5
        }
      ],
      practical_applications: [
        'Create SIEM detection rules based on MITRE ATT&CK techniques',
        'Conduct threat hunting exercises using threat intelligence',
        'Deploy and tune intrusion detection systems (IDS/IPS)',
        'Analyze logs to identify security incidents and anomalies',
        'Build threat intelligence program and integrate feeds',
        'Implement User Entity Behavior Analytics (UEBA)'
      ],
      additional_resources: [
        {
          title: 'MITRE ATT&CK Navigator',
          type: 'tool',
          description: 'Interactive tool for exploring and annotating ATT&CK matrices',
          internal: false
        },
        {
          title: 'Atomic Red Team',
          type: 'tool',
          description: 'Library of tests mapped to MITRE ATT&CK for detection validation',
          internal: false
        },
        {
          title: 'Cyber Kill Chain Analysis',
          type: 'article',
          description: 'Understanding Lockheed Martin\'s Cyber Kill Chain framework',
          internal: false
        },
        {
          title: 'SIEM Use Cases Library',
          type: 'template',
          description: 'Collection of detection use cases and correlation rules',
          internal: true
        }
      ]
    }
  ],
  capstone_project: {
    title: 'Comprehensive Security Assessment and Improvement Plan',
    description: 'Conduct a complete security assessment of a fictional organization and develop a comprehensive improvement plan addressing identified gaps.',
    deliverables: [
      'Risk assessment report identifying and prioritizing security risks',
      'Security architecture design implementing Zero Trust principles',
      'Incident response plan with playbooks for top 5 scenarios',
      'Detection engineering strategy with SIEM rules based on MITRE ATT&CK',
      'Executive summary with ROI analysis for security investments',
      'One-year security roadmap with milestones and success metrics'
    ],
    evaluation_criteria: [
      'Comprehensive risk identification aligned with NIST CSF',
      'Practical and implementable security architecture',
      'Detailed IR playbooks with clear escalation procedures',
      'Detection rules covering critical ATT&CK techniques',
      'Clear communication of technical concepts to business stakeholders',
      'Realistic timeline and resource planning'
    ]
  }
};

export default cyberSecurityModule;
