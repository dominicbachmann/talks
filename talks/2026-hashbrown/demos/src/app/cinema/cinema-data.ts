export type MovieFormat = '2D' | '3D' | 'IMAX' | 'Dolby';

export interface Movie {
  id: string;
  title: string;
  rating: 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17';
  runtimeMinutes: number;
  genres: string[];
  posterEmoji: string;
  synopsis: string;
}

export interface Showtime {
  id: string;
  movieId: string;
  startsAt: string;
  format: MovieFormat;
  pricePerSeat: number;
  seatsAvailable: number;
}

/**
 * Fixed "today" + four days after, so the demo data is stable across runs
 * and the model gets dates that look current on stage (2026-04-22 is the
 * CLAUDE.md currentDate).
 */
const DATES = [
  '2026-04-24',
  '2026-04-25',
  '2026-04-26',
  '2026-04-27',
] as const;

const at = (date: string, time: string) => `${date}T${time}:00-04:00`;

export const MOVIES: Movie[] = [
  {
    id: 'MOV-142',
    title: 'Dune: Part Three',
    rating: 'PG-13',
    runtimeMinutes: 171,
    genres: ['Sci-Fi', 'Adventure'],
    posterEmoji: '🏜️',
    synopsis:
      'Paul Atreides leads the Fremen against the Imperium in the final chapter of the Arrakis saga.',
  },
  {
    id: 'MOV-178',
    title: 'The Northern Passage',
    rating: 'R',
    runtimeMinutes: 128,
    genres: ['Thriller', 'Drama'],
    posterEmoji: '🧭',
    synopsis:
      'A cartographer vanishes in the arctic; his sister follows the maps he left behind.',
  },
  {
    id: 'MOV-204',
    title: 'Ember & Ash',
    rating: 'PG-13',
    runtimeMinutes: 114,
    genres: ['Romance', 'Drama'],
    posterEmoji: '🔥',
    synopsis:
      'A glassblower and a wildland firefighter meet one summer that reshapes both their lives.',
  },
  {
    id: 'MOV-231',
    title: 'Vectorpunk',
    rating: 'PG-13',
    runtimeMinutes: 105,
    genres: ['Action', 'Sci-Fi'],
    posterEmoji: '🕶️',
    synopsis:
      'A rogue compiler walks the neon streets of New Montreal looking for the function that wrote her.',
  },
  {
    id: 'MOV-267',
    title: 'Small Birds, Large Skies',
    rating: 'PG',
    runtimeMinutes: 96,
    genres: ['Animation', 'Family'],
    posterEmoji: '🐦',
    synopsis:
      'A fledgling sparrow befriends a retired paper kite on a journey across the coast.',
  },
  {
    id: 'MOV-288',
    title: 'The Split Angle',
    rating: 'R',
    runtimeMinutes: 134,
    genres: ['Crime', 'Thriller'],
    posterEmoji: '🎱',
    synopsis:
      'Two pool hustlers, one cop, one bad debt, one long night in Trenton.',
  },
  {
    id: 'MOV-312',
    title: 'Quiet Algorithms',
    rating: 'PG-13',
    runtimeMinutes: 118,
    genres: ['Drama'],
    posterEmoji: '🧠',
    synopsis:
      'A stay-at-home father and an AI research lead navigate a custody trial centered on a chatbot.',
  },
  {
    id: 'MOV-341',
    title: 'The Concierge',
    rating: 'PG',
    runtimeMinutes: 102,
    genres: ['Comedy'],
    posterEmoji: '🎬',
    synopsis:
      'A hotel concierge tries to save a movie theater one impossible request at a time.',
  },
];

function st(
  id: string,
  movieId: string,
  date: string,
  time: string,
  format: MovieFormat,
  pricePerSeat: number,
  seatsAvailable: number,
): Showtime {
  return {
    id,
    movieId,
    startsAt: at(date, time),
    format,
    pricePerSeat,
    seatsAvailable,
  };
}

export const SHOWTIMES: Showtime[] = [
  // Friday 2026-04-24
  st('SHOW-901', 'MOV-142', DATES[0], '18:30', 'IMAX', 22, 34),
  st('SHOW-902', 'MOV-142', DATES[0], '21:45', 'Dolby', 18, 58),
  st('SHOW-903', 'MOV-178', DATES[0], '19:00', '2D', 14, 72),
  st('SHOW-904', 'MOV-231', DATES[0], '20:15', '3D', 16, 45),
  st('SHOW-905', 'MOV-267', DATES[0], '17:00', '2D', 12, 90),
  st('SHOW-906', 'MOV-341', DATES[0], '22:30', '2D', 10, 60),

  // Saturday 2026-04-25
  st('SHOW-910', 'MOV-142', DATES[1], '14:00', 'IMAX', 20, 40),
  st('SHOW-911', 'MOV-142', DATES[1], '18:15', 'IMAX', 22, 28),
  st('SHOW-912', 'MOV-142', DATES[1], '21:30', 'Dolby', 18, 52),
  st('SHOW-913', 'MOV-204', DATES[1], '16:30', '2D', 13, 80),
  st('SHOW-914', 'MOV-231', DATES[1], '22:00', 'IMAX', 21, 30),
  st('SHOW-915', 'MOV-288', DATES[1], '20:00', 'Dolby', 17, 44),
  st('SHOW-916', 'MOV-267', DATES[1], '11:00', '2D', 11, 96),
  st('SHOW-917', 'MOV-341', DATES[1], '19:30', '2D', 10, 65),

  // Sunday 2026-04-26
  st('SHOW-920', 'MOV-142', DATES[2], '17:00', 'IMAX', 20, 36),
  st('SHOW-921', 'MOV-178', DATES[2], '20:30', '2D', 14, 62),
  st('SHOW-922', 'MOV-204', DATES[2], '15:00', '2D', 13, 78),
  st('SHOW-923', 'MOV-312', DATES[2], '18:45', '2D', 13, 54),
  st('SHOW-924', 'MOV-231', DATES[2], '22:15', 'Dolby', 17, 40),
  st('SHOW-925', 'MOV-267', DATES[2], '12:30', '2D', 11, 88),

  // Monday 2026-04-27
  st('SHOW-930', 'MOV-142', DATES[3], '19:15', 'Dolby', 17, 48),
  st('SHOW-931', 'MOV-312', DATES[3], '20:30', '2D', 13, 66),
  st('SHOW-932', 'MOV-288', DATES[3], '21:45', '2D', 13, 58),
  st('SHOW-933', 'MOV-341', DATES[3], '18:00', '2D', 10, 70),
];
