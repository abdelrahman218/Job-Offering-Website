import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FiltersComponent } from './filters/filters.component';
import { CardComponent } from './card/card.component';
import { AppService } from '../../app.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Company, posts } from '../../app.model';
import { CompaniesService } from '../../companies/companies.service';

@Component({
  selector: 'app-find-a-job',
  standalone: true,
  imports: [FiltersComponent, CardComponent, FormsModule],
  templateUrl: './find-a-job.component.html',
  styleUrl: './find-a-job.component.css'
})
export class FindAJobComponent implements OnInit {
  private appService = inject(AppService);
  public selectedFilters: { [key: string]: string[] } = {
    'workplace': [],
    'location': [],
    'careerLevel': []
  };
  
  isVisible = false;
  private categoryId!: string;
  private categoryName!: string;
  
  public posts: posts[] = [];
  public Companies: Company[] = [];
  public filteredPosts: posts[] = [];
  public searchedPosts: posts[] = [];
  public searchText: string = '';
  public searchTerm: string = '';
  
  @ViewChild('filterComponent') FiltersComponent!: FiltersComponent;
  
  userType = this.appService.userTypeSignal.asReadonly();
  
  constructor(
    private route: ActivatedRoute,
    private companyService: CompaniesService
  ) {}
  
  ngOnInit() {
    // Subscribe to posts
    this.companyService.getCompanies();
    this.companyService.CompaniesSubject.subscribe(Companies => {
      this.Companies = Companies;
      this.companyService.loadJobPosts();
    });
    this.companyService.jobPostsSubject.subscribe(posts => {
      this.posts = posts;
      for (let index = 0; index < this.posts.length; index++) {
        const element=this.posts[index];
        for (let i = 0; i < this.Companies.length; i++) {
          const a = this.Companies[i];
          if(a?.User?.Email===element.companyEmail){
            element.companyName=a.User.name;
            element.location=a.User.location;
          }
        }
      }
      console.log(this.filteredPosts);
      this.applyFiltersAndSearch();
    });
    window.scrollTo(0, 0);
    // Handle route parameters
    this.route.queryParams.subscribe(params => {
      this.searchText = params['search'] || '';
      if (this.searchText) {
        this.applyFiltersAndSearch();
      }
      
      if (params['triggerCategory'] === 'true') {
        this.categoryId = params['categoryID'];
        this.categoryName = params['categoryName'];
      }
    });
  }

  ngAfterViewInit() {
    if (this.categoryId) {
      this.triggerCategoryFilter(this.categoryId, this.categoryName);
    }
  }

  OnToggle() {
    this.isVisible = !this.isVisible;
  }

  takeit(selected: { [key: string]: string[] }) {
    this.selectedFilters = selected;
    this.applyFiltersAndSearch();
  }

  triggerCategoryFilter(categoryId: string, categoryName: string) {
    this.FiltersComponent.openCategoryDropdown(categoryId);
    this.FiltersComponent.checkCategoryCheckbox(categoryName);
    this.applyFiltersAndSearch();
  }

  private applyFiltersAndSearch() {
    this.filter();
    this.performSearch();
  }

  filter() {
    if (!this.selectedFilters['workplace'].length && 
        !this.selectedFilters['careerLevel'].length && 
        !this.selectedFilters['location'].length) {
      this.filteredPosts = this.posts;
      return;
    }

    this.filteredPosts = this.posts.filter((post) => {
      return (
        (this.selectedFilters['workplace'].includes(post.workplace) || !this.selectedFilters['workplace'].length) &&
        (this.selectedFilters['careerLevel'].includes(post.careerLevel) || !this.selectedFilters['careerLevel'].length) &&
        (this.selectedFilters['location'].includes(post.location) || !this.selectedFilters['location'].length)
      );
    });
  }

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