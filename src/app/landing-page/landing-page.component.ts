import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink , Router, RouterModule} from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink,FormsModule,RouterModule,CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit {
  categories1 = [
    { id: 'careerLevelOptions', name: 'expertised-level' },
    { id: 'careerLevelOptions', name: 'entry-level' },
    {id:'careerLevelOptions',name:'senior-manager'}
  ];
  categories2 = [
    { id: 'workplaceOptions', name: 'Remote' },
    { id: 'workplaceOptions', name: 'On-site' },
    {id:'workplaceOptions',name:'Hybrid'}
  ];
  categories3 = [
    { id: 'locationOptions', name: 'Cairo' },
    { id: 'locationOptions', name: 'Alexandria' },
    {id:'locationOptions',name:'Giza'}
  ];
  private appService=inject(AppService);
  userType=this.appService.userTypeSignal.asReadonly();
  constructor(private router: Router) {}
  ngOnInit(): void {
    console.log(this.userType());
  }
  signup(){
    this.router.navigate(["/signup"]);
  }
  searchTerm: string = '';

  onSearchClick() {
    this.router.navigate(['/find-a-job'], { 
      queryParams: { 
        search: this.searchTerm,
        triggerSearch: 'true'
      } 
    });
  }
  
}