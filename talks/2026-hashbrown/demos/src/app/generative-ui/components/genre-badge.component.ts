import { Component, input } from '@angular/core';

@Component({
  selector: 'app-genre-badge',
  template: `<span class="badge">{{ genre() }}</span>`,
  styles: [
    `
      .badge {
        display: inline-block;
        padding: 0.18rem 0.55rem;
        border-radius: 999px;
        font-size: 0.72rem;
        letter-spacing: 0.02em;
        background: color-mix(in oklab, var(--generative-ui) 12%, transparent);
        border: 1px solid
          color-mix(in oklab, var(--generative-ui) 35%, transparent);
        color: color-mix(in oklab, var(--generative-ui) 90%, white 10%);
      }
    `,
  ],
})
export class GenreBadgeComponent {
  genre = input.required<string>();
}
