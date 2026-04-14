import { Component, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-labeled-input-cva',
  template: `
    <input
      [value]="value"
      [disabled]="disabled"
      (input)="onInput($event)"
      (blur)="onTouched()"
    />
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LabeledInputCva),
      multi: true,
    },
  ],
})
export class LabeledInputCva implements ControlValueAccessor {
  value = '';
  disabled = false;
  onChange: (v: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value ?? '';
  }
  registerOnChange(fn: (v: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
  }
}

@Component({
  selector: 'app-custom-control-reactive',
  imports: [ReactiveFormsModule, LabeledInputCva, JsonPipe],
  templateUrl: './custom-control-reactive.html',
  styleUrl: './custom-control-reactive.css',
})
export class CustomControlReactive {
  nameForm = new FormGroup({
    firstName: new FormControl('', { nonNullable: true }),
    lastName: new FormControl('', { nonNullable: true }),
  });
}
