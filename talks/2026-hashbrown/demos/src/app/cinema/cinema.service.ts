import { Injectable, signal } from '@angular/core';
import { MOVIES, SHOWTIMES, Movie, Showtime } from './cinema-data';

export interface Booking {
  bookingId: string;
  showtimeId: string;
  seatIds: string[];
  totalPrice: number;
  confirmedAt: string;
}

@Injectable({ providedIn: 'root' })
export class CinemaService {
  private readonly _showtimes = signal<Showtime[]>(SHOWTIMES);
  private readonly _bookings = signal<Booking[]>([]);

  readonly movies = signal<Movie[]>(MOVIES);
  readonly showtimes = this._showtimes.asReadonly();
  readonly bookings = this._bookings.asReadonly();

  getShowtimesForDate(date: string): Showtime[] {
    return this._showtimes().filter((s) => s.startsAt.startsWith(date));
  }

  getShowtime(id: string): Showtime | undefined {
    return this._showtimes().find((s) => s.id === id);
  }

  getMovie(id: string): Movie | undefined {
    return this.movies().find((m) => m.id === id);
  }

  book(input: { showtimeId: string; seatIds: string[] }): Booking {
    const showtime = this.getShowtime(input.showtimeId);
    if (!showtime) {
      throw new Error(`Unknown showtime: ${input.showtimeId}`);
    }
    const totalPrice = showtime.pricePerSeat * input.seatIds.length;
    const booking: Booking = {
      bookingId: `BOOK-${Math.floor(Math.random() * 9000) + 1000}`,
      showtimeId: input.showtimeId,
      seatIds: input.seatIds,
      totalPrice,
      confirmedAt: new Date().toISOString(),
    };
    this._bookings.update((bs) => [...bs, booking]);
    this._showtimes.update((rows) =>
      rows.map((r) =>
        r.id === input.showtimeId
          ? {
              ...r,
              seatsAvailable: Math.max(
                0,
                r.seatsAvailable - input.seatIds.length,
              ),
            }
          : r,
      ),
    );
    return booking;
  }
}
