import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, deleteDoc, updateDoc, addDoc } from '@angular/fire/firestore';
import { Author } from '../models/Author';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private path = 'authors';
  private firestore = inject(Firestore);

 getAll(): Observable<Author[]> {
    const usersCollection = collection(this.firestore, this.path);
    return collectionData(usersCollection, { idField: 'id' }) as Observable<Author[]>;
  }

  add(user: Author): Promise<any> {
    const usersCollection = collection(this.firestore, this.path);
    return addDoc(usersCollection, user);
  }

  update(id: string, user: Author): Promise<void> {
    const userDocRef = doc(this.firestore, `${this.path}/${id}`);
    return updateDoc(userDocRef, { ...user });
  }

  delete(id: string): Promise<void> {
    const userDocRef = doc(this.firestore, `${this.path}/${id}`);
    return deleteDoc(userDocRef);
  }
}
