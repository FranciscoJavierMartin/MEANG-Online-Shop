import { Genre } from '../models/genre.interface';
import { InfoPage } from './result-data.interface';
import { Result } from './result.interface';

export interface ResultGenre extends Result {
  info: InfoPage;
  genre?: Genre;
  genres?: Genre[];
}

export interface MutationGenre {
  addGenre?: ResultGenre;
  updateGenre?: ResultGenre;
}
