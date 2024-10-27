import { type User } from '../app.model';

export const dummyUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    photo: 'johndoe.jpg',
    applications: [
      {
        id: "app-1",
        jobTitle: "Software Engineer",
        companyname: "TechCorp",
        companyLogo: "https://logo.com/techcorp.png",
        state: "In Review"
      },
      {
        id: "app-2",
        jobTitle: "Financial Analyst",
        companyname: "SecureBank",
        companyLogo: "https://logo.com/securebank.png",
        state: "Submitted"
      },
      {
        id: "app-3",
        jobTitle: "UX Designer",
        companyname: "EduWorks",
        companyLogo: "https://logo.com/eduworks.png",
        state: "In Review"
      },
      {
        id: "app-4",
        jobTitle: "Graphic Designer",
        companyname: "Eco Ventures",
        companyLogo: "https://logo.com/eco-ventures.png",
        state: "Rejected"
      },
      {
        id: "app-5",
        jobTitle: "Product Manager",
        companyname: "InnoSoft",
        companyLogo: "https://logo.com/innosoft.png",
        state: "Submitted"
      }
    ],
    professionalTitle: "Software Engineer",
    skills: ["JavaScript", "React", "Node.js", "MongoDB"],
    username: 'johndoe',
    password: 'password123',
  },
  {
    id: '2',
    name: 'Jane Smith',
    photo: 'janesmith.jpg',
    applications: [
      {
        id: "app-6",
        jobTitle: "Marketing Specialist",
        companyname: "Designify",
        companyLogo: "https://logo.com/designify.png",
        state: "Rejected"
      },
      {
        id: "app-7",
        jobTitle: "Project Manager",
        companyname: "HealthPlus",
        companyLogo: "https://logo.com/healthplus.png",
        state: "Accepted"
      },
      {
        id: "app-8",
        jobTitle: "Business Analyst",
        companyname: "BlueSky Media",
        companyLogo: "https://logo.com/bluesky-media.png",
        state: "Rejected"
      },
      {
        id: "app-9",
        jobTitle: "HR Manager",
        companyname: "SecureBank",
        companyLogo: "https://logo.com/securebank.png",
        state: "In Review"
      },
      {
        id: "app-10",
        jobTitle: "Graphic Designer",
        companyname: "EduWorks",
        companyLogo: "https://logo.com/eduworks.png",
        state: "Rejected"
      },
    ],
    professionalTitle: "Data Scientist",
    skills: ["Python", "Machine Learning", "Data Visualization", "Pandas"],
    username: 'janesmith',
    password: 'password456',
  },
  {
    id: '3',
    name: 'Alice Johnson',
    photo: 'alicejohnson.jpg',
    applications: [
      {
        id: "app-11",
        jobTitle: "Business Analyst",
        companyname: "BlueSky Media",
        companyLogo: "https://logo.com/bluesky-media.png",
        state: "In Review"
      },
      {
        id: "app-12",
        jobTitle: "IT Support Specialist",
        companyname: "MarketMakers",
        companyLogo: "https://logo.com/marketmakers.png",
        state: "Submitted"
      },
      {
        id: "app-13",
        jobTitle: "Accountant",
        companyname: "RetailHub",
        companyLogo: "https://logo.com/retailhub.png",
        state: "Submitted"
      },
      {
        id: "app-14",
        jobTitle: "Software Engineer",
        companyname: "RetailHub",
        companyLogo: "https://logo.com/retailhub.png",
        state: "Accepted"
      },
      {
        id: "app-15",
        jobTitle: "Business Analyst",
        companyname: "NetCom",
        companyLogo: "https://logo.com/netcom.png",
        state: "In Review"
      },
    ],
    professionalTitle: "UI/UX Designer",
    skills: ["Figma", "Sketch", "Adobe XD", "User Research"],
    username: 'alicejohnson',
    password: 'password789',
  },
  {
    id: '4',
    name: 'Bob Brown',
    photo: 'bobbrown.jpg',
    applications: [
      {
        id: "app-16",
        jobTitle: "Financial Analyst",
        companyname: "SmartHome",
        companyLogo: "https://logo.com/smarthome.png",
        state: "Accepted"
      },
      {
        id: "app-17",
        jobTitle: "Graphic Designer",
        companyname: "BlueSky Media",
        companyLogo: "https://logo.com/bluesky-media.png",
        state: "Accepted"
      },
      {
        id: "app-18",
        jobTitle: "IT Support Specialist",
        companyname: "Eco Ventures",
        companyLogo: "https://logo.com/eco-ventures.png",
        state: "Submitted"
      },
      {
        id: "app-19",
        jobTitle: "Business Analyst",
        companyname: "MarketMakers",
        companyLogo: "https://logo.com/marketmakers.png",
        state: "Submitted"
      },
      {
        id: "app-20",
        jobTitle: "Software Engineer",
        companyname: "RetailHub",
        companyLogo: "https://logo.com/retailhub.png",
        state: "Rejected"
      },
    ],
    professionalTitle: "DevOps Engineer",
    skills: [],
    username: 'bobbrown',
    password: 'password101',
  },
  {
    id: '5',
    name: 'Charlie Davis',
    photo: 'charliedavis.jpg',
    applications: [
      {
        id: "app-21",
        jobTitle: "Accountant",
        companyname: "MarketMakers",
        companyLogo: "https://logo.com/marketmakers.png",
        state: "Accepted"
      },
      {
        id: "app-22",
        jobTitle: "Financial Analyst",
        companyname: "FinSolutions",
        companyLogo: "https://logo.com/finsolutions.png",
        state: "Rejected"
      },
      {
        id: "app-23",
        jobTitle: "UX Designer",
        companyname: "CloudBase",
        companyLogo: "https://logo.com/cloudbase.png",
        state: "Accepted"
      },
      {
        id: "app-24",
        jobTitle: "Sales Representative",
        companyname: "MarketMakers",
        companyLogo: "https://logo.com/marketmakers.png",
        state: "Submitted"
      },
      {
        id: "app-25",
        jobTitle: "Product Manager",
        companyname: "HealthPlus",
        companyLogo: "https://logo.com/healthplus.png",
        state: "Accepted"
      }
    ],
    professionalTitle: "Full Stack Developer",
    skills: [
      "HTML", "CSS", "JavaScript", "PHP", "MySQL", 
      "React", "Node.js", "MongoDB", "Angular", "TypeScript",
      "Python", "Django", "Flask", "PostgreSQL", "GraphQL",
      "Java", "Spring Boot", "Hibernate", "Kotlin", "Swift",
      "Objective-C", "Ruby", "Ruby on Rails", "C#", ".NET",
      "C++", "Rust", "Go", "Kubernetes", "Docker",
      "AWS", "Azure", "Google Cloud", "Terraform", "Linux",
      "Shell Scripting", "Git", "Jenkins", "CI/CD", "Webpack",
      "Gulp", "SASS", "LESS", "Babel", "Bootstrap",
      "Vue.js", "Redis", "Elasticsearch", "RabbitMQ", "Nginx"
    ],
    username: 'charliedavis',
    password: 'password202',
  },
];