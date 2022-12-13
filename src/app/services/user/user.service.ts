import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, retry } from 'rxjs';
import { HttpServService } from '../http-serv.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpServService {

  constructor(router: Router,
    http: HttpClient) {
    super(router, http);
  }


  getUser(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'account', this.setHttpOptions())
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }
}
