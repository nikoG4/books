import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  deleteDoc,
  updateDoc,
  addDoc
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { Book } from '../models/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private path = 'books';
  private firestore = inject(Firestore);

  getAll(): Observable<Book[]> {
    const ref = collection(this.firestore, this.path);
    return collectionData(ref, { idField: 'id' }) as Observable<Book[]>;
  }

  add(book: Book): Promise<any> {
    const ref = collection(this.firestore, this.path);
    return addDoc(ref, book);
  }

  update(id: string, book: Book): Promise<void> {
    const ref = doc(this.firestore, `${this.path}/${id}`);
    return updateDoc(ref, { ...book });
  }

  delete(id: string): Promise<void> {
    const ref = doc(this.firestore, `${this.path}/${id}`);
    return deleteDoc(ref);
  }
}
