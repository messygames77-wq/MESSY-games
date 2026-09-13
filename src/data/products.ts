import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'messy-mayhem',
    name: 'MESSY MAYHEM',
    tagline: 'The ultimate social sabotage party game',
    price: 450,
    oldPrice: 550,
    category: 'Party',
    players: '3–8',
    time: '15–30 min',
    age: '10+',
    badge: 'BESTSELLER',
    accentColor: '#FACC15', // Bright yellow
    gradient: 'from-amber-400 via-purple-600 to-indigo-900',
    cardVisualSvg: 'mayhem',
    shortDescription: 'Unpredictable, fast-paced sabotage where alliances break within 90 seconds.',
    fullDescription:
      'MESSY MAYHEM is the crown jewel of chaotic game nights. Draw high-stakes action cards, slap down counter-strikes, and swap hands when your best friend least expects it. Every turn triggers hilarious panic, unexpected reversals, and nonstop laughter across the table.',
    howToPlay: [
      'Deal 5 cards to every player and place the Chaos Deck in the center of the table.',
      'On your turn, draw one card and play up to two cards to steal points, swap hands, or initiate table showdowns.',
      'Watch out for the Mayhem Bomb: instant reaction cards must be slammed within 3 seconds!',
      'The first player to bank 10 Mayhem Points without getting wrecked by their friends wins the game.'
    ],
    whatsInside: [
      '120 Ultra-Durable Linen Finish Playing Cards',
      '15 Mayhem Hazard & Sabotage Modifier Cards',
      '8 Color-Coded Quick-Reference Rule Shields',
      '1 Official Chaos Coin for tiebreakers',
      'Comprehensive Illustrated Rulebook (English & Arabic)'
    ],
    details: {
      language: 'Bilingual (English & Arabic prompt cards)',
      cardCount: 135,
      difficulty: 'Easy (Learn in 2 minutes)',
      reusability: 'Infinite replay value with dynamic combos'
    },
    availability: 'In Stock — Ready to ship across Egypt'
  },
  {
    id: 'chaos-cards',
    name: 'CHAOS CARDS',
    tagline: 'Rapid-fire absurd dares and instant betrayals',
    price: 350,
    oldPrice: 400,
    category: 'Party',
    players: '2–6',
    time: '10–20 min',
    age: '10+',
    badge: 'POPULAR',
    accentColor: '#C084FC', // Purple
    gradient: 'from-purple-500 via-fuchsia-600 to-indigo-950',
    cardVisualSvg: 'chaos',
    shortDescription: 'Fast-paced deck where card rules constantly mutate and no turn is safe.',
    fullDescription:
      'CHAOS CARDS flips traditional card gameplay completely on its head. Every time a Chaos Rule card hits the table, the entire room must obey absurd new constraints — from talking only in whispers to pointing out liars on three. Packed with electric speed and hilarious moments.',
    howToPlay: [
      'Shuffle the 100 core cards and deal 4 cards per player.',
      'Take turns flipping rule modifier cards that change table mechanics in real time.',
      'Bluff your way out of penalties and catch opponents breaking active laws.',
      'Empty your hand first to be crowned the Master of Chaos.'
    ],
    whatsInside: [
      '100 Premium Casino-Grade Cardstock Cards',
      '20 Wild Rule-Breaker Shift Cards',
      'Custom Storage Tuckbox with Foil Finish',
      'Instant Quick-Start Guide'
    ],
    details: {
      language: 'Bilingual (English & Arabic text)',
      cardCount: 120,
      difficulty: 'Super Simple (No setup required)',
      reusability: 'Over 500 unique rule combination matchups'
    },
    availability: 'In Stock — Ships within 24–48 hours'
  },
  {
    id: 'messy-mystery',
    name: 'MESSY MYSTERY',
    tagline: 'Cooperative deductions packed with suspicious friends',
    price: 500,
    oldPrice: 600,
    category: 'Mystery',
    players: '3–6',
    time: '25–45 min',
    age: '12+',
    badge: 'NEW RELEASE',
    accentColor: '#60A5FA', // Subtle blue / cyan
    gradient: 'from-blue-500 via-indigo-700 to-slate-950',
    cardVisualSvg: 'mystery',
    shortDescription: 'A scandalous heist has gone horribly wrong. Deduce the culprit before time expires.',
    fullDescription:
      'A priceless artifact was stolen during the wildest party in Cairo, and one of your friends is secretly the culprit! In MESSY MYSTERY, players must cross-examine evidence, decipher encrypted riddles, and figure out who is telling the truth while the saboteur works quietly from the shadows.',
    howToPlay: [
      'Secretly assign 1 Culprit and Detective roles among all players.',
      'Reveal Clue Cards each round and submit evidence to the Investigation Board.',
      'Hold a 3-minute interrogation round where anyone can challenge testimonies.',
      'Submit the final collective verdict. If detectives are right, they win; if wrong, the culprit escapes with the loot!'
    ],
    whatsInside: [
      '140 Classified Evidence & Suspect Dossier Cards',
      '6 Top-Secret Identity Wallets',
      '1 Crime Scene Map & Investigation Tracker Pad',
      'UV-reactive Clue Card + Mini UV Inspector Torch',
      'Detailed Case Dossier & Scenario Guidebook'
    ],
    details: {
      language: 'Bilingual (English & Arabic scenarios)',
      cardCount: 140,
      difficulty: 'Medium (Intriguing mystery deductions)',
      reusability: '6 Replayable case scenarios + Randomizer deck'
    },
    availability: 'In Stock — Limited First Edition Batch'
  },
  {
    id: 'last-card-standing',
    name: 'LAST CARD STANDING',
    tagline: 'Cutthroat tactical duel where only one survivor remains',
    price: 400,
    oldPrice: 450,
    category: 'Competitive',
    players: '2–5',
    time: '15–25 min',
    age: '10+',
    badge: 'FAN FAVORITE',
    accentColor: '#F59E0B', // Amber
    gradient: 'from-amber-500 via-red-600 to-purple-950',
    cardVisualSvg: 'standing',
    shortDescription: 'Pure tactical showdown: outwit, parry, shield, and eliminate your closest friends.',
    fullDescription:
      'For the players who love high stakes and razor-sharp competition. LAST CARD STANDING tests your memory, poker face, and tactical timing. Hold shields, deflect direct attacks, and bait enemies into devastating counters until the dust settles and only one player remains.',
    howToPlay: [
      'Each player starts with 3 Life Tokens and 4 Combat Cards.',
      'Play offensive strikes, shield parries, or psychic reconnaissance cards.',
      'Chain combos to bypass enemy defenses or force opponents into lethal duels.',
      'Outlast everyone else at the table to claim victory.'
    ],
    whatsInside: [
      '96 Matte-Laminated Duel Cards',
      '15 Heavyweight Metal Elimination Tokens',
      '5 Custom Player Shield Mats',
      'Quick Combat Reference Cheat Sheet'
    ],
    details: {
      language: 'Bilingual (English & Arabic)',
      cardCount: 96,
      difficulty: 'Easy to learn, high tactical mastery',
      reusability: 'Fast rounds make it ideal for tournaments'
    },
    availability: 'In Stock — Ready to ship'
  },
  {
    id: 'squad-chaos',
    name: 'SQUAD CHAOS',
    tagline: 'Team vs team madness for big group gatherings',
    price: 550,
    oldPrice: 650,
    category: 'Group',
    players: '4–10',
    time: '20–35 min',
    age: '12+',
    badge: 'PARTY SIZE',
    accentColor: '#EC4899', // Pink / Neon
    gradient: 'from-pink-500 via-purple-600 to-indigo-950',
    cardVisualSvg: 'squad',
    shortDescription: 'Split into rival squads and battle through crazy challenges, speed rounds, and trivia.',
    fullDescription:
      'Built specifically for larger gatherings, family reunions, and rowdy weekend hangouts. SQUAD CHAOS splits the room into two passionate teams battling across multiple chaotic mini-games — silent charades, rapid word associations, and team relay card dares.',
    howToPlay: [
      'Split the group evenly into the Pink Squad and Yellow Squad.',
      'Spin the Squad Wheel or draw from 4 challenge categories: Brain, Reflex, Secret, or Chaos.',
      'Score points by winning head-to-head showdowns against the opposing team.',
      'First squad to reach the Champion Stage and survive the Gauntlet takes the trophy!'
    ],
    whatsInside: [
      '180 Jumbo Heavyweight Squad Battle Cards',
      '1 Squad Scoreboard with Dry-Erase Marker',
      '1 60-Second Sand Timer',
      '2 Squad Captain Badges',
      'Bilingual Master Rulebook'
    ],
    details: {
      language: 'Bilingual (English & Arabic)',
      cardCount: 180,
      difficulty: 'Easy (Instant crowd pleaser)',
      reusability: 'Over 300 unique challenges'
    },
    availability: 'In Stock — Perfect for 4 to 10 players'
  },
  {
    id: 'quick-mess',
    name: 'QUICK MESS',
    tagline: '5-minute lightning rounds anywhere, anytime',
    price: 300,
    oldPrice: 350,
    category: 'Quick',
    players: '2–4',
    time: '5–15 min',
    age: '8+',
    badge: 'POCKET SIZED',
    accentColor: '#34D399', // Emerald/Mint
    gradient: 'from-emerald-400 via-teal-600 to-slate-950',
    cardVisualSvg: 'quick',
    shortDescription: 'Pocket-sized adrenaline rush. Zero setup, fast turns, and instant rematches.',
    fullDescription:
      'Take the mess on the go! QUICK MESS is packaged in an ultra-compact magnetic box that fits in your pocket or backpack. Whether you are chilling at a café, killing time between university lectures, or on a road trip to Sahel, QUICK MESS delivers quick laughs in under 10 minutes.',
    howToPlay: [
      'Flip a card from the deck face-up into the center.',
      'All players race simultaneously to spot matches, shout keywords, or snap cards.',
      'No turns: everything happens simultaneously in frantic real time.',
      'Most cards collected by the end of the deck takes the round!'
    ],
    whatsInside: [
      '75 Snappy Water-Resistant Pocket Cards',
      '1 Magnetic Travel Clamshell Case',
      'Fold-out Mini Rules Guide'
    ],
    details: {
      language: 'Iconographic & Bilingual text',
      cardCount: 75,
      difficulty: 'Super Fast (Learn in 30 seconds)',
      reusability: 'Addictive quick-fire replayability'
    },
    availability: 'In Stock — Ships within 24 hours'
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'MG-9104',
    date: '2026-09-11',
    items: [
      {
        productId: 'messy-mayhem',
        productName: 'MESSY MAYHEM',
        price: 450,
        quantity: 1,
        accentColor: '#FACC15',
        category: 'Party'
      },
      {
        productId: 'quick-mess',
        productName: 'QUICK MESS',
        price: 300,
        quantity: 1,
        accentColor: '#34D399',
        category: 'Quick'
      }
    ],
    subtotal: 750,
    shipping: 0,
    total: 750,
    status: 'SHIPPED' as const,
    customer: {
      fullName: 'Ahmed Hassan',
      phone: '+20 100 123 4567',
      email: 'ahmed.hassan@example.com',
      address: 'Bldg 14, St 9, Maadi',
      city: 'Cairo',
      area: 'Maadi'
    },
    paymentMethod: 'Cash on Delivery (COD)',
    trackingNumber: 'EGY-EXP-884920',
    estimatedDelivery: 'Tomorrow, Sept 14'
  },
  {
    id: 'MG-8321',
    date: '2026-08-28',
    items: [
      {
        productId: 'chaos-cards',
        productName: 'CHAOS CARDS',
        price: 350,
        quantity: 2,
        accentColor: '#C084FC',
        category: 'Party'
      }
    ],
    subtotal: 700,
    shipping: 50,
    total: 750,
    status: 'DELIVERED' as const,
    customer: {
      fullName: 'Ahmed Hassan',
      phone: '+20 100 123 4567',
      email: 'ahmed.hassan@example.com',
      address: 'Bldg 14, St 9, Maadi',
      city: 'Cairo',
      area: 'Maadi'
    },
    paymentMethod: 'Cash on Delivery (COD)',
    trackingNumber: 'EGY-EXP-772911',
    estimatedDelivery: 'Delivered on Aug 30'
  }
];

export const INITIAL_USER: import('../types').UserProfile = {
  id: 'usr-001',
  fullName: 'Ahmed Hassan',
  email: 'ahmed.hassan@example.com',
  phone: '+20 100 123 4567',
  address: 'Bldg 14, St 9, Maadi',
  city: 'Cairo',
  area: 'Maadi',
  isLoggedIn: true
};
