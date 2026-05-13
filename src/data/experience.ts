export type ExperienceType = 'job' | 'gamejam' | 'award' | 'release' | 'education';

export interface Experience {
  id: string;
  type: ExperienceType;
  title: string;
  organization: string;
  period: string;
  description: string;
  linkUrl?: string;
  linkLabel?: string;
}

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    type: 'job',
    title: 'Senior Game Developer',
    organization: 'PixelForge Studios',
    period: 'Jan 2025 – Present',
    description:
      'Leading gameplay systems architecture for a AAA multiplayer title on UE5. Responsible for AI director, procedural content generation pipeline, and 60fps optimization across platforms.',
    linkUrl: 'https://pixelforge.dev',
    linkLabel: 'View Studio',
  },
  {
    id: 'exp-2',
    type: 'award',
    title: '🏆 Best Technical Achievement',
    organization: 'Indie Game Awards 2024',
    period: 'Dec 2024',
    description:
      'Recognized for groundbreaking use of real-time ray tracing and procedural generation in "NeoCity: Uprising." Awarded among 2,000+ submitted titles.',
  },
  {
    id: 'exp-3',
    type: 'job',
    title: 'Junior Game Developer',
    organization: 'Riot Games (Contract)',
    period: 'Jun 2023 – Dec 2023',
    description:
      'Contributed to gameplay feature development for a mobile spin-off title. Implemented custom shader effects and optimized asset pipeline for mobile GPU constraints.',
    linkUrl: 'https://riotgames.com',
    linkLabel: 'View Company',
  },
  {
    id: 'exp-4',
    type: 'gamejam',
    title: 'Global Game Jam Winner',
    organization: 'GGJ 2023 — Berlin Hub',
    period: 'Feb 2023',
    description:
      'Led a 3-person team to build "Echo Protocol" in 48 hours — a time-manipulation puzzle game. Won Best Narrative award from 84 entries at the Berlin hub.',
    linkUrl: 'https://globalgamejam.org',
    linkLabel: 'View Entry',
  },
  {
    id: 'exp-5',
    type: 'release',
    title: '🚀 Quantum Drift — Steam Launch',
    organization: 'Self-Published',
    period: 'Oct 2022',
    description:
      'Solo-developed and shipped a zero-gravity multiplayer racing game on Steam. Reached 10,000+ downloads in the first month with overwhelmingly positive reviews.',
    linkUrl: 'https://store.steampowered.com',
    linkLabel: 'View on Steam',
  },
  {
    id: 'exp-6',
    type: 'education',
    title: 'BSc Computer Science — Game Development',
    organization: 'Technical University of Berlin',
    period: 'Sep 2019 – Jun 2022',
    description:
      'Specialized in real-time rendering, game AI, and physics simulation. Graduated with distinction. Thesis on adaptive AI systems in procedural environments.',
  },
];
