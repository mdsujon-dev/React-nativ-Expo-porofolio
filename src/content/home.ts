/**
 * Central, data-driven content for the home page. Every section reads its text
 * from here, so all copy lives in one place and is easy to edit (or later swap
 * for a backend-driven source).
 */

export const heroContent = {
  greeting: "Hi, I'm Sujon",
  tagline: 'Full Stack Developer building fast, scalable web & mobile apps',
  primaryCta: 'Hire Me',
  secondaryCta: 'View Work',
  socials: ['github', 'linkedin', 'email'] as const,
};

export const aboutContent = {
  label: 'About Me',
  title: 'Expert Full Stack Developer',
  subtitle: 'Building scalable web & mobile solutions that users love',
  name: 'Sujon',
  bio: 'I build fast, delightful web & mobile apps with React, React Native, Node and modern tooling. I care about clean architecture, performance and pixel-perfect UI on every platform.',
  stats: [
    { icon: 'briefcase-check', value: '3+', label: 'Years Exp.' },
    { icon: 'rocket-launch', value: '20+', label: 'Projects' },
    { icon: 'account-group', value: '15+', label: 'Clients' },
  ],
};

export const skillsContent = {
  label: 'Technical Skills & Expertise',
  title: 'Core Technologies & Proficiencies',
  subtitle: 'The tools and technologies I use to bring ideas to life',
  groups: [
    {
      title: 'Frontend',
      icon: 'cellphone',
      skills: ['React Native', 'React', 'Next.js', 'Expo', 'NativeWind', 'TypeScript'],
    },
    {
      title: 'Backend',
      icon: 'server',
      skills: ['Node.js', 'Express', 'REST APIs', 'GraphQL', 'PostgreSQL', 'MongoDB'],
    },
    {
      title: 'Tools',
      icon: 'tools',
      skills: ['Git', 'GitHub', 'VS Code', 'Figma', 'EAS', 'Docker'],
    },
    {
      title: 'Soft Skills',
      icon: 'account-heart',
      skills: ['Communication', 'Teamwork', 'Problem Solving', 'Adaptability'],
    },
  ],
};

export const projectsContent = {
  label: 'My Creative Works',
  title: 'Featured Projects',
  subtitle: "A selection of things I've designed and built",
};

export const experienceContent = {
  label: 'Career Journey',
  title: 'Work Experience',
  subtitle: 'Roles and impact across my professional journey',
  items: [
    {
      role: 'Senior React Native Developer',
      company: 'Zoomit',
      period: '2023 — Present',
      achievements: [
        'Led mobile development and built a reusable UI component system.',
        'Improved app performance and reduced crash rate significantly.',
        'Shipped features used by thousands of users across iOS & Android.',
      ],
    },
    {
      role: 'Mobile App Developer',
      company: 'Freelance',
      period: '2021 — 2023',
      achievements: [
        'Delivered cross-platform apps for startups with Expo.',
        'Implemented offline-first sync and smooth animations.',
      ],
    },
    {
      role: 'Frontend Developer',
      company: 'Agency',
      period: '2020 — 2021',
      achievements: [
        'Built responsive web apps with React and Next.js.',
        'Collaborated closely with designers to ship pixel-perfect UI.',
      ],
    },
  ],
};

export const contactContent = {
  label: 'Get In Touch',
  title: "Let's Work Together",
  subtitle: "Have a project in mind? Send me a message and let's build it",
  info: [
    { icon: 'email', label: 'Email', value: 'sujonthezoomit@gmail.com' },
    { icon: 'github', label: 'GitHub', value: '@sujon-258549' },
    { icon: 'map-marker', label: 'Location', value: 'Dhaka, Bangladesh' },
  ],
};

export const footerContent = {
  brand: 'Sujon.dev',
  tagline: "Full Stack Developer — let's build something great together.",
  links: ['Home', 'About', 'Projects', 'Contact'],
  socials: [
    { icon: 'github', label: 'GitHub' },
    { icon: 'linkedin', label: 'LinkedIn' },
    { icon: 'email', label: 'Email' },
  ],
};
