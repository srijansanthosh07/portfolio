export type ProjectCategory = "AI" | "Full-Stack" | "Mobile";

export type PortfolioProject = {
  slug: string;
  name: string;
  title: string;
  category: ProjectCategory;
  description: string;
  stack: string[];
  screenshot: string;
  problem: string;
  solution: string;
  features: string[];
  githubUrl: string | null;
  liveUrl: string | null;
};

export type CertificateCategory = "Internship" | "Course" | "Competition";

export type PortfolioCertificate = {
  name: string;
  issuer: string;
  date: string;
  category: CertificateCategory;
  file: string;
  format: "image" | "pdf";
};

export type PortfolioData = {
  personal: {
    name: string;
    title: string;
    location: string;
    email: string;
    phone: string;
    links: {
      github: string;
      linkedin: string | null;
    };
  };
  bio: string;
  education: {
    qualification: string;
    institution: string;
    period: string | null;
    result: string;
  }[];
  projects: PortfolioProject[];
  internship: {
    role: string;
    organization: string;
    location: string;
    period: string;
  };
  hackathons: {
    award: string;
    event: string;
    description: string;
    date: string;
    certificateImage?: string;
  }[];
  positions: {
    role: string;
    organization: string;
    period: string;
  }[];
  skills: {
    technical: {
      category: string;
      items: string[];
    }[];
    soft: string[];
  };
  certificates: PortfolioCertificate[];
  site: {
    logo: string;
    availabilityLabel: string;
    loadingLabel: string;
    resumeHref: string;
    resumeLabel: string;
    notFoundPage: {
      title: string;
      description: string;
      homeAction: string;
      projectsAction: string;
    };
    navigation: {
      label: string;
      href: string;
      homeHref?: string;
    }[];
    sections: {
      about: string;
      projects: string;
      hackathons: string;
      skills: string;
      certifications: string;
      resume: string;
      contact: string;
    };
    labels: {
      education: string;
      internship: string;
      positions: string;
      technicalSkills: string;
      softSkills: string;
      certificationEmpty: string;
      resumeDescription: string;
      contactDescription: string;
      footerNavigation: string;
      footerConnect: string;
      github: string;
      linkedin: string;
      email: string;
      phone: string;
      location: string;
      openMenu: string;
      closeMenu: string;
      primaryNavigation: string;
      mobileNavigation: string;
    };
    home: {
      greeting: string;
      intro: string;
      profileImage: string;
      profileImageAlt: string;
      badges: string[];
      actions: {
        exploreProjects: string;
        downloadCv: string;
        contactMe: string;
      };
      stats: {
        value: number;
        decimals: number;
        label: string;
      }[];
      statsHeading: string;
      techMarquee: string[];
      techMarqueeLabel: string;
      featuredProjectsTitle: string;
      featuredProjectsIntro: string;
      ctaHeading: string;
      ctaDescription: string;
      ctaButton: string;
    };
    about: {
      bioHeading: string;
      educationHeading: string;
      experienceHeading: string;
      interestsHeading: string;
      interests: {
        title: string;
        description: string;
      }[];
    };
    resumePage: {
      viewerTitle: string;
    };
    contactPage: {
      formHeading: string;
      nameLabel: string;
      emailLabel: string;
      messageLabel: string;
      submitLabel: string;
      sendingLabel: string;
      successMessage: string;
      errorMessage: string;
      validation: {
        nameRequired: string;
        emailRequired: string;
        emailInvalid: string;
        messageRequired: string;
      };
    };
    hackathonsPage: {
      intro: string;
      countLabel: string;
    };
    projects: {
      title: string;
      intro: string;
      filters: {
        all: string;
        ai: string;
        fullStack: string;
        mobile: string;
      };
      labels: {
        filters: string;
        viewCaseStudy: string;
        github: string;
        liveDemo: string;
        overview: string;
        problem: string;
        solution: string;
        techStack: string;
        keyFeatures: string;
        allProjects: string;
        screenshotUnavailable: string;
      };
    };
  };
};

export const portfolio: PortfolioData = {
  personal: {
    name: "Srijan Santhosh K",
    title: "AI & Data Science Student & Developer",
    location: "Melur, Madurai, Tamil Nadu",
    email: "srijansanthosh448@gmail.com",
    phone: "+91 8754186474",
    links: {
      github: "https://github.com/srijansanthosh07",
      linkedin: "https://www.linkedin.com/in/srijan-santhosh-63314632a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
  },
  bio: "AI & Data Science student with hands-on experience in data analytics, building AI-powered platforms, and a strong interest in software development. Proven hackathon winner who turns real-world problems into working solutions.",
  education: [
    {
      qualification: "B.Tech AI & DS",
      institution: "SRM TRP Engineering College",
      period: "2024-2028",
      result: "CGPA 7.7 (4th sem)",
    },
    {
      qualification: "HSC",
      institution: "RV Mat. Hr. Sec. School",
      period: null,
      result: "86.5%",
    },
    {
      qualification: "SSLC",
      institution: "RV Mat. Hr. Sec. School",
      period: null,
      result: "81.6%",
    },
  ],
  projects: [
    {
      slug: "query-manager",
      name: "Query Manager",
      title: "Citizen Grievance & Government Order Auto-Routing System",
      category: "AI",
      description:
        "Uses AI to analyze citizen complaints and route them to the right government departments.",
      screenshot: "/images/projects/query-manager.png",
      problem:
        "Citizen complaints need to reach the government departments best equipped to handle them.",
      solution:
        "AI analyzes complaint content and routes it to the appropriate government department.",
      features: [
        "AI-powered complaint analysis",
        "Automatic department routing",
        "Supabase and PostgreSQL data storage",
      ],
      stack: [
        "React",
        "TypeScript",
        "Express.js",
        "Supabase",
        "PostgreSQL",
        "Groq AI",
      ],
      githubUrl: "https://github.com/srijansanthosh07/citizen_grievance.git",
      liveUrl: null,
    },
    {
      slug: "ecosnap",
      name: "EcoSnap",
      title: "Smart Garbage Complaint Platform",
      category: "Full-Stack",
      description:
        "Real-time reporting and tracking of waste issues; Dockerized with Docker Compose.",
      screenshot: "/images/projects/ecosnap.png",
      problem:
        "Waste issues need a clear way to be reported and followed through in real time.",
      solution:
        "A web platform for reporting waste issues and tracking them as they are addressed.",
      features: [
        "Real-time waste issue reporting",
        "Complaint tracking",
        "Dockerized with Docker Compose",
      ],
      stack: [
        "Next.js",
        "React",
        "Tailwind CSS",
        "Node.js",
        "TypeScript",
        "Fastify",
        "PostgreSQL",
        "Docker",
      ],
      githubUrl: "https://github.com/srijansanthosh07/ECOSNAP.git",
      liveUrl: null,
    },
    {
      slug: "eduvision",
      name: "EduVision",
      title: "AI-Based Smart Attendance System",
      category: "Mobile",
      description:
        "Facial-recognition attendance with cloud dashboard sync.",
      screenshot: "/images/projects/eduvision.png",
      problem:
        "Attendance records need to be captured efficiently and available to a connected dashboard.",
      solution:
        "An Android attendance app that uses facial recognition and syncs records to a cloud dashboard.",
      features: [
        "Facial-recognition attendance",
        "FaceNet and MediaPipe integration",
        "Cloud dashboard sync with Supabase",
      ],
      stack: [
        "Kotlin",
        "Android",
        "Jetpack Compose",
        "FaceNet",
        "TensorFlow Lite",
        "MediaPipe",
        "Supabase",
      ],
      githubUrl: null,
      liveUrl: null,
    },
  ],
  internship: {
    role: "Data Analytics Intern",
    organization: "KevellGuru Madurai",
    location: "Madurai",
    period: "15-30 June 2026",
  },
  hackathons: [
    {
      award: "1st Prize",
      event: "Neural Forge '26",
      description: "SRM TRP",
      date: "22-23 Oct 2026",
    },
    {
      award: "3rd Prize",
      event: "SMARTATHON '26",
      description:
        "24-hour national hackathon at Dhanalakshmi Srinivasan University",
      date: "9-10 Sep 2026",
    },
    {
      award: "Grand Finalist",
      event: "TSM TECHNOVA 2026",
      description:
        "National AI Innovation Challenge at Thiagarajar School of Management",
      date: "30 Sep 2026",
    },
    {
      award: "Participation",
      event: "IGNITRRON '26",
      description:
        "National-level techno management fest at KPR Institute of Engineering and Technology, Coimbatore.",
      date: "18-19 Sep 2026",
      certificateImage:
        "/certificates/competitions/ignitrron-2026.jpeg",
    },
    {
      award: "Participation",
      event: "DataStorm 1.0 - Hack the Future",
      description:
        "Intra-college hackathon by the Data Alchemist Club at SRM TRP Engineering College, sponsored by Visionet.",
      date: "26 Mar 2026",
      certificateImage: "/certificates/competitions/datastorm-1-0.jpeg",
    },
    {
      award: "Participation",
      event: "CampusX Pitch-A-Thon 2026",
      description:
        "Startup pitch-a-thon at Jeppiaar Engineering College, focused on prototypes, mentorship and validation.",
      date: "13 Mar 2026",
      certificateImage: "/certificates/competitions/pitch-a-thon-2026.jpeg",
    },
  ],
  positions: [
    {
      role: "Student Coordinator",
      organization: "Imaginex 2026",
      period: "2026",
    },
  ],
  skills: {
    technical: [
      {
        category: "Programming",
        items: ["Python", "Java", "Kotlin", "TypeScript", "HTML", "CSS"],
      },
      {
        category: "Frontend",
        items: ["React", "Next.js", "Tailwind CSS", "Jetpack Compose"],
      },
      {
        category: "Backend & Data",
        items: [
          "Node.js",
          "Express.js",
          "Fastify",
          "PostgreSQL",
          "Supabase",
          "Data Analytics",
        ],
      },
      {
        category: "AI & Mobile",
        items: ["Groq AI", "FaceNet", "TensorFlow Lite", "MediaPipe", "Android"],
      },
      {
        category: "Tools",
        items: ["Docker", "Docker Compose", "VS Code", "GitHub"],
      },
    ],
    soft: ["Problem Solving", "Leadership", "Adaptability", "Teamwork"],
  },
  certificates: [
    {
      name: "Data Analytics Internship",
      issuer: "KevellGuru",
      date: "30 June 2026",
      category: "Internship",
      file: "/certificates/internship/kevellguru-data-analytics.jpeg",
      format: "image",
    },
    {
      name: "Power BI Data Modelling Basics",
      issuer: "Simplilearn SkillUp (Microsoft course)",
      date: "4 February 2026",
      category: "Course",
      file: "/certificates/courses/simplilearn-power-bi-data-modelling.jpeg",
      format: "image",
    },
    {
      name: "Introduction to AI and Vector Search",
      issuer: "MongoDB",
      date: "8 June 2025",
      category: "Course",
      file: "/certificates/courses/mongodb-introduction-ai-vector-search.jpeg",
      format: "image",
    },
    {
      name: "MongoDB CRUD Operations in Python",
      issuer: "MongoDB",
      date: "8 July 2025",
      category: "Course",
      file: "/certificates/courses/mongodb-crud-operations-python.jpeg",
      format: "image",
    },
    {
      name: "Machine Learning with TensorFlow",
      issuer: "Infosys Springboard",
      date: "27 January 2026",
      category: "Course",
      file: "/certificates/courses/infosys-machine-learning-tensorflow.pdf",
      format: "pdf",
    },
    {
      name: "Introduction to Machine Learning",
      issuer: "Infosys Springboard",
      date: "25 January 2026",
      category: "Course",
      file: "/certificates/courses/infosys-introduction-machine-learning.pdf",
      format: "pdf",
    },
    {
      name: "TSM TECHNOVA 2026 Grand Finalist",
      issuer: "Thiagarajar School of Management",
      date: "30 September 2026",
      category: "Competition",
      file: "/certificates/competitions/tsm-technova-2026.jpeg",
      format: "image",
    },
    {
      name: "Neural Forge '26 Hackathon - 1st Prize",
      issuer: "SRM TRP Engineering College",
      date: "22-23 October 2026",
      category: "Competition",
      file: "/certificates/competitions/neural-forge-2026.jpeg",
      format: "image",
    },
    {
      name: "DataStorm 1.0 Hackathon - Participation",
      issuer: "SRM TRP Engineering College",
      date: "26 March 2026",
      category: "Competition",
      file: "/certificates/competitions/datastorm-1-0.jpeg",
      format: "image",
    },
    {
      name: "Ignitrron '26 - Participation",
      issuer: "KPR Institute of Engineering and Technology",
      date: "18-19 September 2026",
      category: "Competition",
      file: "/certificates/competitions/ignitrron-2026.jpeg",
      format: "image",
    },
    {
      name: "Pitch-A-Thon 2026 - Participation",
      issuer: "CampusX and Jeppiaar Engineering College",
      date: "13 March 2026",
      category: "Competition",
      file: "/certificates/competitions/pitch-a-thon-2026.jpeg",
      format: "image",
    },
    {
      name: "SMARTATHON '26 - 3rd Prize",
      issuer: "Dhanalakshmi Srinivasan University",
      date: "9-10 September 2026",
      category: "Competition",
      file: "/certificates/competitions/smartathon-2026.jpeg",
      format: "image",
    },
  ],
  site: {
    logo: "🎯",
    availabilityLabel: "Open to Internships",
    loadingLabel: "Loading page",
    resumeHref: "/resume/Srijan_Resume.pdf",
    resumeLabel: "Download Resume",
    notFoundPage: {
      title: "Page not found",
      description:
        "The page you are looking for may have moved or is no longer available.",
      homeAction: "Back to Home",
      projectsAction: "Explore Projects",
    },
    navigation: [
      { label: "Home", href: "/#home" },
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      {
        label: "Hackathons",
        href: "/hackathons",
        homeHref: "/#hackathons",
      },
      { label: "Skills", href: "/#skills" },
      {
        label: "Certifications",
        href: "/certifications",
        homeHref: "/#certifications",
      },
      { label: "Resume", href: "/resume" },
      { label: "Contact", href: "/contact" },
    ],
    sections: {
      about: "About",
      projects: "Projects",
      hackathons: "Hackathons",
      skills: "Skills",
      certifications: "Certifications",
      resume: "Resume",
      contact: "Contact",
    },
    labels: {
      education: "Education",
      internship: "Internship",
      positions: "Positions",
      technicalSkills: "Technical Skills",
      softSkills: "Soft Skills",
      certificationEmpty: "Certification details will be added here.",
      resumeDescription:
        "Download my resume for a concise overview of my experience, projects, and skills.",
      contactDescription:
        "Have an opportunity or a project in mind? Get in touch.",
      footerNavigation: "Navigation",
      footerConnect: "Connect",
      github: "GitHub",
      linkedin: "LinkedIn",
      email: "Email",
      phone: "Phone",
      location: "Location",
      openMenu: "Open navigation menu",
      closeMenu: "Close navigation menu",
      primaryNavigation: "Primary navigation",
      mobileNavigation: "Mobile navigation",
    },
    home: {
      greeting: "Hi, I'm Srijan Santhosh K",
      intro:
        "I turn real-world problems into working solutions with AI, data, and thoughtful software.",
      profileImage: "/images/profile.jpg",
      profileImageAlt: "Srijan Santhosh K.",
      badges: ["Hackathon Winner", "AI & Data Science"],
      actions: {
        exploreProjects: "Explore Projects",
        downloadCv: "Download CV",
        contactMe: "Contact Me",
      },
      stats: [
        { value: 7.7, decimals: 1, label: "CGPA" },
        { value: 1, decimals: 0, label: "Internship" },
      ],
      statsHeading: "A few numbers",
      techMarquee: [
        "React",
        "TypeScript",
        "Next.js",
        "Python",
        "Kotlin",
        "PostgreSQL",
        "Supabase",
        "TensorFlow Lite",
        "Docker",
        "Tailwind CSS",
        "Fastify",
        "Groq AI",
      ],
      techMarqueeLabel: "Technologies I work with",
      featuredProjectsTitle: "Featured Projects",
      featuredProjectsIntro:
        "A few projects where I turn complex problems into useful products.",
      ctaHeading: "Looking for an engineer who ships fast?",
      ctaDescription:
        "Let’s build something useful together. I’m open to internships and exciting projects.",
      ctaButton: "Contact Me",
    },
    about: {
      bioHeading: "Bio",
      educationHeading: "Education",
      experienceHeading: "Experience & Leadership",
      interestsHeading: "What I'm interested in",
      interests: [
        {
          title: "Artificial Intelligence",
          description:
            "Building practical AI-powered tools that turn complex, real-world problems into useful solutions.",
        },
        {
          title: "Data Analytics",
          description:
            "Finding patterns in data and using evidence to support better decisions and outcomes.",
        },
        {
          title: "Full-Stack Development",
          description:
            "Creating complete applications, from thoughtful user interfaces to reliable APIs and data layers.",
        },
      ],
    },
    resumePage: {
      viewerTitle: "Resume PDF viewer",
    },
    contactPage: {
      formHeading: "Send me a message",
      nameLabel: "Your name",
      emailLabel: "Your email",
      messageLabel: "Message",
      submitLabel: "Send message",
      sendingLabel: "Sending message...",
      successMessage: "Thanks for reaching out. Your message has been sent.",
      errorMessage:
        "Your message could not be sent right now. Please try again or email me directly.",
      validation: {
        nameRequired: "Please enter your name.",
        emailRequired: "Please enter your email address.",
        emailInvalid: "Enter a valid email address.",
        messageRequired: "Please enter a message.",
      },
    },
    hackathonsPage: {
      intro:
        "A few highlights from competitive events where collaboration and creative problem-solving turn ideas into impact.",
      countLabel: "Hackathon recognitions",
    },
    projects: {
      title: "Projects",
      intro:
        "A selection of AI, full-stack, and mobile projects built to solve real problems.",
      filters: {
        all: "All",
        ai: "AI",
        fullStack: "Full-Stack",
        mobile: "Mobile",
      },
      labels: {
        filters: "Filter projects",
        viewCaseStudy: "View Case Study",
        github: "GitHub",
        liveDemo: "Live Demo",
        overview: "Overview",
        problem: "Problem",
        solution: "Solution",
        techStack: "Tech Stack",
        keyFeatures: "Key Features",
        allProjects: "All Projects",
        screenshotUnavailable: "Project screenshot will be added soon.",
      },
    },
  },
};
