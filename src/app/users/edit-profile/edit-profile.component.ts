import { Component, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { DialogComponent } from "../shared/dialog/dialog.component";
import { UserService } from '../users.service';
import { EditProfileData } from '../../app.model';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../shared/button/button.component';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [DialogComponent,FormsModule,ButtonComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit{
  private userService=inject(UserService);
  private orginalData!: EditProfileData;
  private imgConatiner=viewChild.required<ElementRef>('profilePic');
  readonly pattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d!@#$%^&*()-_=+{};:,<.>]{8,}/;
  get imgPath(){
    return 'http://localhost:8080/user/image?email='+this.userService.user().username;
  }
  editedData : EditProfileData={
    Photo:'',
    Name: '',
    ProfessionalTitle: '',
    Password: ''
  }
  confirmPassword:string='';
  ngOnInit(){
    this.orginalData={
      Photo: this.userService.user().photo,
      Name: this.userService.user().name,
      ProfessionalTitle: this.userService.user().professionalTitle,
      Password: ''
    }
    this.editedData={...this.orginalData};
  }
  private isValid() : boolean{
    if(this.editedData.Name===''||(!this.pattern.test(this.editedData.Password) && this.editedData.Password!=='')||(this.editedData.Password!==this.confirmPassword)){
      return false;
    }
    return true;
  }
  selectProfilePic(event:any){
    const fr=new FileReader();
    this.editedData.PhotoFile=event.target.files[0];
    fr.onload=()=>{
      this.imgConatiner().nativeElement.src=fr.result;
    };
    fr.readAsDataURL(event.target.files[0]);
  }
  editProfile(){
    if(this.isValid()){
      this.userService.closeTab();
      this.userService.editProfile(this.editedData,this.orginalData);
    }
  }
  closeDialog(){
    this.userService.closeTab();
  }
}