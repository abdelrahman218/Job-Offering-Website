import { Component, inject, Input } from '@angular/core';
import { Application } from '../applications.model';
import { ButtonComponent } from '../../shared/button/button.component';
import { UserService } from '../../users.service';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './application.component.html',
  styleUrl: './application.component.css'
})
export class ApplicationComponent {
  @Input({required: true})application!: Application;
  private userService=inject(UserService);
  get companylogoPath(){
    return 'company-logo/'+this.application.companyLogo;
  }
  get companylogoAltText(){
    return this.application.companyname+"'s logo";
  }
  withdrawApp(appId:string){
    this.userService.withdrawApp(appId);
  }
}