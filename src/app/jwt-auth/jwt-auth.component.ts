import { Component, OnInit } from '@angular/core';
import { JwtAuthService } from '../services/jwt-auth.service';

@Component({
  selector: 'app-jwt-auth',
  templateUrl: './jwt-auth.component.html',
  styleUrls: ['./jwt-auth.component.css']
})
export class JwtAuthComponent implements OnInit {
  authRequest:any={
    "username":"tweetUser",
    "password":"dummy"
  };
  names:String[]=["sarayu","lathika","rm","suga","v","jhope","jimin","kookie","jin"];
  replyList:String[]=["r1","r2","r3","r4"];
  text1:String="Hello!";
  text2:String="Welcome to tweetApp!";
  userName:String="User1"
  showReplies:boolean=false;
  likes=0;

  constructor(private authService:JwtAuthService) { }

  ngOnInit(): void {
    this.getAccessToken(this.authRequest);
  }
  public getAccessToken(authRequest){
    let resp=this.authService.jwtAuthRequest();
    resp.subscribe(data=>{
      console.log(data)
      this.getWelcomeMessage(data);
    });
      }

      public getWelcomeMessage(token){
        console.log("Inside welcome message")
        let resp=this.authService.getWelcomeMessage(token);
        resp.subscribe(data=>{
          console.log(data);
          this.authService.getallUsers(token).subscribe(
            data=>console.log(data)
          );
        })

      }
      public replies(){
        this.showReplies=!this.showReplies;
      }
      like(){
        this.likes+=1;
      }

}
