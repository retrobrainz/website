const discRegex = /\(Dis[ck] ([0-9]+)\)/;

const revRegex = /\(Rev \w+\)/;
const altRegex = /\(Alt\s*\d*\)/;
const verRegex = /\(v[0-9.]+\)/;
const protoRegex = /\(Proto\s*\d*\)/;
const betaRegex = /\(Beta\s*\d*\)/;
const demoRegex = /\(Demo\s*\d*\)/;
const dateRegex = /\([0-9]{4}-[0-9]{2}-[0-9]{2}\)/;

const langRegex = /\(([A-Z][a-z](?:[,+][A-Z][a-z])*)\)/;

const allRegions = [
  'Argentina',
  'Asia',
  'Australia',
  'Austria',
  'Belgium',
  'Brazil',
  'Canada',
  'China',
  'Croatia',
  'Denmark',
  'Europe',
  'Finland',
  'France',
  'Germany',
  'Greece',
  'Hong Kong',
  'India',
  'Ireland',
  'Israel',
  'Italy',
  'Japan',
  'Korea',
  'Latin America',
  'Netherlands',
  'New Zealand',
  'Mexico',
  'Norway',
  'Poland',
  'Portugal',
  'Russia',
  'Scandinavia',
  'South Africa',
  'Spain',
  'Sweden',
  'Switzerland',
  'Taiwan',
  'Turkey',
  'UK',
  'USA',
  'United Arab Emirates',
  'United Kingdom',
  'Unknown',
  'World',
];

const regionMap: Record<string, string> = { 'United Kingdom': 'UK' };

const regionRegex = new RegExp(`\\(((?:${allRegions.join('|')}|, )+)\\)`);

function remapRegion(region: string) {
  return regionMap[region] || region;
}

const tagRegex = /\(([^)]+)\)/g;

export interface ParsedResult {
  /** Game title without regions, languages and other tags */
  title: string;
  /** Game name without disc number, version, beta, demo and serial tags */
  name: string;
  disc: number | null;
  regions: string[];
  languages?: string;
  tags?: string[];
}

/**
 * Parse Redump game name and get region, language, disc number and regular game title.
 */
export default function parseName(romName: string): ParsedResult {
  const regionMatch = romName.match(regionRegex);

  if (!regionMatch) {
    console.warn(`No region found in "${romName}"`);
  }

  const regions = regionMatch?.[1].split(', ').map(remapRegion)?.filter(Boolean) || [];
  const languages = romName.match(langRegex)?.[1];
  const discMatch = romName.match(discRegex);
  const disc = discMatch ? parseInt(discMatch[1], 10) : null;

  const title = romName.substring(0, regionMatch?.index).trim();

  // Remove some tags from the name to reduce duplication.
  // These roms are from same game box and share same boxart.
  const name = romName
    .replace(discRegex, '') // multiple discs
    .replace(revRegex, '') // revisions
    .replace(altRegex, '') // alternate versions
    .replace(verRegex, '') // update versions
    .replace(protoRegex, '') // prototype versions
    .replace(betaRegex, '') // beta versions
    .replace(demoRegex, '') // demo versions
    .replace(dateRegex, '') // prototype/demos with date
    .replace('(Earlier)', '') // earlier beta versions
    .replace('(Later)', '') // later beta versions
    .replace('[b]', '') // bad dump
    .replace(/\s+/g, ' ')
    .trim();

  const tags = Array.from(name.matchAll(tagRegex))
    .map((match) => match[1])
    .join(', ')
    .split(', ')
    .map((tag) => tag.trim())
    .filter((tag) => tag && tag !== languages && !allRegions.includes(tag));

  return {
    title,
    name,
    regions,
    languages,
    disc,
    tags,
  };
}
