import { HTTP_INTERCEPTORS, HttpEvent, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { JwtAuthService } from './jwt-auth.service';
const TOKEN_HEADER_KEY = 'Authorization';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService,
    private http:HttpClient,
    private authService:JwtAuthService
    ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Intercepting request"+req);
    let authReq = req;
    if (req.headers.get('Anonymous') == "anonymous") {
      console.log("skipping interceptor");
      const newHeaders = req.headers.delete('Anonymous')
      const newRequest = req.clone({ headers: newHeaders });
      return next.handle(newRequest);
    } 
    
      const token = this.token.getToken();
      console.log(token+'from setting auth header in intercept method');
    if (token != null) {
      console.log("Inside setting authorisation header")
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
      console.log(authReq)
    }
      return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
