const discRegex = /\(Dis[ck] ([0-9]+)\)/;

const revRegex = /\(Rev \w+\)/;
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

const knownTags = [
  '3DS Virtual Console',
  'Aftermarket',
  'Alt',
  'DLC',
  'DS Broadcast',
  'EDC',
  'Evercade',
  'GB Compatible',
  'Genteiban',
  'Kiosk',
  'Limited Run Games',
  'Major Wave',
  'Menu',
  'minis',
  'NDSi Enhanced',
  'NG',
  'NGen',
  'NP',
  'Patreon',
  'PCE',
  'Pirate',
  'Premium Box',
  'PSN',
  'PSP',
  'Retro-Bit',
  'Retro-Bit Generations',
  'Rumble Version',
  'Sample',
  'Save Data',
  'Sega Channel',
  'SGB Enhanced',
  'Shokai Genteiban',
  'Steam',
  'Switch',
  'Switch Online',
  'Trade Demo',
  'Unl',
  'USA Wii Virtual Console',
  'Video',
  'Virtual Console',
  'Wi-Fi Kiosk',
  'Wii Virtual Console',
  'Wii U Virtual Console',
  'Wii and Wii U Virtual Console',
];

const knownTagRegex = new RegExp(`\\(((?:${knownTags.join('|')}|, )+)\\)`, 'g');

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
export default function parseName(romName: string, serial?: string): ParsedResult {
  const regionMatch = romName.match(regionRegex);

  if (!regionMatch) {
    console.warn(`No region found in "${romName}"`);
  }

  const regions = regionMatch?.[1].split(', ').map(remapRegion)?.filter(Boolean) || [];
  const langMatch = romName.match(langRegex);
  const languages = langMatch?.[1];
  const discMatch = romName.match(discRegex);
  const disc = discMatch ? parseInt(discMatch[1], 10) : null;

  const title = romName.substring(0, regionMatch?.index).trim();

  let name = romName
    .replace(discRegex, '')
    .replace(revRegex, '')
    .replace(verRegex, '')
    .replace(protoRegex, '')
    .replace(betaRegex, '')
    .replace(demoRegex, '')
    .replace(dateRegex, '')
    .replace(`(${serial})`, '')
    .replace(/\s+/g, ' ')
    .trim();

  const tags = Array.from(name.matchAll(tagRegex))
    .map((match) => match[1])
    .join(', ')
    .split(', ')
    .map((tag) => tag.trim())
    .filter((tag) => tag && tag !== languages && !allRegions.includes(tag));

  name = name.replace(knownTagRegex, '').replace(/\s+/g, ' ').trim();

  return {
    title,
    name,
    regions,
    languages,
    disc,
    tags,
  };
}
