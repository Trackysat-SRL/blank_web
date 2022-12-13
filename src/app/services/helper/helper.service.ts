import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpServService } from '../http-serv.service';

@Injectable({
  providedIn: 'root'
})
export class HelperService extends HttpServService{
  profile: any;
  roles: string[] = [];
  languages: string[] = ['en','it'];
  constructor(router: Router,
    http: HttpClient,
    public snackBar: MatSnackBar) {
    super(router, http);
  }


  openSnackBar(message: string, action: string, horizontalPosition?:any, verticalPosition?:any, type?: string) {
    // types: success, error, info
    this.snackBar.open(message, action, {
      panelClass: [type + 'Bg'],
      duration: 3000,
      horizontalPosition,
      verticalPosition,
    });
  }

  getProfile(): any {
    if (localStorage.getItem('profile')){
      this.profile = localStorage.getItem('profile');
      this.profile = JSON.parse(this.profile);
    } else {
      delete this.profile;
    }
    return this.profile;
  }

  getRole(profile: any): string {
    if(profile.authorities.includes('ROLE_ADMIN')){
      return 'ROLE_ADMIN';
    } else if(profile.authorities.includes('ROLE_USER')){
      return 'ROLE_USER';
    }
    return '';
  }
}
