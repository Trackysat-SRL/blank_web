import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, retry } from 'rxjs';
import { HttpServService } from '../http-serv.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends HttpServService {

  constructor(router: Router,
    http: HttpClient) {
    super(router, http);
  }


  // Verify user credentials on server to get token
  login(data: any): Observable<any> {
    return this.http
      .post<any>(this.apiUrl + 'authenticate', data, this.setHttpOptionsNoToken())
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  setUser(resp:any): any{
    // localStorage.setItem('or_profile', JSON.stringify(resp.profile));
    localStorage.setItem('access_token', resp.id_token);
  }

  setProfile(res: any): void{
    // res.companyDetailIds[0].maker.chainId.descrizione = 'Vino';
    localStorage.setItem('profile', JSON.stringify(res));
    this.checkRole(res);
  }

  checkRole(obj:any): void{
    if(obj.authorities.includes('ROLE_ADMIN')){
      console.log('ADMIN');
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/dashboard']);
      console.log('ruoli => ', obj.authorities);
    }
  }
}
