import { Component, computed, inject, signal } from '@angular/core';
import {
  chatResource,
  createRuntime,
  createRuntimeFunction,
  createToolJavaScript,
} from '@hashbrownai/angular';
import { s } from '@hashbrownai/core';

import { CinemaService } from '../cinema/cinema.service';

@Component({
  selector: 'app-js-runtime-demo',
  templateUrl: './js-runtime.component.html',
  styleUrls: ['../shared/chat.css', './js-runtime.component.css'],
})
export class JsRuntimeDemoComponent {
  private readonly cinema = inject(CinemaService);

  protected readonly draft = signal('');

  private readonly runtime = createRuntime({
    timeout: 10_000,
    functions: [
      createRuntimeFunction({
        name: 'getMovies',
        description: 'Get the full movie catalog.',
        result: s.array(
          'Movies',
          s.object('Movie', {
            id: s.string('Movie ID'),
            title: s.string('Title'),
            rating: s.string('Rating'),
            runtimeMinutes: s.number('Runtime in minutes'),
            genres: s.array('Genres', s.string('Genre')),
          }),
        ),
        handler: () =>
          this.cinema.movies().map((m) => ({
            id: m.id,
            title: m.title,
            rating: m.rating,
            runtimeMinutes: m.runtimeMinutes,
            genres: m.genres,
          })),
      }),
      createRuntimeFunction({
        name: 'getShowtimes',
        description: 'Get showtimes for an ISO date (YYYY-MM-DD).',
        args: s.object('Showtime query', {
          date: s.string('ISO date (YYYY-MM-DD)'),
        }),
        result: s.array(
          'Showtimes',
          s.object('Showtime', {
            id: s.string('Showtime ID'),
            movieId: s.string('Movie ID'),
            startsAt: s.string('ISO 8601 start time'),
            format: s.enumeration('Format', ['2D', '3D', 'IMAX', 'Dolby']),
            pricePerSeat: s.number('Price per seat'),
            seatsAvailable: s.number('Seats available'),
          }),
        ),
        handler: (input) => this.cinema.getShowtimesForDate(input.date),
      }),
      createRuntimeFunction({
        name: 'getAllShowtimes',
        description:
          'Get every showtime across every date. Use this for analytical queries that need to filter or sort across days.',
        result: s.array(
          'All Showtimes',
          s.object('Showtime', {
            id: s.string('Showtime ID'),
            movieId: s.string('Movie ID'),
            startsAt: s.string('ISO 8601 start time'),
            format: s.enumeration('Format', ['2D', '3D', 'IMAX', 'Dolby']),
            pricePerSeat: s.number('Price per seat'),
            seatsAvailable: s.number('Seats available'),
          }),
        ),
        handler: () => this.cinema.showtimes(),
      }),
    ],
  });

  protected readonly chat = chatResource({
    model: 'claude-opus-4-6',
    system: `You are **Reel**, an analytical cinema concierge.

When the user asks ANYTHING analytical — cheapest, most expensive, total
cost, busiest day, averages, rankings, comparisons, or multi-step
filtering — you MUST call the \`javascript\` tool with a complete
JavaScript program that uses the provided runtime functions to compute
the answer.

Always return the computed answer from your script (the last expression
is returned), then give a short, human-friendly summary in your reply
that references the numbers.

Today is 2026-04-22. "This week" spans 2026-04-24 through 2026-04-27.`,
    tools: [createToolJavaScript({ runtime: this.runtime })],
  });

  protected readonly messages = computed(() => this.chat.value() ?? []);

  protected readonly lastScript = computed<string | null>(() => {
    const msgs = this.messages();
    for (let i = msgs.length - 1; i >= 0; i--) {
      const m = msgs[i];
      if (m.role !== 'assistant') continue;
      for (let j = m.toolCalls.length - 1; j >= 0; j--) {
        const tc = m.toolCalls[j] as { name: string; args: { code?: string } };
        if (tc.name === 'javascript' && tc.args?.code) {
          return tc.args.code;
        }
      }
    }
    return null;
  });

  protected readonly status = computed(() => {
    if (this.chat.isRunningToolCalls()) return 'Running script…';
    if (this.chat.isReceiving()) return 'Thinking…';
    if (this.chat.isSending()) return 'Sending…';
    return '';
  });

  protected readonly suggestions = [
    'What are the 3 cheapest IMAX showtimes this week, and total per-seat cost?',
    'Which day this week has the most screenings?',
    'Average ticket price by format',
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
