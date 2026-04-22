export const personalInfo = {
  name: 'Henish Patel',
  title: 'Software Engineer & AI/Data Systems Builder',
  tagline:
    'I design and ship performance-focused software systems that turn complex data and workflows into clear, measurable outcomes.',
  email: 'harrypatel1214@gmail.com',
  phone: 'Available upon request',
  github: 'https://github.com/HenishPatel1214',
  linkedin: 'https://www.linkedin.com/in/henishpatel2004/',
  education: 'University of Utah — Computer Science (GPA 3.57), Data Science Minor',
}

export const headshots = [
  {
    src: 'profile/henish-avatar.jpg',
    alt: 'Henish Patel portrait',
  },
  {
    src: 'profile/henish-portrait-2.jpg',
    alt: 'Henish Patel professional headshot',
  },
  {
    src: 'profile/henish-portrait-3.jpg',
    alt: 'Henish Patel profile photo',
  },
]

export const navigation = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]

export const quickStats = [
  { label: 'GPA', value: '3.57', context: 'Computer Science, University of Utah' },
  { label: 'Ops Efficiency', value: '+30%', context: 'Manual tracking reduced in disaster response workflows' },
  { label: 'Response Speed', value: '+25%', context: 'Faster operational response through dashboard + GIS systems' },
]

export const aboutHighlights = [
  {
    title: 'Systems-First Mindset',
    detail:
      'I focus on building resilient systems that are easy to operate, observe, and improve over time.',
  },
  {
    title: 'Data to Decisions',
    detail:
      'From ETL pipelines to analytics dashboards, I build workflows that help teams act faster and with confidence.',
  },
  {
    title: 'Execution Under Feedback',
    detail:
      'I ship quickly, gather user feedback, and iterate with discipline to maximize real-world value.',
  },
]

export const experiences = [
  {
    role: 'Software Engineer',
    company: 'mySpecSheet (Startup)',
    period: '2025 - Present',
    summary:
      'Developed product-facing tooling and interactive UI systems for faster user feedback loops and stronger product delivery.',
    highlights: [
      'Built a desktop application foundation using VSCode OSS as the base architecture.',
      'Integrated Shadcn UI components to improve consistency and development velocity.',
      'Developed a web-based viewer using Electron for streamlined cross-surface experiences.',
      'Gathered user feedback continuously and iterated rapidly on usability + performance.',
    ],
    stack: ['Electron', 'React', 'Shadcn UI', 'VSCode OSS'],
  },
  {
    role: 'SUDO Software Platform Services Intern',
    company: 'University of Utah',
    period: '2024 - 2025',
    summary:
      'Built operational analytics and geospatial tools supporting disaster-response planning and execution.',
    highlights: [
      'Created dashboards and GIS-based map systems for disaster response coordination.',
      'Reduced manual tracking by approximately 30% through workflow automation.',
      'Improved operational response time by approximately 25% through clearer data visibility.',
      'Analyzed ServiceNow data with Python, Matplotlib, and Jupyter; increased process efficiency by approximately 15%.',
    ],
    stack: ['Python', 'Matplotlib', 'Jupyter', 'ServiceNow', 'GIS'],
  },
  {
    role: 'Data Analyst Intern',
    company: 'University of Utah Health',
    period: '2023 - 2024',
    summary:
      'Owned automation and reporting improvements across data ingestion, workflow migration, and KPI visibility.',
    highlights: [
      'Built ETL pipelines with Python and Pandas to improve reporting data quality.',
      'Migrated reporting workflows into ServiceNow and Jira for standardized tracking.',
      'Automated Excel reporting with Power Query and PivotTables.',
      'Reduced manual review effort by approximately 30% through automation.',
    ],
    stack: ['Python', 'Pandas', 'Excel', 'Power Query', 'Jira', 'ServiceNow'],
  },
]

export const projectFilters = ['All', 'AI/Data', 'Full-Stack', 'Systems']

export const projects = [
  {
    title: 'Local AI Cluster',
    category: 'AI/Data',
    description:
      'Built a 5-node macOS cluster using MLX to run and benchmark frontier local models including Llama 3 and DeepSeek variants.',
    impact:
      'Enabled local experimentation with up to 70B+ models while tracking latency, throughput (tokens/sec), and memory usage under realistic loads.',
    stack: ['Python', 'MLX', 'Distributed Systems', 'LLM Inference'],
    github: 'https://github.com/HenishPatel1214/Projects',
  },
  {
    title: 'NFL Technical Analysis Engine',
    category: 'Full-Stack',
    description:
      'Engineered an interactive technical analysis platform for football plays with frame-level visualization and play animation.',
    impact:
      'Improved decision clarity for play breakdown through dynamic frame selection and real-time visual context.',
    stack: ['JavaScript', 'Plotly', 'Data Visualization', 'UI Engineering'],
    github: 'https://github.com/HenishPatel1214/Projects',
  },
  {
    title: 'Chicago Transit Data System',
    category: 'AI/Data',
    description:
      'Built a data processing and analysis pipeline over public transit datasets to extract performance and reliability insights.',
    impact:
      'Produced actionable reports and structured datasets for operational analysis using Python, SQL, and Excel workflows.',
    stack: ['Python', 'SQL', 'Excel', 'Data Engineering'],
    github: 'https://github.com/HenishPatel1214/Projects',
  },
  {
    title: 'Spec Viewer Product Surface',
    category: 'Systems',
    description:
      'Created an Electron-based viewer surface integrated with desktop workflows for startup product iteration and testing.',
    impact:
      'Shortened product-feedback cycles by consolidating visualization, interaction, and review into one tooling surface.',
    stack: ['Electron', 'React', 'Shadcn UI', 'Desktop Apps'],
    github: 'https://github.com/HenishPatel1214',
  },
]

export const skills = {
  Languages: ['Python', 'Java', 'C++', 'C#', 'C', 'JavaScript', 'SQL', 'Bash', 'Assembly'],
  'Frameworks & Tools': [
    'React',
    'TensorFlow',
    'PyTorch',
    'Pandas',
    'NumPy',
    'Plotly',
    'Tableau',
    'Jupyter',
  ],
  Platforms: ['AWS', 'GCP', 'Docker', 'Git', 'PostgreSQL', 'MySQL', 'ServiceNow', 'Jira'],
}

export const contactLinks = [
  {
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
  },
  {
    label: 'Phone',
    value: personalInfo.phone,
    href: null,
  },
  {
    label: 'GitHub',
    value: 'github.com/HenishPatel1214',
    href: personalInfo.github,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/henishpatel2004',
    href: personalInfo.linkedin,
  },
]
