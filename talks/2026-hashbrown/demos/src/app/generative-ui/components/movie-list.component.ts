import { Component, input } from '@angular/core';

@Component({
  selector: 'app-movie-list',
  template: `
    <section class="list">
      <header>
        <h2>{{ title() }}</h2>
      </header>
      <div class="items">
        <ng-content />
      </div>
    </section>
  `,
  styles: [
    `
      .list {
        display: flex;
        flex-direction: column;
        gap: 0.9rem;
      }
      header {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
      }
      h2 {
        margin: 0;
        color: #fff;
        font-size: 1.1rem;
        font-weight: 600;
        letter-spacing: -0.01em;
      }
      .items {
        display: flex;
        flex-direction: column;
        gap: 0.7rem;
      }
    `,
  ],
})
export class MovieListComponent {
  title = input.required<string>();
}
