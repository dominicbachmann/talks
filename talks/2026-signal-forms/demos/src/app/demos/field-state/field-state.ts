import { Component, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';

@Component({
  selector: 'app-field-state',
  imports: [FormField],
  templateUrl: './field-state.html',
  styleUrl: './field-state.css',
})
export class FieldState {
  profileModel = signal({
    username: '',
  });

  profileForm = form(this.profileModel, (path) => {
    required(path.username);
  });

  get username() {
    return this.profileForm.username();
  }
}
