import { Component, inject, signal, Signal ,OnInit, ViewChild  } from '@angular/core';
import { FiltersComponent } from './filters/filters.component';
import { CardComponent } from './card/card.component';
import { UserType } from '../../app.model';
import { AppService } from '../../app.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-find-a-job',
  standalone: true,
  imports: [FiltersComponent,CardComponent,FormsModule],
  templateUrl: './find-a-job.component.html',
  styleUrl: './find-a-job.component.css'
})
export class FindAJobComponent implements OnInit {
  private appService=inject(AppService);
  isVisible=false;
  private categoryId!: string;
  private categoryName!: string;

  OnToggle(){
    this.isVisible=!this.isVisible;
  }
  userType=this.appService.userTypeSinal.asReadonly();
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
}