import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Author } from '../models/Author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private collectionName = 'authors';

  constructor(private afs: AngularFirestore) {}

  getAll() {
    return this.afs.collection<Author>(this.collectionName).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getById(id: string) {
    return this.afs.doc<Author>(`${this.collectionName}/${id}`).valueChanges();
  }

  add(author: Author) {
    return this.afs.collection<Author>(this.collectionName).add(author);
  }

  update(id: string, author: Author) {
    return this.afs.doc<Author>(`${this.collectionName}/${id}`).update(author);
  }

  delete(id: string) {
    return this.afs.doc<Author>(`${this.collectionName}/${id}`).delete();
  }
}
