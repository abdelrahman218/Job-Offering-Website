//Angular Imports
import { Component, inject, input } from '@angular/core';

//Components
import { ButtonComponent } from '../../shared/button/button.component';

//Services
import { UserService } from '../../users.service';

//Models
import { type ApplicationType as Application} from '../../../app.model';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './application.component.html',
  styleUrl: './application.component.css'
})

export class ApplicationComponent {
  application = input.required<Application>();
  private userService=inject(UserService);
  get companylogoPath(){
    return this.userService.backendUrl.replace('user','company')+'getLogo?email='+this.application().companyEmail;
  }
  get companylogoAltText(){
    return this.application().companyname+"'s logo";
  }
  withdrawApp(appId:string){
    this.userService.withdrawApp(appId);
  }
}