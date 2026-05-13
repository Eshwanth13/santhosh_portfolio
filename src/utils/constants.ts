// Design System Constants

export const COLORS = {
  primaryNeon: '#00f0ff',
  secondaryNeon: '#c026d3',
  softCyan: '#67e8f9',
  backgroundDeep: '#0a0a0a',
  backgroundNavy: '#020617',
  textPrimary: '#e2e8f0',
  textMuted: '#64748b',
  glowOverlay: 'rgba(0,240,255,0.08)',
} as const;

export const BP = {
  mobile: 767,
  tablet: 1023,
  desktop: 1024,
} as const;

export const SECTION_IDS = {
  hero: 'hero',
  about: 'about',
  skills: 'skills',
  projects: 'projects',
  experience: 'experience',
  contact: 'contact',
} as const;

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
] as const;

export const LOADER_TEXTS = [
  'INITIALIZING WORLD...',
  'LOADING NEURAL ARCHIVES...',
  'SYNCING EXPERIENCE...',
  'ESTABLISHING CONNECTION...',
] as const;
