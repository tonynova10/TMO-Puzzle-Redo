import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList, markAsRead, markBookAsRead, removeBookAsRead } from '@tmo/books/data-access';
import { Book, ReadingListItem } from '@tmo/shared/models';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss'],
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store) {}

  removeFromReadingList(readingItem) {
    let item: any;
    let book = this.createBook(readingItem);

    if (readingItem.finished) {
      item = {
        ...readingItem,
        finished: false,
        finishedDate: null,
      };
      book = {
        ...book,
        finished: false
      }
      this.store.dispatch(removeBookAsRead({ book }));
    } else {
      item = {
        ...readingItem
      }
    }
    this.store.dispatch(removeFromReadingList({ item }));
  }

  markedAsRead(readingItem: ReadingListItem){
    const finishedDate = new Date().toISOString();
    const book = this.createBook(readingItem);
    book.finished = true;
    const item = {
      ...readingItem,
      finished: true,
      finishedDate: finishedDate
    } as ReadingListItem;
    this.store.dispatch(markAsRead({ item }));
    this.store.dispatch(markBookAsRead({ book }));
  }

  createBook(readingItem) {
    return {
      id: readingItem.bookId,
      authors: readingItem.authors,
      description: readingItem.description,
      title: readingItem.title,
      coverUrl: readingItem.coverUrl,
      publisher: readingItem.publisher,
    } as Book;
  }
}
