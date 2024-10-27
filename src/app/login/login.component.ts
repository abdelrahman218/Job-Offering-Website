import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { dummyUserRouterService } from '../dummy-user-router.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private loginService=inject(dummyUserRouterService);
  username!: string;
  password!: string;
  login() {
    let loginReq=this.loginService.login(this.username,this.password);
    if(!loginReq){
      alert('Incorrect Username OR Password');
    }
  }
}