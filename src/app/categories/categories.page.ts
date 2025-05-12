import { Component, OnInit } from '@angular/core';
import { Category } from '../models/Category';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../services/CategoryService';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: false,

})
export class CategoriesPage implements OnInit {

  categories: Category[] = [];
  form: FormGroup;
  isEditing = false;
  selectedId: string | null = null;

  constructor(
    private authorService: CategoryService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      bio: ['']
    });
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.authorService.getAll().subscribe(data => this.categories = data);
  }

  edit(author: Category) {
    this.isEditing = true;
    this.selectedId = author.id!;
    this.form.patchValue({
      name: author.name,
    });
  }

  cancel() {
    this.isEditing = false;
    this.selectedId = null;
    this.form.reset();
  }

  save() {
    if (this.form.invalid) return;

    const data: Category = this.form.value;

    if (this.isEditing && this.selectedId) {
      this.authorService.update(this.selectedId, data).then(() => this.cancel());
    } else {
      this.authorService.add(data).then(() => this.form.reset());
    }
  }

  delete(id: string) {
    if (confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
      this.authorService.delete(id);
    }
  }

}
