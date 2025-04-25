import { Component, OnInit } from '@angular/core';
import { Author } from '../models/Author';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorService } from '../services/AuthorService';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.page.html',
  styleUrls: ['./authors.page.scss'],
  standalone: false,

})
export class AuthorsPage implements OnInit {

  authors: Author[] = [];
  form: FormGroup;
  isEditing = false;
  selectedId: string | null = null;

  constructor(
    private authorService: AuthorService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      bio: ['']
    });
  }

  ngOnInit() {
    this.loadAuthors();
  }

  loadAuthors() {
    this.authorService.getAll().subscribe(data => this.authors = data);
  }

  edit(author: Author) {
    this.isEditing = true;
    this.selectedId = author.id!;
    this.form.patchValue({
      name: author.name,
      bio: author.bio
    });
  }

  cancel() {
    this.isEditing = false;
    this.selectedId = null;
    this.form.reset();
  }

  save() {
    if (this.form.invalid) return;

    const data: Author = this.form.value;

    if (this.isEditing && this.selectedId) {
      this.authorService.update(this.selectedId, data).then(() => this.cancel());
    } else {
      this.authorService.add(data).then(() => this.form.reset());
    }
  }

  delete(id: string) {
    if (confirm('¿Estás seguro de que quieres eliminar este autor?')) {
      this.authorService.delete(id);
    }
  }

}
