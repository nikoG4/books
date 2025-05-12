import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, deleteDoc, updateDoc, addDoc } from '@angular/fire/firestore';
import { Loan } from '../models/Loan';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoanService {
  private path = 'loans';
  private firestore = inject(Firestore);

  getAll(): Observable<Loan[]> {
    const ref = collection(this.firestore, this.path);
    return collectionData(ref, { idField: 'id' }) as Observable<Loan[]>;
  }

  add(loan: Loan): Promise<any> {
    const ref = collection(this.firestore, this.path);
    return addDoc(ref, loan);
  }

  update(id: string, loan: Loan): Promise<void> {
    const ref = doc(this.firestore, `${this.path}/${id}`);
    return updateDoc(ref, { ...loan });
  }

  delete(id: string): Promise<void> {
    const ref = doc(this.firestore, `${this.path}/${id}`);
    return deleteDoc(ref);
  }
}
