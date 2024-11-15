import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
  errorMessage=input.required<string>();
  closeEvent=output<void>();

  closeError(){
    this.closeEvent.emit();
  }
}
