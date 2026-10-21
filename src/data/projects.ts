// src/data/projects.ts
// The four case studies shown on the site, in display order.
// Case study copy comes from Paul's brief (October 2026). Do not add facts,
// metrics or results that are not in the brief.
// Media (cover, images, videos) are Paul's own ArtStation / YouTube uploads.

import portraitPaul from "@/assets/portrait-paul.jpg";

/** Honest provenance label, shown on the card and the case study. */
export type ProjectType = "Client work" | "Self-initiated project" | "Personal project";

export interface ProjectVideo {
  /** youtube = stable embed. artstation = signed URL that expires: link out instead. */
  provider: "youtube" | "artstation";
  embedUrl: string;
  /** Still shown before play, and fallback when the embed cannot be used. */
  poster: string;
  /** false => do not embed in production; show the poster and link to ArtStation. */
  stable: boolean;
}

export interface ProjectClient {
  /** The commissioning party — who actually paid for the work. */
  name: string;
  url: string;
  /** Where the work was published / what it served. */
  context?: string;
  contextUrl?: string;
}

export interface CaseStudy {
  context: string;
  approach: string;
  result: string;
  learnings: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  year: number;
  projectType: ProjectType;
  /** Only set for client work. */
  client?: ProjectClient;
  /** One line for the homepage card. */
  excerpt: string;
  cover: string;
  images: string[];
  video?: ProjectVideo;
  software: string[];
  artstationUrl: string;
  caseStudy: CaseStudy;
}

/** Commissioning agency (also mentioned in the About section). */
export const ATMOSPHERES: ProjectClient = {
  name: "Atmosphères",
  url: "https://atmospheres.tm.fr/",
  context: "3D content for the Microsoft ExpertZone France channel",
  contextUrl: "https://www.youtube.com/@ExpertZoneFrance",
};

export const profile = {
  fullName: "Paul Comaïta",
  headline: "3D Artist",
  city: "Paris",
  country: "France",
  email: "contact@paulcomaita.art",
  artstationUrl: "https://www.artstation.com/paul_comaita",
  linkedinUrl: "https://www.linkedin.com/in/paul-comaita",
  /** [PLACEHOLDER] Instagram URL to be provided by Paul. The link stays hidden while empty. */
  instagramUrl: "",
  avatar: portraitPaul,
} as const;

export const projects: Project[] = [
  {
    slug: "galaxy-book",
    title: "Samsung Galaxy Book 6",
    subtitle: "Vertical Teaser",
    year: 2026,
    projectType: "Client work",
    client: { name: ATMOSPHERES.name, url: ATMOSPHERES.url },
    excerpt: "Pre-launch vertical teaser for YouTube, ahead of the laptop's release.",
    cover:
      "https://cdna.artstation.com/p/assets/covers/images/099/149/014/large/paul-comaita-paul-comaita-samsung.webp?1779111420",
    images: [
      "https://cdna.artstation.com/p/assets/images/images/099/013/586/original/paul-comaita-silhouette.gif?1778688997",
      "https://cdnb.artstation.com/p/assets/images/images/099/011/297/original/paul-comaita-screens-connectiques.gif?1778684316",
      "https://cdnb.artstation.com/p/assets/images/images/099/013/583/original/paul-comaita-front.gif?1778688991",
      "https://cdna.artstation.com/p/assets/images/images/099/013/644/large/paul-comaita-dessous.webp?1778689091",
    ],
    video: {
      provider: "artstation",
      embedUrl:
        "https://www.artstation.com/api/v2/animation/video_clips/3b370cfb-da55-4d14-a942-a8db915504c7/embed.html?s=cea76d012145f24cd4d920764014952309dda1d57fd2eed769cf686d221a7c1b&t=1790961054",
      poster:
        "https://cdna.artstation.com/p/assets/video_clips/images/098/979/622/large/paul-comaita-thumb.jpg?1778604781",
      stable: false,
    },
    software: ["Blender"],
    artstationUrl: "https://www.artstation.com/artwork/mAJAa1",
    caseStudy: {
      context:
        "Pre-launch vertical video for YouTube presenting the Samsung Galaxy Book 6 ahead of its release. The goal was to highlight the laptop's slim design and its side ports, on a one-month deadline. The full laptop model was built from scratch using the technical specifications and dimensions.",
      approach:
        "Complete modeling in Blender. The visual direction was inspired by an existing Samsung laptop ad: a black background with grazing light along the edges. The main challenge was managing several tasks in parallel under a tight schedule.",
      result: "Broadcast confirmed.",
      learnings:
        "Fast production is achievable when the project is well scoped from the start. Running several tasks in parallel is essential on short deadlines.",
    },
  },
  {
    slug: "devialet-mania",
    title: "Devialet Mania",
    subtitle: "Luxury Product Ad",
    year: 2024,
    projectType: "Self-initiated project",
    excerpt: "Self-initiated luxury ad for the Devialet Mania speaker.",
    cover:
      "https://cdna.artstation.com/p/assets/images/images/077/117/140/large/paul-comaita-0018.jpg?1718643555",
    images: [
      "https://cdna.artstation.com/p/assets/images/images/077/117/140/large/paul-comaita-0018.jpg?1718643555",
      "https://cdnb.artstation.com/p/assets/images/images/077/117/157/large/paul-comaita-0054.jpg?1718643592",
      "https://cdna.artstation.com/p/assets/images/images/077/122/904/large/paul-comaita-0153.jpg?1718653653",
      "https://cdna.artstation.com/p/assets/images/images/090/361/088/large/paul-comaita-template.jpg?1753713073",
    ],
    software: ["Blender", "DaVinci Resolve"],
    artstationUrl: "https://www.artstation.com/artwork/04AzG5",
    caseStudy: {
      context:
        "Commercial study for the Devialet Mania speaker, chosen for its distinctive design and for an interest in premium audio. The goal was to demonstrate the ability to produce a luxury 3D advertisement. No client.",
      approach:
        "Built directly in 3D, without concept or storyboard. Boolean modeling for the speaker's form. The textile effect on the speaker's surface was created with a particle system. Blender for 3D; DaVinci Resolve for editing and color grading.",
      result: "Completed over three months, part-time.",
      learnings:
        "A boolean-based modeling workflow, clean luxury ad staging, and particle systems for surface effects. Next time, the target would be three to four weeks.",
    },
  },
  {
    slug: "corvette",
    title: "Corvette",
    subtitle: "Automotive Animation",
    year: 2025,
    projectType: "Personal project",
    excerpt: "High-contrast black-and-white animation, the car wrapped in smoke.",
    cover:
      "https://cdna.artstation.com/p/assets/images/images/085/015/516/large/paul-comaita-corvette-insta01.jpg?1739785394",
    images: [
      "https://cdna.artstation.com/p/assets/images/images/085/015/516/large/paul-comaita-corvette-insta01.jpg?1739785394",
      "https://cdna.artstation.com/p/assets/images/images/090/457/806/large/paul-comaita-corvette-maps.webp?1753968327",
    ],
    video: {
      provider: "youtube",
      embedUrl: "https://www.youtube-nocookie.com/embed/Z2wEZi3-zdc?rel=0",
      poster:
        "https://cdna.artstation.com/p/assets/videos/images/085/015/540/large/paul-comaita-hqdefault.jpg?1739785553",
      stable: true,
    },
    software: ["Blender", "DaVinci Resolve"],
    artstationUrl: "https://www.artstation.com/artwork/2BZnrJ",
    caseStudy: {
      context:
        "A complex, realistic model of a Corvette, chosen for its supercar design. The goal was to build a complex, realistic 3D model. References were gathered on Pinterest.",
      approach:
        "High-contrast black-and-white look, with the car wrapped in smoke. The smoke was created in Blender using a volumetric noise setup. Modeling and rendering in Blender; editing and color grading in DaVinci Resolve.",
      result: "Published on Instagram and on the portfolio.",
      learnings:
        "Proved the ability to build complex, realistic models on a project that seemed out of reach.",
    },
  },
  {
    slug: "the-enchained-crown",
    title: "The Enchained Crown",
    subtitle: "Cinematic Loop",
    year: 2026,
    projectType: "Personal project",
    excerpt: "A short 3D cinematic loop of a crown held up by chains.",
    cover:
      "https://cdna.artstation.com/p/assets/images/images/102/256/152/large/paul-comaita-01.webp?1788885737",
    images: [
      "https://cdna.artstation.com/p/assets/images/images/102/256/152/large/paul-comaita-01.webp?1788885737",
      "https://cdna.artstation.com/p/assets/images/images/102/256/164/large/paul-comaita-02.webp?1788885750",
      "https://cdna.artstation.com/p/assets/images/images/102/256/184/large/paul-comaita-03.webp?1788946430",
    ],
    video: {
      provider: "youtube",
      embedUrl: "https://www.youtube-nocookie.com/embed/WHGZ65Y2D3c?rel=0",
      poster:
        "https://cdna.artstation.com/p/assets/images/images/102/256/152/large/paul-comaita-01.webp?1788885737",
      stable: true,
    },
    software: ["Blender", "DaVinci Resolve"],
    artstationUrl: "https://www.artstation.com/artwork/QxXRaE",
    caseStudy: {
      context:
        "A short 3D cinematic loop of a crown held up by chains. The project was made as the kind of piece I wanted to see.",
      approach:
        "Modeled and rendered in Blender, exported as EXR sequences, then color graded and composited in DaVinci Resolve.",
      result: "Published on ArtStation and on the portfolio.",
      learnings: "Being satisfied with my own work, even when the process is not easy.",
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export default projects;
