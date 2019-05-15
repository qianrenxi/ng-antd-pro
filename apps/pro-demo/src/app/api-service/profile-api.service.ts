import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileApiService {

  constructor(private httpClient: HttpClient) { }

  getBasicData(): Observable<any> {
    return this.httpClient.get("/api/profile/basic");
  }

  getAdvancedData(): Observable<any> {
    return this.httpClient.get("/api/profile/advanced");
  }
}
