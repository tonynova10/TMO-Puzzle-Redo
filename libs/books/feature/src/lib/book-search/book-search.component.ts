import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  removeFromReadingList,
  searchBooks,
  confirmedAddToReadingList,
  confirmedRemoveFromReadingList
} from '@tmo/books/data-access';
import { FormControl, FormGroup } from '@angular/forms';
import { Book, ReadingListItem } from '@tmo/shared/models';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss'],
})
export class BookSearchComponent {
  books: Observable<ReadingListBook[]>;
  readingList: any;
  snackBarAction = 'Undo';
  item: any;
  book: Book;

  searchForm = new FormGroup({
    term: new FormControl(''),
  });

  constructor(
    private readonly store: Store,
    private _snackBar: MatSnackBar,
    private updates: Actions
  ) {
    this.books = this.store.select(getAllBooks);
    this.searchForm
      .get('term')
      .valueChanges.pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((termChanged) => {
        this.searchBooks(termChanged);
      });
    this.updates
      .pipe(ofType(confirmedAddToReadingList))
      .subscribe(() => {
        this.undoAction(1);
      });

    this.updates
      .pipe(ofType(confirmedRemoveFromReadingList))
      .subscribe(() => {
        this.undoAction(2);
      });
  }

  get searchTerm(): string {
    return this.searchForm.get('term').value;
  }

  addBookToReadingList(book: Book) {
    this.item = {
      bookId: book.id,
    } as ReadingListItem;
    this.book = book;
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() {
    this.searchForm.get('term').setValue('javascript');
    this.searchBooks('javascript');
  }

  searchBooks(termChanged) {
    if (this.searchForm.get('term').value !== '') {
      this.store.dispatch(searchBooks({ term: termChanged }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }

  undoAction(type: number) {
    if (type === 1) {
      const message = 'Book added to reading list!';
      const snackBarRef = this._snackBar.open(message, this.snackBarAction, {
        duration: 5000,
      });

      snackBarRef.onAction().subscribe(() => {
        this.store.dispatch(removeFromReadingList({ item: this.item }));
        snackBarRef.dismiss();
      });
    } else {
      const message = 'Book removed from reading list!';
      const snackBarRef = this._snackBar.open(message, this.snackBarAction, {
        duration: 5000,
      });

      snackBarRef.onAction().subscribe(() => {
        this.store.dispatch(addToReadingList({ book: {...this.book} }));
        snackBarRef.dismiss();
      });
    }
  }
}
