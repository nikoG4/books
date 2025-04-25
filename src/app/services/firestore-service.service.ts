import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreServiceService {

  constructor(private firestore: Firestore) { }

  getCollection(collectionName: string): Observable<any[]>  {
    const items = collection(this.firestore, collectionName); 
    return collectionData(items, { idField: 'id' });
  }
}
