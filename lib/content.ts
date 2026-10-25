export const profile = {
  name: "Wasem Khalifa",
  firstName: "Wasem",
  title: "CIS Student | Software Developer",
  location: "Damascus, Syria",
  email: "wkh112006@gmail.com",
  phone: "+963954343673",
  phoneDisplay: "+963 954 343 673",
  cvUrl: "/Waseem_Khalifa_CV.pdf",
  photoUrl: "/waseem-khalifa.jpg",
  headline: "Building practical software with Flutter, web, and solid backends.",
  about:
    "IT student specializing in software engineering and mobile app development using Flutter. Experienced in building responsive user interfaces, integrating RESTful APIs with PHP and MySQL backends, and database management. I look for practical software solutions that combine high performance with a seamless user experience.",
  languages: [
    { name: "Arabic", level: "Native" },
    { name: "English", level: "Professional working proficiency" },
  ],
  github: "https://github.com/wkh112006-source",
  linkedin: "https://linkedin.com/in/waseemkhalifa",
  whatsapp: "https://wa.me/963954343673",
};

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
] as const;

export type Project = {
  id: string;
  title: string;
  description: string;
  githubUrl: string | null;
  liveUrl: string | null;
  // Drop a file in /public and set e.g. "/projects/edu-bridge.jpg".
  image: string | null;
  techStack: string;
};

export const projects: Project[] = [
  {
    id: "edu-bridge",
    title: "Edu-Bridge",
    description:
      "Selected by the department head to help complete the institute's educational automation platform and make studying easier for students. Contributed to frontend and backend development for the app and website serving students, teachers, department heads, administration, student affairs, and parents. Built with Laravel, Flutter, and MySQL; deployed on the institute's internal server and currently in use.",
    githubUrl: null,
    liveUrl: null,
    image: null,
    techStack: "Laravel, Flutter, MySQL",
  },
  {
    id: "smart-tank",
    title: "Smart Tank",
    description:
      "Graduation project: an IoT app built with Flutter and Laravel for real-time tank monitoring. Reads sensor data to display water levels continuously and sends instant Firebase alerts so users can manage tanks efficiently.",
    githubUrl: null,
    liveUrl: null,
    image: null,
    techStack: "Flutter, Laravel, Firebase, IoT",
  },
  {
    id: "solarmate",
    title: "SolarMate",
    description:
      "A mobile app for calculating solar energy loads. Built with Flutter for a cross-platform experience, a PHP and MySQL backend, and a Laravel admin dashboard for data and user management. Helps estimate solar panel requirements and energy consumption.",
    githubUrl: null,
    liveUrl: null,
    image: null,
    techStack: "Flutter, PHP, MySQL, Laravel",
  },
  {
    id: "warehouse-management",
    title: "Warehouse Management App",
    description:
      "A warehouse management application built with Python and SQL to track inventory, stock levels, and orders.",
    githubUrl: null,
    liveUrl: null,
    image: null,
    techStack: "Python, SQL",
  },
];

export const skills = [
  { id: "flutter", name: "Flutter", category: "Mobile", icon: "📱" },
  { id: "dart", name: "Dart", category: "Mobile", icon: null },
  { id: "html", name: "HTML", category: "Frontend", icon: null },
  { id: "css", name: "CSS", category: "Frontend", icon: null },
  { id: "javascript", name: "JavaScript", category: "Frontend", icon: null },
  { id: "react", name: "React.js", category: "Frontend", icon: null },
  { id: "nextjs", name: "Next.js", category: "Frontend", icon: null },
  { id: "wordpress", name: "WordPress", category: "Frontend", icon: null },
  { id: "laravel", name: "Laravel", category: "Backend", icon: null },
  { id: "php", name: "PHP", category: "Backend", icon: null },
  { id: "python", name: "Python", category: "Backend", icon: null },
  { id: "aspnet-core", name: "ASP.NET Core", category: "Backend", icon: null },
  { id: "csharp", name: "C#", category: "Backend", icon: null },
  { id: "mysql", name: "MySQL", category: "Backend", icon: null },
  { id: "sql-server", name: "SQL Server", category: "Backend", icon: null },
  { id: "figma", name: "Figma", category: "UI/UX", icon: "🎨" },
  { id: "git-github", name: "Git / GitHub", category: "Tools", icon: null },
  { id: "systems-analysis", name: "Systems Analysis", category: "Tools", icon: null },
  { id: "microsoft-office", name: "Microsoft Office", category: "Tools", icon: null },
  {
    id: "ai-tools",
    name: "ChatGPT / Claude / Gemini",
    category: "Tools",
    icon: null,
  },
  { id: "time-management", name: "Time Management", category: "Soft Skills", icon: null },
  {
    id: "pressure",
    name: "Working Under Pressure",
    category: "Soft Skills",
    icon: null,
  },
  {
    id: "teamwork",
    name: "Teamwork & Collaboration",
    category: "Soft Skills",
    icon: null,
  },
];

export const experience = [
  {
    role: "Trainee — Technical & Software Support",
    org: "UNRWA Headquarters",
    period: "Jul 2026 – Present",
    location: "UNRWA",
    points: [
      "Technical and software support across internal systems.",
      "Backend, website, and mobile application programming and development.",
    ],
  },
];

export const education = [
  {
    title: "Diploma in Computer Information Systems (CIS)",
    org: "UNRWA DTC",
    period: "Oct 2024 – Jul 2026",
    location: "Damascus",
  },
  {
    title: "High School Certificate",
    org: "Al-Saada Private High School",
    period: "Sep 2021 – Jun 2024",
    location: "Old City of Damascus",
  },
];
