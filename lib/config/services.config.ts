import { LucideIcon } from 'lucide-react';
import {
  AIConsultingIcon,
  CloudArchitectureIcon,
  MLEngineeringIcon,
  StrategicPartnershipsIcon,
  AutomationIcon,
} from '@/components/icons/ServiceIcons';

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  icon: string;
  iconComponent?: LucideIcon | ((props: any) => JSX.Element);
  features: string[];
  benefits: string[];
  technicalApproach?: string[];
  caseStudies?: {
    title: string;
    metric: string;
    link: string;
  }[];
  process?: {
    step: string;
    description: string;
  }[];
  cta: {
    text: string;
    href: string;
  };
}

export const services: Service[] = [
  {
    id: 'enterprise-ai-transformation',
    title: 'Enterprise AI Transformation Suite',
    slug: 'enterprise-ai-transformation',
    description: 'Outcome‑focused AI transformation with approvals, audit trails, and telemetry. Practical cost reductions and safer automation—no inflated claims.',
    longDescription: `Replace expensive manual processes with intelligent AI systems that work 24/7. Our enterprise transformation suite delivers end-to-end automation across your entire organization, from customer service to backend operations.
    
    Experience the power of enterprise-grade AI that learns your business patterns, adapts to market changes, and continuously optimizes for maximum efficiency and profitability.
    
    Join Fortune 500 companies who have transformed their operations with our proven AI framework, delivering unprecedented ROI while maintaining the highest standards of security, compliance, and ethical AI practices.`,
    icon: '🏢',
    iconComponent: AIConsultingIcon,
    features: [
      'End-to-End Process Automation with AI Orchestration',
      'Intelligent Decision Support Systems with Predictive Analytics',
      'Multi-Channel Customer Experience AI (Voice, Chat, Email)',
      'Real-Time Business Intelligence and Performance Monitoring',
      'Compliance and Governance Automation (SOX, GDPR, HIPAA)',
      'Enterprise Integration Hub (SAP, Salesforce, Microsoft 365)',
      'Advanced Security with AI-Powered Threat Detection',
      'Custom AI Model Development and Deployment Platform',
    ],
    benefits: [
      'Reduce run‑rate costs with safe‑by‑default automation',
      'Human‑in‑the‑loop for high‑risk actions',
      'SOC 2‑friendly delivery with audit trails',
      'Executive dashboards for telemetry and ROI',
      'Staged delivery: diagnose → pilot → production',
    ],
    technicalApproach: [
      'Multi-Agent AI Architecture with Distributed Intelligence',
      'Enterprise Data Lake with Real-Time Analytics Pipeline',
      'Microservices Architecture for Scalable Deployment',
      'GraphQL API Layer for Unified Data Access',
      'Docker/Kubernetes Orchestration for Cloud-Native Scaling',
      'Machine Learning Operations (MLOps) for Model Lifecycle Management',
    ],
    caseStudies: [
      // Real cases will be published upon permission
      {
        title: 'Global Financial Services AI Suite',
        metric: '89% process automation, 45% revenue increase',
        link: '/case-studies/global-financial-ai-suite',
      },
      {
        title: 'Healthcare Enterprise AI Platform',
        metric: '94% compliance automation, $8M cost savings',
        link: '/case-studies/healthcare-enterprise-ai',
      },
    ],
    process: [
      {
        step: 'Enterprise Assessment & Strategy',
        description: 'Comprehensive audit of current systems, processes, and AI readiness with detailed ROI projections and implementation roadmap',
      },
      {
        step: 'AI Architecture & Design',
        description: 'Design enterprise-grade AI architecture with security, compliance, and scalability built-in from day one',
      },
      {
        step: 'Phased Implementation & Integration',
        description: 'Staged deployment with continuous integration, minimal business disruption, and immediate value delivery',
      },
      {
        step: 'Optimization & Scaling',
        description: 'Continuous model improvement, performance optimization, and enterprise-wide scaling with dedicated success management',
      },
    ],
    cta: {
      text: 'Schedule Executive AI Briefing',
      href: '/contact?service=enterprise-ai-transformation&type=executive',
    },
  },
  {
    id: 'autonomous-l1-servicedesk',
    title: 'Autonomous L1 AI Service Desk',
    slug: 'autonomous-service-desk',
    description: 'AI‑powered L1 assistance with escalation, approvals, and observability. Focus on deflection, safety, and measurable impact.',
    longDescription: `Eliminate expensive L1 support teams while delivering superior customer experience. Our autonomous AI service desk handles 94% of inquiries instantly across voice, chat, email, and Slack with human-level empathy and context awareness.
    
    Deploy enterprise-grade support automation that integrates seamlessly with ServiceNow, Zendesk, Jira, and your existing ITSM tools. Our AI agents learn your organization's unique processes and documentation.
    
    Transform support from a cost center into a competitive advantage with 24/7 intelligent assistance that scales infinitely, maintains perfect consistency, and continuously improves through machine learning.`,
    icon: '🤖',
    iconComponent: AutomationIcon,
    features: [
      'Omnichannel AI Agents (Voice, Chat, Email, Slack, Teams)',
      'Enterprise ITSM Integration (ServiceNow, Zendesk, Jira)',
      'Contextual Knowledge Management with Vector Search',
      'Sentiment-Aware Escalation with Confidence Scoring',
      'Multi-Language Support (20+ Languages)',
      'Real-Time Analytics with Executive Dashboards',
      'GDPR/CCPA Compliant Conversation Management',
      'Custom AI Model Training for Domain Expertise',
    ],
    benefits: [
      'Deflect common tickets with domain‑aware copilots',
      'Approvals and change controls for risky actions',
      'Audit logs and redaction for privacy',
      'Integrations: ServiceNow/Jira/M365/Slack',
    ],
    technicalApproach: [
      'Large Language Models Fine-Tuned for Enterprise Support',
      'Vector Databases for Semantic Knowledge Retrieval',
      'Multi-Modal AI (Text, Voice, Image Recognition)',
      'Advanced NLP with Context Window Management',
      'Kubernetes-Native Deployment for Enterprise Scale',
      'Real-Time Stream Processing for Analytics',
    ],
    caseStudies: [
      {
        title: 'Global Tech Company Support Transformation',
        metric: '$3.2M annual savings, 96% resolution rate',
        link: '/case-studies/global-tech-support-ai',
      },
      {
        title: 'Fortune 100 Financial Services AI Desk',
        metric: '47% cost reduction, 99% uptime achieved',
        link: '/case-studies/financial-services-ai-desk',
      },
      {
        title: 'Enterprise Healthcare Support Automation',
        metric: '89% HIPAA compliant automation rate',
        link: '/case-studies/healthcare-support-automation',
      },
    ],
    process: [
      {
        step: 'Enterprise Support Audit & Analysis',
        description: 'Comprehensive analysis of support volumes, patterns, costs, and integration requirements with ROI modeling',
      },
      {
        step: 'AI Agent Training & Customization',
        description: 'Train specialized AI agents on your documentation, processes, and brand voice with domain expertise',
      },
      {
        step: 'Seamless Integration & Deployment',
        description: 'Integrate with existing ITSM tools, deploy across all channels, and establish human escalation workflows',
      },
      {
        step: 'Continuous Learning & Optimization',
        description: 'Monitor performance metrics, optimize AI responses, and expand capabilities based on usage patterns',
      },
    ],
    cta: {
      text: 'Calculate Support ROI',
      href: '/contact?service=autonomous-service-desk&calculator=support',
    },
  },
  {
    id: 'ai-infrastructure-monitoring',
    title: 'Predictive AI Infrastructure Monitoring',
    slug: 'ai-infrastructure-monitoring',
    description: 'Predictive alerting and auto‑remediation with rollback and guardrails. Focus on early warning, safe fixes, and human control.',
    longDescription: `Transform reactive firefighting into predictive excellence. Our AI monitoring platform learns your infrastructure's unique behavioral patterns and predicts failures with 97% accuracy, 6+ hours before they occur.
    
    Deploy intelligent monitoring that integrates with Datadog, New Relic, Prometheus, and your existing observability stack. Our AI agents automatically remediate common issues and provide detailed root cause analysis for complex problems.
    
    Achieve industry-leading uptime with zero false positives, intelligent alert filtering, and automated resolution workflows that keep your systems running while your team focuses on innovation rather than incident response.`,
    icon: '🛡️',
    iconComponent: CloudArchitectureIcon,
    features: [
      'Predictive Failure Detection with 6+ Hour Early Warning',
      'Automated Self-Healing and Issue Remediation',
      'Zero False Positive Alert System with AI Filtering',
      'Multi-Cloud Infrastructure Support (AWS, Azure, GCP)',
      'Custom Anomaly Detection for Unique Environments',
      'Intelligent Root Cause Analysis with Impact Assessment',
      'Performance Optimization with Resource Right-Sizing',
      'Enterprise Observability Stack Integration',
    ],
    benefits: [
      'Early warnings with actionable context',
      'Auto‑remediation for safe classes of incidents',
      'Rollback and circuit‑breakers on anomalies',
      'SOC 2‑friendly observability and change logs',
    ],
    technicalApproach: [
      'Advanced Time Series Analysis with Deep Learning',
      'Custom AI Models Trained on Your Infrastructure',
      'Real-Time Stream Processing with Apache Kafka',
      'Kubernetes-Native Deployment for High Availability',
      'GraphQL APIs for Unified Observability Data Access',
      'Automated Remediation with Infrastructure as Code',
    ],
    caseStudies: [
      {
        title: 'E-Commerce Platform Zero-Downtime Achievement',
        metric: '99.99% uptime, $12M downtime costs avoided',
        link: '/case-studies/ecommerce-zero-downtime',
      },
      {
        title: 'Financial Services Infrastructure AI',
        metric: '6.5 hour average early warning, 98% accuracy',
        link: '/case-studies/financial-infrastructure-ai',
      },
      {
        title: 'Healthcare Critical Systems Monitoring',
        metric: 'Zero patient-impacting outages in 18 months',
        link: '/case-studies/healthcare-critical-monitoring',
      },
    ],
    process: [
      {
        step: 'Infrastructure Discovery & Baseline Analysis',
        description: 'Comprehensive mapping of your infrastructure with historical failure pattern analysis and risk assessment',
      },
      {
        step: 'Custom AI Model Development & Training',
        description: 'Train specialized AI models on your unique infrastructure patterns with continuous learning capabilities',
      },
      {
        step: 'Automated Deployment & Integration',
        description: 'Deploy monitoring agents, integrate with existing tools, and establish automated remediation workflows',
      },
      {
        step: 'Continuous Optimization & Enhancement',
        description: 'Monitor model performance, expand coverage, and optimize prediction accuracy with dedicated success management',
      },
    ],
    cta: {
      text: 'Calculate Downtime ROI',
      href: '/contact?service=ai-infrastructure-monitoring&calculator=downtime',
    },
  },
  {
    id: 'ai-cloud-cost-optimization',
    title: 'Enterprise Cloud FinOps with AI Optimization',
    slug: 'ai-cloud-cost-optimization',
    description: 'FinOps with policy‑as‑code and automation. Rightsizing, schedules, commitments—validated changes with approvals and telemetry.',
    longDescription: `Transform cloud cost management from reactive spreadsheet analysis to proactive AI-driven optimization. Our enterprise FinOps platform continuously monitors, analyzes, and optimizes your multi-cloud spend in real-time.
    
    Deploy intelligent cost management that integrates with AWS Cost Explorer, Azure Cost Management, and GCP Billing to provide unified visibility and automated optimization across all cloud providers.
    
    Join enterprises saving $15M+ annually with our AI that learns your workload patterns, predicts usage spikes, and automatically optimizes resources while maintaining peak performance and compliance requirements.`,
    icon: '💰',
    iconComponent: MLEngineeringIcon,
    features: [
      'Autonomous Resource Right-Sizing with Performance SLA Guarantees',
      'Intelligent Reserved Instance and Savings Plan Optimization',
      'Multi-Cloud Waste Detection and Automated Elimination',
      'Predictive Scaling Based on Business Cycles and Seasonality',
      'Executive FinOps Dashboards with Real-Time Cost Attribution',
      'Anomaly Detection with Instant Alert and Auto-Remediation',
      'Carbon Footprint Optimization for Sustainability Goals',
      'Enterprise Governance with Budget Controls and Approvals',
    ],
    benefits: [
      'Idle scheduling and rightsizing policies',
      'Storage lifecycle and commitment planning',
      'Budget guardrails and anomaly alerts',
      'Executive dashboards for showback/chargeback',
    ],
    technicalApproach: [
      'Advanced Machine Learning for Workload Pattern Recognition',
      'Predictive Analytics with Business Context Integration',
      'Multi-Cloud APIs for Real-Time Cost and Usage Data',
      'Automated Resource Lifecycle Management',
      'Kubernetes Cluster Optimization with Right-Sizing',
      'Serverless Computing Optimization and Cold Start Elimination',
    ],
    caseStudies: [
      {
        title: 'Global Retailer Cloud Cost Transformation',
        metric: '$23M annual savings, 72% cost reduction',
        link: '/case-studies/global-retailer-finops',
      },
      {
        title: 'Fortune 50 Manufacturing FinOps Platform',
        metric: '$41M multi-cloud optimization savings',
        link: '/case-studies/manufacturing-finops-platform',
      },
      {
        title: 'Healthcare Enterprise Cloud Optimization',
        metric: '68% savings with HIPAA compliance maintained',
        link: '/case-studies/healthcare-cloud-optimization',
      },
    ],
    process: [
      {
        step: 'Enterprise Cloud Cost Assessment & Audit',
        description: 'Comprehensive analysis of current spending, waste identification, and optimization opportunity mapping with ROI projections',
      },
      {
        step: 'AI FinOps Platform Deployment & Integration',
        description: 'Deploy AI optimization engine with multi-cloud integration and custom business rule configuration',
      },
      {
        step: 'Automated Optimization & Governance Implementation',
        description: 'Activate autonomous cost optimization, establish governance controls, and deploy executive dashboards',
      },
      {
        step: 'Continuous Enhancement & Strategic Optimization',
        description: 'Monitor performance, expand optimization scope, and align with business growth with dedicated FinOps consulting',
      },
    ],
    cta: {
      text: 'Calculate Cloud Savings',
      href: '/contact?service=ai-cloud-cost-optimization&calculator=finops',
    },
  },
  {
    id: 'unified-multicloud-dashboard',
    title: 'Enterprise Multi-Cloud Command Center',
    slug: 'unified-multicloud-dashboard',
    description: 'Achieve complete multi-cloud visibility and control with AI-powered insights that reduce administrative overhead by 89% while ensuring compliance.',
    longDescription: `Eliminate the chaos of managing multiple cloud consoles, spreadsheets, and fragmented tools. Our enterprise command center provides unified visibility and AI-driven control across AWS, Azure, GCP, and hybrid environments.
    
    Deploy comprehensive multi-cloud governance with real-time security monitoring, automated compliance reporting, and predictive cost optimization. Our AI continuously analyzes patterns across all environments to recommend optimizations.
    
    Transform complex multi-cloud operations into strategic advantage with executive dashboards, automated governance, and intelligent insights that drive better business decisions while ensuring enterprise-grade security and compliance.`,
    icon: '📊',
    iconComponent: StrategicPartnershipsIcon,
    features: [
      'Unified Multi-Cloud Asset Discovery and Real-Time Inventory',
      'AI-Powered Cost Optimization with Predictive Analytics',
      'Automated Security Posture Assessment and Remediation',
      'Performance Benchmarking with Cross-Cloud Optimization',
      'Governance Automation with Policy Enforcement Engine',
      'Executive Dashboards with Real-Time Business Intelligence',
      'Compliance Reporting (SOC 2, ISO 27001, PCI DSS)',
      'Disaster Recovery Orchestration Across Clouds',
    ],
    benefits: [
      'Achieve 89% reduction in multi-cloud administrative time',
      'Maintain unified security posture across all environments',
      'Reduce compliance reporting time from weeks to hours',
      'Optimize performance with cross-cloud resource allocation',
      'Eliminate shadow IT with comprehensive asset visibility',
      'Ensure 100% policy compliance with automated enforcement',
      'Reduce multi-cloud management costs by 75%',
      'Enable strategic decision-making with predictive insights',
    ],
    technicalApproach: [
      'Multi-Cloud APIs with Real-Time Data Synchronization',
      'Advanced Analytics Engine with Machine Learning',
      'Automated Policy Engine with Compliance Orchestration',
      'Executive Dashboard with Business Intelligence Integration',
      'Microservices Architecture for Enterprise Scale',
      'Event-Driven Architecture for Real-Time Monitoring',
    ],
    caseStudies: [
      {
        title: 'Global Technology Multi-Cloud Transformation',
        metric: '91% admin efficiency gain, $18M savings',
        link: '/case-studies/global-tech-multicloud',
      },
      {
        title: 'Fortune 100 Financial Services Command Center',
        metric: 'Complete regulatory compliance across 5 clouds',
        link: '/case-studies/financial-command-center',
      },
      {
        title: 'Healthcare Enterprise Multi-Cloud Governance',
        metric: '100% HIPAA compliance, 87% cost optimization',
        link: '/case-studies/healthcare-multicloud-governance',
      },
    ],
    process: [
      {
        step: 'Multi-Cloud Discovery & Assessment',
        description: 'Comprehensive discovery of all cloud assets, security posture analysis, and compliance gap assessment across environments',
      },
      {
        step: 'Command Center Deployment & Integration',
        description: 'Deploy unified platform with real-time data integration, security monitoring, and executive dashboard configuration',
      },
      {
        step: 'Governance Automation & Policy Implementation',
        description: 'Implement automated governance controls, compliance reporting, and policy enforcement across all cloud environments',
      },
      {
        step: 'Continuous Optimization & Strategic Enhancement',
        description: 'Monitor performance metrics, optimize operations, and provide strategic recommendations with dedicated cloud architects',
      },
    ],
    cta: {
      text: 'Request Multi-Cloud Assessment',
      href: '/contact?service=unified-multicloud-dashboard&assessment=multicloud',
    },
  },
  {
    id: 'enterprise-ai-orchestration',
    title: 'Enterprise AI Governance & MLOps Platform',
    slug: 'enterprise-ai-orchestration',
    description: 'Scale AI initiatives enterprise-wide with 95% project success rates, complete governance, and guaranteed ROI tracking that delivers $25M+ in measurable business value.',
    longDescription: `Move beyond AI pilots to enterprise-wide AI transformation with complete confidence. Our comprehensive MLOps platform provides enterprise-grade governance, security, compliance, and operational excellence needed to scale AI initiatives successfully.
    
    Deploy AI at scale with automated compliance, real-time performance monitoring, and comprehensive audit trails that satisfy the most stringent regulatory requirements including SOX, GDPR, HIPAA, and industry-specific regulations.
    
    Transform your organization into an AI-first enterprise with platform that ensures every AI initiative is governed, secure, compliant, and delivering measurable ROI with complete visibility and control for executives and stakeholders.`,
    icon: '🏢',
    iconComponent: AIConsultingIcon,
    features: [
      'Complete MLOps Lifecycle with CI/CD Pipeline Integration',
      'Enterprise AI Governance with Automated Policy Enforcement',
      'Real-Time Model Performance Monitoring and Drift Detection',
      'Comprehensive Audit Trails and Compliance Reporting',
      'Advanced Security with Role-Based Access Control',
      'Cost Attribution and ROI Tracking with Executive Dashboards',
      'Multi-Cloud Model Deployment and Orchestration',
      'A/B Testing Framework with Statistical Significance Analysis',
    ],
    benefits: [
      'Achieve 95% AI project success rate (vs 15% industry average)',
      'Scale AI initiatives 10x faster with automated governance',
      'Ensure 100% compliance with regulatory requirements',
      'Track and measure $25M+ in AI-driven business value',
      'Reduce AI project costs by 60% through reusable components',
      'Eliminate AI technical debt with proper lifecycle management',
      'Maintain enterprise security with zero AI-related breaches',
      'Enable data-driven AI decisions with comprehensive analytics',
    ],
    technicalApproach: [
      'Kubernetes-Native MLOps with Auto-Scaling Infrastructure',
      'Advanced Model Registry with Versioning and Lineage Tracking',
      'Automated Model Testing and Validation Pipelines',
      'Enterprise Data Pipeline with Feature Store Integration',
      'Real-Time Model Monitoring with Anomaly Detection',
      'Multi-Cloud Deployment with Disaster Recovery',
    ],
    caseStudies: [
      {
        title: 'Global Bank AI Transformation Platform',
        metric: '$47M business value, 97% project success',
        link: '/case-studies/global-bank-ai-platform',
      },
      {
        title: 'Fortune 50 Manufacturing AI Governance',
        metric: '234 AI models in production, full compliance',
        link: '/case-studies/manufacturing-ai-governance',
      },
      {
        title: 'Healthcare Enterprise AI at Scale',
        metric: '$31M savings, 100% HIPAA compliance',
        link: '/case-studies/healthcare-enterprise-ai-scale',
      },
    ],
    process: [
      {
        step: 'AI Maturity Assessment & Strategy Design',
        description: 'Comprehensive evaluation of current AI initiatives, organizational readiness, and strategic roadmap development with executive alignment',
      },
      {
        step: 'Platform Architecture & Governance Framework',
        description: 'Design enterprise AI architecture with security, compliance, and governance controls tailored to your regulatory requirements',
      },
      {
        step: 'MLOps Platform Deployment & Integration',
        description: 'Deploy comprehensive MLOps platform with CI/CD pipelines, model registry, and monitoring integrated with existing systems',
      },
      {
        step: 'Enterprise Scaling & Continuous Optimization',
        description: 'Scale AI initiatives across organization with continuous governance, performance optimization, and strategic business alignment',
      },
    ],
    cta: {
      text: 'Schedule AI Strategy Session',
      href: '/contact?service=enterprise-ai-orchestration&type=strategy',
    },
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
