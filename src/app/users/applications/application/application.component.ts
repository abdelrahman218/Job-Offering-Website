import { Component, Input } from '@angular/core';
import { Application } from '../applications.model';
import { ButtonComponent } from '../../shared/button/button.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [NgClass,ButtonComponent],
  templateUrl: './application.component.html',
  styleUrl: './application.component.css'
})
export class ApplicationComponent {
  @Input({required: true})application!: Application;

  get companylogoPath(){
    return 'company-logo/'+this.application.companyLogo;
  }
  get companylogoAltText(){
    return this.application.companyname+"'s logo";
  }
}
