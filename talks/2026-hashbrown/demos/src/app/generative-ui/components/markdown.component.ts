import { Component, input } from '@angular/core';

@Component({
  selector: 'app-markdown',
  template: `<div class="md">{{ data() }}</div>`,
  styles: [
    `
      .md {
        color: var(--body);
        font-size: 0.95rem;
        line-height: 1.55;
        white-space: pre-wrap;
      }
    `,
  ],
})
export class MarkdownComponent {
  data = input.required<string>();
}
