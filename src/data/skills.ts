export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: number; // 0-100
  years?: string;
  color?: string;
}

export const skillCategories: SkillCategory[] = [
  {
    category: '3D Engines',
    skills: [
      { name: 'Unreal Engine 5', level: 92, years: '4 yrs', color: '#00f0ff' },
      { name: 'Unity', level: 88, years: '5 yrs', color: '#00f0ff' },
      { name: 'Godot 4', level: 75, years: '2 yrs', color: '#67e8f9' },
    ],
  },
  {
    category: 'DCC Tools',
    skills: [
      { name: 'Blender', level: 85, years: '4 yrs', color: '#c026d3' },
      { name: 'Houdini', level: 70, years: '2 yrs', color: '#c026d3' },
      { name: 'Substance Painter', level: 80, years: '3 yrs', color: '#c026d3' },
    ],
  },
  {
    category: 'Languages',
    skills: [
      { name: 'C++', level: 85, years: '4 yrs', color: '#00f0ff' },
      { name: 'C#', level: 90, years: '5 yrs', color: '#00f0ff' },
      { name: 'Python', level: 75, years: '3 yrs', color: '#67e8f9' },
      { name: 'HLSL / GLSL', level: 78, years: '3 yrs', color: '#67e8f9' },
    ],
  },
  {
    category: 'Disciplines',
    skills: [
      { name: 'Level Design', level: 90, years: '5 yrs', color: '#c026d3' },
      { name: 'Game Physics', level: 82, years: '4 yrs', color: '#c026d3' },
      { name: 'AI Systems', level: 80, years: '3 yrs', color: '#00f0ff' },
      { name: 'Shaders', level: 78, years: '3 yrs', color: '#00f0ff' },
      { name: 'Multiplayer', level: 72, years: '2 yrs', color: '#67e8f9' },
      { name: 'Optimization', level: 85, years: '4 yrs', color: '#67e8f9' },
    ],
  },
];

export const orbSkills = [
  'Unity', 'Unreal', 'C++', 'C#', 'Blender', 'GLSL', 'Godot', 'Python',
];
