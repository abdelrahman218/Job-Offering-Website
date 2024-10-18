import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private baseUrl = 'http://localhost:5000/api/companies';

  constructor(private http: HttpClient) {}

  createCompany(companyData: any): Observable<any> {
    return this.http.post(this.baseUrl, companyData);
  }

  getCompanies(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
}
