/**
 * Dynamic content for the home page. Every section's copy lives in the backend
 * and is fetched per section from `GET /dynamic-content?type=<section>`.
 *
 * Each `useXxx()` hook fetches its section, normalizes the raw backend document
 * into the exact view-model the section component renders, and falls back to the
 * static `content/home.ts` copy while loading or if the request fails — so the UI
 * always has something to show.
 */
import { useQuery } from '@tanstack/react-query';

import {
  aboutContent,
  contactContent,
  experienceContent,
  heroContent,
  skillsContent,
} from '@/content/home';
import { apiGet } from '@/lib/api';
import { platformToMciIcon, toMciIcon } from '@/lib/icons';

/** Section identifiers understood by the backend `type` query param. */
export type SectionType =
  | 'hero'
  | 'about'
  | 'skills'
  | 'experience'
  | 'contact'
  | 'services'
  | 'education'
  | 'workflow'
  | 'faq'
  | 'trust_section'
  | 'project-section-header'
  | 'review_section_header'
  | 'welcome_modal'
  | 'footer';

/** Fields present on every stored content document. */
type BaseDoc = {
  _id?: string;
  type?: string;
  isActive?: boolean;
  slNumber?: number | string;
};

/** Generic fetch for one content section. Returns `null` if none is stored. */
export function useDynamicContent<T>(type: SectionType) {
  return useQuery({
    queryKey: ['dynamic-content', type],
    queryFn: () => apiGet<(T & BaseDoc) | null>(`/dynamic-content?type=${type}`),
  });
}

/**
 * A section is visible unless the backend explicitly marks it `isActive: false`.
 * While loading or if the request fails (`data` is null/undefined) we keep it
 * visible so the static fallback can render and the page is never empty.
 */
function isSectionActive(data?: BaseDoc | null): boolean {
  return data?.isActive !== false;
}

/* --------------------------------- Hero ---------------------------------- */

type HeroDoc = BaseDoc & {
  greeting?: string;
  name?: string;
  nameHighlight?: string;
  description?: string;
  rotatingTexts?: string[];
  buttons?: {
    primary?: { text?: string; link?: string; icon?: string };
    secondary?: { text?: string; link?: string; icon?: string };
  };
  socialLinks?: { icon?: string; url?: string; platform?: string }[];
  techHighlights?: string[];
};

export type HeroView = {
  greeting: string;
  tagline: string;
  primaryCta: { text: string; link?: string; icon: string };
  secondaryCta: { text: string; link?: string; icon: string };
  socials: { icon: string; url?: string; key: string }[];
};

function normalizeHero(doc?: HeroDoc | null): HeroView {
  const greeting =
    [doc?.greeting, doc?.name].filter(Boolean).join(' ').trim() || heroContent.greeting;
  const tagline =
    doc?.description || doc?.rotatingTexts?.[0] || heroContent.tagline;

  return {
    greeting,
    tagline,
    primaryCta: {
      text: doc?.buttons?.primary?.text || heroContent.primaryCta,
      link: doc?.buttons?.primary?.link,
      icon: toMciIcon(doc?.buttons?.primary?.icon, 'briefcase'),
    },
    secondaryCta: {
      text: doc?.buttons?.secondary?.text || heroContent.secondaryCta,
      link: doc?.buttons?.secondary?.link,
      icon: toMciIcon(doc?.buttons?.secondary?.icon, 'folder-open'),
    },
    socials:
      doc?.socialLinks?.length
        ? doc.socialLinks.map((s, i) => ({
            icon:
              toMciIcon(s.icon, platformToMciIcon(s.platform)) ||
              platformToMciIcon(s.platform),
            url: s.url,
            key: `${s.platform ?? 'social'}-${i}`,
          }))
        : heroContent.socials.map((icon) => ({ icon, url: undefined, key: icon })),
  };
}

export function useHero() {
  const query = useDynamicContent<HeroDoc>('hero');
  return { ...query, content: normalizeHero(query.data), active: isSectionActive(query.data) };
}

/* --------------------------------- About --------------------------------- */

type AboutDoc = BaseDoc & {
  badge?: string;
  title?: string;
  titleHighlight?: string;
  role?: string;
  name?: string;
  description?: string[] | string;
  stats?: { label?: string; value?: string; icon?: string }[];
};

export type AboutView = {
  label: string;
  title: string;
  subtitle: string;
  name: string;
  bio: string;
  stats: { icon: string; value: string; label: string }[];
};

function normalizeAbout(doc?: AboutDoc | null): AboutView {
  const bio = Array.isArray(doc?.description)
    ? doc?.description[0]
    : (doc?.description as string | undefined);

  return {
    label: doc?.badge || aboutContent.label,
    title:
      [doc?.title, doc?.titleHighlight].filter(Boolean).join(' ').trim() ||
      aboutContent.title,
    subtitle: doc?.role || aboutContent.subtitle,
    name: doc?.name || aboutContent.name,
    bio: bio || aboutContent.bio,
    stats: doc?.stats?.length
      ? doc.stats.map((s) => ({
          icon: toMciIcon(s.icon, 'star-four-points'),
          value: s.value ?? '',
          label: s.label ?? '',
        }))
      : aboutContent.stats,
  };
}

export function useAbout() {
  const query = useDynamicContent<AboutDoc>('about');
  return { ...query, content: normalizeAbout(query.data), active: isSectionActive(query.data) };
}

/* -------------------------------- Skills --------------------------------- */

type SkillsDoc = BaseDoc & {
  badge?: string;
  title?: string;
  titleHighlight?: string;
  categories?: { id?: string; title?: string; icon?: string; skills?: string[] }[];
};

export type SkillsView = {
  label: string;
  title: string;
  subtitle: string;
  groups: { title: string; icon: string; skills: string[]; key: string }[];
};

function normalizeSkills(doc?: SkillsDoc | null): SkillsView {
  return {
    label: doc?.badge || skillsContent.label,
    title:
      [doc?.title, doc?.titleHighlight].filter(Boolean).join(' ').trim() ||
      skillsContent.title,
    subtitle: skillsContent.subtitle,
    groups: doc?.categories?.length
      ? doc.categories.map((c, i) => ({
          title: c.title ?? '',
          icon: toMciIcon(c.icon, 'code-tags'),
          skills: c.skills ?? [],
          key: c.id ?? `${c.title ?? 'group'}-${i}`,
        }))
      : skillsContent.groups.map((g) => ({ ...g, key: g.title })),
  };
}

export function useSkills() {
  const query = useDynamicContent<SkillsDoc>('skills');
  return { ...query, content: normalizeSkills(query.data), active: isSectionActive(query.data) };
}

/* ------------------------------ Experience ------------------------------- */

type ExperienceDoc = BaseDoc & {
  badge?: string;
  title?: string;
  titleColor?: string;
  description?: string;
  experiences?: {
    title?: string;
    company?: string;
    period?: string;
    icon?: string;
    achievements?: string[];
  }[];
};

export type ExperienceView = {
  label: string;
  title: string;
  subtitle: string;
  items: {
    role: string;
    company: string;
    period: string;
    icon: string;
    achievements: string[];
    key: string;
  }[];
};

function normalizeExperience(doc?: ExperienceDoc | null): ExperienceView {
  return {
    label: doc?.badge || experienceContent.label,
    title:
      [doc?.title, doc?.titleColor].filter(Boolean).join(' ').trim() ||
      experienceContent.title,
    subtitle: doc?.description || experienceContent.subtitle,
    items: doc?.experiences?.length
      ? doc.experiences.map((e, i) => ({
          role: e.title ?? '',
          company: e.company ?? '',
          period: e.period ?? '',
          icon: toMciIcon(e.icon, 'briefcase'),
          achievements: e.achievements ?? [],
          key: `${e.title ?? 'role'}-${e.company ?? ''}-${i}`,
        }))
      : experienceContent.items.map((it) => ({
          ...it,
          icon: 'briefcase',
          key: it.role,
        })),
  };
}

export function useExperience() {
  const query = useDynamicContent<ExperienceDoc>('experience');
  return { ...query, content: normalizeExperience(query.data), active: isSectionActive(query.data) };
}

/* -------------------------------- Contact -------------------------------- */

type ContactDoc = BaseDoc & {
  badge?: string;
  title?: string;
  titleColor?: string;
  contactCards?: { icon?: string; title?: string; value?: string }[];
};

export type ContactView = {
  label: string;
  title: string;
  subtitle: string;
  info: { icon: string; label: string; value: string; key: string }[];
};

function normalizeContact(doc?: ContactDoc | null): ContactView {
  return {
    label: doc?.badge || contactContent.label,
    title:
      [doc?.title, doc?.titleColor].filter(Boolean).join(' ').trim() ||
      contactContent.title,
    subtitle: contactContent.subtitle,
    info: doc?.contactCards?.length
      ? doc.contactCards.map((c, i) => ({
          icon: toMciIcon(c.icon, 'information'),
          label: c.title ?? '',
          value: c.value ?? '',
          key: `${c.title ?? 'info'}-${i}`,
        }))
      : contactContent.info.map((it) => ({ ...it, key: it.label })),
  };
}

export function useContact() {
  const query = useDynamicContent<ContactDoc>('contact');
  return { ...query, content: normalizeContact(query.data), active: isSectionActive(query.data) };
}

/* -------------------------------- Services ------------------------------- */

type ServicesDoc = BaseDoc & {
  badge?: string;
  title?: string;
  titleHighlight?: string;
  services?: {
    id?: string;
    title?: string;
    description?: string;
    icon?: string;
    features?: string[];
  }[];
};

export type ServicesView = {
  label: string;
  title: string;
  items: { title: string; description: string; icon: string; features: string[]; key: string }[];
};

function normalizeServices(doc?: ServicesDoc | null): ServicesView {
  return {
    label: doc?.badge || 'What I Do',
    title: [doc?.title, doc?.titleHighlight].filter(Boolean).join(' ').trim() || 'Services I Provide',
    items:
      doc?.services?.map((s, i) => ({
        title: s.title ?? '',
        description: s.description ?? '',
        icon: toMciIcon(s.icon, 'star-four-points'),
        features: s.features ?? [],
        key: s.id ?? `service-${i}`,
      })) ?? [],
  };
}

export function useServices() {
  const query = useDynamicContent<ServicesDoc>('services');
  return { ...query, content: normalizeServices(query.data), active: isSectionActive(query.data) };
}

/* ------------------------------- Education ------------------------------- */

type EducationDoc = BaseDoc & {
  badge?: string;
  title?: string;
  titleColor?: string;
  description?: string;
  education?: {
    degree?: string;
    institution?: string;
    location?: string;
    period?: string;
    grade?: string;
    description?: string;
    icon?: string;
  }[];
};

export type EducationView = {
  label: string;
  title: string;
  subtitle: string;
  items: {
    degree: string;
    institution: string;
    period: string;
    grade: string;
    description: string;
    icon: string;
    key: string;
  }[];
};

function normalizeEducation(doc?: EducationDoc | null): EducationView {
  return {
    label: doc?.badge || 'Academic Background',
    title: [doc?.title, doc?.titleColor].filter(Boolean).join(' ').trim() || 'Education',
    subtitle: doc?.description || '',
    items:
      doc?.education?.map((e, i) => ({
        degree: e.degree ?? '',
        institution: e.institution ?? '',
        period: e.period ?? '',
        grade: e.grade ?? '',
        description: e.description ?? '',
        icon: toMciIcon(e.icon, 'school'),
        key: `${e.degree ?? 'edu'}-${i}`,
      })) ?? [],
  };
}

export function useEducation() {
  const query = useDynamicContent<EducationDoc>('education');
  return { ...query, content: normalizeEducation(query.data), active: isSectionActive(query.data) };
}

/* -------------------------------- Workflow ------------------------------- */

type WorkflowDoc = BaseDoc & {
  badge?: string;
  title?: string;
  titleHighlight?: string;
  description?: string;
  steps?: { id?: string; stepNumber?: string; title?: string; description?: string; icon?: string }[];
};

export type WorkflowView = {
  label: string;
  title: string;
  subtitle: string;
  steps: { stepNumber: string; title: string; description: string; icon: string; key: string }[];
};

function normalizeWorkflow(doc?: WorkflowDoc | null): WorkflowView {
  return {
    label: doc?.badge || 'How I Work',
    title: [doc?.title, doc?.titleHighlight].filter(Boolean).join(' ').trim() || 'My Workflow',
    subtitle: doc?.description || '',
    steps:
      doc?.steps?.map((s, i) => ({
        stepNumber: s.stepNumber ?? String(i + 1).padStart(2, '0'),
        title: s.title ?? '',
        description: s.description ?? '',
        icon: toMciIcon(s.icon, 'checkbox-marked-circle-outline'),
        key: s.id ?? `step-${i}`,
      })) ?? [],
  };
}

export function useWorkflow() {
  const query = useDynamicContent<WorkflowDoc>('workflow');
  return { ...query, content: normalizeWorkflow(query.data), active: isSectionActive(query.data) };
}

/* ---------------------------------- FAQ ---------------------------------- */

type FaqDoc = BaseDoc & {
  title?: string;
  subtitle?: string;
  description?: string;
  faqs?: { id?: number | string; question?: string; answer?: string }[];
};

export type FaqView = {
  label: string;
  title: string;
  subtitle: string;
  items: { question: string; answer: string; key: string }[];
};

function normalizeFaq(doc?: FaqDoc | null): FaqView {
  return {
    label: doc?.subtitle || 'FAQ',
    title: doc?.title || 'Frequently Asked Questions',
    subtitle: doc?.description || '',
    items:
      doc?.faqs?.map((f, i) => ({
        question: f.question ?? '',
        answer: f.answer ?? '',
        key: String(f.id ?? `faq-${i}`),
      })) ?? [],
  };
}

export function useFaq() {
  const query = useDynamicContent<FaqDoc>('faq');
  return { ...query, content: normalizeFaq(query.data), active: isSectionActive(query.data) };
}

/* ------------------------------ Trust section ---------------------------- */

type TrustDoc = BaseDoc & {
  title?: string;
  subtitle?: string;
  description?: string;
  stats?: { label?: string; value?: string; icon?: string }[];
  brands?: { id?: number | string; name?: string; image?: string }[];
};

export type TrustView = {
  label: string;
  title: string;
  subtitle: string;
  stats: { label: string; value: string; icon: string; key: string }[];
  brands: { name: string; image: string; key: string }[];
};

function normalizeTrust(doc?: TrustDoc | null): TrustView {
  return {
    label: doc?.subtitle || 'Trusted By',
    title: doc?.title || 'Trusted by Industry Leaders',
    subtitle: doc?.description || '',
    stats:
      doc?.stats?.map((s, i) => ({
        label: s.label ?? '',
        value: s.value ?? '',
        icon: toMciIcon(s.icon, 'chart-box'),
        key: `${s.label ?? 'stat'}-${i}`,
      })) ?? [],
    brands:
      doc?.brands
        ?.filter((b) => b.image)
        .map((b, i) => ({ name: b.name ?? '', image: b.image ?? '', key: String(b.id ?? `brand-${i}`) })) ?? [],
  };
}

export function useTrust() {
  const query = useDynamicContent<TrustDoc>('trust_section');
  return { ...query, content: normalizeTrust(query.data), active: isSectionActive(query.data) };
}

/* ---------------------- Simple section headers --------------------------- */

type SectionHeaderDoc = BaseDoc & {
  badge?: string;
  title?: string;
  titleHighlight?: string;
  description?: string;
  completedCount?: string;
};

export type SectionHeaderView = {
  label: string;
  title: string;
  subtitle: string;
  completedCount?: string;
};

function normalizeHeader(
  doc: SectionHeaderDoc | null | undefined,
  fallback: { label: string; title: string; subtitle: string },
): SectionHeaderView {
  return {
    label: doc?.badge || fallback.label,
    title: [doc?.title, doc?.titleHighlight].filter(Boolean).join(' ').trim() || fallback.title,
    subtitle: doc?.description || fallback.subtitle,
    completedCount: doc?.completedCount,
  };
}

/** Header for the Projects section (`project-section-header`). */
export function useProjectHeader() {
  const query = useDynamicContent<SectionHeaderDoc>('project-section-header');
  return {
    ...query,
    content: normalizeHeader(query.data, {
      label: 'My Creative Works',
      title: 'Featured Projects',
      subtitle: "A selection of things I've designed and built",
    }),
    active: isSectionActive(query.data),
  };
}

/** Header for the Reviews section (`review_section_header`). */
export function useReviewHeader() {
  const query = useDynamicContent<SectionHeaderDoc>('review_section_header');
  return {
    ...query,
    content: normalizeHeader(query.data, {
      label: 'Testimonials',
      title: 'What People Say',
      subtitle: 'Feedback from clients and colleagues.',
    }),
    active: isSectionActive(query.data),
  };
}

/* ----------------------------- Welcome modal ----------------------------- */

type WelcomeModalDoc = BaseDoc & {
  welcomeBadge?: string;
  title?: string;
  titleHighlight?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  quickLinks?: { id?: string; label?: string; icon?: string }[];
};

export type WelcomeModalView = {
  badge: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  quickLinks: { id: string; label: string; icon: string }[];
};

function normalizeWelcomeModal(doc?: WelcomeModalDoc | null): WelcomeModalView {
  return {
    badge: doc?.welcomeBadge || 'Welcome',
    title: [doc?.title, doc?.titleHighlight].filter(Boolean).join(' ').trim() || "Hey, I'm Sujon",
    description: doc?.description || '',
    ctaText: doc?.ctaText || 'Get in touch',
    ctaLink: doc?.ctaLink || 'contact',
    quickLinks:
      doc?.quickLinks?.map((l, i) => ({
        id: l.id ?? `link-${i}`,
        label: l.label ?? '',
        icon: toMciIcon(l.icon, 'chevron-right'),
      })) ?? [],
  };
}

export function useWelcomeModal() {
  const query = useDynamicContent<WelcomeModalDoc>('welcome_modal');
  return { ...query, content: normalizeWelcomeModal(query.data), active: isSectionActive(query.data) };
}

/* -------------------------------- Footer --------------------------------- */

type FooterDoc = BaseDoc & {
  description?: string;
  copyrightText?: string;
  craftedBy?: string;
  linksTitle?: string;
  contactTitle?: string;
  quickLinks?: { name?: string; href?: string }[];
  contactItems?: { label?: string; value?: string; icon?: string; href?: string }[];
  socialLinks?: { faIcon?: string; icon?: string; href?: string; url?: string; label?: string }[];
};

export type FooterView = {
  description: string;
  copyrightText: string;
  craftedBy: string;
  linksTitle: string;
  contactTitle: string;
  quickLinks: { name: string; href: string; key: string }[];
  contactItems: { label: string; value: string; icon: string; href?: string; key: string }[];
  socials: { icon: string; url?: string; label: string; key: string }[];
};

function normalizeFooter(doc?: FooterDoc | null): FooterView {
  return {
    description: doc?.description || '',
    copyrightText: doc?.copyrightText || 'Sujon',
    craftedBy: doc?.craftedBy || '',
    linksTitle: doc?.linksTitle || 'Quick Links',
    contactTitle: doc?.contactTitle || 'Get In Touch',
    quickLinks:
      doc?.quickLinks?.map((l, i) => ({ name: l.name ?? '', href: l.href ?? '', key: `${l.name ?? 'link'}-${i}` })) ??
      [],
    contactItems:
      doc?.contactItems?.map((c, i) => ({
        label: c.label ?? '',
        value: c.value ?? '',
        icon: toMciIcon(c.icon, 'information'),
        href: c.href,
        key: `${c.label ?? 'contact'}-${i}`,
      })) ?? [],
    socials:
      doc?.socialLinks?.map((s, i) => ({
        icon: toMciIcon(s.faIcon ?? s.icon, platformToMciIcon(s.label)),
        url: s.href ?? s.url,
        label: s.label ?? '',
        key: `${s.label ?? 'social'}-${i}`,
      })) ?? [],
  };
}

export function useFooter() {
  const query = useDynamicContent<FooterDoc>('footer');
  return { ...query, content: normalizeFooter(query.data), active: isSectionActive(query.data) };
}
