/**
 * The backend stores icons as FontAwesome class strings (e.g. "fa-solid fa-github",
 * "fa-brands fa-linkedin-in"). This app renders icons with react-native-paper, which
 * uses Material Community Icons (MCI) names. This helper translates FA → MCI so the
 * dynamic content can drive the same icon set as the static fallback content.
 */

/** Map of FontAwesome icon slugs (without the fa- prefix) to MCI icon names. */
const FA_TO_MCI: Record<string, string> = {
  // brands / social
  github: 'github',
  'linkedin-in': 'linkedin',
  linkedin: 'linkedin',
  facebook: 'facebook',
  'facebook-f': 'facebook',
  whatsapp: 'whatsapp',
  twitter: 'twitter',
  'x-twitter': 'twitter',
  instagram: 'instagram',
  youtube: 'youtube',
  telegram: 'telegram',
  dribbble: 'dribbble',
  behance: 'behance',
  // contact
  envelope: 'email',
  'envelope-open': 'email-open',
  phone: 'phone',
  'location-dot': 'map-marker',
  'map-marker-alt': 'map-marker',
  'map-pin': 'map-marker',
  // actions
  'paper-plane': 'send',
  download: 'download',
  upload: 'upload',
  link: 'link-variant',
  'arrow-right': 'arrow-right',
  'external-link': 'open-in-new',
  // tech / work
  code: 'code-tags',
  'code-branch': 'source-branch',
  'code-compare': 'compare',
  server: 'server',
  database: 'database',
  terminal: 'console',
  'pen-nib': 'fountain-pen',
  'pen-ruler': 'pencil-ruler',
  'list-check': 'format-list-checks',
  'magnifying-glass': 'magnify',
  magnify: 'magnify',
  'bug-slash': 'bug',
  bug: 'bug',
  // lucide names (PascalCase in some sections, normalized to kebab below)
  'badge-check': 'check-decagram',
  globe: 'earth',
  award: 'trophy',
  'trending-up': 'trending-up',
  zap: 'lightning-bolt',
  shield: 'shield-check',
  'shield-check': 'shield-check',
  clock: 'clock-outline',
  'user-check': 'account-check',
  cloud: 'cloud',
  mobile: 'cellphone',
  'mobile-screen': 'cellphone',
  desktop: 'monitor',
  laptop: 'laptop',
  briefcase: 'briefcase',
  'briefcase-check': 'briefcase-check',
  'layer-group': 'layers',
  layers: 'layers',
  cubes: 'cube-outline',
  'graduation-cap': 'school',
  rocket: 'rocket-launch',
  'rocket-launch': 'rocket-launch',
  // people / misc
  user: 'account',
  users: 'account-group',
  'user-group': 'account-group',
  star: 'star',
  sparkles: 'star-four-points',
  heart: 'heart',
  bolt: 'lightning-bolt',
  gauge: 'gauge',
  'chart-line': 'chart-line',
  gear: 'cog',
  cog: 'cog',
  wrench: 'wrench',
  tools: 'tools',
  palette: 'palette',
  figma: 'vector-square',
  lightbulb: 'lightbulb',
  fire: 'fire',
  trophy: 'trophy',
  medal: 'medal',
  certificate: 'certificate',
  check: 'check',
  'check-circle': 'check-circle',
};

/** Fallback icon when a FA name has no MCI mapping. */
const DEFAULT_ICON = 'star-four-points';

/**
 * Convert a value that may be a FontAwesome class string, a bare FA slug, or an
 * already-valid MCI name into an MCI icon name usable by react-native-paper.
 */
export function toMciIcon(value?: string | null, fallback = DEFAULT_ICON): string {
  if (!value || typeof value !== 'string') return fallback;

  const raw = value.trim();
  if (!raw) return fallback;

  // Grab the meaningful FA token, ignoring style prefixes like fa-solid/fa-brands.
  const tokens = raw
    .split(/\s+/)
    .map((t) => t.replace(/^fa-/, ''))
    .filter((t) => t && !['solid', 'brands', 'regular', 'light', 'thin', 'duotone', 'fas', 'fab', 'far'].includes(t));

  const slug = tokens[tokens.length - 1] ?? raw.replace(/^fa-/, '');

  if (FA_TO_MCI[slug]) return FA_TO_MCI[slug];

  // Handle PascalCase / camelCase (e.g. lucide "BadgeCheck") by kebab-casing it.
  const kebab = slug.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  if (FA_TO_MCI[kebab]) return FA_TO_MCI[kebab];

  // If the string never looked like FontAwesome, assume it is already an MCI name.
  if (!/(^|\s)fa[-s]/.test(raw) && !raw.includes('fa-') && !/[A-Z]/.test(raw)) return raw;

  return fallback;
}

/** Map a social platform label (GitHub, LinkedIn, …) to an MCI icon as a backup. */
export function platformToMciIcon(platform?: string | null, fallback = 'web'): string {
  const key = (platform ?? '').trim().toLowerCase();
  const map: Record<string, string> = {
    github: 'github',
    linkedin: 'linkedin',
    email: 'email',
    phone: 'phone',
    whatsapp: 'whatsapp',
    facebook: 'facebook',
    twitter: 'twitter',
    x: 'twitter',
    instagram: 'instagram',
    youtube: 'youtube',
    telegram: 'telegram',
  };
  return map[key] ?? fallback;
}
