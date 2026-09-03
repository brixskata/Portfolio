import type { Project } from "../types";

export const projects: Project[] = [
{
    id: "fitops",
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
    media: {
      hero: "/fitops.png",
      screenshots: [
        { src: "/fitopsadmin.png", title: "Admin Dashboard", description: "FitOps management interface for gym operations." },
        { src: "/fitopscustomer.png", title: "Customer View", description: "FitOps member-facing experience." },
      ],
    },
    caseStudy: {
      overview: "A full-stack gym management system for managing gym members and memberships through a secure, role-aware application.",
      features: [
        "Secure authentication",
        "Role-based access control",
        "Member management",
        "Membership management",
        "RESTful API integration",
        "Production deployment",
      ],
    },
},

  {
    id: "mikemadz",
    title: "MikeMadz Online Ordering System",
    description:
      "Developed a full-stack frozen food ordering and inventory management system featuring product management, real-time inventory tracking, secure user authentication, order processing, reporting, and an intuitive shopping experience.",
    image: "/projectt.png",
    tech: ["PHP", "MySQL", "Bootstrap", "SwiperJS", "FontAwesome"],
    live: "https://mikemadz.com",
    featured: true,
    media: {
      hero: "/projectt.png",
    },
    caseStudy: {
      overview: "A full-stack online ordering and inventory management system developed for a frozen food business.",
      features: [
        "Product management",
        "Inventory management",
        "Order processing",
        "Real-time inventory tracking",
        "Reporting",
        "Customer ordering experience",
      ],
    },
  },
  {
    id: "client-profiling",
    title: "Client Profiling System",
    description:
      "Developed a cross-platform mobile application during my internship at VPD Business Solutions Inc. Integrated with Laravel REST APIs for client profiling, field operations, and business reporting.",
    tech: ["Flutter", "Dart", "Laravel", "REST API", "MySQL"],
    featured: true,
    media: {
      hero: "/login.jpg",
      screenshots: [
        { src: "/login.jpg", title: "Login Screen", description: "Secure authentication for authorized users." },
        { src: "/das.jpg", title: "Dashboard", description: "Overview of clients and quick actions." },
        { src: "/calendar.jpg", title: "Calendar", description: "Manage client schedules and appointments." },
        { src: "/client.jpg", title: "Client Details", description: "Complete client profile information." },
      ],
    },
    caseStudy: {
      overview: "A cross-platform mobile application developed during an internship and integrated with Laravel REST APIs for client profiling, field operations, and business reporting.",
      features: [
        "Authentication",
        "Dashboard",
        "Client profiling",
        "CRUD operations",
        "Calendar",
        "Reports",
        "REST API integration",
      ],
      contributions: [
        "Flutter mobile development",
        "Laravel REST API integration",
        "Mobile UI development",
        "Database integration",
      ],
    },
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
