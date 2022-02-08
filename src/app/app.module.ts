import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtAuthComponent } from './jwt-auth/jwt-auth.component';
import { JwtAuthService } from './services/jwt-auth.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { authInterceptorProviders } from './services/auth-interceptor.service';
import { TweetsComponent } from './tweets/tweets.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  { path: 'login', component: LoginComponent },
  {path:'tweets',component:TweetsComponent},
  {path:"*",component:HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    JwtAuthComponent,
    LoginComponent,
    HomeComponent,
    TweetsComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  exports: [RouterModule],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
