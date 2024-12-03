import { Component, inject, signal, Signal ,OnInit, ViewChild  } from '@angular/core';
import { FiltersComponent } from './filters/filters.component';
import { CardComponent } from './card/card.component';
import { AppService } from '../../app.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { posts } from '../../app.model';
@Component({
  selector: 'app-find-a-job',
  standalone: true,
  imports: [FiltersComponent,CardComponent,FormsModule],
  templateUrl: './find-a-job.component.html',
  styleUrl: './find-a-job.component.css'
})
export class FindAJobComponent implements OnInit {
  private appService=inject(AppService);
  public selectedFilters:{ [key: string]: string[] }={
    'workplace': [],
    'location': [],
    'careerLevel': []
  };
  isVisible=false;
  private categoryId!: string;
  private categoryName!: string;
  public posts =[
    {careerLevel:'Internship',companyName:'BUE',jobDescription:"lorem ipsum",jobRequirements:"lmao oh yeah xD wow",workplace:'Remote',location:'Giza',jobCategory:'Full-time' ,jobTitle:"OW",id:1},
    {careerLevel:"Experienced",companyName:'MIU',jobDescription:"IT job description abcdefghijklmnopqrstuvwxyzlmao",jobRequirements:"lmao oh yeah xD wowweeeeeeeeeeeeeeeeeeeeeeeeeee",workplace:'Hybrid',location:'Cairo',jobCategory:'Full-time' ,jobTitle:"SWE",id:2},
    {careerLevel:"Manager",companyName:'MUST',jobDescription:"IT job description abcdefghijklmnopqrstuvwxyzohyeah",jobRequirements:"lmao oh yeah xD wowabc",workplace:'On-site',location:'Alexandria',jobCategory:'Full-time',jobTitle:"WOW",id:3 }
  ];
  
  OnToggle(){
    this.isVisible=!this.isVisible;
  }
  userType=this.appService.userTypeSignal.asReadonly();
  searchTerm: string = '';
  @ViewChild('filterComponent') FiltersComponent !: FiltersComponent;
  constructor(private route: ActivatedRoute) {}
  
  ngOnInit() {
    window.scrollTo(0, 0);
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['search'] || '';
      if (this.searchTerm) {
        this.onSearchClick();
      }
    });
    this.route.queryParams.subscribe(params => {
      if (params['triggerCategory'] === 'true') {
        this.categoryId = params['categoryID'];
        this.categoryName = params['categoryName'];
      }
    });
    this.filter();
  }
  onSearchClick() { 
    // Your existing search logic
    console.log('Searching for:', this.searchTerm);
  }
  ngAfterViewInit() {
    console.log(this.categoryId);
    if (this.categoryId) {
      this.triggerCategoryFilter(this.categoryId, this.categoryName);
    }
  }
  triggerCategoryFilter(categoryId: string,categoryName:string) {
    this.FiltersComponent.openCategoryDropdown(categoryId);
    this.FiltersComponent.checkCategoryCheckbox(categoryName);
  }
  takeit(selected:{ [key: string]: string[] }){
    this.selectedFilters=selected;
  }
  
  public filteredPosts!:posts[];
  filter(){
    if(!this.selectedFilters['workplace'].length&&!this.selectedFilters['careerLevel'].length&&!this.selectedFilters['location'].length){
      this.filteredPosts=this.posts;
      return;
    }
    this.filteredPosts=this.posts.filter((post)=>{
      return((this.selectedFilters['workplace'].includes(post.workplace)||!this.selectedFilters['workplace'].length)&&(this.selectedFilters['careerLevel'].includes(post.careerLevel)||!this.selectedFilters['careerLevel'].length)&&(this.selectedFilters['location'].includes(post.location)||!this.selectedFilters['location'].length));
    });
    console.log(this.filteredPosts);
  }
}