-- Insert Cybersecurity Excellence Program
INSERT INTO public.coaching_programs (
  id,
  title,
  description,
  category,
  difficulty_level,
  estimated_duration_weeks,
  skills_covered,
  prerequisites,
  is_active,
  is_premium
) VALUES (
  '8a2d43f9-1b56-4e78-9c3d-2f6b8d4e9a1c',
  'Cybersecurity Excellence Program',
  'Master modern cybersecurity frameworks, threat detection, incident response, and security architecture through comprehensive professional training. Prepare for industry certifications (Security+, CISSP, CEH) while learning from real-world case studies including Target, SolarWinds, Google BeyondCorp, and Maersk NotPetya.',
  'technical',
  'intermediate',
  10,
  ARRAY['NIST Cybersecurity Framework', 'MITRE ATT&CK', 'Zero Trust Architecture', 'SIEM and Security Monitoring', 'Incident Response', 'Digital Forensics', 'Cloud Security', 'DevSecOps', 'Risk Management', 'Compliance Frameworks'],
  ARRAY['Basic networking knowledge (TCP/IP, DNS, HTTP/HTTPS)', 'Understanding of operating systems (Windows, Linux)', 'System administration experience', 'Familiarity with IT infrastructure concepts'],
  true,
  false
);

-- Insert Module 1: Security Foundations & Risk Management
INSERT INTO public.learning_modules (
  id,
  program_id,
  title,
  description,
  content_type,
  duration_minutes,
  learning_objectives,
  prerequisites,
  order_index,
  content_sections,
  learning_outcomes,
  target_audience,
  industry_applications,
  practical_applications,
  is_interactive
) VALUES (
  'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
  '8a2d43f9-1b56-4e78-9c3d-2f6b8d4e9a1c',
  'Security Foundations & Risk Management',
  'Master fundamental security principles, risk management methodologies, and compliance frameworks essential for modern cybersecurity.',
  'article',
  900,
  ARRAY['Apply the CIA Triad and defense-in-depth principles', 'Conduct comprehensive risk assessments using NIST framework', 'Implement security governance and policy frameworks', 'Understand compliance requirements (GDPR, HIPAA, SOC 2, ISO 27001)', 'Design security controls aligned with business risk tolerance'],
  ARRAY['Basic IT and security awareness', 'Understanding of business operations'],
  1,
  '[]'::jsonb,
  ARRAY['Understand fundamental elements of effective security', 'Apply NIST CSF 2.0 framework', 'Conduct risk assessments', 'Implement compliance programs'],
  ARRAY['IT professionals transitioning to security roles', 'Risk and compliance managers', 'Security analysts'],
  ARRAY['Enterprise security governance', 'Compliance and audit', 'Risk management'],
  ARRAY['Conduct risk assessments for new projects', 'Develop security policies aligned with NIST CSF', 'Perform vendor security assessments', 'Implement compliance programs'],
  true
);

-- Insert Module 2: Threat Intelligence & Detection
INSERT INTO public.learning_modules (
  id,
  program_id,
  title,
  description,
  content_type,
  duration_minutes,
  learning_objectives,
  prerequisites,
  order_index,
  content_sections,
  learning_outcomes,
  target_audience,
  industry_applications,
  practical_applications,
  is_interactive
) VALUES (
  'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
  '8a2d43f9-1b56-4e78-9c3d-2f6b8d4e9a1c',
  'Threat Intelligence & Detection',
  'Master threat intelligence gathering, analysis, and detection using industry-standard frameworks like MITRE ATT&CK and modern SIEM technologies.',
  'article',
  900,
  ARRAY['Apply MITRE ATT&CK framework for threat modeling', 'Implement and tune SIEM solutions', 'Conduct threat hunting operations', 'Analyze threat intelligence from multiple sources', 'Deploy intrusion detection/prevention systems'],
  ARRAY['Completion of Security Foundations module', 'Basic log analysis experience'],
  2,
  '[]'::jsonb,
  ARRAY['Master MITRE ATT&CK framework', 'Implement SIEM solutions', 'Conduct proactive threat hunting', 'Analyze security incidents'],
  ARRAY['Security Operations Center (SOC) analysts', 'Threat intelligence analysts', 'Security engineers'],
  ARRAY['Security operations centers', 'Threat intelligence programs', 'Security monitoring'],
  ARRAY['Create SIEM detection rules', 'Conduct threat hunting exercises', 'Deploy and tune IDS/IPS', 'Analyze security incidents'],
  true
);

-- Insert Module 3: Security Architecture & Zero Trust
INSERT INTO public.learning_modules (
  id,
  program_id,
  title,
  description,
  content_type,
  duration_minutes,
  learning_objectives,
  prerequisites,
  order_index,
  content_sections,
  learning_outcomes,
  target_audience,
  industry_applications,
  practical_applications,
  is_interactive
) VALUES (
  'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f',
  '8a2d43f9-1b56-4e78-9c3d-2f6b8d4e9a1c',
  'Security Architecture & Zero Trust',
  'Design secure architectures using Zero Trust principles, implement defense-in-depth strategies, and secure cloud-native environments.',
  'article',
  900,
  ARRAY['Design and implement Zero Trust Architecture', 'Apply defense-in-depth security principles', 'Secure cloud environments (AWS, Azure, GCP)', 'Implement identity and access management', 'Design network segmentation and microsegmentation'],
  ARRAY['Completion of previous modules', 'Understanding of network architecture'],
  3,
  '[]'::jsonb,
  ARRAY['Design Zero Trust architectures', 'Implement microsegmentation', 'Secure cloud workloads', 'Apply DevSecOps practices'],
  ARRAY['Security architects', 'Cloud security engineers', 'DevSecOps engineers'],
  ARRAY['Enterprise security architecture', 'Cloud security', 'Zero Trust implementations'],
  ARRAY['Design Zero Trust architecture', 'Implement ZTNA solutions', 'Secure cloud workloads', 'Deploy IAM with MFA'],
  true
);

-- Insert Module 4: Incident Response & Security Operations
INSERT INTO public.learning_modules (
  id,
  program_id,
  title,
  description,
  content_type,
  duration_minutes,
  learning_objectives,
  prerequisites,
  order_index,
  content_sections,
  learning_outcomes,
  target_audience,
  industry_applications,
  practical_applications,
  is_interactive
) VALUES (
  'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a',
  '8a2d43f9-1b56-4e78-9c3d-2f6b8d4e9a1c',
  'Incident Response & Security Operations',
  'Master incident response planning, digital forensics, and security operations to effectively detect, contain, and recover from cybersecurity incidents.',
  'article',
  1200,
  ARRAY['Develop comprehensive incident response plans', 'Execute incident response using NIST lifecycle', 'Conduct digital forensics', 'Lead tabletop exercises', 'Implement SOAR automation', 'Manage business continuity'],
  ARRAY['Completion of all previous modules', 'Understanding of security operations'],
  4,
  '[]'::jsonb,
  ARRAY['Master NIST IR lifecycle', 'Conduct digital forensics', 'Lead incident response', 'Implement disaster recovery'],
  ARRAY['Incident responders', 'Digital forensics investigators', 'Security operations managers'],
  ARRAY['Incident response teams', 'Digital forensics', 'Security operations', 'Business continuity'],
  ARRAY['Create incident response plans', 'Conduct tabletop exercises', 'Perform digital forensics', 'Implement SOAR', 'Test disaster recovery'],
  true
);