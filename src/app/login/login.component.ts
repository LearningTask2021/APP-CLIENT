import { Component, OnInit } from '@angular/core';
import { JwtAuthService } from '../services/jwt-auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(private authService: JwtAuthService, private tokenStorage: TokenStorageService,private router:Router) { }
  ngOnInit(): void {
    if (this.tokenStorage.getUser() && this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().userId;
    }
  }
  
  onSubmit(): void {
    let token:string;
    this.authService.jwtAuthRequest().subscribe(
      data=>{
        data = data.replace("{\"token\":\"", "");
      data = data.replace("\"}", "");
      console.log(data)
      data='Bearer '+data;
      console.log(data);
      this.tokenStorage.saveToken(data.toString());
        this.authService.login(this.form)
        .subscribe(
          data => {
            //this.tokenStorage.saveToken(token);
            this.tokenStorage.saveUser(data);
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.roles = this.tokenStorage.getUser().userId;
            alert("logged in succesfully!")
            this.router.navigate(['../tweets']);
          },
          err=>{
            console.log(this.isLoggedIn)
            this.isLoginFailed=true;
            this.isLoggedIn=false;
            this.authService.handleServerError(err)
          }
        );
      }
    );
}
    
  reloadPage(): void {
    window.location.reload();
  }
}