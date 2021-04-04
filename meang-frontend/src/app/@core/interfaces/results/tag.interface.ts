import { Tag } from '../models/tag.interface';
import { InfoPage } from './result-data.interface';
import { Result } from './result.interface';

export interface ResultTag extends Result {
  info: InfoPage;
  tag?: Tag;
  tags?: Tag[];
}

export interface MutationTag {
  addTag?: ResultTag;
  updateTag?: ResultTag;
  blockTag?: ResultTag;
}
