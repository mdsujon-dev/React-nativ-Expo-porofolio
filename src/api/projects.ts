import { useQuery } from '@tanstack/react-query';

import { apiGet } from '@/lib/api';

export type ProjectTechnologies = {
  frontend?: string[];
  backend?: string[];
  database?: string[];
  tools?: string[];
};

export type Project = {
  _id: string;
  title: string;
  category: string;
  thumbnail: string;
  shortDescription: string;
  technologies?: ProjectTechnologies;
  tags?: string[];
  liveUrl?: string;
  githubUrl?: string;
};

/** Flatten the tags to show on a project card. */
export function projectTags(project: Project): string[] {
  if (project.tags?.length) return project.tags.slice(0, 8);
  const tech = project.technologies ?? {};
  return [
    ...(tech.frontend ?? []),
    ...(tech.backend ?? []),
    ...(tech.database ?? []),
    ...(tech.tools ?? []),
  ]
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 8);
}

/** GET /projects */
export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => apiGet<Project[]>('/projects'),
  });
}
