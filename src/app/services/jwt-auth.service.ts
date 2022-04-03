import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user';
import { TokenStorageService } from './token-storage.service';
import { pipe,of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'
import { Tweets } from '../models/tweets';
//import { DatePipe } from '@angular/common';
import {formatDate} from '@angular/common';





const AUTH_API="http://localhost:8090/TWEET-SERVICE/api/v1.0/tweets/";
const LOGIN_API="http://localhost:8090/LOGIN-SERVICE/api/v1.0/tweets/";
const JWT_API="http://localhost:8090/TWEET-SERVICE/authenticate";

@Injectable({
  providedIn: 'root'
})
export class JwtAuthService {
  

  authRequest:any={
    "username":"tweetUser",
    "password":"dummy"
  };

  constructor(
    private http:HttpClient,
    private tokenStorageService:TokenStorageService,
    private router:Router,
    //private datepipe:DatePipe
  ) { }

  jwtAuthRequest(){
    let headers=new HttpHeaders(
      {
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin':'*'
      }
    );
    headers=headers.append("Anonymous","anonymous");
    headers=headers.append("produces","application/json");
    headers=headers.append("consumes","application/json");
    return this.http.post<String>(JWT_API,this.authRequest,{ headers, responseType: 'text' as 'json' })
    .pipe(
      // here we can stop the error being thrown for certain error responses
      catchError(err => {
        console.log(err)
        this.handleServerError(err)
        return ''
      })
    )
  }

  registerNewUser(user){
    let token:string
    let headers=new HttpHeaders(
      {
        'Content-Type':  'application/json'
      })
     
      return this.http.post(AUTH_API+'register',user,{headers,responseType: 'text' as 'json'})
  }

  getAllUsers():Observable<User[]>{
    let headers=new HttpHeaders(
      {
        'Content-Type':  'application/json'
      })
      return this.http.get<User[]>(AUTH_API+"users/all",{headers})
  }

  likeATweet(userId,tweetId){
    let headers=new HttpHeaders(
      {
        'Content-Type':  'application/json'
      })
      return this.http.put<Tweets[]>(AUTH_API+userId+"/like/"+tweetId,{headers})
  }
  
  login(credentials): Observable<any> {
    let params=new HttpParams();
    params=params.append("userId",credentials.username);
    params=params.append("password",credentials.password);
    let token=this.tokenStorageService.getToken();
    let headers=new HttpHeaders(
      {
        //"Authorization":token,
        'Content-Type':  'application/json',
        //'produces':'application/json',
        //'consumes':'application/json'
      }); 
      headers=headers.append("Anonymous","anonymous");
      return this.http.get(LOGIN_API + 'login',{headers,params})
      .pipe(
        // here we can stop the error being thrown for certain error responses
        catchError(err => {
          console.log(err)
          this.handleServerError(err)
          return ''
        })
      );
  } 
  logout(){
    this.tokenStorageService.signOut();
   
  }
  changePassword(newPassword){
    let userId=this.tokenStorageService.getUser().userId;
   return  this.http.post(AUTH_API+userId+'/forgot',newPassword)
  }

postATweet(tweetText){
  let userId=this.tokenStorageService.getUser().userId;
  let headers=new HttpHeaders(
    {
      'Content-Type':  'application/json'
    })
 // let date=new Date();
  //date=this.datepipe.transform(new Date(),'dd-MM-yyyy')
  var myDate = new Date();
  var varID = myDate.getHours() + "" + myDate.getMinutes() + "" + myDate.getSeconds() + "" + myDate.getMilliseconds();
  varID = varID.substring(0, 10);
  let tweet: Tweets=new Tweets(varID,'',formatDate(new Date(),'dd/MM/yyyy', 'en'),0,'',[])
  tweet.tweetText=tweetText
  console.log(tweet);
  return this.http.post(AUTH_API+userId+'/add',tweet,{responseType: 'text' as 'json'});
}

replyTweet(replyText,t){
  let userId=this.tokenStorageService.getUser().userId;
  let tweet: Tweets=new Tweets('','',formatDate(new Date(),'dd/MM/yyyy', 'en'),0,'',[])
  tweet.tweetText=replyText
  console.log(tweet);
  return this.http.post(AUTH_API+userId+'/reply/'+t.tweetId,tweet,{responseType: 'text' as 'json'});
}

  handleServerError(err){
    if(err.status==500){
      console.log("Inside 500 http server error");
      console.log(err.error)
      alert("Tweet length must be between 1 and 144")
    }
    if(err.status==400){
      console.log("Inside handling 400 error")
      alert(err.error)
    }
    if(err.status==0){
      console.log("inside 0 error handler")
      this.router.navigate(["../error","serverError","Please try again after sometime."])
    }
    if(err.status==401){
      console.log("inside 401 error handler");
     // alert("Wrong userId or password")
      this.router.navigate(["../login"])
     // this.router.navigate(["../error","Unauthorised","Make sure loginId and password are correct."]);
    }
    if (err.status == 404) return of(null)
    else throwError(err)
  }

deleteTweet(userId,tweetId){
  return this.http.delete(AUTH_API+userId+'/delete/'+tweetId,{responseType: 'text' as 'json'});
}

updateTweet(tweetId,tweetText){
let userId=this.tokenStorageService.getUser().userId;
  let tweet: Tweets=new Tweets('','',formatDate(new Date(),'dd/MM/yyyy', 'en'),0,'',[])
  tweet.tweetText=tweetText
  console.log(tweet);
  return this.http.put(AUTH_API+userId+'/update/'+tweetId,tweet,{responseType: 'text' as 'json'});
}

}
