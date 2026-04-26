import { Component, computed, inject, signal } from '@angular/core';
import {
  createTool,
  exposeComponent,
  RenderMessageComponent,
  uiChatResource,
} from '@hashbrownai/angular';
import { prompt, s } from '@hashbrownai/core';

import { CinemaService } from '../cinema/cinema.service';
import { GenreBadgeComponent } from './components/genre-badge.component';
import { MarkdownComponent } from './components/markdown.component';
import { MovieCardComponent } from './components/movie-card.component';
import { MovieListComponent } from './components/movie-list.component';
import { ShowtimeRowComponent } from './components/showtime-row.component';

@Component({
  selector: 'app-generative-ui-demo',
  imports: [RenderMessageComponent],
  templateUrl: './generative-ui.component.html',
  styleUrls: ['../shared/chat.css', './generative-ui.component.css'],
})
export class GenerativeUiDemoComponent {
  private readonly cinema = inject(CinemaService);

  protected readonly draft = signal('');

  protected readonly chat = uiChatResource({
    model: 'claude-opus-4-6',
    system: prompt`
      You are **Reel**, a concise cinema concierge. Respond with UI
      components — never raw prose — using the provided component set.
      Always call \`getShowtimes\` for real data before responding.

      Today is 2026-04-22. "Tonight" means 2026-04-22. "Saturday" is
      2026-04-25. Pass ISO dates (YYYY-MM-DD) to getShowtimes.

      ### EXAMPLE
      <user>What's playing tonight in IMAX?</user>
      <assistant>
        <ui>
          <app-movie-list title="Tonight in IMAX">
            <app-movie-card
              movieId="MOV-142"
              title="Dune: Part Three"
              rating="PG-13"
              posterEmoji="🏜️"
            >
              <app-genre-badge genre="Sci-Fi" />
              <app-showtime-row startsAt="2026-04-22T18:30:00-04:00"
                format="IMAX" pricePerSeat="22" />
            </app-movie-card>
          </app-movie-list>
        </ui>
      </assistant>
    `,
    components: [
      exposeComponent(MarkdownComponent, {
        description: 'Render a short prose response to the user.',
        input: {
          data: s.streaming.string('The markdown content to render'),
        },
      }),
      exposeComponent(GenreBadgeComponent, {
        description:
          'A small genre pill (e.g. Sci-Fi, Drama). Use inside MovieCard.',
        input: { genre: s.string('Genre name') },
      }),
      exposeComponent(ShowtimeRowComponent, {
        description: 'One showtime for a movie. Use inside MovieCard.',
        input: {
          startsAt: s.string('ISO 8601 start time'),
          format: s.enumeration('Format', ['2D', '3D', 'IMAX', 'Dolby']),
          pricePerSeat: s.number('Price per seat in dollars'),
        },
      }),
      exposeComponent(MovieCardComponent, {
        description:
          'A single movie as a card. Put GenreBadge and ShowtimeRow children inside.',
        input: {
          movieId: s.string('The movie ID (e.g. MOV-142)'),
          title: s.streaming.string('The movie title'),
          rating: s.string('Motion-picture rating (e.g. PG-13)'),
          posterEmoji: s.string('A single emoji to represent the poster'),
        },
        children: 'any',
      }),
      exposeComponent(MovieListComponent, {
        description:
          'A titled list of movies. Put MovieCard children inside it.',
        input: {
          title: s.string('Heading for the list (e.g. "Tonight in IMAX")'),
        },
        children: 'any',
      }),
    ],
    tools: [
      createTool({
        name: 'getMovies',
        description:
          'Get the movie catalog. Pass "all" for everything, or a genre name to filter.',
        schema: s.object('Movie filter', {
          filter: s.string('Genre name, or "all" for the full catalog'),
        }),
        handler: async ({ filter }) => {
          const all = this.cinema.movies();
          return filter === 'all'
            ? all
            : all.filter((m) =>
                m.genres.some(
                  (g) => g.toLowerCase() === filter.toLowerCase(),
                ),
              );
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
            const m = this.cinema.getMovie(s.movieId);
            return {
              id: s.id,
              movieId: s.movieId,
              movieTitle: m?.title ?? 'Unknown',
              rating: m?.rating,
              genres: m?.genres ?? [],
              posterEmoji: m?.posterEmoji ?? '🎬',
              startsAt: s.startsAt,
              format: s.format,
              pricePerSeat: s.pricePerSeat,
            };
          });
        },
      }),
    ],
  });

  protected readonly messages = computed(() => this.chat.value() ?? []);

  protected readonly status = computed(() => {
    if (this.chat.isLoading()) return 'Streaming UI…';
    return '';
  });

  protected readonly suggestions = [
    "What's playing tonight in IMAX?",
    'Show me family-friendly options for Saturday',
    'What are my cheapest Sunday options?',
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
}
