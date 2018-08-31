import {List} from './list.model';
import {Card} from './card.model';
import {User} from './user.model';

export interface Board {
  id: string;
  name: string;
  lists: List[];
  cards: Card[];
  users: User[];
  listsQuantity: number;
  cardsQuantity: number;
  usersQuantity: number;
}
