import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RuleApiService {

  constructor(private httpClient: HttpClient) { }

  getRules(): Observable<any> {
    return this.httpClient.get('/api/rule');
  }
}
