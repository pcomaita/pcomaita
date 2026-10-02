// src/data/projects.ts
// Extracted from ArtStation album "paul_comaita" / album 1888849
// Extraction date: 2026-10-02 — 8 projects
// Descriptions are Paul's own ArtStation copy, lightly edited for grammar.
// No context has been added that is not present in the source posts.

export type ProjectCategory =
  | "Advertising & Product"
  | "Automotive"
  | "Film & VFX"
  | "Motion & Assets";

/**
 * Honest provenance label, shown on the card.
 * - "Client work"      : paid commission
 * - "Study case"       : self-initiated brief on a real brand, not commissioned
 * - "Personal project" : own initiative, no brand brief
 * - "Student film"     : produced during studies
 */
export type ProjectType =
  | "Client work"
  | "Study case"
  | "Personal project"
  | "Student film";

export interface ProjectVideo {
  /** youtube = stable embed. artstation = signed URL, expires. */
  provider: "youtube" | "artstation";
  embedUrl: string;
  /** Still shown before play, and fallback when the embed cannot be used. */
  poster: string;
  /** false => do not rely on this embed in production. */
  stable: boolean;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  year: number;
  category: ProjectCategory;
  projectType: ProjectType;
  /** One-line summary for the card. */
  excerpt: string;
  /** Full copy for the detail view. */
  description: string;
  cover: string;
  images: string[];
  video?: ProjectVideo;
  software: string[];
  /** Only set when projectType === "Client work". */
  client?: ProjectClient;
  role?: string;
  artstationUrl: string;
  featured: boolean;
}

export interface ProjectClient {
  /** The commissioning party — who actually paid for the work. */
  name: string;
  url: string;
  /** Where the work was published / what it served. Never implies a direct client relationship. */
  context: string;
  contextUrl?: string;
}

/** Commissioning agency behind the Microsoft ExpertZone France content. */
const ATMOSPHERES: ProjectClient = {
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
  availability: "available",
  availableFullTime: true,
  availableContract: true,
  availableFreelance: true,
  artstationUrl: "https://www.artstation.com/paul_comaita",
  linkedinUrl: "https://www.linkedin.com/in/paul-comaita",
  websiteUrl: "https://paulc.framer.website/",
  avatar:
    "https://cdna.artstation.com/p/users/avatars/001/642/696/large/f9317c2b89e146e1cbeaa8fbf1334907.jpg?1718643290",
} as const;

export const categories: ProjectCategory[] = [
  "Advertising & Product",
  "Automotive",
  "Film & VFX",
  "Motion & Assets",
];

export const projects: Project[] = [
  {
    id: "mAJAa1",
    slug: "galaxy-book-presentation",
    title: "GalaxyBook",
    year: 2026,
    category: "Advertising & Product",
    projectType: "Client work",
    client: ATMOSPHERES,
    excerpt:
      "Cinematic 3D product presentation for the Samsung Galaxy Book.",
    description:
      "A cinematic 3D presentation for the Samsung Galaxy Book, combining carefully crafted product shots with a full 360° rotation of the laptop. The visual direction draws on luxury design — minimalist, with soft lighting, subtle reflections and a sleek dark setting — to highlight the product's design, materials and elegance in a refined way.",
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
    software: ["Blender", "Photoshop"],
    artstationUrl: "https://www.artstation.com/artwork/mAJAa1",
    featured: true,
  },
  {
    id: "04AzG5",
    slug: "devialet-ads",
    title: "Devialet Ads",
    year: 2024,
    category: "Advertising & Product",
    projectType: "Study case",
    excerpt:
      "Self-initiated commercial study case for the Devialet Mania speaker.",
    description:
      "A commercial for the Devialet Mania speaker, built as a study case — a self-initiated brief treated as if it were a real client commission. Devialet was chosen for its product design language. Modelling, lighting, rendering and grading.",
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
    featured: true,
  },
  {
    id: "w040dZ",
    slug: "connexions-short-movie",
    title: "CONNEXIONS — Short Film",
    year: 2023,
    category: "Film & VFX",
    projectType: "Student film",
    excerpt: "Graduation short film — director and 3D supervisor.",
    description:
      "A short film made during my studies, where I handled both the direction and the 3D supervision. The story follows a robot held in place by a network of connections, kept synchronised and linear alongside the others. An accident breaks the screen binding it, and from that moment it starts moving: it travels through several environments in search of the missing piece, until its connection fully drops and it collapses. The project is built around control, rupture, and what happens when a system loses its grip on something. Technically, it was an opportunity to handle the full 3D pipeline — from modelling to lighting and rendering — while also managing the production as a whole.",
    cover:
      "https://cdnb.artstation.com/p/assets/covers/images/067/694/973/large/paul-comaita-paul-comaita-poster-flat01-fotor-20230929125512.jpg?1695988154",
    images: [
      "https://cdnb.artstation.com/p/assets/images/images/098/582/093/large/paul-comaita-capture-d-ecran-2026-04-29-141436.webp?1777467436",
      "https://cdna.artstation.com/p/assets/images/images/098/582/096/large/paul-comaita-capture-d-ecran-2026-04-29-141507.webp?1777467439",
      "https://cdna.artstation.com/p/assets/images/images/098/584/514/large/paul-comaita-robot.webp?1777471484",
      "https://cdna.artstation.com/p/assets/images/images/098/584/508/large/paul-comaita-bonhomme.webp?1777471472",
      "https://cdna.artstation.com/p/assets/images/images/098/584/872/large/paul-comaita-breakdown.webp?1777472060",
      "https://cdnb.artstation.com/p/assets/images/images/098/587/741/large/paul-comaita-decoupage01.webp?1777477484",
    ],
    video: {
      provider: "youtube",
      embedUrl: "https://www.youtube-nocookie.com/embed/RP1_e_avPMs?rel=0",
      poster:
        "https://cdna.artstation.com/p/assets/videos/images/067/694/034/large/paul-comaita-maxresdefault.jpg?1695986080",
      stable: true,
    },
    software: ["Blender", "Photoshop", "Premiere"],
    role: "Director & 3D Supervisor",
    artstationUrl: "https://www.artstation.com/artwork/w040dZ",
    featured: true,
  },
  {
    id: "2BZnrJ",
    slug: "corvette-animation",
    title: "Corvette — Animation",
    year: 2025,
    category: "Automotive",
    projectType: "Personal project",
    excerpt:
      "Automotive animation in high-contrast black and white, wrapped in smoke.",
    description:
      "A 3D animation featuring a recent Corvette model in a high-contrast black and white setting. The surrounding smoke creates a mysterious atmosphere that enhances the vehicle's striking lines. Dynamic lighting plays with contrast to reveal the body details, while fluid camera movements capture the car from various angles.",
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
    featured: false,
  },
  {
    id: "rJoYze",
    slug: "corvette-stingray",
    title: "Corvette Stingray",
    year: 2024,
    category: "Automotive",
    projectType: "Personal project",
    excerpt: "Still render of a fully self-built Corvette Stingray.",
    description:
      "A still render of the Corvette Stingray. Every detail was crafted to capture the line and the elegance of the car. Modelling, texturing, lighting and rendering made entirely by me.",
    cover:
      "https://cdna.artstation.com/p/assets/images/images/077/495/610/large/paul-comaita-corvette.jpg?1719586837",
    images: [
      "https://cdna.artstation.com/p/assets/images/images/077/495/610/large/paul-comaita-corvette.jpg?1719586837",
    ],
    software: ["Blender", "Photoshop"],
    artstationUrl: "https://www.artstation.com/artwork/rJoYze",
    featured: false,
  },
  {
    id: "vbwwXd",
    slug: "gilgamesh-inspired",
    title: "Gilgamesh Inspired",
    year: 2025,
    category: "Film & VFX",
    projectType: "Personal project",
    excerpt:
      "First Unreal Engine animation — focused on cinematography and lighting.",
    description:
      "My first 3D animation in Unreal Engine. Not everything was built from scratch: the focus was on cinematography — cameras and lighting — to shape the mood and the storytelling. The goal was to get comfortable with Unreal Engine and explore its potential for animation.",
    cover:
      "https://cdna.artstation.com/p/assets/images/images/085/561/650/large/paul-comaita-scene06-0479.jpg?1741100843",
    images: [
      "https://cdna.artstation.com/p/assets/images/images/085/561/650/large/paul-comaita-scene06-0479.jpg?1741100843",
    ],
    video: {
      provider: "youtube",
      embedUrl: "https://www.youtube-nocookie.com/embed/axT1FS8l0KM?rel=0",
      poster:
        "https://cdnb.artstation.com/p/assets/videos/images/085/561/463/large/paul-comaita-maxresdefault.jpg?1741100553",
      stable: true,
    },
    software: ["Unreal Engine", "Nuke"],
    artstationUrl: "https://www.artstation.com/artwork/vbwwXd",
    featured: false,
  },
  {
    id: "6LAez0",
    slug: "microsoft-logos-animations",
    title: "Microsoft Logos & Animations",
    year: 2026,
    category: "Motion & Assets",
    projectType: "Client work",
    client: ATMOSPHERES,
    excerpt:
      "Modular 3D Microsoft logos built as reusable video assets.",
    description:
      "A set of 3D Microsoft logos designed as modular assets for video production. The work covers modelling, shading and simple animations — fade in/out and looping — allowing quick integration into various content formats. Emphasis was placed on readability, brand fidelity and flexibility of use.",
    cover:
      "https://cdnb.artstation.com/p/assets/covers/images/098/830/663/large/paul-comaita-paul-comaita-microsoft.webp?1778168381",
    images: [
      "https://cdna.artstation.com/p/assets/images/images/098/830/658/large/paul-comaita-logo.webp?1778168375",
      "https://cdna.artstation.com/p/assets/images/images/098/589/232/large/paul-comaita-logo-shading.webp?1777480600",
    ],
    video: {
      provider: "artstation",
      embedUrl:
        "https://www.artstation.com/api/v2/animation/video_clips/341d0e4f-a0fd-4268-bcf4-ebafc48d57fc/embed.html?s=08111693b3fb94fe76d4d7d893b660197113e0d1df1e617958e72924280e364c&t=1790961058",
      poster:
        "https://cdna.artstation.com/p/assets/video_clips/images/098/540/066/large/paul-comaita-thumb.jpg?1777367271",
      stable: false,
    },
    software: ["Blender", "Photoshop"],
    artstationUrl: "https://www.artstation.com/artwork/6LAez0",
    featured: false,
  },
  {
    id: "YGNgdP",
    slug: "hardware-pc-components",
    title: "Hardware Assets — PC Components",
    year: 2026,
    category: "Motion & Assets",
    projectType: "Client work",
    client: ATMOSPHERES,
    excerpt: "Video assets of PC components for content production.",
    description:
      "A set of video assets representing computer components — monitor, keyboard, GPU, SSD and more — designed for use in video production. Most base models were sourced from Blender Market; my contribution covers animation, lighting and rendering.",
    cover:
      "https://cdna.artstation.com/p/assets/covers/images/098/555/320/large/paul-comaita-paul-comaita-microsoft-components.webp?1777397032",
    images: [
      "https://cdnb.artstation.com/p/assets/images/images/098/626/859/large/paul-comaita-keyboard.webp?1777571184",
      "https://cdna.artstation.com/p/assets/images/images/098/626/858/large/paul-comaita-keyboard-wire.webp?1777571178",
    ],
    video: {
      provider: "artstation",
      embedUrl:
        "https://www.artstation.com/api/v2/animation/video_clips/8e41aa8f-6066-4d89-ba48-b2bd24271a5e/embed.html?s=ae184d2bb780cb354de8166b0b8b4c88be27081073757e833a7af0e272cb057c&t=1790961056",
      poster:
        "https://cdnb.artstation.com/p/assets/video_clips/images/098/626/815/large/paul-comaita-thumb.jpg?1777571071",
      stable: false,
    },
    software: ["Blender", "Photoshop"],
    artstationUrl: "https://www.artstation.com/artwork/YGNgdP",
    featured: false,
  },
];

export default projects;
