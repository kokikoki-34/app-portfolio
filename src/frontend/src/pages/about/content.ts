import { type Contents } from "../../shared/types/content";

interface TimelineItem {
  period: string;
  title: string;
  subtitle?: string;
  description?: string;
  techStack?: string[];
}

export interface SkillItem {
  name: string;
  level?: "Expert" | "Proficient" | "Learning";
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

export interface AboutContent {
  name: string;
  birthDate: string;
  hometown: string;
  location: string;

  currentRole: string;
  introduction: string;

  education: TimelineItem[];
  experience: TimelineItem[];

  techStacks?: SkillCategory[];

  values?: string[];
  interests?: string[];
}

export const AboutContents: Contents<AboutContent> = {
  Contents: {
    ja: {
      name: "安井 浩毅",
      birthDate: "2000-03-04",
      hometown: "北海道",
      location: "東京都",

      currentRole: "ソフトウェアエンジニア",
      introduction:
        "北海道出身、東京在住のソフトウェアエンジニアです。大学では機械・航空宇宙工学を専攻していました。物理現象やものづくりの原理への関心を背景に、現在はソフトウェア開発に取り組んでいます。",

      experience: [
        {
          period: "2024年 –",
          title: "ソフトウェアエンジニア",
          description: "金融機関向けのソフトウェア開発",
          techStack: [
            "C#(.NET Core, Blazor, Entity Framework Core)",
            "SQL Server",
            "IIS",
          ],
        },
      ],
      education: [
        {
          period: "2018.04 – 2022.03",
          title: "名古屋大学",
          subtitle: "工学部 機械・航空宇宙工学科 卒業",
          techStack: ["C/C++", "Python", "ROS", "Linux"],
        },
      ],
      techStacks: [
        {
          category: "Languages",
          items: [
            { name: "C#", level: "Proficient" },
            { name: "SQL", level: "Proficient" },
            { name: "TypeScript", level: "Learning" },
            { name: "React", level: "Learning" },
            { name: "Go", level: "Learning" },
            { name: "Rust", level: "Learning" },
            { name: "C/C++", level: "Proficient" },
            { name: "Python", level: "Proficient" },
          ],
        },
        {
          category: "Tools & Environment",
          items: [
            { name: "macOS", level: "Proficient" },
            { name: "Linux", level: "Learning" },
            { name: "Shell", level: "Proficient" },
            { name: "Docker", level: "Learning" },
            { name: "VSCode", level: "Proficient" },
            { name: "Google Cloud Platform", level: "Learning" },
            { name: "Terraform", level: "Learning" },
          ],
        },
      ],
      interests: ["物理学", "MacOS/Linux", "海外ドラマ"],
    },
    en: {
      name: "Koki Yasui",
      birthDate: "2000-03-04",
      hometown: "Hokkaido, Japan",
      location: "Tokyo, Japan",

      currentRole: "Software Engineer",
      introduction:
        "Software Engineer based in Tokyo, born in Hokkaido. With a background in Mechanical and Aerospace Engineering, I am currently engaged in software development",

      experience: [
        {
          period: "2024 – Present",
          title: "Software Engineer",
          description: "Software development for financial institutions.",
          techStack: [
            "C# (.NET Core, Blazor, Entity Framework Core)",
            "SQL Server",
            "IIS",
          ],
        },
      ],
      education: [
        {
          period: "Apr 2018 - Mar 2022",
          title: "Nagoya University",
          subtitle: "B.E. in Mechanical and Aerospace Engineering",
          techStack: ["C/C++", "Python", "ROS", "Linux"],
        },
      ],
      techStacks: [
        {
          category: "Languages",
          items: [
            { name: "C#", level: "Proficient" },
            { name: "SQL", level: "Proficient" },
            { name: "TypeScript", level: "Learning" },
            { name: "React", level: "Learning" },
            { name: "Go", level: "Learning" },
            { name: "Rust", level: "Learning" },
            { name: "C/C++", level: "Proficient" },
            { name: "Python", level: "Proficient" },
          ],
        },
        {
          category: "Tools & Environment",
          items: [
            { name: "macOS", level: "Proficient" },
            { name: "Linux", level: "Learning" },
            { name: "Shell", level: "Proficient" },
            { name: "Docker", level: "Learning" },
            { name: "VSCode", level: "Proficient" },
            { name: "Google Cloud Platform", level: "Learning" },
            { name: "Terraform", level: "Learning" },
          ],
        },
      ],
      interests: ["Physics", "macOS / Linux", "International TV Series"],
    },
  },
};
