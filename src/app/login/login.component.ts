import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppService } from '../app.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private loginService=inject(AppService);
  username!: string;
  password!: string;
  login() {
    let loginReq=this.loginService.login(this.username,this.password);
    if(!loginReq){
      alert('Incorrect Username OR Password');
    }
  }
}