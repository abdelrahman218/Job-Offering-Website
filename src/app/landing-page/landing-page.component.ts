import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink , Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink,FormsModule,RouterModule,CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
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

  constructor(private router: Router) {}
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