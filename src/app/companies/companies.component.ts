import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet, NavigationEnd,Router,Event } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
})
export class CompaniesComponent {}

