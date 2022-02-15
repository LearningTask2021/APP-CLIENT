import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user';
import { TokenStorageService } from './token-storage.service';
import { pipe,of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'
import { Tweets } from '../models/tweets';




const AUTH_API="http://localhost:8080/api/v1.0/tweets/";



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
    private router:Router
  ) { }

  jwtAuthRequest(){
    let headers=new HttpHeaders(
      {
        'Content-Type':  'application/json'
      }
    );
    headers=headers.append("Anonymous","anonymous");
    headers=headers.append("produces","application/json");
    headers=headers.append("consumes","application/json");
    return this.http.post<String>("http://localhost:8080/authenticate",this.authRequest,{ headers, responseType: 'text' as 'json' })
    .pipe(
      // here we can stop the error being thrown for certain error responses
      catchError(err => {
        console.log(err)
        this.handleServerError(err)
        return ''
      })
    )
  }

  

  getAllUsers():Observable<User[]>{
    let headers=new HttpHeaders(
      {
        'Content-Type':  'application/json'
      })
      return this.http.get<User[]>("http://localhost:8080/api/v1.0/tweets/users/all",{headers})
  }

  likeATweet(userId,tweetId){
    let headers=new HttpHeaders(
      {
        'Content-Type':  'application/json'
      })
      return this.http.put<Tweets[]>("http://localhost:8080/api/v1.0/tweets/"+userId+"/like/"+tweetId,{headers})
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
      return this.http.get(AUTH_API + 'login',{headers,params});
  } 
  logout(){
    this.tokenStorageService.signOut();
   
  }
  handleServerError(err){
    if(err.status==0){
      console.log("inside 0 error handler")
      this.router.navigate(["../error"])
    }
    if (err.status == 404) return of(null)
    else throwError(err)
  }

}
