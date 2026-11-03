export const t = {
  navigation: ["About", "Projects", "Skills", "Experience", "Education", "Contact"],
  downloadCv: "Download CV",
  menu: "Menu",
  close: "Close",
  toggleTheme: "Toggle light / dark theme",
  hero: {
    title: "CIS Student | Software Developer",
    headline: "Building practical software with Flutter, web, and solid backends.",
    viewProjects: "View projects",
    emailMe: "Email me",
  },
  about: {
    eyebrow: "About",
    heading: "Software with a practical edge",
    description:
      "IT student specializing in software engineering and mobile app development using Flutter. Experienced in building responsive user interfaces, integrating RESTful APIs with PHP and MySQL backends, and database management. I look for practical software solutions that combine high performance with a seamless user experience.",
    languages: "Languages",
    languageLevels: ["Native", "Professional working proficiency"],
  },
  projects: {
    eyebrow: "My Projects",
    heading: "Projects",
    empty: "No projects have been added yet.",
    openSite: "Open Site",
    viewCode: "View Code",
    comingSoon: "Coming soon",
    askAbout: "Ask about it",
    imageSoon: "Screenshot coming soon",
    descriptions: {
      "Smart Tank":
        "Graduation project: an IoT app built with Flutter and Laravel for real-time tank monitoring. Reads sensor data to display water levels continuously and sends instant Firebase alerts so users can manage tanks efficiently.",
      SolarMate:
        "A mobile app for calculating solar energy loads. Built with Flutter for a cross-platform experience, a PHP and MySQL backend, and a Laravel admin dashboard for data and user management. Helps estimate solar panel requirements and energy consumption.",
      "Warehouse Management App":
        "A warehouse management application built with Python and SQL to track inventory, stock levels, and orders.",
      "Edu-Bridge":
        "Selected by the department head to help complete the institute's educational automation platform and make studying easier for students. Contributed to frontend and backend development for the app and website serving students, teachers, department heads, administration, student affairs, and parents. Built with Laravel, Flutter, and MySQL; deployed on the institute's internal server and currently in use.",
    },
  },
  skills: {
    eyebrow: "Expertise",
    heading: "Skills",
    empty: "No skills have been added yet.",
    categories: {
      Mobile: "Mobile",
      Frontend: "Frontend",
      Backend: "Backend",
      "UI/UX": "UI/UX",
      Tools: "Tools",
      "Soft Skills": "Soft Skills",
    },
    names: {},
  },
  experience: {
    eyebrow: "Work",
    heading: "Experience",
    role: "Trainee — Technical & Software Support",
    organization: "UNRWA Headquarters",
    period: "Jul 2026 – Present",
    location: "UNRWA",
    points: [
      "Technical and software support across internal systems.",
      "Backend, website, and mobile application programming and development.",
    ],
  },
  education: {
    eyebrow: "Studies",
    heading: "Education",
    diploma: "Diploma in Computer Information Systems (CIS)",
    periods: ["Oct 2024 – Jul 2026"],
    locations: ["Damascus"],
    institute: "Damascus Intermediate Institute",
    tagDtc: "UNRWA DTC",
    grade: "Grade: Good",
    officialDiploma: "Official Diploma",
    viewCertificate: "View Certificate",
  },
  contact: {
    eyebrow: "Contact",
    heading: "Let's build something useful.",
    description:
      "Open to internships, freelance work, and collaboration on mobile and web products.",
    email: "Email",
    phone: "Phone",
    location: "Location",
  },
  footer: "Damascus · Flutter · Web · Backend",
  ui: {
    scroll: "Scroll to explore",
    available: "Available for work",
    backToTop: "Back to top",
    skip: "Click to skip",
    dragHint: "Keep scrolling",
    languageNames: ["Arabic", "English"],
  },
} as const;
