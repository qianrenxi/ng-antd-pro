import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeApiService {

  constructor(private httpClient: HttpClient) { }

  getFakeList(params?: any): Observable<any> {
    return this.httpClient.get('/api/fake', {params: params});
  }
  getNotices(): Observable<any> {
    return this.httpClient.get('/api/notice');
  }
  getActivities(): Observable<any> {
    return this.httpClient.get('/api/activities');
  }
}
