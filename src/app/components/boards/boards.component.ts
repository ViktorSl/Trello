import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator, Sort} from '@angular/material';
import {Board} from '../../models/board.model';
import {DataService} from '../../services/data.service';

import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})

export class BoardsComponent implements OnInit, AfterViewInit, OnDestroy {
  // what columns should be displayed in table
  displayedColumns = ['board', 'listname', 'listsquantity', 'cardsquantity', 'username', 'userquantity'];
  // dataSource for table
  dataSource: MatTableDataSource<Board>;

  // Table paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // Table Sorting
  @ViewChild(MatSort) sort: MatSort;

  items: any = ['Lists', 'Cards', 'Users'];
  boards: Board[];
  boardsSub: Subscription;
  form: FormGroup;

  constructor(public dataService: DataService) {
  }

  ngOnInit() {
    // initialize form
    this.form = new FormGroup({
      boardsSelect: new FormControl(),
      itemsSelect: new FormControl()
    });

    // get boards list
    this.dataService.getBoardsList();
    // waiting for server response and write data into this.boards
    this.boardsSub = this.dataService.getBoardsUpdatedListener()
      .subscribe((response: Board[]) => {
        this.boards = response;
        // put data into table
        this.dataSource = new MatTableDataSource([...this.boards]);
        // set paginator value
        this.dataSource.paginator = this.paginator;
        // set sort value
        this.dataSource.sort = this.sort;
      });

    // react on doards select
    this.form.get('boardsSelect').valueChanges.subscribe((values) => {
      const newArray = [...this.boards];
      const finalArray = [];
      values.forEach(id => {
        newArray.forEach(item => {
          if (item.id === id) {
            finalArray.push(item);
          }
        });
      });
      this.dataSource.data = finalArray;
    });

    // react on items select
    this.form.get('itemsSelect').valueChanges.subscribe(values => {
      let selectedItems = ['board'];
      values.forEach(item => {
        if (item === 'Cards') {
          selectedItems = [...selectedItems, 'cardsquantity'];
        }
        if (item === 'Users') {
          selectedItems = [...selectedItems, 'username', 'userquantity'];
        }
        if (item === 'Lists') {
          selectedItems = [...selectedItems, 'listname', 'listsquantity'];
        }
      });
      this.displayedColumns = [...selectedItems];
    });

  }

  ngAfterViewInit() {}

  sortData(sort: Sort) {
    console.log(sort);
  }

// print document
  print() {
    window.print();
  }

  ngOnDestroy() {
    if (this.boardsSub) {
      this.boardsSub.unsubscribe();
    }
  }

}
