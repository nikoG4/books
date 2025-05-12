import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanService } from '../services/LoanService';
import { Loan } from '../models/Loan';
import { UserService } from '../services/UserService';
import { BookService } from '../services/BookService';
import { User } from '../models/User';
import { Book } from '../models/Book';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.page.html',
  styleUrls: ['./loans.page.scss'],
  standalone: false
})
export class LoansPage implements OnInit {

  form: FormGroup;
  loans: Loan[] = [];
  users: User[] = [];
  books: Book[] = [];
  isEditing = false;
  selectedId: string | null = null;
  showForm = false;

  constructor(
    private loanService: LoanService,
    private userService: UserService,
    private bookService: BookService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      userId: ['', Validators.required],
      bookId: ['', Validators.required],
      loanDate: ['', Validators.required],
      returnDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loanService.getAll().subscribe(data => this.loans = data);
    this.userService.getAll().subscribe(data => this.users = data);
    this.bookService.getAll().subscribe(data => this.books = data);
  }

  newLoan() {
    this.form.reset();
    this.isEditing = false;
    this.selectedId = null;
    this.showForm = true;
  }

  edit(loan: Loan) {
    this.form.patchValue(loan);
    this.selectedId = loan.id!;
    this.isEditing = true;
    this.showForm = true;
  }

  cancel() {
    this.form.reset();
    this.isEditing = false;
    this.selectedId = null;
    this.showForm = false;
  }

  save() {
    if (this.form.invalid) return;
    const data: Loan = this.form.value;
    if (this.isEditing && this.selectedId) {
      this.loanService.update(this.selectedId, data).then(() => this.cancel());
    } else {
      this.loanService.add(data).then(() => this.cancel());
    }
  }

  delete(id: string) {
    if (confirm('¿Eliminar préstamo?')) {
      this.loanService.delete(id);
    }
  }

getUserName(userId: string): string {
  const user = this.users.find(u => u.id === userId);
  return user ? user.name : '';
}

getBookTitle(bookId: string): string {
  const book = this.books.find(b => b.id === bookId);
  return book ? book.title : '';
}
}
