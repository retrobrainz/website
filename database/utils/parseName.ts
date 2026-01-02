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

function remapRegion(region?: string) {
  return regionMap[region ?? ''] || region || 'Unknown';
}

export interface ParsedResult {
  title: string;
  displayName: string;
  mainName: string;
  disc: number;
  region: string;
  language?: string;
}

/**
 * Parse Redump game name and get region, language, disc number and regular game title.
 */
export default function parseName(name: string): ParsedResult {
  const regionMatch = name.match(regionRegex);

  if (!regionMatch) {
    console.warn(`No region found in "${name}"`);
  }

  const region = remapRegion(regionMatch?.[1]);
  const langMatch = name.match(langRegex);
  const language = langMatch?.[1];
  const discMatch = name.match(discRegex);
  const disc = discMatch ? parseInt(discMatch[1], 10) : 1;

  const mainName = name
    .replace(revRegex, '') // remove (Rev 1)
    .replace(altRegex, '') // remove (Alt)
    .replace(discRegex, '(Disc 1)') // change (Disc 2) to (Disc 1)
    .replace('(Virtual Console)', '') // See https://en.wikipedia.org/wiki/Virtual_Console
    .replace(/\s+/g, ' ') // combine spaces
    .trim();

  const title = name.substring(0, regionMatch?.index).trim();

  const displayName = regionMatch ? `${title} (${region})` : title;

  return {
    title,
    mainName,
    displayName,
    disc,
    region,
    language,
  };
}
