export const personalInfo = {
  name: 'Henish Patel',
  nickname: 'Harry',
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
    src: 'profile/henish-suit.jpeg',
    alt: 'Henish Patel in a suit',
    position: '50% 20%',
  },
  {
    src: 'profile/henish-nyc.jpeg',
    alt: 'Henish Patel with NYC skyline at night',
    position: '50% 18%',
  },
  {
    src: 'profile/henish-selfie.jpeg',
    alt: 'Henish Patel portrait selfie',
    position: '50% 26%',
  },
]

export const personalIdentity = {
  name: 'Henish Patel',
  nickname: 'Harry',
  note:
    'I go by Henish or Harry. I have lived in Utah for the last 10 years (and still do), while my childhood before age 12 was in New York and New Jersey.',
}

export const lifestyleInterests = [
  'Basketball',
  'Soccer / Football',
  'Knicks Fan',
  'New York Giants Fan',
  'Real Madrid Fan',
  'Chelsea Fan',
  'Gym Sessions',
  'Hanging Out with Friends',
  'Watching Live Sports',
  'Occasional Travel',
  'Style & Fashion (minimal but intentional)',
  'BAPS Community Involvement',
]

export const funFacts = [
  {
    title: 'Game-Day Energy',
    text: 'I regularly watch Knicks matches and football fixtures, and I enjoy breaking down strategy and momentum swings just like I do in technical systems.',
  },
  {
    title: 'On-Court Habit',
    text: 'I play basketball as often as I can. It keeps me competitive, sharp under pressure, and focused on fundamentals.',
  },
  {
    title: 'Style Philosophy',
    text: 'I am into fashion enough to care about clean fits and details, but I keep it practical and grounded.',
  },
  {
    title: 'Social + Recharge',
    text: 'Best reset is simple: gym session, hoop run, time with friends, and planning the next trip when possible.',
  },
  {
    title: 'Leadership Background',
    text: 'I attended Utah Military Academy, completed JROTC, and served as a Cadet Major, which strengthened my leadership and accountability mindset.',
  },
  {
    title: 'Faith + Values',
    text: 'My involvement with BAPS gave me a strong religious and cultural foundation centered on discipline, humility, service, and consistency.',
  },
  {
    title: 'Operations Perspective',
    text: 'Through family businesses in motel and gas-station operations, including exposure to Days Inn and Best Western environments, I learned to think in terms of service reliability and real-world operations.',
  },
]

export const backgroundStory = [
  'I have lived in Utah for 10 years and currently live there.',
  'Before age 12, my childhood was in New York and New Jersey.',
  'Utah Military Academy background with JROTC experience.',
  'Served as a Cadet Major and led with structure and discipline.',
  'BAPS involvement shaped my religious/cultural values and service mindset.',
  'Family-business exposure across motel and gas-station operations.',
  'Comfortable balancing technical work with people, process, and service quality.',
]

export const navigation = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Beyond Code', href: '#beyond', id: 'beyond' },
  { label: 'Team Pulse', href: '#team-pulse', id: 'team-pulse' },
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
