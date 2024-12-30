//Angular Imports
import { Component, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

//Components
import { DialogComponent } from "../shared/dialog/dialog.component";
import { ButtonComponent } from '../shared/button/button.component';

//Services
import { UserService } from '../users.service';

//Models
import { EditProfileData } from '../../app.model';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [DialogComponent,FormsModule,ButtonComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})

export class EditProfileComponent implements OnInit{
  //Dependency Injection
  private userService=inject(UserService);

  //Private Attributes
  private orginalData!: EditProfileData;
  private imgConatiner=viewChild.required<ElementRef>('profilePic');
  
  //Component Variables
  readonly pattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d!@#$%^&*()-_=+{};:,<.>]{8,}/;
  editedData : EditProfileData={
    Photo:'',
    Name: '',
    ProfessionalTitle: '',
    Password: ''
  }
  confirmPassword:string='';
  
  //Private Methods
  private isValid() : boolean{
    if(this.editedData.Name===''||(!this.pattern.test(this.editedData.Password) && this.editedData.Password!=='')||(this.editedData.Password!==this.confirmPassword)){
      return false;
    }
    return true;
  }
  
  //Component Methods
  ngOnInit(){
    this.orginalData={
      Photo: this.userService.user().photo,
      Name: this.userService.user().name,
      ProfessionalTitle: this.userService.user().professionalTitle,
      Password: ''
    }
    this.editedData={...this.orginalData};
  }
  get imgPath(){
    return this.userService.backendUrl+'image?email='+this.userService.user().username;
  }
  selectProfilePic(event:any){
    const fr=new FileReader();
    this.editedData.PhotoFile=event.target.files[0];
    fr.onload=()=>{
      this.imgConatiner().nativeElement.src=fr.result;
    };
    fr.readAsDataURL(event.target.files[0]);
  }
  editProfile() : boolean{
    if(this.isValid()){
      this.userService.closeTab();
      this.userService.editProfile(this.editedData,this.orginalData);
      return true;
    }
    return false;
  }
  closeDialog(){
    this.userService.closeTab();
  }
}