import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpServService {

  apiUrl:string =environment.apiUrl;
  token: any = '';
  isexpired: boolean = false;
  decodedToken: any;
  expirationDate: any;
  helper = new JwtHelperService();
  constructor( public router: Router, public http: HttpClient,) { }

  setHttpOptionsNoToken() : {headers: HttpHeaders} {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  }

  setHttpOptions() : {headers: HttpHeaders} {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      })
    };
  }


  setGetHttpOptions() : {headers: HttpHeaders} {
    const httpOpt:any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      }),
      observe: 'response' as 'response'
    };
    return httpOpt
  }

  isLoggedIn(): boolean {
    if (!localStorage.getItem('access_token')) {
      return false;
    } else {
      this.token = localStorage.getItem('access_token');
      this.decodedToken = this.helper.decodeToken(this.token);
      this.expirationDate = this.helper.getTokenExpirationDate(this.token);
      this.isexpired = this.helper.isTokenExpired(this.token);
      return !this.isexpired;
    }
  }

  handleError(error: HttpErrorResponse) {
    let message = '';
    if (error.error instanceof ErrorEvent)  {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      message = error.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error?.errorMessage}`);
      if (error.error?.errorMessage === 'Token is Expired') {
        this.router.navigate(['/login']);
      }
      message = error.error;
    }
    // return an observable with a user-facing error message
    return throwError(message);
  }
}
