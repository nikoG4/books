import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, deleteDoc, updateDoc, addDoc } from '@angular/fire/firestore';
import { Category } from '../models/Category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private path = 'categories';
  private firestore = inject(Firestore);

 getAll(): Observable<Category[]> {
    const usersCollection = collection(this.firestore, this.path);
    return collectionData(usersCollection, { idField: 'id' }) as Observable<Category[]>;
  }

  add(user: Category): Promise<any> {
    const usersCollection = collection(this.firestore, this.path);
    return addDoc(usersCollection, user);
  }

  update(id: string, user: Category): Promise<void> {
    const userDocRef = doc(this.firestore, `${this.path}/${id}`);
    return updateDoc(userDocRef, { ...user });
  }

  delete(id: string): Promise<void> {
    const userDocRef = doc(this.firestore, `${this.path}/${id}`);
    return deleteDoc(userDocRef);
  }
}
