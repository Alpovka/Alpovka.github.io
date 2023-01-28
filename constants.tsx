const EXPERIENCES = [
  {
    id: "1",
    role: "Software Engineer",
    companyName: "EasyQuant",
    companyLogo: "https://imgur.com/WN8EAXY.jpg",
    location: "Berlin/Germany",
    type: "(Remote)",
    startDate: "Sep 2022",
    stillWorking: true,
    points: [
      "Front-End Development with React/React Native & TypeScript/JavaScript.",
      "Animation creations with Animated/Reanimated and related libraries.",
      "Evaluating designs in Figma after following procedures of UI/UX understanding.",
      "Data Manipulation with React Query.",
      "CI/CD & GitHub Automations.",
    ],
  },
  {
    id: "2",
    role: "Software Engineering Intern",
    companyName: "EasyQuant",
    companyLogo: "https://imgur.com/WN8EAXY.jpg",
    location: "Berlin/Germany",
    startDate: "Jul 2022",
    endDate: "Sep 2022",
    stillWorking: false,
    points: [
      "Mobile Development with React Native Expo & TypeScript.",
      "Web scraping from various data sources using Python with Beautiful Soup, Selenium.",
      "State Management with Redux.",
      "Agile Development environment with Scrum meetings.",
    ],
  },
  {
    id: "3",
    role: "Full-Stack Developer",
    companyName: "Siemens",
    companyLogo: "https://i.imgur.com/CncTupi.jpg",
    type: "(On-site)",
    location: "Gebze/Turkey",
    startDate: "Sep 2021",
    endDate: " Oct 2021",
    stillWorking: false,
    points: [
      "Web Development with PHP & JavaScript",
      "UI interfaces using HTML/CSS, jQuery, Semantic UI.",
      "Data fetching using Rest APIs.",
    ],
  },
];

const SKILLS = [
  {
    name: "React",
    proficiency: "80%",
    techImgUrl: "https://imgur.com/6QC5zIf.png",
  },
  {
    name: "React Native",
    proficiency: "90%",
    techImgUrl: "https://imgur.com/zaGmJ6P.png",
  },
  {
    name: "Redux",
    proficiency: "55%",
    techImgUrl: "https://imgur.com/7bgO680.png",
  },
  {
    name: "JavaScript",
    proficiency: "80%",
    techImgUrl: "https://imgur.com/W6mWNyc.png",
  },
  {
    name: "CSS",
    proficiency: "65%",
    techImgUrl: "https://imgur.com/I6rKp1q.png",
  },
  {
    name: "HTML",
    proficiency: "90%",
    techImgUrl: "https://imgur.com/t7Dr6nE.png",
  },
  {
    name: "TypeScript",
    proficiency: "75%",
    techImgUrl: "https://imgur.com/lG5f25y.png",
  },
  {
    name: "Next",
    proficiency: "40%",
    techImgUrl: "https://imgur.com/DBQBtXf.png",
  },
  {
    name: "Framer motion",
    proficiency: "50%",
    techImgUrl: "https://imgur.com/yQe9ip0.png",
  },
  {
    name: "Tailwind",
    proficiency: "70%",
    techImgUrl: "https://imgur.com/ZhMTSIN.png",
  },
  {
    name: "Python",
    proficiency: "60%",
    techImgUrl: "https://imgur.com/hQJItzY.png",
  },
  {
    name: "jQuery",
    proficiency: "60%",
    techImgUrl: "https://imgur.com/jDvEiN1.png",
  },
  {
    name: "MySQL",
    proficiency: "30%",
    techImgUrl: "https://imgur.com/ZJjtoMK.png",
  },
  {
    name: "C",
    proficiency: "30%",
    techImgUrl: "https://imgur.com/0NbEsIl.png",
  },
  {
    name: "Git",
    proficiency: "70%",
    techImgUrl: "https://imgur.com/G0ZmNNl.png",
  },
  {
    name: "VS Code",
    proficiency: "100%",
    techImgUrl: "https://imgur.com/5I7pRKZ.png",
  },
];

const PROJECTS = [
  {
    id: "1",
    name: "EasyQuant",
    imageUrl: "https://imgur.com/YwEcRX1.png",
    description:
      "A platform where beginner investors can quickly start investing. Released on Google Play & App Store",
    techs: [
      "React Native",
      "React",
      "TypeScript",
      "JavaScript",
      "Redux",
      "Python",
    ],
    router: "https://www.easyquant.io/",
  },
  {
    id: "2",
    name: "MessengerMermaids",
    imageUrl: "https://imgur.com/IhRbuED.png",
    description:
      "Private messenger for those who proceeding distant relationship 😉",
    techs: ["React Native", "React", "TypeScript", "Redux"],
    router: "",
  },
  {
    id: "3",
    name: "ForexUserDashboard",
    imageUrl: "",
    description:
      "Sample user panel of forex exchange sites. P.S. This project was done in 10 days challange.",
    techs: ["HTML", "CSS", "JavaScript", "jQuery", "MySQL"],
    router: "https://github.com/Alpovka/ForexUserDashboard",
  },
  {
    id: "4",
    name: "Tacky Tanks",
    imageUrl: "https://imgur.com/yq7eOp3.png",
    description: "Harvard University CS50x Final Project (Pygame library)",
    techs: ["Python"],
    router: "https://github.com/Alpovka/Tacky-Tanks",
  },
  {
    id: "5",
    name: "This website 😄",
    techs: ["React", "Next", "TypeScript", "Tailwind", "Framer motion"],
    router: "#me",
  },
];

export { EXPERIENCES, SKILLS, PROJECTS };
