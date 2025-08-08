import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdVerificationService {
  private apiUrl = 'https://privacy.diokocash.com/api/submit-id-verification';

  constructor(private http: HttpClient) {}

  submitIDVerification(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.post(this.apiUrl, formData, { headers });
  }
} 