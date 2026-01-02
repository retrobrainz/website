const discRegex = /\(Dis[ck] ([0-9]+)\)/;
const revRegex = /\(Rev \w+\)/;
const altRegex = /\(Alt\)/;
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
  return regionMap[region ?? ''] || region;
}

export interface ParsedResult {
  title: string;
  name: string;
  disc: number;
  regions: string[];
  languages?: string;
}

/**
 * Parse Redump game name and get region, language, disc number and regular game title.
 */
export default function parseName(rawName: string): ParsedResult {
  const regionMatch = rawName.match(regionRegex);

  if (!regionMatch) {
    console.warn(`No region found in "${rawName}"`);
  }

  const regions = regionMatch?.[1].split(', ').map(remapRegion)?.filter(Boolean) || [];
  const langMatch = rawName.match(langRegex);
  const languages = langMatch?.[1];
  const discMatch = rawName.match(discRegex);
  const disc = discMatch ? parseInt(discMatch[1], 10) : 1;

  const title = rawName.substring(0, regionMatch?.index).trim();

  const name = rawName
    .replace(altRegex, '')
    .replace(discRegex, '')
    .replace(revRegex, '')
    .replace(/\s+/g, ' ')
    .trim();

  return {
    title,
    name,
    regions,
    languages,
    disc,
  };
}
