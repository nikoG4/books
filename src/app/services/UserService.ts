import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, deleteDoc, updateDoc, addDoc } from '@angular/fire/firestore';
import { User } from '../models/User';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private path = 'users';
  private firestore = inject(Firestore);

 getAll(): Observable<User[]> {
    const usersCollection = collection(this.firestore, this.path);
    return collectionData(usersCollection, { idField: 'id' }) as Observable<User[]>;
  }

  add(user: User): Promise<any> {
    const usersCollection = collection(this.firestore, this.path);
    return addDoc(usersCollection, user);
  }

  update(id: string, user: User): Promise<void> {
    const userDocRef = doc(this.firestore, `${this.path}/${id}`);
    return updateDoc(userDocRef, { ...user });
  }

  delete(id: string): Promise<void> {
    const userDocRef = doc(this.firestore, `${this.path}/${id}`);
    return deleteDoc(userDocRef);
  }
}
