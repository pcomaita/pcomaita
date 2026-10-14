// src/data/experience.ts
// Source: Paul's LinkedIn "Experience" section (read 2026-10-15), translated to English.
// The Atmosphères entry is not on LinkedIn: it comes from the client projects on this site.

export interface Experience {
  period: string;
  role: string;
  company: string;
  companyUrl?: string;
  /** Contract type and place, e.g. "Freelance · Paris, remote" */
  meta: string;
  summary: string;
}

export const experiences: Experience[] = [
  {
    period: "2026",
    role: "3D Artist",
    company: "Atmosphères",
    companyUrl: "https://atmospheres.tm.fr/",
    meta: "Freelance · Paris",
    summary:
      "3D product presentation, logos and video assets for the Microsoft ExpertZone France channel.",
  },
  {
    period: "Oct – Nov 2024",
    role: "3D Generalist",
    company: "Skin & Out",
    meta: "Freelance · Paris, remote",
    summary: "Rendering fixes and final renders for a 3D animation.",
  },
  {
    period: "Jun 2022 – Aug 2023",
    role: "Digital Designer",
    company: "Veepee",
    companyUrl: "https://www.veepee.com/",
    meta: "Work-study · Saint-Denis",
    summary:
      "Immersive 3D sets, photo compositing and retouching for brand campaigns — DiGiorgio, Adidas, Samsonite — in line with each brand's guidelines.",
  },
  {
    period: "Feb – Jun 2021",
    role: "3D Modeler",
    company: "B2G Design",
    meta: "Internship · Mauritius",
    summary:
      "3D visuals for real-estate and hotel projects — SketchUp, Cinema 4D, AutoCAD, Landscape.",
  },
  {
    period: "Oct 2019 – Mar 2021",
    role: "Coding Educator",
    company: "DigitOwl.School",
    meta: "Independent · Paris",
    summary: "Coding and robotics workshops for primary-school pupils.",
  },
];
