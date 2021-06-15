import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks,
} from '@tmo/books/data-access';
import { FormControl, FormGroup } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss'],
})
export class BookSearchComponent {
  books: Observable<ReadingListBook[]>;

  searchForm = new FormGroup({
    term: new FormControl(''),
  });

  constructor(private readonly store: Store) {
    this.books = this.store.select(getAllBooks);
    this.searchForm
      .get('term')
      .valueChanges.pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((termChanged) => {
        this.searchBooks(termChanged)
      });
  }

  get searchTerm(): string {
    return this.searchForm.get('term').value;
  }

  addBookToReadingList(book: Book) {
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
}
