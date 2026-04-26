import { Component, input } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  template: `
    <article class="card">
      <div class="poster">{{ posterEmoji() }}</div>
      <div class="body">
        <header>
          <h3>{{ title() }}</h3>
          <span class="rating">{{ rating() }}</span>
        </header>
        <div class="children">
          <ng-content />
        </div>
      </div>
    </article>
  `,
  styles: [
    `
      .card {
        display: flex;
        gap: 1rem;
        padding: 0.9rem;
        border: 1px solid var(--border);
        border-radius: 12px;
        background: var(--panel-2);
      }
      .poster {
        width: 64px;
        height: 88px;
        display: grid;
        place-items: center;
        font-size: 2.2rem;
        border-radius: 8px;
        background: color-mix(in oklab, var(--generative-ui) 10%, var(--panel));
        border: 1px solid var(--border);
        flex-shrink: 0;
      }
      .body {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        flex: 1;
        min-width: 0;
      }
      header {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        flex-wrap: wrap;
      }
      h3 {
        margin: 0;
        color: #fff;
        font-size: 1.02rem;
        font-weight: 600;
        letter-spacing: -0.01em;
      }
      .rating {
        font-size: 0.72rem;
        letter-spacing: 0.06em;
        padding: 0.12rem 0.45rem;
        border-radius: 5px;
        border: 1px solid var(--border-strong);
        color: var(--muted);
      }
      .children {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
      }
    `,
  ],
})
export class MovieCardComponent {
  movieId = input.required<string>();
  title = input.required<string>();
  rating = input.required<string>();
  posterEmoji = input.required<string>();
}
