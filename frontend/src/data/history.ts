import type { GlyphName } from '@/components/icons/glyph';

export type HistoryEntry = {
  era: string;
  title: string;
  body: string;
  icon: GlyphName;
};

/** Kawayan's own timeline, as published in GoKawayan. */
export const HISTORY: HistoryEntry[] = [
  {
    era: '16th Century',
    title: 'The First Settlers',
    icon: 'sailing-rounded',
    body:
      'The origins of Kawayan date back to the 16th century, when settlers — believed to be descendants of Lapu-Lapu from Mactan — traveled across the Visayan Sea to escape Moro raids and found refuge on the island of Biliran.\n\n' +
      'One of the earliest settlements was Barrio Telegrafo (now Barangay Balacson), situated near a rocky hill called Subingsubing that served as a watchtower against seaborne threats. The settlement was also known at one point as San Clemente.',
  },
  {
    era: 'Spanish Colonial Era',
    title: 'The Bamboo That Gave a Name',
    icon: 'park-rounded',
    body:
      'Early settlers planted dense groves of bamboo along the shoreline as a natural defense, concealing the village from hostile elements approaching by sea. The bamboo became so prominent and defining that the settlement became known as Kawayan — the local word for bamboo.\n\n' +
      'During this period, Kawayan existed as a barrio within the pueblo of Almeria on what was then called Isla de Panamao (Biliran Island).',
  },
  {
    era: '1905–1907',
    title: 'The Almeria Controversy',
    icon: 'gavel-rounded',
    body:
      'During the early American period, a religious and political controversy erupted involving disputes over parish administration and local governance. The conflict between 1905 and 1907 led to significant administrative reorganization on the island.\n\n' +
      "The controversy ultimately resulted in the decision to relocate the seat of government away from Almeria — setting the stage for Kawayan's rise as an independent municipality.",
  },
  {
    era: 'March 19, 1907',
    title: 'Founding as a Municipality',
    icon: 'account-balance-rounded',
    body:
      'On March 19, 1907, Kawayan was officially established as a municipality through Act No. 1616 of the Philippine Commission. The act reorganized the former municipality of Almeria by renaming it to Kawayan and transferring the seat of government to the new municipality.\n\n' +
      'This marked the beginning of Kawayan as a self-governing town, with Almeria becoming a barrio under its jurisdiction.',
  },
  {
    era: 'September 1, 1948',
    title: 'Almeria Separates',
    icon: 'flag-rounded',
    body:
      "After more than four decades under Kawayan's jurisdiction, the municipality of Almeria was separated and re-established as a distinct, independent township in 1948.\n\n" +
      "This reorganization redefined the boundaries of both municipalities and marked a new chapter in Kawayan's administrative history.",
  },
  {
    era: '1951',
    title: 'Territorial Expansion',
    icon: 'map-rounded',
    body:
      'In 1951, a plebiscite was held that resulted in Kawayan expanding its territory by annexing the barangays of Ungale, Tuo, and Inasuyan — areas that had previously belonged to the neighboring municipality of Caibiran.\n\n' +
      "This expansion solidified Kawayan's geographic footprint and brought new communities into the municipality.",
  },
  {
    era: 'Present Day',
    title: 'Kawayan Today',
    icon: 'location-city-rounded',
    body:
      'Today, Kawayan is a municipality in the province of Biliran, Eastern Visayas (Region VIII). It covers a land area of 61.02 square kilometers and is composed of 20 barangays:\n\n' +
      '• Poblacion\n' +
      '• Baganito\n' +
      '• Balacson\n' +
      '• Balite\n' +
      '• Bilwang\n' +
      '• Bulalacao\n' +
      '• Burabod\n' +
      '• Buyo\n' +
      '• Inasuyan\n' +
      '• Kansanok\n' +
      '• Mada-o\n' +
      '• Mapuyo\n' +
      '• Masagaosao\n' +
      '• Masagongsong\n' +
      '• San Lorenzo\n' +
      '• Tabunan North\n' +
      '• Tubig Guinoo\n' +
      '• Tucdao\n' +
      '• Ungale\n' +
      '• Villa Cornejo (Looc)\n\n' +
      'As of the 2020 Census, the municipality has a population of 20,455 residents. The people of Kawayan continue to honor their heritage while building a progressive and resilient community.',
  },
];
