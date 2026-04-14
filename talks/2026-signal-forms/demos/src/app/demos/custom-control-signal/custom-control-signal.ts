import { Component, model, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { form, FormField, FormValueControl } from '@angular/forms/signals';

@Component({
  selector: 'app-labeled-input-signal',
  template: `
    <input
      [value]="value()"
      (input)="value.set($any($event.target).value)"
    />
  `,
})
export class LabeledInputSignal implements FormValueControl<string> {
  value = model('');
}

@Component({
  selector: 'app-custom-control-signal',
  imports: [FormField, LabeledInputSignal, JsonPipe],
  templateUrl: './custom-control-signal.html',
  styleUrl: './custom-control-signal.css',
})
export class CustomControlSignal {
  nameModel = signal({ firstName: '', lastName: '' });
  nameForm = form(this.nameModel);
}
