import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../models/Book';
import { BookService } from '../services/BookService';
import { Author } from '../models/Author';
import { AuthorService } from '../services/AuthorService';
import { CategoryService } from '../services/CategoryService';

@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
  standalone: false
})
export class BooksPage implements OnInit {

  books: Book[] = [];
  authors: Author[] = [];
  categories: any[] = [];
  form: FormGroup;
  isEditing = false;
  selectedId: string | null = null;

  constructor(
    private bookService: BookService,
    private categoryService: CategoryService,
    private authorService: AuthorService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      authorId: ['', Validators.required],
      categoryId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadBooks();
    this.loadAuthors();
    this.loadCategories();
  }

  loadBooks() {
    this.bookService.getAll().subscribe(data => this.books = data);
  }

  loadAuthors() {
    this.authorService.getAll().subscribe(data => this.authors = data);
  }

  loadCategories() {
    this.categoryService.getAll().subscribe(data => this.categories = data);
  }

  edit(book: Book) {
    this.isEditing = true;
    this.selectedId = book.id!;
    this.form.patchValue(book);
  }

  cancel() {
    this.isEditing = false;
    this.selectedId = null;
    this.form.reset();
  }

  save() {
    if (this.form.invalid) return;

    const data: Book = this.form.value;

    if (this.isEditing && this.selectedId) {
      this.bookService.update(this.selectedId, data).then(() => this.cancel());
    } else {
      this.bookService.add(data).then(() => this.form.reset());
    }
  }

  delete(id: string) {
    if (confirm('¿Estás seguro de que quieres eliminar este libro?')) {
      this.bookService.delete(id);
    }
  }

  getAuthorName(id: string): string {
    const author = this.authors.find(a => a.id === id);
    return author ? author.name : 'Desconocido';
  }
}
