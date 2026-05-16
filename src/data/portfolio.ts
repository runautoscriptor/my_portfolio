export type SocialIcon = 'github' | 'linkedin' | 'mail';
export type SkillIcon = 'manual' | 'automation' | 'mobile' | 'api';

export interface NavItem {
  id: string;
  label: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: SocialIcon;
}

export interface StatItem {
  label: string;
  description: string;
  value: number;
  suffix?: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface SkillCategory {
  title: string;
  summary: string;
  badge: string;
  icon: SkillIcon;
  items: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  summary: string;
  achievements: string[];
  stack: string[];
}

export interface ProjectItem {
  title: string;
  summary: string;
  impact: string;
  metrics: string[];
  tags: string[];
  links: {
    caseStudy: string;
    source: string;
  };
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
  status: string;
  link: string;
}

export const profile = {
  name: 'Vikas Kumar Singh',
  role: 'Software Test Engineer',
  experience: '1+ years',
  location: 'India',
  email: 'vikaskumarsinghqa@gmail.com',
  heroTitle: 'I build release confidence through sharp testing instincts and scalable QA automation.',
  heroSummary:
    'Software Test Engineer with hands-on experience across manual, automation, mobile, and API testing. Focused on growing into an advanced Automation QA Engineer who ships quality at speed.',
  goal: 'Transitioning into advanced Automation QA Engineering',
  availability: 'Open to QA Automation opportunities',
};

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

export const heroPhrases = [
  'Validating every release with intent.',
  'Turning regression into reliable automation.',
  'Designing QA systems that scale with product velocity.',
];

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href:'https://github.com/vikaskumarsingh20', icon: 'github' },
  { label: 'LinkedIn', href:'https://www.linkedin.com/in/vikaskumarsingh24/', icon: 'linkedin' },
  { label: 'Email', href: 'mailto:vikaskumarsinghqa@gmail.com', icon: 'mail' },
];

export const stats: StatItem[] = [
  {
    label: 'Test cases executed',
    description: 'Functional, smoke, sanity, regression, and exploratory coverage',
    value: 100,
    suffix: '+',
  },
  {
    label: 'Automation scenarios built',
    description: 'End-to-end flows across Playwright, Cypress, and Appium',
    value: 28,
    suffix: '+',
  },
  {
    label: 'API suites designed',
    description: 'REST validation flows built with Postman collections',
    value: 16,
    suffix: '+',
  },
  {
    label: 'Release cycles supported',
    description: 'Consistent QA feedback loops for fast-moving product teams',
    value: 12,
    suffix: '+',
  },
];

export const aboutTimeline: TimelineItem[] = [
  {
    year: '2023',
    title: 'Started the QA journey',
    description:
      'Built a foundation in functional, smoke, sanity, and exploratory testing while learning how product quality is shaped before release.',
  },
  {
    year: '2024',
    title: 'Moved into structured automation',
    description:
      'Introduced automation coverage with Playwright and Cypress to reduce repetitive manual checks and improve sprint confidence.',
  },
  {
    year: '2025',
    title: 'Expanded into mobile and API validation',
    description:
      'Broadened ownership into Appium-based mobile checks and REST API testing through Postman and reusable test collections.',
  },
  {
    year: 'Next',
    title: 'Evolving into advanced Automation QA',
    description:
      'Deepening framework design, CI-ready automation thinking, and quality engineering practices for end-to-end release acceleration.',
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: 'Manual Testing',
    summary: 'Risk-based validation across user journeys, releases, and exploratory sessions.',
    badge: 'Human insight',
    icon: 'manual',
    items: ['Functional Testing', 'Regression Testing', 'Smoke Testing', 'Sanity Testing', 'Exploratory Testing'],
  },
  {
    title: 'Automation QA',
    summary: 'Web automation crafted for repeatability, confidence, and maintainability.',
    badge: 'Scalable coverage',
    icon: 'automation',
    items: ['Playwright', 'Cypress', 'Reusable test design', 'Cross-browser verification', 'Regression acceleration'],
  },
  {
    title: 'Mobile Testing',
    summary: 'Mobile validation built around real interaction flows and device behavior.',
    badge: 'Cross-device quality',
    icon: 'mobile',
    items: ['Appium', 'Android testing flows', 'UI validation', 'Smoke automation', 'Defect reproduction'],
  },
  {
    title: 'API Testing',
    summary: 'Service-level validation for dependable integrations and backend confidence.',
    badge: 'Contract confidence',
    icon: 'api',
    items: ['Postman', 'REST APIs', 'Collection workflows', 'Status and payload checks', 'Environment-based testing'],
  },
];

export const experienceItems: ExperienceItem[] = [
  {
    company: 'Excellence Technologies Private Limited',
    role: 'Software Test Engineer',
    period: '2025 - Present',
    location: 'On-site',
    type: 'Full-time',
    summary:
      'Owning sprint-level quality coverage for a customer-facing web platform through manual testing, regression planning, and targeted automation support.',
    achievements: [
      'Executed regression, smoke, sanity, and exploratory cycles across fast-moving release windows.',
      'Collaborated closely with developers and product teams to clarify acceptance criteria before release.',
      'Extended automation coverage with Playwright and Cypress for high-value user journeys.',
    ],
    stack: ['Playwright', 'Cypress', 'Manual QA', 'Bug Reporting', 'Release Validation'],
  },
  {
    company: 'Infneon Technologies Private Limited',
    role: 'QA Analyst',
    period: '2025 - 2026',
    location: 'On-site',
    type: 'Internship',
    summary:
      'Built the early QA foundation across web, mobile, and API surfaces while learning how to convert manual coverage into repeatable test assets.',
    achievements: [
      'Created detailed test scenarios and tracked defects with clear reproduction steps and severity context.',
      'Validated REST APIs through Postman and supported mobile smoke testing flows with Appium-based checks.',
      'Improved release readiness by documenting edge cases and reducing late-cycle surprises.',
    ],
    stack: ['Postman', 'Appium', 'Functional Testing', 'API Validation', 'Documentation'],
  },
];

export const projects: ProjectItem[] = [
  {
    title: 'Playwright Regression Command Center',
    summary:
      'A modular Playwright framework designed to run regression-ready browser suites with cleaner fixtures, reusable page objects, and environment-based test data.',
    impact: 'Reduced repetitive browser checks and improved release-day confidence.',
    metrics: ['Cross-browser runs', 'Reusable page object model', 'Environment-aware test execution'],
    tags: ['Playwright', 'Automation Framework', 'Regression QA'],
    links: {
      caseStudy: 'https://linkedin.com/in/demo',
      source: 'https://github.com/demo',
    },
  },
  {
    title: 'Postman API Validation Workspace',
    summary:
      'A structured API testing setup with collections, environments, and assertions for reliable REST validation across core service workflows.',
    impact: 'Created quicker feedback loops for backend changes before UI validation began.',
    metrics: ['REST endpoint checks', 'Environment-based collections', 'Response and status assertions'],
    tags: ['Postman', 'REST APIs', 'QA Workflow'],
    links: {
      caseStudy: 'https://linkedin.com/in/demo',
      source: 'https://github.com/demo',
    },
  },
  {
    title: 'Appium Mobile Smoke Suite',
    summary:
      'A lightweight mobile smoke framework focused on critical-path Android validation, helping catch visible UI breakage before full release testing.',
    impact: 'Brought faster mobile confidence into the release checklist.',
    metrics: ['Critical journey coverage', 'Smoke automation flows', 'Reusable device test setup'],
    tags: ['Appium', 'Mobile QA', 'Smoke Testing'],
    links: {
      caseStudy: 'https://linkedin.com/in/demo',
      source: 'https://github.com/demo',
    },
  },
];

export const certifications: CertificationItem[] = [
  {
    title: 'Playwright Automation Testing Track',
    issuer: 'QA Learning Studio',
    year: '2025',
    status: 'Completed',
    link: 'https://github.com/demo',
  },
  {
    title: 'Postman API Fundamentals',
    issuer: 'API Testing Academy',
    year: '2024',
    status: 'Completed',
    link: 'https://github.com/demo',
  },
  {
    title: 'Mobile Test Automation with Appium',
    issuer: 'Automation Practice Lab',
    year: '2024',
    status: 'Completed',
    link: 'https://github.com/demo',
  },
];
