export const CATEGORIES = [
  "Cities",
  "Historical",
  "Nature",
  "Beaches",
  "Mountains",
  "Religious",
  "Cultural",
  "Adventure",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Destination {
  id: string;
  name: string;
  countryCode: string;
  region: string;
  category: Category;
  short: string;
  description: string;
  whyVisit: string;
  thingsToDo: string[];
  bestTime: string;
  duration: string;
  popularity: number; // 1-5
  coords: { lat: number; lng: number };
}

export interface Country {
  code: string;
  name: string;
  flag: string;
  intro: string;
}

/** Deterministic, always-available travel photography for a given key. */
export const imageFor = (key: string, w = 900, h = 650) =>
  `https://picsum.photos/seed/${encodeURIComponent(key)}/${w}/${h}`;

export const COUNTRIES: Country[] = [
  { code: "in", name: "India", flag: "🇮🇳", intro: "A subcontinent of palaces, backwaters, Himalayan valleys and street food that never sleeps." },
  { code: "jp", name: "Japan", flag: "🇯🇵", intro: "Where neon megacities, quiet shrines and snow-capped volcanoes share the same train line." },
  { code: "us", name: "United States", flag: "🇺🇸", intro: "Canyons, coastlines and skylines spread across a continent of wildly different moods." },
  { code: "gb", name: "United Kingdom", flag: "🇬🇧", intro: "Castles, coastal paths and centuries of history packed into a green island nation." },
  { code: "fr", name: "France", flag: "🇫🇷", intro: "Art, alpine peaks, lavender fields and the world's most romantic riverside city." },
  { code: "it", name: "Italy", flag: "🇮🇹", intro: "Ruins, renaissance art, canal cities and food worth planning an entire trip around." },
  { code: "ch", name: "Switzerland", flag: "🇨🇭", intro: "Turquoise lakes, glacier trains and villages tucked beneath impossible mountain walls." },
  { code: "au", name: "Australia", flag: "🇦🇺", intro: "Reef, red desert and surf beaches framed by some of the friendliest cities anywhere." },
  { code: "ae", name: "UAE", flag: "🇦🇪", intro: "Desert dunes and futuristic skylines meeting old trading souks along the Gulf." },
  { code: "tr", name: "Turkey", flag: "🇹🇷", intro: "Two continents, hot-air balloons over fairy chimneys and layers of ancient empires." },
  { code: "my", name: "Malaysia", flag: "🇲🇾", intro: "Rainforest, island beaches and a food culture built from three great cuisines." },
  { code: "sg", name: "Singapore", flag: "🇸🇬", intro: "A garden city-state of futuristic architecture, hawker halls and spotless streets." },
  { code: "th", name: "Thailand", flag: "🇹🇭", intro: "Golden temples, limestone islands and night markets that glow until sunrise." },
  { code: "id", name: "Indonesia", flag: "🇮🇩", intro: "Thousands of islands of volcanoes, rice terraces and world-class surf." },
  { code: "kr", name: "South Korea", flag: "🇰🇷", intro: "Palaces beside skyscrapers, mountain hikes and a pop culture felt worldwide." },
];

type Seed = [
  name: string,
  region: string,
  category: Category,
  short: string,
  popularity: number,
  bestTime: string,
  duration: string,
  lat: number,
  lng: number,
  thingsToDo: string[],
];

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function build(countryCode: string, seeds: Seed[]): Destination[] {
  return seeds.map(([name, region, category, short, popularity, bestTime, duration, lat, lng, thingsToDo]) => ({
    id: `${countryCode}-${slug(name)}`,
    name,
    countryCode,
    region,
    category,
    short,
    description: `${short} ${name} sits in ${region} and rewards travellers who slow down — wander on foot in the early morning, eat where locals queue, and give yourself an unhurried ${duration.toLowerCase()} to take it in properly.`,
    whyVisit: `${name} offers one of the most complete experiences in the region: memorable ${category.toLowerCase()} highlights, genuinely good food and easy connections to everywhere else nearby.`,
    thingsToDo,
    bestTime,
    duration,
    popularity,
    coords: { lat, lng },
  }));
}

export const DESTINATIONS: Destination[] = [
  ...build("in", [
    ["Hyderabad", "Telangana", "Cities", "Biryani, pearls and the Nizams' skyline of minarets and lakes.", 4, "October – February", "2–3 days", 17.385, 78.4867, ["Climb the Charminar at dusk", "Explore Golconda Fort", "Eat biryani in the Old City", "Boat out to Buddha statue on Hussain Sagar"]],
    ["Goa", "West India", "Beaches", "Palm-lined sands, Portuguese churches and a famously easy pace of life.", 5, "November – February", "4–5 days", 15.2993, 74.124, ["Sunset at Palolem Beach", "Old Goa churches", "Spice plantation tour", "Saturday night market at Arpora"]],
    ["Mumbai", "Maharashtra", "Cities", "India's coastal powerhouse of cinema, art deco and seafront promenades.", 5, "November – February", "3 days", 19.076, 72.8777, ["Walk Marine Drive at night", "Ferry to Elephanta Caves", "Gateway of India", "Street food at Chowpatty"]],
    ["Delhi", "North India", "Historical", "Mughal tombs, colonial avenues and bazaars layered over a thousand years.", 5, "October – March", "3 days", 28.6139, 77.209, ["Humayun's Tomb", "Rickshaw through Chandni Chowk", "Qutub Minar", "India Gate in the evening"]],
    ["Jaipur", "Rajasthan", "Cultural", "The Pink City of palaces, stepwells and hilltop forts.", 5, "October – March", "2–3 days", 26.9124, 75.7873, ["Amber Fort at opening time", "Hawa Mahal facade", "City Palace museums", "Block-print shopping in Bapu Bazaar"]],
    ["Kerala", "South India", "Nature", "Backwaters, tea hills and Ayurveda along the Malabar Coast.", 5, "September – March", "5–7 days", 9.9312, 76.2673, ["Houseboat in Alleppey", "Tea estates in Munnar", "Kathakali performance in Kochi", "Wildlife at Thekkady"]],
    ["Kashmir", "North India", "Mountains", "Alpine meadows, shikara boats and snow-fed valleys.", 4, "April – October", "5 days", 34.0837, 74.7973, ["Shikara ride on Dal Lake", "Gondola at Gulmarg", "Meadows of Pahalgam", "Mughal gardens in Srinagar"]],
    ["Agra", "Uttar Pradesh", "Historical", "Home of the Taj Mahal and the great Mughal riverside forts.", 5, "November – February", "1–2 days", 27.1767, 78.0081, ["Taj Mahal at sunrise", "Agra Fort", "Mehtab Bagh viewpoint", "Marble inlay workshops"]],
  ]),
  ...build("jp", [
    ["Tokyo", "Kantō", "Cities", "A restless capital of neon crossings, tiny bars and calm garden pockets.", 5, "March – May, October – November", "4–5 days", 35.6762, 139.6503, ["Shibuya Crossing", "Senso-ji at dawn", "Tsukiji outer market", "Day trip to Nikkō"]],
    ["Kyoto", "Kansai", "Cultural", "A thousand temples, geisha districts and moss gardens.", 5, "March – April, November", "3–4 days", 35.0116, 135.7681, ["Fushimi Inari torii gates", "Arashiyama bamboo grove", "Kinkaku-ji", "Evening in Gion"]],
    ["Osaka", "Kansai", "Cities", "Japan's kitchen — street food, comedy and a castle in the middle of it all.", 4, "March – May", "2 days", 34.6937, 135.5023, ["Dotonbori food crawl", "Osaka Castle park", "Kuromon Market", "Umeda Sky Building"]],
    ["Mount Fuji", "Chūbu", "Mountains", "The perfect volcanic cone reflected in the Fuji Five Lakes.", 5, "July – September for climbing", "1–2 days", 35.3606, 138.7274, ["Climb to the summit in season", "Chureito Pagoda viewpoint", "Lake Kawaguchi cycling", "Onsen with a Fuji view"]],
    ["Nara", "Kansai", "Historical", "Free-roaming deer around Japan's oldest monumental temples.", 4, "March – November", "1 day", 34.6851, 135.8048, ["Tōdai-ji Great Buddha", "Nara Park deer", "Kasuga Taisha lanterns", "Naramachi old town"]],
  ]),
  ...build("fr", [
    ["Paris", "Île-de-France", "Cities", "Boulevards, world-class museums and the most photographed tower on earth.", 5, "April – June, September – October", "4 days", 48.8566, 2.3522, ["Eiffel Tower at blue hour", "Louvre early entry", "Musée d'Orsay", "Walk Le Marais"]],
    ["Nice", "Côte d'Azur", "Beaches", "Pebble beaches and pastel old-town lanes on the French Riviera.", 4, "May – September", "2–3 days", 43.7102, 7.262, ["Promenade des Anglais", "Cours Saleya market", "Castle Hill viewpoint", "Day trip to Èze"]],
    ["Lyon", "Auvergne-Rhône-Alpes", "Cultural", "France's gastronomic capital between two rivers.", 4, "May – October", "2 days", 45.764, 4.8357, ["Bouchon dinner", "Vieux Lyon traboules", "Fourvière basilica", "Les Halles food market"]],
    ["Marseille", "Provence", "Cities", "A salty, sun-bleached port city with calanques on its doorstep.", 4, "May – September", "2–3 days", 43.2965, 5.3698, ["Vieux-Port bouillabaisse", "Calanques boat trip", "Notre-Dame de la Garde", "Le Panier quarter"]],
  ]),
  ...build("it", [
    ["Rome", "Lazio", "Historical", "An open-air museum where every street corner hides an empire.", 5, "April – June, September – October", "3–4 days", 41.9028, 12.4964, ["Colosseum and Forum", "Pantheon", "Vatican Museums", "Trastevere at night"]],
    ["Venice", "Veneto", "Cultural", "Canals, bridges and palazzi built impossibly on water.", 5, "April – May, October", "2 days", 45.4408, 12.3155, ["Grand Canal vaporetto", "St Mark's Basilica", "Cicchetti bar crawl", "Burano's coloured houses"]],
    ["Florence", "Tuscany", "Historical", "The renaissance in one walkable, terracotta-roofed city.", 5, "April – June, September", "2–3 days", 43.7696, 11.2558, ["Uffizi Gallery", "Duomo dome climb", "Ponte Vecchio", "Piazzale Michelangelo sunset"]],
    ["Milan", "Lombardy", "Cities", "Design, fashion and a cathedral of impossible marble lacework.", 4, "March – June, September", "2 days", 45.4642, 9.19, ["Duomo rooftop", "Last Supper booking", "Navigli aperitivo", "Brera district"]],
  ]),
  ...build("ch", [
    ["Zurich", "Zürich", "Cities", "A lakeside financial capital with an unexpectedly playful old town.", 4, "May – September", "2 days", 47.3769, 8.5417, ["Lake Zurich swim", "Old town Altstadt", "Kunsthaus", "Uetliberg hike"]],
    ["Lucerne", "Central Switzerland", "Nature", "A covered wooden bridge, a mirror-still lake and mountains all around.", 5, "May – October", "2 days", 47.0502, 8.3093, ["Chapel Bridge", "Mount Pilatus cogwheel", "Lake steamer cruise", "Lion Monument"]],
    ["Interlaken", "Bernese Oberland", "Adventure", "The adventure hub between two glacier-fed turquoise lakes.", 5, "June – September", "3 days", 46.6863, 7.8632, ["Paraglide over the valley", "Train to Jungfraujoch", "Harder Kulm viewpoint", "Lauterbrunnen waterfalls"]],
    ["Zermatt", "Valais", "Mountains", "Car-free alpine village beneath the Matterhorn.", 5, "December – April, July – September", "2–3 days", 46.0207, 7.7491, ["Gornergrat railway", "Matterhorn Glacier Paradise", "Five Lakes Walk", "Ski the Theodul glacier"]],
  ]),
  ...build("us", [
    ["New York", "New York", "Cities", "Five boroughs of skyline, subway and endless reinvention.", 5, "April – June, September – November", "4–5 days", 40.7128, -74.006, ["Central Park loop", "Top of the Rock", "The High Line", "Brooklyn Bridge walk"]],
    ["Los Angeles", "California", "Cities", "Beaches, canyons and studio backlots under permanent sunshine.", 4, "March – May, September – November", "3–4 days", 34.0522, -118.2437, ["Griffith Observatory", "Venice Beach boardwalk", "Getty Center", "Drive Mulholland"]],
    ["Las Vegas", "Nevada", "Cities", "A desert strip of neon, shows and 24-hour everything.", 4, "March – May, October – November", "2–3 days", 36.1699, -115.1398, ["Walk the Strip at night", "Fremont Street", "Red Rock Canyon drive", "A residency show"]],
    ["San Francisco", "California", "Cities", "Fog, hills, cable cars and a famously photogenic bridge.", 5, "September – November", "3 days", 37.7749, -122.4194, ["Golden Gate Bridge cycle", "Alcatraz tour", "Mission burritos", "Cable car to Nob Hill"]],
    ["Grand Canyon", "Arizona", "Nature", "A mile-deep gorge of layered rock carved by the Colorado River.", 5, "March – May, September – November", "2 days", 36.1069, -112.1129, ["Sunrise at Mather Point", "Bright Angel Trail", "Desert View Drive", "Helicopter flight"]],
  ]),
  ...build("gb", [
    ["London", "England", "Cities", "Royal parks, riverside museums and a pub on every corner.", 5, "May – September", "4 days", 51.5074, -0.1278, ["Tower of London", "British Museum", "South Bank walk", "Borough Market"]],
    ["Edinburgh", "Scotland", "Historical", "A volcanic castle above a medieval and Georgian double city.", 5, "May – September", "2–3 days", 55.9533, -3.1883, ["Edinburgh Castle", "Arthur's Seat climb", "Royal Mile closes", "Dean Village"]],
    ["Lake District", "England", "Nature", "Fells, tarns and stone villages that invented English romanticism.", 4, "May – September", "3 days", 54.4609, -3.0886, ["Cruise Lake Windermere", "Scafell Pike hike", "Grasmere village", "Kayak on Derwentwater"]],
  ]),
  ...build("au", [
    ["Sydney", "New South Wales", "Cities", "Harbour city of opera house sails and surf beaches.", 5, "September – November, March – May", "4 days", -33.8688, 151.2093, ["Opera House tour", "Bondi to Coogee walk", "Harbour Bridge climb", "Ferry to Manly"]],
    ["Great Barrier Reef", "Queensland", "Adventure", "The world's largest coral reef system, visible from space.", 5, "June – October", "2–3 days", -18.2871, 147.6992, ["Snorkel the outer reef", "Scenic flight over Heart Reef", "Whitehaven Beach", "Liveaboard dive"]],
    ["Uluru", "Northern Territory", "Cultural", "A sacred monolith glowing red above the desert.", 5, "May – September", "2 days", -25.3444, 131.0369, ["Sunrise at Talinguru", "Base walk", "Field of Light", "Kata Tjuta Valley of the Winds"]],
  ]),
  ...build("ae", [
    ["Dubai", "Dubai", "Cities", "Record-breaking towers, desert dunes and old creek trading posts.", 5, "November – March", "3–4 days", 25.2048, 55.2708, ["Burj Khalifa observation deck", "Desert dune safari", "Abra across the Creek", "Gold and spice souks"]],
    ["Abu Dhabi", "Abu Dhabi", "Religious", "Capital of grand mosques, corniche beaches and island museums.", 4, "November – March", "2 days", 24.4539, 54.3773, ["Sheikh Zayed Grand Mosque", "Louvre Abu Dhabi", "Corniche cycle", "Yas Island"]],
  ]),
  ...build("tr", [
    ["Istanbul", "Marmara", "Historical", "The city on two continents, layered with Roman and Ottoman glory.", 5, "April – June, September – October", "3–4 days", 41.0082, 28.9784, ["Hagia Sophia", "Blue Mosque", "Grand Bazaar", "Bosphorus ferry"]],
    ["Cappadocia", "Central Anatolia", "Adventure", "Balloons at dawn above valleys of carved fairy chimneys.", 5, "April – June, September – October", "2–3 days", 38.6431, 34.8289, ["Hot-air balloon flight", "Göreme open-air museum", "Cave hotel stay", "Red Valley hike"]],
    ["Antalya", "Mediterranean", "Beaches", "Turquoise coast beaches beside Roman harbour ruins.", 4, "May – October", "3 days", 36.8969, 30.7133, ["Kaleiçi old town", "Düden Waterfalls", "Boat trip to Kekova", "Lara Beach"]],
  ]),
  ...build("my", [
    ["Kuala Lumpur", "Selangor", "Cities", "Twin towers above a humid, delicious, multicultural capital.", 4, "May – July", "2–3 days", 3.139, 101.6869, ["Petronas Towers skybridge", "Batu Caves", "Jalan Alor food street", "KL Forest Eco Park"]],
    ["Langkawi", "Kedah", "Beaches", "An archipelago of jungle-backed beaches and mangrove cruises.", 4, "December – March", "3 days", 6.3529, 99.8, ["SkyCab cable car", "Island-hopping boat", "Mangrove kayak", "Cenang Beach sunset"]],
    ["Penang", "Penang", "Cultural", "Street art, shophouses and arguably Asia's best street food.", 5, "December – March", "2–3 days", 5.4141, 100.3288, ["George Town street art", "Kek Lok Si Temple", "Penang Hill funicular", "Gurney Drive hawkers"]],
  ]),
  ...build("sg", [
    ["Marina Bay", "Central", "Cities", "Supertrees, an infinity skyline and a light show every night.", 5, "February – April", "2 days", 1.2838, 103.8591, ["Gardens by the Bay", "Marina Bay Sands SkyPark", "ArtScience Museum", "Spectra light show"]],
    ["Sentosa Island", "South", "Adventure", "A resort island of beaches, cable cars and theme parks.", 4, "February – April", "1–2 days", 1.2494, 103.8303, ["Universal Studios", "Skyline Luge", "Siloso Beach", "Cable car ride"]],
  ]),
  ...build("th", [
    ["Bangkok", "Central Thailand", "Cities", "Golden temples, canal life and street food on every block.", 5, "November – February", "3 days", 13.7563, 100.5018, ["Grand Palace", "Wat Arun at sunset", "Chatuchak market", "Longtail boat on the klongs"]],
    ["Chiang Mai", "Northern Thailand", "Religious", "Moated old city of temples ringed by forested mountains.", 5, "November – February", "3 days", 18.7883, 98.9853, ["Doi Suthep temple", "Ethical elephant sanctuary", "Sunday walking street", "Thai cooking class"]],
    ["Phuket", "Southern Thailand", "Beaches", "Andaman beaches and limestone islands just offshore.", 4, "November – April", "4 days", 7.8804, 98.3923, ["Phi Phi day trip", "Old Phuket Town", "Big Buddha viewpoint", "Sunset at Promthep Cape"]],
  ]),
  ...build("id", [
    ["Bali", "Lesser Sunda Islands", "Beaches", "Rice terraces, surf breaks and temple cliffs above the sea.", 5, "April – October", "5–7 days", -8.3405, 115.092, ["Uluwatu Temple kecak dance", "Tegallalang rice terraces", "Surf at Canggu", "Mount Batur sunrise trek"]],
    ["Yogyakarta", "Java", "Historical", "Gateway to Borobudur and Java's living court culture.", 5, "May – September", "2–3 days", -7.7956, 110.3695, ["Borobudur sunrise", "Prambanan temples", "Kraton palace", "Batik workshop"]],
    ["Komodo", "East Nusa Tenggara", "Nature", "Dragons, pink beaches and some of Asia's best diving.", 4, "April – November", "3 days", -8.5586, 119.4458, ["Komodo dragon trek", "Padar Island viewpoint", "Pink Beach snorkel", "Manta Point dive"]],
  ]),
  ...build("kr", [
    ["Seoul", "Seoul Capital Area", "Cities", "Palaces, mountain trails and 24-hour neighbourhoods.", 5, "April – June, September – November", "4 days", 37.5665, 126.978, ["Gyeongbokgung palace", "Bukchon Hanok Village", "Hike Bukhansan", "Night market at Gwangjang"]],
    ["Busan", "South Gyeongsang", "Beaches", "Port city of beaches, seafood markets and hillside villages.", 4, "May – June, September – October", "2–3 days", 35.1796, 129.0756, ["Haeundae Beach", "Gamcheon Culture Village", "Jagalchi fish market", "Haedong Yonggungsa temple"]],
    ["Jeju Island", "Jeju", "Nature", "A volcanic island of craters, waterfalls and coastal trails.", 5, "April – June, September – October", "3 days", 33.4996, 126.5312, ["Hallasan summit hike", "Seongsan Ilchulbong sunrise", "Manjanggul lava tube", "Olle coastal trail"]],
  ]),
];

export const getCountry = (code: string) => COUNTRIES.find((c) => c.code === code);
export const getDestination = (id: string) => DESTINATIONS.find((d) => d.id === id);
export const destinationsOf = (code: string) => DESTINATIONS.filter((d) => d.countryCode === code);
export const countryName = (code: string) => getCountry(code)?.name ?? code;

export interface SearchResult {
  type: "country" | "destination";
  label: string;
  sub: string;
  to: string;
  params: Record<string, string>;
}

export function searchAll(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const countries: SearchResult[] = COUNTRIES.filter((c) => c.name.toLowerCase().includes(q)).map((c) => ({
    type: "country",
    label: `${c.flag} ${c.name}`,
    sub: `${destinationsOf(c.code).length} destinations`,
    to: "/country/$code",
    params: { code: c.code },
  }));
  const dests: SearchResult[] = DESTINATIONS.filter(
    (d) =>
      d.name.toLowerCase().includes(q) ||
      d.region.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q) ||
      d.thingsToDo.some((t) => t.toLowerCase().includes(q)),
  ).map((d) => ({
    type: "destination",
    label: d.name,
    sub: `${d.region}, ${countryName(d.countryCode)}`,
    to: "/destination/$id",
    params: { id: d.id },
  }));
  return [...countries, ...dests].slice(0, 12);
}
