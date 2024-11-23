import { Component, inject, input, output } from '@angular/core';
import { ErrorService } from './error.service';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
  errorService=inject(ErrorService);
  errorMessage=this.errorService.errorMessage;
  showTryAgain=this.errorService.showTryAgain;

  closeError(){
    this.errorService.closeError();
  }
}