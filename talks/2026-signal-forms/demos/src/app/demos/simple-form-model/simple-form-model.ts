import { Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { form, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-simple-form-model',
  imports: [FormField, JsonPipe],
  templateUrl: './simple-form-model.html',
  styleUrl: './simple-form-model.css',
})
export class SimpleFormModel {
  loginModel = signal({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel);
}
