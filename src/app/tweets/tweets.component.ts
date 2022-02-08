import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit {

  constructor(
    private tokenStorage:TokenStorageService,
    private router:Router
  ) { }
  names:String[]=["sarayu","lathika","rm","suga","v","jhope","jimin","kookie","jin"];
  replyList:String[]=["r1","r2","r3","r4"];
  text1:String="Hello!";
  text2:String="Welcome to tweetApp!";
  userName:String="User1"
  showReplies:boolean=false;
  likes=0;
  isLoggedIn:boolean=false;

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }
  public replies(){
    this.showReplies=!this.showReplies;
  }
  like(){
    this.likes+=1;
  }
  checkNavigate(){
    this.router.navigate(['/home']);
  }
}
