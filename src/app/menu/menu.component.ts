import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtAuthService } from '../services/jwt-auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLoggedIn:boolean=false;
  constructor(
    private authService:JwtAuthService,
    private tokenStorage:TokenStorageService,
    private router:Router
  ) { 
  }

  ngOnInit(): void {
    console.log("inside ngonit for menu component");
    console.log(this.isLoggedIn)
    if(this.tokenStorage.getUser()!=null){
      this.isLoggedIn=true;
      console.log(this.isLoggedIn)
    }
  }
  logout(){
  this.authService.logout();
  alert("Logged out successfully");
  this.router.navigate([''])
  console.log("routed to home");
 // window.location.reload();
  }
  
}
