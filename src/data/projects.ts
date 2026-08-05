import type { Project } from "../types";

export const projects: Project[] = [
{
      title: "FitOps Gym Management System",
    description:
      "Developed a full-stack gym management system with secure authentication, role-based access control, member management, membership management, and RESTful API integration. Built using React, Laravel, MySQL, and Tailwind CSS, then deployed to a live production environment.",
    image: "/fitops.png",
    tech: [
      "React",
      "Laravel",
      "MySQL",
      "Tailwind CSS",
      "REST API",
      "Laravel Sanctum",
      "Spatie Permission",
      "Hostinger",
    ],
    live: "https://fitops.site/",
    featured: true,
},

  {
    title: "MikeMadz Online Ordering System",
    description:
      "Developed a full-stack frozen food ordering and inventory management system featuring product management, real-time inventory tracking, secure user authentication, order processing, reporting, and an intuitive shopping experience.",
    image: "/projectt.png",
    tech: ["PHP", "MySQL", "Bootstrap", "SwiperJS", "FontAwesome"],
    live: "https://mikemadz.com",
    featured: true,
  },
  {
    title: "Client Profiling System",
    description:
      "Developed a cross-platform mobile application during my internship at VPD Business Solutions Inc. Integrated with Laravel REST APIs for client profiling, field operations, and business reporting.",
    tech: ["Flutter", "Dart", "Laravel", "REST API", "MySQL"],
    featured: true,
    mobileShowcase: [
      {
        image: "/login.jpg",
        title: "Login Screen",
        description: "Secure authentication for authorized users.",
      },
      {
        image: "/das.jpg",
        title: "Dashboard",
        description: "Overview of clients and quick actions.",
      },
      {
        image: "/calendar.jpg",
        title: "Calendar",
        description: "Manage client schedules and appointments.",
      },
      {
        image: "/client.jpg",
        title: "Client Details",
        description: "Complete client profile information.",
      },
    ],
  },
  
];
