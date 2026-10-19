import { ResumeData, AtsAuditMetric } from '../types/resume';

export const INITIAL_RESUME_DATA: ResumeData = {
  personalInfo: {
    fullName: 'Kosuru Likhitha',
    headline: 'Computer Science Engineering Student | Aspiring Software Developer',
    phone: '+91 9441494838',
    email: 'likhithak059@gmail.com',
    location: 'Visakhapatnam, India',
    linkedinUrl: 'https://www.linkedin.com/in/likhitha-kosuru-108393315',
    githubUrl: 'https://github.com/Likhithak309',
  },
  careerObjective:
    'Dedicated 3rd-year Computer Science Engineering student (CGPA: 9.56) and academic rank holder with solid foundations in C, Python, Java, and relational database systems. Possesses hands-on project exposure in full-stack web development (Flask, React, HTML/CSS) and workflow automation (n8n, Google AI Studio). Seeking an entry-level software engineering or web development role to apply strong analytical capabilities, contribute to real-world software solutions, and continuously expand technical expertise.',
  education: [
    {
      id: 'btech',
      degree: 'B.Tech in Computer Science and Engineering',
      institution: "Vignan's Institute of Engineering for Women, Visakhapatnam",
      year: '2024 – 2028',
      score: 'CGPA: 9.56',
      details: 'Department Academic Rank 1 in Semester 3-1',
    },
    {
      id: 'inter',
      degree: 'Intermediate (Class XII - MPC)',
      institution: 'Sri Chaitanya Junior College, Visakhapatnam',
      year: '2022 – 2024',
      score: '94.9%',
      details: 'Mathematics, Physics, and Chemistry',
    },
    {
      id: 'tenth',
      degree: 'Secondary School Certificate (Class X)',
      institution: 'Newton High School, Visakhapatnam',
      year: '2022',
      score: 'GPA: 9.54 / 10.0',
    },
  ],
  skills: {
    programming: ['C', 'Python (Foundational)', 'Java (Foundational)'],
    webDevelopment: ['HTML5', 'CSS3', 'JavaScript', 'Flask (Foundational)', 'React (Basic UI)'],
    databases: ['MySQL', 'SQLite', 'Relational Schema Design', 'SQL Queries'],
    tools: ['Git', 'GitHub', 'VS Code', 'MS Word', 'MS Excel', 'MS PowerPoint'],
    aiAndAutomation: ['Google AI Studio', 'n8n (Agentic Workflows)', 'API Integration'],
  },
  projects: [
    {
      id: 'swasthya',
      title: 'Swasthya+ – AI-Powered Wellness & Healthcare Platform',
      subtitle: 'Full-Stack Wellness Web Application',
      type: 'Team Project (Team of 5 | Guide: Ms. Mamatha Lakshmi)',
      githubUrl: 'https://github.com/Likhithak309/swastya',
      technologies: ['Python', 'Flask', 'SQLite', 'JavaScript', 'HTML5', 'CSS3', 'Chart.js', 'Git'],
      bullets: [
        'Developed a modular full-stack healthcare web application delivering personalized nutrition guidance, health insights, and wellness tracking.',
        'Integrated AI endpoints to generate tailored health recommendations based on individual user profiles, dietary preferences, and self-reported symptoms.',
        'Constructed interactive data visualization dashboards using Chart.js to track user wellness trends, medication schedules, and women’s wellness cycles.',
        'Implemented SQLite relational database models for structured data storage and coordinated version control with a 5-member team using Git/GitHub.',
      ],
    },
    {
      id: 'restaurant-finding',
      title: 'Epicurean Restaurant Discovery Web Application',
      subtitle: 'Single-Page Geolocation & Discovery Application',
      type: 'Individual Project',
      githubUrl: 'https://github.com/Likhithak309/Restaurant-finding',
      liveUrl: 'https://restaurant-finding.vercel.app',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Google Maps API', 'n8n', 'Google AI Studio', 'Git'],
      bullets: [
        'Built and deployed a responsive restaurant discovery single-page application featuring interactive split-view, list, and map navigation modes.',
        'Integrated Google Maps JavaScript & Places API for interactive venue geolocation, dynamic distance radius filtering, and venue detail modals.',
        'Embedded an AI-assisted conversational search assistant utilizing n8n agentic workflow pipelines and Google AI Studio.',
        'Implemented client-side filtering (by cuisine, rating, and price tier) along with localStorage caching for saving bookmarked venues.',
      ],
    },
  ],
  certifications: [
    {
      id: 'nptel-dbms',
      title: 'Database Management Systems (DBMS)',
      issuer: 'NPTEL (Ministry of Education, Govt. of India)',
      scoreOrDate: 'Elite Certification – 69%',
    },
    {
      id: 'infosys-html-css',
      title: 'Practical HTML5 & CSS3 Certification',
      issuer: 'Infosys Springboard',
      scoreOrDate: 'Completed with Hands-on Labs',
    },
  ],
  achievements: [
    {
      id: 'academic-rank',
      title: 'Academic Department Rank 1 (Gold Merit & Badge)',
      organization: "Vignan's Institute of Engineering for Women",
      yearOrSemester: 'Semester 3-1',
      description:
        'Secured 1st rank in academic performance across the Department of Computer Science & Engineering; recognized with official Certificate of Merit and Academic Badge.',
    },
  ],
  activities: [
    {
      id: 'sushacks',
      title: 'SusHacks 2025 National Hackathon',
      type: '24-Hour Offline Hackathon',
      durationOrDate: 'National Level',
      description:
        'Participated in an intensive 24-hour offline hackathon; collaborated on rapid ideation, agile development, and end-to-end prototyping under strict deadlines.',
    },
    {
      id: 'agentic-ai',
      title: 'Agentic AI Workshop & 24-Hour Hackathon',
      type: 'Hands-on Technical Hackathon',
      durationOrDate: '24 Hours',
      description:
        'Gained practical exposure to building autonomous AI-agent workflows, webhook integrations, and automated pipelines using n8n.',
    },
    {
      id: 'research-conclave',
      title: 'College Research Conclave',
      type: 'Technical Academic Conclave',
      durationOrDate: 'Institutional',
      description:
        'Active participant in the institutional research conclave, exploring peer research concepts, engineering solutions, and modern software paradigms.',
    },
  ],
  strengths: [
    'Problem Solving & Analytical Thinking',
    'Rapid Technology Adoption & Quick Learning',
    'Team Collaboration & Peer Communication',
    'Adaptability & Resilience',
    'Attention to Code Quality & Detail',
    'Strong Willingness to Learn & Grow',
  ],
};

export const ATS_AUDIT_DATA: AtsAuditMetric[] = [
  {
    category: 'Layout & ATS Architecture',
    score: 98,
    maxScore: 100,
    status: 'excellent',
    summary: 'Single-column layout with clean standard headings parses effortlessly across all major Applicant Tracking Systems (Workday, Taleo, Greenhouse, Lever, iCIMS).',
    strengths: [
      'No multi-column tables, text boxes, or floating frames that confuse ATS parsers',
      'No profile photos, complex graphics, circular skill meters, or progress bars',
      'Standard uppercase headings (PROFILE, EDUCATION, TECHNICAL SKILLS, PROJECTS, CERTIFICATIONS, ACHIEVEMENTS, HACKATHONS & ACTIVITIES, STRENGTHS)',
      'Clean contact row with verifiable clickable URLs and standard ASCII separators',
    ],
    improvements: [
      'Ensure standard 0.5 to 0.75-inch margins when exporting to PDF (already pre-configured in print styling)',
    ],
  },
  {
    category: 'Academic Rigor & Credentials',
    score: 98,
    maxScore: 100,
    status: 'excellent',
    summary: 'Exceptional academic consistency from Class X to B.Tech 3rd year provides an immediate competitive advantage for campus and fresher hiring.',
    strengths: [
      'Top-tier CGPA: 9.56 in B.Tech CSE at Vignan’s Institute',
      'Official Department 1st Rank badge in Semester 3-1 backed by academic certification',
      'Consistent top percentiles: 94.9% in Intermediate and 9.54 GPA in Class X',
      'Verified government-accredited NPTEL DBMS certification (69%)',
    ],
    improvements: [
      'List specific high-scoring core coursework (e.g., Data Structures, Operating Systems, Computer Networks) as semester progresses',
    ],
  },
  {
    category: 'Contact & Recruiter Readability',
    score: 96,
    maxScore: 100,
    status: 'excellent',
    summary: 'Direct, uncluttered contact block with professional email, active phone number, location, and verified GitHub & LinkedIn profiles.',
    strengths: [
      'Zero unnecessary personal data (omitted father’s name, marital status, nationality, permanent address)',
      'Direct links to active GitHub profile containing public repositories',
      'Professional email and standard international phone format (+91)',
      'Clear location headline (Visakhapatnam, India)',
    ],
    improvements: [
      'Ensure LinkedIn profile headline matches your resume title (Aspiring Software Developer)',
    ],
  },
  {
    category: 'Technical Keywords & Real Stack',
    score: 84,
    maxScore: 100,
    status: 'good',
    summary: 'Strong foundational stack covering core systems (C), high-demand scripting (Python, Java), relational databases (MySQL, SQLite), web (Flask, HTML/CSS, React), and modern tooling (Git, n8n).',
    strengths: [
      'Honest representation of foundational level (no exaggerated senior claims)',
      'High-demand software keywords: C, Python, Java, MySQL, SQLite, Flask, Git, GitHub, REST, HTML, CSS',
      'Modern emerging technology exposure: n8n workflow automation and Google AI Studio',
      'Direct tie-in between listed skills and project bullet implementations',
    ],
    improvements: [
      'To reach 90+: Add data structures & algorithms (DSA) problem counts (e.g., 100+ LeetCode problems solved)',
      'Add unit testing experience (e.g., pytest, JUnit, or basic CI/CD GitHub Actions)',
    ],
  },
  {
    category: 'Work & Enterprise Experience',
    score: 62,
    maxScore: 100,
    status: 'room_to_grow',
    summary: 'As a 3rd-year undergraduate fresher, the primary factor preventing a 95+ composite score is the absence of a 2-6 month corporate software development internship.',
    strengths: [
      'Both team collaboration (5-member guided project) and independent initiative (solo project) demonstrated',
      'Participated in competitive 24-hour hackathons (SusHacks 2025 and Agentic AI Hackathon)',
      'Projects have public GitHub repositories and a live Vercel deployment URL',
    ],
    improvements: [
      'Target an internship in software development, backend engineering, or web development for upcoming summer break',
      'Contribute to open-source repositories on GitHub to showcase collaborative pull requests and code review habits',
    ],
  },
];
