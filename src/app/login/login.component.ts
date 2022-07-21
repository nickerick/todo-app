import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../user';
import  UserList from '../../assets/userlist.json';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private router: Router, private cookieService: CookieService, private apiService: ApiService) { 
    this.logins = UserList.users;
  }

  ngOnInit(): void {
    console.log(this.logins);
  }

  logins: User[];
  userName: string = "";
  passWord: string = "";
  ifLogin: boolean = false;
  showInvalid: boolean = false;
  checkUser: User | undefined;

  tryLogin() {
    this.apiService.getUser(String(this.userName))
      .subscribe((data: any) => {this.checkUser = data[0]; this.checkCredentials();});
  }

  checkCredentials() {
    if (this.checkUser?.password === this.passWord){
      this.ifLogin = true;
      this.cookieService.set('loggedIn', 'true');
      this.router.navigate(['/home', this.userName]);
    }

    if (!this.ifLogin) {
      this.showInvalid = true;
    }
  }

}
