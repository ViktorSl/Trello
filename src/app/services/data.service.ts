import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Board} from '../models/board.model';
import {List} from '../models/list.model';
import {Card} from '../models/card.model';
import {User} from '../models/user.model';
import {Subject} from 'rxjs';
import {forkJoin} from 'rxjs';

@Injectable()
export class DataService {

  token: string;
  private key = '644a1893cc66d1d3d2539820c65d1c85';
  boardsUrl: string;
  boardList;
  boards: Board[] = [];
  board: Board;
  usersList: User[];
  cardsList: Card[];
  lists: List[];
  boardsUpdated = new Subject();
  allBoardInfo;

  constructor(private http: HttpClient) {
  }

  getBoardsList = () => {
    this.boardsUrl = `https://api.trello.com/1/members/me/boards?key=${this.key}&token=${this.token}`;
    this.http.get<any>(this.boardsUrl)
      .subscribe((response: any) => {
          this.boardList = response.map((board) => {
            this.allBoardInfo = forkJoin([
              this.getUsers(board.id),
              this.getCards(board.id),
              this.getLists(board.id)
            ]);

            this.allBoardInfo.subscribe((data: any) => {
              this.usersList = data[0].map((user: any) => {
                return user.fullName;
              });
              this.cardsList = data[1].map((card: any) => {
                return card.name;
              });
              this.lists = data[2].map((list: any) => {
                return list.name;
              });

              this.board = {
                id: board.id,
                name: board.name,
                users: this.usersList,
                usersQuantity: this.usersList.length,
                cards: this.cardsList,
                cardsQuantity: this.cardsList.length,
                lists: this.lists,
                listsQuantity: this.lists.length
              };
              this.boards.push(this.board);
              this.boardsUpdated.next([...this.boards]);
            });
          });
        },
        (error) => {
          console.log(error);
        });
  };
  getBoardsUpdatedListener = () => {
    return this.boardsUpdated.asObservable();
  };

  getLists = (id) => {
    return this.http.get<any>(`https://api.trello.com/1/boards/${id}/lists?key=${this.key}&token=${this.token}`);
  };
  getCards = (id) => {
    return this.http.get<any>(`https://api.trello.com/1/boards/${id}/cards?key=${this.key}&token=${this.token}`);
  };
  getUsers = (id) => {
    return this.http.get<any>(`https://api.trello.com/1/boards/${id}/members?key=${this.key}&token=${this.token}`);
  };

}
