import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/UserService';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  standalone: false,

})
export class UsersPage implements OnInit {

  users: User[] = [];
  form: FormGroup;
  isEditing = false;
  selectedId: string | null = null;

  constructor(
    private authorService: UserService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['']
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.authorService.getAll().subscribe(data => this.users = data);
  }

  edit(author: User) {
    this.isEditing = true;
    this.selectedId = author.id!;
    this.form.patchValue({
      name: author.name,
      email: author.email
    });
  }

  cancel() {
    this.isEditing = false;
    this.selectedId = null;
    this.form.reset();
  }

  save() {
    if (this.form.invalid) return;

    const data: User = this.form.value;

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
