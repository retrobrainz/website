const discRegex = /\(Dis[ck] ([0-9]+)\)/;
const revRegex = /\(Rev \w+\)/;
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

const allTags = [
  'Demo',
  'Beta',
  'Proto',
  'Aftermarket',
  'Alt',
  'DS Broadcast',
  'Kiosk',
  'Limited Run Games',
  'Menu',
  'NDSi Enhanced',
  'NG',
  'NGen',
  'Patreon',
  'Pirate',
  'Retro-Bit',
  'Retro-Bit Generations',
  'Sample',
  'Save Data',
  'Steam',
  'Switch',
  'Unl',
  'Wi-Fi Kiosk',
];

export interface ParsedResult {
  title: string;
  name: string;
  disc: number | null;
  regions: string[];
  languages?: string;
  tags?: string[];
}

/**
 * Parse Redump game name and get region, language, disc number and regular game title.
 */
export default function parseName(rawName: string, serial?: string): ParsedResult {
  const regionMatch = rawName.match(regionRegex);

  if (!regionMatch) {
    console.warn(`No region found in "${rawName}"`);
  }

  const regions = regionMatch?.[1].split(', ').map(remapRegion)?.filter(Boolean) || [];
  const langMatch = rawName.match(langRegex);
  const languages = langMatch?.[1];
  const discMatch = rawName.match(discRegex);
  const disc = discMatch ? parseInt(discMatch[1], 10) : null;

  const tags = Array.from(rawName.matchAll(tagRegex))
    .map((match) => match[1])
    .join(', ')
    .split(', ')
    .map((tag) => tag.trim())
    .filter(Boolean);

  const title = rawName.substring(0, regionMatch?.index).trim();

  const name = rawName
    .replace(discRegex, '')
    .replace(revRegex, '')
    .replace(/\(v[0-9.]+\)/g, '')
    .replace(/\(Proto\s*\d*\)/g, '')
    .replace(/\(Beta\s*\d*\)/g, '')
    .replace(/\(Demo\s*\d*\)/g, '')
    .replace(/\([0-9]{4}-[0-9]{2}-[0-9]{2}]\)/g, '') // date
    .replace(/\([\w\s,]*Virtual Console[\w\s,]*\)/g, '')
    .replace('(Aftermarket)', '')
    .replace('(Alt)', '')
    .replace('(DS Broadcast)', '')
    .replace('(Kiosk)', '')
    .replace('(Limited Run Games)', '')
    .replace('(Menu)', '')
    .replace('(NDSi Enhanced)', '')
    .replace('(NG)', '')
    .replace('(NGen)', '')
    .replace('(Patreon)', '')
    .replace('(Pirate)', '')
    .replace('(Retro-Bit)', '')
    .replace('(Retro-Bit Generations)', '')
    .replace('(Sample)', '')
    .replace('(Save Data)', '')
    .replace('(Steam)', '')
    .replace('(Switch)', '')
    .replace('(Unl)', '')
    .replace('(Wi-Fi Kiosk)', '')
    .replace(`(${serial})`, '')
    .replace(/\s+/g, ' ')
    .trim();

  return {
    title,
    name,
    regions,
    languages,
    disc,
    tags,
  };
}
