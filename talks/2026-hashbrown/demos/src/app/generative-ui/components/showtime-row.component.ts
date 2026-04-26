import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-showtime-row',
  template: `
    <div class="row">
      <div class="time">
        <span class="clock">{{ time() }}</span>
        <span class="fmt">{{ format() }}</span>
      </div>
      <div class="price">\${{ pricePerSeat() }}/seat</div>
      <button type="button" class="book">Book</button>
    </div>
  `,
  styles: [
    `
      .row {
        display: flex;
        align-items: center;
        gap: 0.9rem;
        padding: 0.5rem 0.7rem;
        border-top: 1px solid var(--border);
      }
      .row:first-child {
        border-top: 0;
      }
      .time {
        display: flex;
        align-items: baseline;
        gap: 0.5rem;
        flex: 1;
      }
      .clock {
        font-weight: 600;
        color: #fff;
        font-variant-numeric: tabular-nums;
      }
      .fmt {
        font-size: 0.72rem;
        letter-spacing: 0.04em;
        padding: 0.14rem 0.45rem;
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.06);
        color: var(--muted);
        text-transform: uppercase;
      }
      .price {
        color: var(--muted);
        font-size: 0.85rem;
        font-variant-numeric: tabular-nums;
      }
      .book {
        background: transparent;
        border: 1px solid
          color-mix(in oklab, var(--generative-ui) 45%, transparent);
        color: var(--generative-ui);
        padding: 0.35rem 0.8rem;
        border-radius: 8px;
        cursor: pointer;
        font-size: 0.82rem;
      }
      .book:hover {
        background: color-mix(in oklab, var(--generative-ui) 10%, transparent);
      }
    `,
  ],
})
export class ShowtimeRowComponent {
  startsAt = input.required<string>();
  format = input.required<'2D' | '3D' | 'IMAX' | 'Dolby'>();
  pricePerSeat = input.required<number>();

  protected readonly time = computed(() => {
    const d = new Date(this.startsAt());
    if (Number.isNaN(d.getTime())) return this.startsAt();
    return d.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    });
  });
}
