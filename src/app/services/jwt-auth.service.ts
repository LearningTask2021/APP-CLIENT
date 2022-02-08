import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { TokenStorageService } from './token-storage.service';


const AUTH_API="http://localhost:8080/api/v1.0/tweets/";


class User{
firstName:String;
lastName:String;
userId:String;
}
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
  }

  getWelcomeMessage(data){
    data = data.replace("{\"token\":\"", "");
  let  token = data.replace("\"}", "");
  console.log(token)
    let tokenStr='Bearer '+token;
    let headers=new HttpHeaders(
      {
        "Authorization":tokenStr,
        'Content-Type':  'application/json',
        'produces':'application/json',
        'consumes':'application/json'

      }
    )
    console.log("Inside welcome message method");
    return this.http.get<String>("http://localhost:8080/api/v1.0/tweets/welcome",{ headers, responseType: 'text' as 'json' })
  }
  getallUsers(data){
    console.log("Inside get all users");
    data = data.replace("{\"token\":\"", "");
  let  token = data.replace("\"}", "");
  console.log(token)

    let tokenStr='Bearer '+token;
    let headers=new HttpHeaders(
      {
        "Authorization":tokenStr,
        'Content-Type':  'application/json',
        'produces':'application/json',
        'consumes':'application/json'

      }
    )
    return this.http.get<User[]>("http://localhost:8080/api/v1.0/tweets/users/all",{ headers, responseType: 'text' as 'json' })
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

}
