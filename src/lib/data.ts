export type Destination = {
  id: string;
  slug: string;
  name: string;
  country: string;
  description: string;
  longDescription: string;
  attractions: { name: string; description: string }[];
  suggestedItinerary: { day: number; title: string; description: string }[];
  estimatedCost: number;
  imageId: string;
};

export const destinations: Destination[] = [
  {
    id: '1',
    slug: 'paris-france',
    name: 'Paris',
    country: 'France',
    description: 'The city of love, lights, and endless art.',
    longDescription: 'Paris, France\'s capital, is a major European city and a global center for art, fashion, gastronomy and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine. Beyond such landmarks as the Eiffel Tower and the 12th-century, Gothic Notre-Dame cathedral, the city is known for its cafe culture and designer boutiques along the Rue du Faubourg Saint-Honoré.',
    attractions: [
      { name: 'Eiffel Tower', description: 'Iconic wrought-iron lattice tower. A symbol of France.' },
      { name: 'Louvre Museum', description: 'The world\'s largest art museum and a historic monument.' },
      { name: 'Notre-Dame Cathedral', description: 'A masterpiece of French Gothic architecture.' },
    ],
    suggestedItinerary: [
      { day: 1, title: 'Arrival and Eiffel Tower', description: 'Arrive in Paris, check into your hotel. In the evening, visit the Eiffel Tower to see the city lights.' },
      { day: 2, title: 'Art and History', description: 'Spend the morning at the Louvre Museum. In the afternoon, explore the historic Latin Quarter and visit Notre-Dame Cathedral.' },
      { day: 3, title: 'Seine River Cruise', description: 'Enjoy a relaxing cruise on the Seine River, followed by shopping on the Champs-Élysées.' },
    ],
    estimatedCost: 1500,
    imageId: 'paris',
  },
  {
    id: '2',
    slug: 'kyoto-japan',
    name: 'Kyoto',
    country: 'Japan',
    description: 'Ancient temples, sublime gardens, and traditional geishas.',
    longDescription: 'Kyoto, once the capital of Japan, is a city on the island of Honshu. It\'s famous for its numerous classical Buddhist temples, as well as gardens, imperial palaces, Shinto shrines and traditional wooden houses. It’s also known for formal traditions such as kaiseki dining, consisting of multiple courses of precise dishes, and geisha, female entertainers often found in the Gion district.',
    attractions: [
        { name: 'Kinkaku-ji (Golden Pavilion)', description: 'A stunning Zen Buddhist temple covered in gold leaf.' },
        { name: 'Fushimi Inari Shrine', description: 'Famous for its thousands of vibrant orange torii gates.' },
        { name: 'Arashiyama Bamboo Grove', description: 'A magical and serene bamboo forest.' },
    ],
    suggestedItinerary: [
        { day: 1, title: 'Arrival and Gion', description: 'Arrive in Kyoto, check in, and explore the historic Gion district, keeping an eye out for geishas.' },
        { day: 2, title: 'Temples and Shrines', description: 'Visit Kinkaku-ji in the morning and Fushimi Inari Shrine in the afternoon.' },
        { day: 3, title: 'Bamboos and Markets', description: 'Walk through the Arashiyama Bamboo Grove and visit the Nishiki Market for local delicacies.' },
    ],
    estimatedCost: 2000,
    imageId: 'kyoto',
  },
  {
    id: '3',
    slug: 'rome-italy',
    name: 'Rome',
    country: 'Italy',
    description: 'The Eternal City, home to ancient ruins and Vatican City.',
    longDescription: 'Rome, Italy’s capital, is a sprawling, cosmopolitan city with nearly 3,000 years of globally influential art, architecture and culture on display. Ancient ruins such as the Forum and the Colosseum evoke the power of the former Roman Empire. Vatican City, headquarters of the Roman Catholic Church, has St. Peter’s Basilica and the Vatican Museums, which house masterpieces such as Michelangelo’s Sistine Chapel frescoes.',
    attractions: [
        { name: 'Colosseum', description: 'An oval amphitheatre in the centre of the city, the largest ever built.' },
        { name: 'Vatican City', description: 'Home to St. Peter\'s Basilica and the Vatican Museums.' },
        { name: 'Trevi Fountain', description: 'A world-famous fountain in the Trevi district.' },
    ],
    suggestedItinerary: [
        { day: 1, title: 'Ancient Rome', description: 'Explore the Colosseum, Roman Forum, and Palatine Hill.' },
        { day: 2, title: 'Vatican City', description: 'Visit St. Peter\'s Basilica, the Vatican Museums, and the Sistine Chapel.' },
        { day: 3, title: 'Fountains and Piazzas', description: 'Toss a coin in the Trevi Fountain, see the Pantheon, and relax at Piazza Navona.' },
    ],
    estimatedCost: 1800,
    imageId: 'rome',
  },
  {
    id: '4',
    slug: 'santorini-greece',
    name: 'Santorini',
    country: 'Greece',
    description: 'Iconic sunsets, whitewashed villages, and volcanic beaches.',
    longDescription: 'Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape. The whitewashed, cubiform houses of its 2 principal towns, Fira and Oia, cling to cliffs above an underwater caldera (crater). They overlook the sea, small islands to the west and beaches made up of black, red and white lava pebbles.',
    attractions: [
        { name: 'Oia Village', description: 'Famous for its stunning sunsets and charming blue-domed churches.' },
        { name: 'Red Beach', description: 'A unique beach with red-hued volcanic sand.' },
        { name: 'Akrotiri Archaeological Site', description: 'A Minoan Bronze Age settlement preserved in volcanic ash.' },
    ],
    suggestedItinerary: [
        { day: 1, title: 'Arrival in Fira', description: 'Arrive and explore Fira, the vibrant capital of the island.' },
        { day: 2, title: 'Sailing and Beaches', description: 'Take a catamaran cruise around the caldera, stopping at Red Beach and White Beach.' },
        { day: 3, title: 'Oia Sunset', description: 'Explore the ancient site of Akrotiri, then head to Oia to witness its world-famous sunset.' },
    ],
    estimatedCost: 2200,
    imageId: 'santorini',
  },
    {
    id: '5',
    slug: 'new-york-usa',
    name: 'New York',
    country: 'USA',
    description: 'The city that never sleeps, with iconic landmarks and endless energy.',
    longDescription: 'New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, a densely populated borough that’s among the world’s major commercial, financial and cultural centers. Its iconic sites include skyscrapers such as the Empire State Building and sprawling Central Park. Broadway theater is staged in neon-lit Times Square.',
    attractions: [
        { name: 'Statue of Liberty', description: 'A colossal neoclassical sculpture on Liberty Island.' },
        { name: 'Central Park', description: 'An urban park in Manhattan, providing a green oasis.' },
        { name: 'Times Square', description: 'A major commercial intersection and entertainment center.' },
    ],
    suggestedItinerary: [
        { day: 1, title: 'Arrival and Times Square', description: 'Arrive, check in, and get dazzled by the lights of Times Square at night.' },
        { day: 2, title: 'Midtown Marvels', description: 'Visit the Empire State Building, explore Central Park, and catch a Broadway show.' },
        { day: 3, title: 'Downtown Discovery', description: 'Take a ferry to the Statue of Liberty and explore the Financial District and 9/11 Memorial.' },
    ],
    estimatedCost: 2500,
    imageId: 'new-york',
  },
  {
    id: '6',
    slug: 'cairo-egypt',
    name: 'Cairo',
    country: 'Egypt',
    description: 'A vibrant city on the Nile, gateway to the Pyramids of Giza.',
    longDescription: 'Cairo, Egypt’s sprawling capital, is set on the Nile River. At its heart is Tahrir Square and the vast Egyptian Museum, a trove of antiquities including royal mummies and gilded King Tutankhamun artifacts. Nearby, Giza is the site of the iconic pyramids and Great Sphinx, dating to the 26th century BC. In Gezira Island’s leafy Zamalek district, 19th-century palaces house hotels and galleries.',
     attractions: [
        { name: 'Pyramids of Giza', description: 'The last remaining of the Seven Wonders of the Ancient World.' },
        { name: 'The Great Sphinx', description: 'A limestone statue of a reclining sphinx, a mythical creature.' },
        { name: 'Khan el-Khalili', description: 'A famous bazaar and souq in the historic center of Cairo.' },
    ],
    suggestedItinerary: [
        { day: 1, title: 'Pyramids and Sphinx', description: 'Spend the day at the Giza Plateau, marveling at the Pyramids and the Great Sphinx.' },
        { day: 2, title: 'Egyptian Museum', description: 'Explore the treasures of ancient Egypt at the Egyptian Museum in Tahrir Square.' },
        { day: 3, title: 'Historic Cairo', description: 'Wander through the bustling lanes of the Khan el-Khalili bazaar and explore Islamic Cairo.' },
    ],
    estimatedCost: 1200,
    imageId: 'cairo',
  },
  {
    id: '7',
    slug: 'dhaka-bangladesh',
    name: 'Dhaka',
    country: 'Bangladesh',
    description: 'A bustling city of rickshaws, vibrant culture, and rich history.',
    longDescription: 'Dhaka, the capital of Bangladesh, is a mega-city of vibrant chaos and cultural richness. Known as the "Rickshaw Capital of the World," its streets are a colorful tapestry of life. Explore historic Old Dhaka with its Mughal-era Lalbagh Fort, the beautiful Ahsan Manzil (Pink Palace), and the bustling Sadarghat river port.',
    attractions: [
      { name: 'Lalbagh Fort', description: 'An incomplete 17th-century Mughal fort complex.' },
      { name: 'Ahsan Manzil', description: 'A majestic pink palace on the banks of the Buriganga River.' },
      { name: 'Sadarghat River Port', description: 'A chaotic but fascinating hub of riverine activity.' },
    ],
    suggestedItinerary: [
      { day: 1, title: 'Old Dhaka Exploration', description: 'Arrive and dive into the heart of Old Dhaka. Visit Lalbagh Fort and Ahsan Manzil, and take a boat ride from Sadarghat.' },
      { day: 2, title: 'Culture and Crafts', description: 'Visit the National Museum and explore the craft markets for unique souvenirs.' },
      { day: 3, title: 'Modern Dhaka & Departure', description: 'Experience the modern side of the city in Gulshan and Banani before departing.' },
    ],
    estimatedCost: 800,
    imageId: 'dhaka',
  },
  {
    id: '8',
    slug: 'jakarta-indonesia',
    name: 'Jakarta',
    country: 'Indonesia',
    description: 'A dynamic metropolis where modern skyscrapers meet historic districts.',
    longDescription: 'Jakarta, Indonesia\'s massive capital, sits on the northwest coast of the island of Java. A historic mix of cultures – Javanese, Malay, Chinese, Arab, Indian and European – has influenced its architecture, language and cuisine. The old town, Kota Tua, is home to Dutch colonial buildings, Glodok (Jakarta’s Chinatown) and the old port of Sunda Kelapa, where traditional wooden schooners dock.',
    attractions: [
      { name: 'National Monument (Monas)', description: 'A 132m-tall monument in Merdeka Square, symbolizing the fight for Indonesia.' },
      { name: 'Kota Tua (Old Town)', description: 'Explore the Dutch colonial-era heart of the city.' },
      { name: 'Istiqlal Mosque and Jakarta Cathedral', description: 'Two major religious sites standing side-by-side, symbolizing harmony.' },
    ],
    suggestedItinerary: [
      { day: 1, title: 'Arrival and National Monument', description: 'Arrive in Jakarta. Visit Merdeka Square and see the iconic National Monument (Monas).' },
      { day: 2, title: 'History and Culture', description: 'Explore the historic Kota Tua district and visit the Istiqlal Mosque and Jakarta Cathedral.' },
      { day: 3, title: 'Modern Jakarta', description: 'Experience modern Jakarta with shopping at Grand Indonesia and exploring the trendy Kemang area.' },
    ],
    estimatedCost: 1100,
    imageId: 'jakarta',
  },
  {
    id: '9',
    slug: 'kuala-lumpur-malaysia',
    name: 'Kuala Lumpur',
    country: 'Malaysia',
    description: 'A city of contrasts with the Petronas Towers and Batu Caves.',
    longDescription: 'Kuala Lumpur is the capital of Malaysia. Its modern skyline is dominated by the 451m-tall Petronas Twin Towers, a pair of glass-and-steel-clad skyscrapers with Islamic motifs. The towers also offer a public skybridge and observation deck. The city is also home to British colonial-era landmarks such as the Kuala Lumpur Railway Station and the Sultan Abdul Samad Building.',
    attractions: [
      { name: 'Petronas Twin Towers', description: 'Iconic twin skyscrapers with a skybridge and observation deck.' },
      { name: 'Batu Caves', description: 'A limestone hill that has a series of caves and cave temples, guarded by a large statue of Murugan.' },
      { name: 'Merdeka Square (Independence Square)', description: 'The historical heart of the city with colonial-era buildings.' },
    ],
    suggestedItinerary: [
      { day: 1, title: 'City Icons', description: 'Arrive and visit the iconic Petronas Twin Towers and explore the surrounding KLCC Park.' },
      { day: 2, title: 'Cultural and Natural Wonders', description: 'Take a trip to the impressive Batu Caves in the morning. In the afternoon, explore Merdeka Square and the Sultan Abdul Samad Building.' },
      { day: 3, title: 'Shopping and Food', description: 'Discover the vibrant Bukit Bintang shopping district and enjoy the street food at Jalan Alor.' },
    ],
    estimatedCost: 1300,
    imageId: 'kuala-lumpur',
  }
];
