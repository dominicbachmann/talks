import { Component, computed, inject, signal } from '@angular/core';
import { chatResource, createTool } from '@hashbrownai/angular';
import { s } from '@hashbrownai/core';

import { CinemaService } from '../cinema/cinema.service';

@Component({
  selector: 'app-tool-calling-demo',
  templateUrl: './tool-calling.component.html',
  styleUrls: ['../shared/chat.css', './tool-calling.component.css'],
})
export class ToolCallingDemoComponent {
  private readonly cinema = inject(CinemaService);

  protected readonly draft = signal('');

  protected readonly chat = chatResource({
    model: 'claude-opus-4-6',
    system: `You are **Reel**, a concise cinema concierge.

Use the provided tools to answer questions about movies, showtimes, and
bookings. Never invent showtimes — always call getShowtimes first. When
a user asks about a specific date, pass it in ISO format (YYYY-MM-DD).
Today is 2026-04-22. "Tonight" means 2026-04-22. "This weekend" spans
2026-04-25 (Saturday) and 2026-04-26 (Sunday).

Keep replies short — two or three sentences max. Reference specific
movie titles and times from the tool results.`,
    tools: [
      createTool({
        name: 'getMovies',
        description:
          'Get the movie catalog currently playing. Pass "all" for everything, or a genre name to filter (e.g. "Sci-Fi", "Drama").',
        schema: s.object('Movie filter', {
          filter: s.string('Genre name, or "all" for the full catalog'),
        }),
        handler: async ({ filter }) => {
          const all = this.cinema.movies();
          const rows =
            filter === 'all'
              ? all
              : all.filter((m) =>
                  m.genres.some(
                    (g) => g.toLowerCase() === filter.toLowerCase(),
                  ),
                );
          return rows.map((m) => ({
            id: m.id,
            title: m.title,
            rating: m.rating,
            runtimeMinutes: m.runtimeMinutes,
            genres: m.genres,
            synopsis: m.synopsis,
          }));
        },
      }),
      createTool({
        name: 'getShowtimes',
        description:
          'Get showtimes for an ISO date (YYYY-MM-DD). Optionally filter by format.',
        schema: s.object('Showtime query', {
          date: s.string('ISO date (YYYY-MM-DD)'),
          format: s.anyOf([
            s.enumeration('Format', ['2D', '3D', 'IMAX', 'Dolby']),
            s.nullish(),
          ]),
        }),
        handler: async (input) => {
          const rows = this.cinema.getShowtimesForDate(input.date);
          const filtered = input.format
            ? rows.filter((r) => r.format === input.format)
            : rows;
          return filtered.map((s) => {
            const movie = this.cinema.getMovie(s.movieId);
            return {
              id: s.id,
              movieId: s.movieId,
              movieTitle: movie?.title ?? 'Unknown',
              startsAt: s.startsAt,
              format: s.format,
              pricePerSeat: s.pricePerSeat,
              seatsAvailable: s.seatsAvailable,
            };
          });
        },
      }),
      createTool({
        name: 'bookSeats',
        description:
          'Book a number of seats for a showtime. Returns a booking confirmation.',
        schema: s.object('Booking input', {
          showtimeId: s.string('Showtime ID (e.g. SHOW-911)'),
          seatIds: s.array(
            'Seat IDs (e.g. ["A12", "A13"])',
            s.string('Seat ID'),
          ),
        }),
        handler: async (input) => this.cinema.book(input),
      }),
    ],
  });

  protected readonly messages = computed(() => this.chat.value() ?? []);

  protected readonly status = computed(() => {
    if (this.chat.isRunningToolCalls()) return 'Running tools…';
    if (this.chat.isReceiving()) return 'Thinking…';
    if (this.chat.isSending()) return 'Sending…';
    return '';
  });

  protected readonly suggestions = [
    'What IMAX movies are playing this Saturday?',
    'Book two seats for the 9:30pm Dolby showing of Dune on Saturday',
    'Which movies are under 2 hours tonight?',
  ];

  protected send(): void {
    const content = this.draft().trim();
    if (!content) return;
    this.draft.set('');
    this.chat.sendMessage({ role: 'user', content });
  }

  protected suggest(text: string): void {
    this.draft.set(text);
    this.send();
  }

  protected prettyArgs(args: unknown): string {
    if (args == null) return '';
    try {
      return JSON.stringify(args);
    } catch {
      return String(args);
    }
  }
}
