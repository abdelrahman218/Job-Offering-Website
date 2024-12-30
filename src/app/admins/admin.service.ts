import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../app.model';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private apiUrl = '/api/admin'; // Base URL for admin-related endpoints (replace with actual URL)

  constructor(private http: HttpClient) {}

  // Admin related methods
  addAdmin(adminData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addAdmin`, adminData);
  }

  updateAdmin(adminId: string, adminData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${adminId}`, adminData);
  }

  // User related methods
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  updateUserStatus(userId: string, status: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/${userId}/status`, { isBlocked: status });
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users/${userId}`);
  }

  // Company related methods
  getAllCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.apiUrl}/companies`); 
  }

  getPendingCompanies(): Observable<Company[]> {
    return this.http.get<any[]>(`${this.apiUrl}/companies/pending`);
  }

  approveCompany(companyId: string): Observable<Company> {
    return this.http.put<any>(`${this.apiUrl}/companies/${companyId}/approve`, {});
  }

  rejectCompany(companyId: string): Observable<Company> {
    return this.http.put<any>(`${this.apiUrl}/companies/${companyId}/reject`, {});
  }

  updateCompany(companyId: string, companyData: any): Observable<Company> {
    return this.http.put<any>(`${this.apiUrl}/companies/${companyId}`, companyData);
  }

  deleteCompany(companyId: string): Observable<Company> {
    return this.http.delete<any>(`${this.apiUrl}/companies/${companyId}`);
  }
}