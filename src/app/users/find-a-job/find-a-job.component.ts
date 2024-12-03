import { Component, inject,OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('filterComponent') FiltersComponent !: FiltersComponent;
  constructor(private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.filteredPosts = this.posts;
    this.searchedPosts=this.filteredPosts;
    window.scrollTo(0, 0);
    this.route.queryParams.subscribe(params => {
      this.searchText = params['search'] || '';
      if (this.searchText) {
        this.performSearch();
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
  ngAfterViewInit() {
    console.log(this.categoryId);
    if (this.categoryId) {
      this.triggerCategoryFilter(this.categoryId, this.categoryName);
    }
  }
  triggerCategoryFilter(categoryId: string,categoryName:string) {
    this.FiltersComponent.openCategoryDropdown(categoryId);
    this.FiltersComponent.checkCategoryCheckbox(categoryName);
    this.filter();
  }
  takeit(selected:{ [key: string]: string[] }){
    this.selectedFilters=selected;
  }
  
  public filteredPosts!:posts[];
  filter(){
    if(!this.selectedFilters['workplace'].length&&!this.selectedFilters['careerLevel'].length&&!this.selectedFilters['location'].length){
      this.filteredPosts=this.posts;
      this.performSearch();
      return;
    }
    this.filteredPosts=this.posts.filter((post)=>{
      return((this.selectedFilters['workplace'].includes(post.workplace)||!this.selectedFilters['workplace'].length)&&(this.selectedFilters['careerLevel'].includes(post.careerLevel)||!this.selectedFilters['careerLevel'].length)&&(this.selectedFilters['location'].includes(post.location)||!this.selectedFilters['location'].length));
    });
    this.performSearch();
  }
  searchedPosts: posts[] = [];
  searchText: string = '';
  performSearch() {
    if (!this.searchText.trim()) {
      this.searchedPosts = this.filteredPosts;
      return;
    }
    const searchLower = this.searchText.toLowerCase();
    this.searchedPosts = this.filteredPosts.filter(post =>
      this.checkSubstring(post.jobTitle, searchLower) ||
      this.checkSubstring(post.jobDescription, searchLower) ||
      this.checkSubstring(post.jobRequirements, searchLower) ||
      this.checkSubstring(post.location, searchLower) ||
      this.checkSubstring(post.workplace, searchLower) ||
      this.checkSubstring(post.careerLevel, searchLower) ||
      this.checkSubstring(post.companyName, searchLower)
    );
  }
  private checkSubstring(value: string, searchText: string): boolean {
    return value.toLowerCase().includes(searchText);
  }
}