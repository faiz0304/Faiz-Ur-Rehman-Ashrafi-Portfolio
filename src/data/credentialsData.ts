/* ═══════════════════════════════════════════════════════════
   Credentials Data — Educational Credentials
   Immutable data store for Faiz's academic & training records.
   ═══════════════════════════════════════════════════════════ */

// ── Type Definitions ────────────────────────────────────────

export interface Instructor {
  name: string;
  designation?: string;
  linkedIn?: string;
  photo: string;
}

export interface Module {
  module: string;
  title: string;
  topicsCount?: number;
  status?: "Completed" | "In Progress" | "Upcoming";
}

export interface Assignment {
  assignment: string;
  course: string;
  github_repo_link: string;
  project_youtube_video_link?: string;
}

export interface CourseLinks {
  instituteWeb: string;
  instituteLinkedIn?: string;
  article?: string;
  verification?: string;
  facebook?: string;
  courseUrl?: string;
  location?: string;
}

export interface Leadership {
  name: string;
  roles: string[];
  awards?: string[];
  linkedIn?: string;
  photo?: string;
  bio?: string;
}

export interface Quarter {
  id: string;
  title: string;
  domains: string[];
  level: string;
  status: string;
  duration?: string;
}

export interface Exam {
  no: string;
  course_id: string;
  title: string;
  result: string;
  score: string;
  image: string;
}

export interface CourseImages {
  logo: string;
  batchPhoto?: string;
  certificate?: string;
  achievementPhoto?: string;
}

export interface ClassInfo {
  class: string;
  title: string;
  description: string;
  tags: string[];
}

export interface Resources {
  format?: string;
  schedule?: string;
  introVideo?: string;
  podcast?: string;
}

export interface GpaRecord {
  semester: string;
  term: string;
  gpa: number;
}

export interface AcademicTerm {
  term: string;
  courses: string[];
}

export interface Credential {
  title: string;
  institute: string;
  campus: string;
  campusMapLink?: string;
  duration: string;
  status: "Completed" | "In Progress" | "Upcoming" | string;
  certification?: string;
  hackathon?: string;
  cgpa?: string;
  awards?: string[];
  links: CourseLinks;
  images: CourseImages;
  instructors?: Instructor[];
  faculty?: Instructor[];
  modules?: Module[];
  assignments?: Assignment[];
  tools?: string[];
  strategies?: string[];
  classes?: ClassInfo[];
  mission?: string;
  description?: string;
  leadership?: Leadership;
  quarters?: Quarter[];
  exams?: Exam[];
  resources?: Resources;
  gpaRecords?: GpaRecord[];
  academicTerms?: AcademicTerm[];
}

// ── Data ─────────────────────────────────────────────────────

export const CREDENTIALS_DATA: Credential[] = [
  /* ── BS Electronics Engineering Technology — Indus University ── */
  {
    "title": "BS Electronics Engineering Technology",
    "institute": "Indus University",
    "campus": "Gulshan-e-Iqbal, Karachi",
    "duration": "4 Years (Spring 2022 - Fall 2025)",
    "status": "Graduated",
    "cgpa": "3.96",
    "awards": ["Gold Medalist (1st in Family)"],
    "links": {
      "instituteWeb": "https://www.indus.edu.pk/",
      "instituteLinkedIn": "https://www.linkedin.com/school/indus-university-khi/",
      "location": "https://www.google.com/maps/place/Indus+University/@24.897793,67.0798734,17z/data=!4m6!3m5!1s0x3eb33ed99b197d7d:0xf77ba28a91dce806!8m2!3d24.897793!4d67.0798734!16s%2Fm%2F0bs5qq_?entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D"
    },
    "images": {
      "logo": "/images/institutes-logo/indus-university-logo.png"
    },
    "leadership": {
      "name": "Khalid Amin Sheikh",
      "roles": ["Chancellor & Chairman Board of Governor"],
      "photo": "/images/instructors/Chancellor-Khalid-Amin-Sheikh-Prof-Pic.png",
      "bio": "Serving since 2012. Nominated as Justice of Peace (1996-1999) & Honorary Executive First Class Magistrate."
    },
    "faculty": [
      {
        "name": "Prof. Dr. Engr. Ahmed Muddassir Khan",
        "designation": "Dean: Faculty of Engineering, Science and Technology",
        "photo": "/images/instructors/Prof.-Dr.-Engr.-Ahmed-Muddassir-Khan-Prof-Pic.png",
        "linkedIn": "https://www.linkedin.com/in/dr-ahmed-muddassir-khan-4335761a/"
      }
    ],
    "gpaRecords": [
      { "semester": "1st", "term": "Spring-2022", "gpa": 3.96 },
      { "semester": "2nd", "term": "Fall-2022", "gpa": 4.0 },
      { "semester": "3rd", "term": "Spring-2023", "gpa": 4.0 },
      { "semester": "4th", "term": "Fall-2023", "gpa": 3.93 },
      { "semester": "5th", "term": "Spring-2024", "gpa": 3.87 },
      { "semester": "6th", "term": "Fall-2024", "gpa": 4.0 },
      { "semester": "7th", "term": "Spring-2025", "gpa": 3.95 },
      { "semester": "8th", "term": "Fall-2025", "gpa": 4.0 }
    ],
    "academicTerms": [
      { "term": "Fall-2025", "courses": ["Supervised Industrial Training - II"] },
      { "term": "Spring-2025", "courses": ["Final Year Project - II", "Supervised Industrial Training - I"] },
      { "term": "Fall-2024", "courses": ["Communication Networks", "Communication Networks (Lab)", "FPGA Based Systems", "FPGA Based Systems (Lab)", "Final Year Project - I", "Industrial Automation and Robotics", "Industrial Automation and Robotics (Lab)", "Project Management"] },
      { "term": "Spring-2024", "courses": ["Applied Antenna and Wave Propagation", "Applied Antenna and Wave Propagation (Lab)", "Industrial Drives", "Industrial Drives (Lab)", "Industrial Electronics and Applications", "Industrial Electronics and Applications (Lab)", "Renewable Energy Technology", "Renewable Energy Technology (Lab)", "VLSI Technology", "VLSI Technology (Lab)"] },
      { "term": "Fall-2023", "courses": ["Amplifier and Oscillators", "Amplifier and Oscillators (Lab)", "Communication Systems and Techniques", "Communication Systems and Techniques (Lab)", "Control Technology", "Control Technology (Lab)", "Electromagnetic Field Theory", "Power Electronics", "Power Electronics (Lab)", "Technical Report Writing"] },
      { "term": "Spring-2023", "courses": ["Communication Skills", "Electrical Technology-II", "Electrical Technology-II (Lab)", "Electronic Devices and Technology", "Electronic Devices and Technology (Lab)", "Instrumentation and Measurement", "Instrumentation and Measurement (Lab)", "Microprocessors", "Microprocessors (Lab)"] },
      { "term": "Fall-2022", "courses": ["Applied Mathematics-II", "Computer Programming", "Computer Programming (Lab)", "Digital Logic Technology", "Digital Logic Technology (Lab)", "Electrical Technology-I", "Electrical Technology-I (Lab)", "PCB Design and Fabrication Workshop (Lab)", "Pakistan Studies"] },
      { "term": "Spring-2022", "courses": ["Applied Mathematics-I", "Applied Physics", "Applied Physics (Lab)", "Electrical Circuit Analysis", "Electrical Circuit Analysis (Lab)", "Electronics Workshop Practice (Lab)", "Introduction to Computer Fundamentals", "Introduction to Computer Fundamentals (Lab)", "Islamic Studies/Professional Ethics"] }
    ]
  },
  /* ── Agentic AI — S.M.I.T ───────────────────────────────── */
  {
    title: "Agentic AI",
    institute: "S.M.I.T (Saylani Mass I.T Training)",
    campus: "ZAIT",
    campusMapLink: "https://share.google/AXlJELJK1TD5Vq7uj",
    duration: "9 Months (Sep 2025 - May 2026)",
    status: "Completed",
    hackathon: "June 2026",

    links: {
      instituteWeb: "https://smit.edu.pk",
      instituteLinkedIn: "https://www.linkedin.com/school/saylani-mass-it-training/",
    },

    images: {
      logo: "/images/institutes-logo/smit-logo.png",
      batchPhoto: "/images/cohort/Agentic-AI-Batch-Photo.jpg",
    },

    instructors: [
      {
        name: "Sir Muhammad Danial Siddiqui",
        linkedIn: "https://www.linkedin.com/in/muhammaddanialsiddiqui/",
        photo: "/images/instructors/Sir-Muhammad-Danial-Siddiqui-Prof-Pic.png",
      },
      {
        name: "Sir Abu Bakar",
        linkedIn: "https://www.linkedin.com/in/abu-bakar-agentic-ai/",
        photo: "/images/instructors/Sir-Abu-Bakar-Prof-Pic.png",
      },
    ],

    modules: [
      {
        module: "Module 1",
        title: "Python Fundamentals & AI Foundations",
        topicsCount: 12,
        status: "Completed",
      },
      {
        module: "Module 2",
        title: "Machine Learning & Deep Learning",
        topicsCount: 15,
        status: "Completed",
      },
      {
        module: "Module 3",
        title: "LangChain, RAG & Agent Frameworks",
        topicsCount: 18,
        status: "Completed",
      },
      {
        module: "Module 4",
        title: "Advanced Agentic Architectures & Deployment",
        topicsCount: 20,
        status: "Completed",
      },
    ],

    assignments: [
      {
        assignment: "Class Task - Ecommerce Multi Agent Operations System",
        course: "Agentic AI",
        github_repo_link: "https://github.com/faiz0304/E-Commerce-Multi-Agent-Ops-LangGraph-Next-Js",
      },
      {
        assignment: "Build a simple AI-powered customer support agent",
        course: "Agentic AI",
        github_repo_link: "https://github.com/faiz0304/Customer-Support-Chatbot-LangGraph",
      },
      {
        assignment: "Class Project - Build RAG Chatbot",
        course: "Agentic AI",
        github_repo_link: "https://github.com/faiz0304/pizza-agent-app",
        project_youtube_video_link: "https://youtu.be/cHftjHG2Cz0?si=w77llt5tI6l3RoqW",
      },
      {
        assignment: "CRUD using Fastapi with MongoDB Usage",
        course: "Agentic AI",
        github_repo_link: "https://github.com/faiz0304/pizza-agent-app",
      },
      {
        assignment: "Class Task - Crypto BOT using LLM",
        course: "Agentic AI",
        github_repo_link: "https://github.com/faiz0304/Crypto-AI-Agent-Bot",
      },
      {
        assignment: "Class Task - LLM Tool Function Calling",
        course: "Agentic AI",
        github_repo_link: "https://github.com/faiz0304/Langchain/tree/main/Weather_AI_Agent",
      },
      {
        assignment: "Pizza Chatbot",
        course: "Agentic AI",
        github_repo_link: "https://github.com/faiz0304/pizza-agent-app",
      },
    ],
  },
  {
    title: "AI Masterclass Karachi",
    institute: "Beyond Tahir Academy (BTA)",
    campus: "Karachi",
    duration: "1 Month",
    status: "Completed",
    certification: "Certified by IBM and AAAI",
    links: {
      instituteWeb: "https://academy.beyondtahir.com/",
      instituteLinkedIn: "https://www.linkedin.com/company/beyond-tahir-academy/",
      article: "https://faiz-ai-masterclass-article.lovable.app/",
      verification: "https://academy.beyondtahir.com/verify/BTA-2026-SAHZAD",
    },
    images: {
      logo: "/images/institutes-logo/beyond_tahir_academy_logo.jpg",
      certificate: "/images/certificates/AI-Masterclass-Karachi.jpg",
      achievementPhoto: "/images/cohort/Faiz-Ur-Rehman-Asharfi-with-Sir-Muhammad-Tahir-Ashraf-Achievement-Moment.jpg",
    },
    instructors: [
      {
        name: "Sir Muhammad Tahir Ashraf",
        photo: "/images/instructors/Sir-Muhammad-Tahir-Ashraf-Prof-Pic.png",
        linkedIn: "https://www.linkedin.com/in/beyondtahir/",
      },
    ],
    tools: [
      "lovable", "make.com", "n8n", "antigravity", "openclaw", "nemoclaw", "claude code", "chatgpt", "supabase", "apify", "firecrawl", "stripe",
    ],
    strategies: [
      "How to get clients", "How to earn money", "How to change the way of approach", "How to solve real world problems",
    ],
    classes: [
      {
        class: "01",
        title: "Psychology of AI",
        description: "How AI actually thinks — mental models, hallucinations, and why prompts matter.",
        tags: ["Mental models", "Hallucinations", "How LLMs think"],
      },
      {
        class: "02",
        title: "Prompting & Vibe Coding",
        description: "Practical prompt patterns and the new way of building software with AI.",
        tags: ["Prompt patterns", "Vibe coding", "Workflow"],
      },
      {
        class: "03",
        title: "APIs & MCP",
        description: "How AI talks to the real world — APIs, tools, and the Model Context Protocol.",
        tags: ["APIs", "Tools", "MCP"],
      },
      {
        class: "04",
        title: "Automations vs Agents",
        description: "The real difference, when to use each, and what makes an agent actually agentic.",
        tags: ["Automation", "Agents", "Decision-making"],
      },
    ],
  },
  {
    title: "Certification in Prompt Engineering (BTA-CPE)",
    institute: "Beyond Tahir Academy (BTA)",
    campus: "Online",
    duration: "20 Modules",
    status: "Completed",
    certification: "Certified by IBM and AAAI",
    links: {
      instituteWeb: "https://academy.beyondtahir.com/",
      instituteLinkedIn: "https://www.linkedin.com/company/beyond-tahir-academy/",
      verification: "https://academy.beyondtahir.com/verify/BTA-2026-C31AD9",
    },
    images: {
      logo: "/images/institutes-logo/bta-logo.png",
      certificate: "/images/certificates/Certification-in-Prompt-Engineering-(BTA-CPE).jpg",
    },
    instructors: [
      {
        name: "Sir Muhammad Tahir Ashraf",
        photo: "/images/instructors/Sir-Muhammad-Tahir-Ashraf-Prof-Pic.png",
        linkedIn: "https://www.linkedin.com/in/beyondtahir/",
      },
    ],
    modules: [
      { module: "1A", title: "The Foundation of a New Era: Why Prompt Engineering is Your Ultimate Career Catalyst" },
      { module: "1B", title: "The Humanization of Data: Why Prompt Engineering Means the Difference Between Mediocrity and Monetization" },
      { module: "1C", title: "The Career Revolution: Why Prompt Engineering is the Ultimate Skill of 2026" },
      { module: "1D", title: "The Language of Machines: Understanding the Prompt and the Power of Engineering" },
      { module: "1E", title: "The Architecture of Instruction: Mastering the Three Layers of Prompting" },
      { module: "2A", title: "The Four Pillars of Precision: Mastering Prompt Engineering Fundamentals" },
      { module: "2B", title: "Strategic Logic: Mastering Ways and Patterns of Prompting" },
      { module: "3A", title: "Strategic Selection: Understanding AI Models and the Rise of Multimodality" },
      { module: "3B", title: "Advanced Prompting & AI Control Systems: Mastering the Token Economy" },
      { module: "3C", title: "Managing AI Memory: Mastering the Context Window" },
      { module: "3D", title: "Precision Over Padding: How Smart Prompting Saves Memory and Resources" },
      { module: "3E", title: "Advanced Prompting & AI Control Systems: The Power of Self-Consistency" },
      { module: "3F", title: "Strategic Branching: Mastering the Tree of Thoughts Prompting" },
      { module: "3G", title: "Agentic Intelligence: Mastering React Prompting" },
      { module: "3H", title: "Advanced Prompting & AI Control Systems: Program Aided Language (PAL)" },
      { module: "3I", title: "Self-Correction Mastery: Advanced Reflect Prompting" },
      { module: "4A", title: "Beyond 'Simple Prompting'" },
      { module: "4B", title: "Why RAG Matters in Prompt Engineering" },
      { module: "4C", title: "Smart Prompting Beyond Basics" },
      { module: "4D", title: "Turning Prompt Engineering into Income" }
    ],
  },
  {
    title: "Intro to AI for Humans",
    institute: "Beyond Tahir Academy (BTA)",
    campus: "Online",
    duration: "12 Modules",
    status: "Completed",
    links: {
      instituteWeb: "https://academy.beyondtahir.com/",
      instituteLinkedIn: "https://www.linkedin.com/company/beyond-tahir-academy/",
      verification: "https://academy.beyondtahir.com/verify/BTA-2026-6D54D9"
    },
    images: {
      logo: "/images/institutes-logo/bta-logo.png",
      certificate: "/images/certificates/Intro-to-AI-for-Human.jpg"
    },
    instructors: [
      {
        name: "Sir Muhammad Tahir Ashraf",
        photo: "/images/instructors/Sir-Muhammad-Tahir-Ashraf-Prof-Pic.png",
        linkedIn: "https://www.linkedin.com/in/beyondtahir/"
      }
    ],
    modules: [
      { module: "1", title: "What Is Artificial Intelligence?" },
      { module: "2", title: "History of Artificial Intelligence" },
      { module: "3", title: "Types of Artificial Intelligence" },
      { module: "4", title: "Impact of AI & Applications" },
      { module: "5", title: "Chatbots, AI Chatbots, and AI Agents: What’s the Real Difference?" },
      { module: "6", title: "Generative Artificial Intelligence" },
      { module: "7", title: "Machine Learning" },
      { module: "8", title: "Deep Learning" },
      { module: "9", title: "Types of AI Domains" },
      { module: "10", title: "Ethical AI" },
      { module: "11", title: "AI Governance" },
      { module: "12", title: "What Is No-Code and How Can It Help You Earn with AI?" }
    ]
  },
  {
    title: "Certified Agentic and Robotic AI Engineer (CAE)",
    institute: "PIAIC (Presidential Initiative for Artificial Intelligence & Computing)",
    campus: "Karachi",
    duration: "5 Quarters",
    status: "In Progress (Quarter 2)",
    mission: "Our mission is to build Pakistan's future-ready workforce — equipped to create AI agents that think, act, and generate value autonomously.",
    links: {
      instituteWeb: "https://www.piaic.org/",
      instituteLinkedIn: "https://www.linkedin.com/company/piaicofficial/",
      facebook: "https://www.facebook.com/piaic"
    },
    images: {
      logo: "/images/institutes-logo/piaic-logo.png"
    },
    leadership: {
      name: "Sir Zia Khan",
      roles: ["COO PIAIC", "CEO Panacloud"],
      awards: ["Tamgha-e-Imtiaz", "Honorary Ph.D.", "8x Microsoft MVP"],
      linkedIn: "https://www.linkedin.com/in/ziaukhan",
      photo: "/images/instructors/Sir-Zia-Khan-Prof-Pic.png"
    },
    instructors: [
      {
        name: "Sir Aneeq Khatri",
        photo: "/images/instructors/Sir-Aneeq-Khatri-Prof-Pic.png",
        linkedIn: "https://www.linkedin.com/in/aneeq-khatri/"
      },
      {
        name: "Sir Hamza Syed",
        photo: "/images/instructors/Sir-Hamza-Syed-Prof-Pic.png",
        linkedIn: "https://www.linkedin.com/in/webdeveloper-react-jamstack-expert/"
      }
    ],
    quarters: [
      {
        id: "AI-101",
        title: "AI-Driven Development, Claude Code, and OpenClaw Fundamentals",
        domains: ["Claude Code", "OpenClaw", "AI Agents", "Markdown Specs"],
        level: "Contributes to Level 1",
        status: "Completed (Passed)",
        duration: "Dec 2025 - April 2026"
      },
      {
        id: "AI-151",
        title: "Context Engineering, Spec-Driven Development, and Advanced Claude Code",
        domains: ["Context Engineering", "Agentic Workflows", "Version Control"],
        level: "Earns Level 1: Certified Agentic AI Foundations",
        status: "Started (Jun 2026)"
      },
      {
        id: "AI-251",
        title: "Learn to Think and Program in the AI Era",
        domains: ["Python", "Type-Driven AI", "Testing", "OOP", "CLI & APIs"],
        level: "Earns Level 2: Certified Agentic AI Developer",
        status: "Upcoming"
      },
      {
        id: "AI-321",
        title: "Building AI Agent Factory + CCA-F (Anthropic)",
        domains: ["Claude Agent SDK", "MCP", "FastAPI", "RAG", "+ CCA-F Domains"],
        level: "Earns Level 3 + CCA-F",
        status: "Upcoming"
      },
      {
        id: "AI-451",
        title: "Deploying Agent Factories in the Cloud",
        domains: ["Docker", "Kubernetes", "Kafka", "CI/CD", "Multi-Cloud"],
        level: "Earns Level 4: Certified Agentic AI Architect",
        status: "Upcoming"
      }
    ],
    exams: [
      {
        no: "1",
        course_id: "PIAIC-B81",
        title: "Agent Factory Fundamentals: Building Digital Full-Time Equivalents (FTEs)",
        result: "Passed",
        score: "70%",
        image: "/images/certificates/AI-101-Exam-1-Result.png"
      },
      {
        no: "2",
        course_id: "PIAIC-B81",
        title: "General Agents Fundamentals Part 1",
        result: "Very Good!",
        score: "83.08%",
        image: "/images/certificates/AI-101-Exam-2-Result.png"
      }
    ]
  },
  {
    title: "Agentic AI Architect Program: AI-50 Your First AI Employee",
    institute: "Panaversity",
    campus: "Online",
    duration: "7 Lectures (14h 30m)",
    status: "In Progress (Since Apr 2026)",
    mission: "Learn Agentic AI From The Team Building It: Panaversity pairs academic direction with hands-on engineering leadership, so learners move from concepts to production-ready agentic systems.",
    description: "A hands-on series covering AI employees from first install to deployment. Set up OpenClaw with WhatsApp/Telegram, teach it custom skills with safety boundaries, orchestrate Claude Code from your phone, connect Google Workspace, and automate compound workflows.",
    links: {
      instituteWeb: "https://panaversity.org/",
      instituteLinkedIn: "https://www.linkedin.com/company/panaversity/",
      courseUrl: "https://panaversity.org/courses/AI-50"
    },
    images: {
      logo: "/images/institutes-logo/panaveristy-p-logo.png"
    },
    leadership: {
      name: "Sir Zia Khan",
      roles: ["CEO Panaversity", "Nation-Transforming Social Entrepreneur"],
      awards: ["Tamgha-e-Imtiaz", "Honorary Ph.D.", "8x Microsoft MVP"],
      linkedIn: "https://www.linkedin.com/in/ziaukhan",
      photo: "/images/instructors/Sir-Zia-Khan-Prof-Pic.png"
    },
    instructors: [
      {
        name: "M. Junaid Shaukat",
        designation: "Chief Technical Officer, Panaversity",
        photo: "/images/instructors/Sir-Muhammad-Junaid-Shaukat-Prof-Pic.png",
        linkedIn: "https://www.linkedin.com/in/mrjunaid/"
      },
      {
        name: "Wania Kazmi",
        designation: "Chief Agentic AI Officer, Panaversity",
        photo: "/images/instructors/Miss-Wania-Kazmi-Prof-Pic.png",
        linkedIn: "https://www.linkedin.com/in/waniakazmi/"
      },
      {
        name: "M. Rehan ul Haq",
        designation: "Chief AI Officer, Panaversity",
        photo: "/images/instructors/Sir-Muhammad-Rehan-Ul-Haq-Prof-Pic.png",
        linkedIn: "https://www.linkedin.com/in/m-rehan-ul-haq-333bb6363/"
      }
    ],
    resources: {
      format: "Pre-Recorded Lectures (Self-paced)",
      schedule: "Wednesdays 20:00 (GMT+5)",
      introVideo: "https://youtu.be/3e1U4VB3S-E?si=blGLwXmi1eDl5KCo",
      podcast: "https://youtu.be/QsBDg2-2-uI?si=N53ixJd0iZnoms4V"
    }
  }
];
