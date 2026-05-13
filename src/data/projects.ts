export interface Project {
  id: string;
  title: string;
  engine: string;
  year: number;
  description: string;
  techTags: string[];
  thumbnail: string;
  videoUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  trailerUrl?: string;
  storeUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'NEOCITY: UPRISING',
    engine: 'Unreal Engine 5',
    year: 2024,
    description:
      'An open-world cyberpunk action RPG featuring procedural city generation and real-time neural AI companions. Pushing UE5 Nanite and Lumen to their limits.',
    techTags: ['C++', 'Blueprints', 'Nanite', 'Lumen', 'Procedural Gen', 'AI'],
    thumbnail: '/images/project1.webp',
    trailerUrl: 'https://youtube.com',
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    id: 'project-2',
    title: 'QUANTUM DRIFT',
    engine: 'Unity 2023',
    year: 2023,
    description:
      'A high-speed multiplayer racing game set in zero-gravity space corridors. Features custom physics simulation and peer-to-peer netcode.',
    techTags: ['C#', 'Unity DOTS', 'Netcode', 'HDRP', 'Custom Physics'],
    thumbnail: '/images/project2.webp',
    liveUrl: 'https://itch.io',
    githubUrl: 'https://github.com',
    storeUrl: 'https://store.steampowered.com',
    featured: true,
  },
  {
    id: 'project-3',
    title: 'ECHO PROTOCOL',
    engine: 'Godot 4',
    year: 2023,
    description:
      'A narrative puzzle game where players manipulate time echoes to solve environmental mysteries. Built for Global Game Jam 2023 — won Best Narrative award.',
    techTags: ['GDScript', 'Godot 4', 'Shaders', 'Level Design'],
    thumbnail: '/images/project3.webp',
    liveUrl: 'https://itch.io',
    githubUrl: 'https://github.com',
    featured: false,
  },
  {
    id: 'project-4',
    title: 'VOXEL SIEGE',
    engine: 'Unity 2022',
    year: 2022,
    description:
      'A tower defense RTS hybrid with fully destructible voxel terrain. Features an advanced AI squad system with GOAP planning.',
    techTags: ['C#', 'GOAP AI', 'Voxel', 'Procedural', 'ECS'],
    thumbnail: '/images/project4.webp',
    githubUrl: 'https://github.com',
    featured: false,
  },
];
