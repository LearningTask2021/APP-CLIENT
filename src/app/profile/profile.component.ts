import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { JwtAuthService } from '../services/jwt-auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  users: User[];
  shouldChange: boolean = false;
  userName: String;
  showReplies: boolean = false;
  form: any = {};
  constructor(
    private authService: JwtAuthService,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.userName = this.tokenStorageService.getUser().userId;
    console.log(this.userName);
    this.getAllUsers();
  }
  changePassword() {
    this.shouldChange = !this.shouldChange;
    //console.log("Inside change password")
  }
  onSubmit(): void {
    console.log("Inside changing passowrd");
    if (this.form.newPassword != this.form.confirmPassword) {
      alert("new password and confirm password should match");
    }
    else {
      this.authService.changePassword(this.form.newPassword).subscribe(
        data => {
          console.log(data)
          alert("changed password");
          this.shouldChange = !this.shouldChange
        }
      )
    }
  }
  getAllUsers() {
    //let users:User[]=[]
    this.authService.getAllUsers().subscribe(
      (data) => {
        console.log(data)
        this.users = data
        console.log(this.users)
      }
    )
  }
  public replies(t) {
    console.log("Inside showing replies");
    console.log(t.showReplies);
    //this.showReplies=!this.showReplies;
    t.showReplies = !t.showReplies;
    console.log(t.showReplies);
    console.log(t.replies);
  }
delete(t){
  console.log(t.tweetText);
  this.authService.deleteTweet(this.userName,t.tweetId).subscribe(
    data=>{
      console.log(data);
      alert("deleted tweet!");
      this.ngOnInit();
    }
  )
}

}

