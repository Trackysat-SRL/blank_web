import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { HelperService } from 'src/app/services/helper/helper.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  username: string = "";
  password: string = "";
  hide: boolean = true;
  loading: boolean = false;

  constructor(private authService: AuthenticationService,private helper:HelperService, private userService: UserService) {}

  ngOnInit(): void {
    localStorage.removeItem('profile');
    localStorage.removeItem('access_token');
  }

  login(){
    this.loading = true;
    if (!this.password) { return; }
    const body = {
      username: this.username,
      password: this.password,
      rememberMe:false
    };
    this.authService.login(body).subscribe(response => {
      this.authService.setUser(response);
      this.getUserDetails();
    }, error => {
      this.loading = false;
      this.helper.openSnackBar('Nome utente o password non corretti', 'ok', 'center','top','error');
      localStorage.removeItem('bt_access_token');
      console.error('Error => ', error);
    });
  }

  getUserDetails(): void {
    this.userService.getUser().subscribe(res => {
      this.loading = false;
      this.authService.setProfile(res);
      this.helper.openSnackBar('Login effettuato con successo', 'ok', 'center','top','success');
      console.log('User details => ', res);
    }, error => {
      this.loading = false;
      this.helper.openSnackBar(error.type, 'ok', 'center','top','error');
      console.error('Error => ', error);
    });
  }
}
