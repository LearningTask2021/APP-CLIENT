import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tweets } from '../models/tweets';
import { User } from '../models/user';
import { JwtAuthService } from '../services/jwt-auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit {
tweetText:String;
replyText:String;
  constructor(
    private tokenStorage:TokenStorageService,
    private getInfoService:JwtAuthService,
    private router:Router
  ) { }
  names:String[]=["sarayu","lathika","rm","suga","v","jhope","jimin","kookie","jin"]
  users:User[]=[];
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
      console.log(this.tokenStorage.getUser())
      this.userName=this.tokenStorage.getUser().userId
    }
    this.getAllUsers();
  }
  public replies(t){
    console.log("Inside showing replies");
    console.log(t.showReplies);
    //this.showReplies=!this.showReplies;
    t.showReplies=!t.showReplies;
    console.log(t.showReplies);
    console.log(t.replies);
  }
  like(u,t){
    //this.likes+=1;
    this.getInfoService.likeATweet(u.userId,t.tweetId).subscribe(
      data=>console.log(data)
    )
    //this.router.navigate([this.router.url])
    //window.location.reload();
    this.ngOnInit()
  }
  addReply(t){
    console.log(t.addReply)
    t.addReply=!t.addReply;
    console.log(t.addReply)
    
  }
 reply(t){
   
   console.log(this.replyText)
   this.getInfoService.replyTweet(this.replyText,t).subscribe(
     data=>{
     console.log("data")
     alert("posted reply")
     t.addReply=!t.addReply
     this.ngOnInit()
     },
     err=>{
      this.getInfoService.handleServerError(err)
    }
   )
 }
  

  getAllUsers(){
    //let users:User[]=[]
    this.getInfoService.getAllUsers().subscribe(
      (data)=>{
        console.log(data)
       this.users=data
       console.log(this.users)
        }
      )
      }

  postTweet(){
    console.log(this.tweetText);
    this.getInfoService.postATweet(this.tweetText).subscribe(
      data=>{
        console.log(data);
        alert("posted tweet!");
        this.tweetText=null;
      },
      err=>{
        this.getInfoService.handleServerError(err)
      }
    )
  }
    }
