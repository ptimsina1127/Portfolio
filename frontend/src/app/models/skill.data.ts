export interface Skill {
  name: string;
  icon: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const SKILLS: SkillCategory[] = [
  {
    title: 'Languages',
    skills: [
      { name: 'Java', icon: '☕' },
      { name: 'TypeScript', icon: '🔷' },
      { name: 'JavaScript', icon: '🟨' },
      { name: 'Python', icon: '🐍' },
      { name: 'SQL', icon: '🗄️' },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    skills: [
      { name: 'Spring Boot', icon: '🍃' },
      { name: 'Angular', icon: '🅰️' },
      { name: 'React', icon: '⚛️' },
      { name: 'Hibernate', icon: '🗃️' },
      { name: 'Tailwind CSS', icon: '🎨' },
    ],
  },
  {
    title: 'Tools & Platforms',
    skills: [
      { name: 'Git', icon: '📦' },
      { name: 'Docker', icon: '🐳' },
      { name: 'Postman', icon: '📮' },
      { name: 'Maven', icon: '📐' },
      { name: 'VS Code', icon: '💻' },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'MySQL', icon: '🐬' },
      { name: 'PostgreSQL', icon: '🐘' },
      { name: 'MongoDB', icon: '🍃' },
    ],
  },
];
