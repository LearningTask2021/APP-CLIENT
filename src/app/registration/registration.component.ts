import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { JwtAuthService } from '../services/jwt-auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  myGroup: FormGroup;
  submitted = false;
  user:User
  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private infoService:JwtAuthService,
    private tokenstorageService:TokenStorageService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email:['', [Validators.email,Validators.required]],
      contactNumber:['',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      userId: new FormControl('', Validators.required),
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword:['',Validators.required]
      
    }
    ,{ 
      // here we attach our form validator
    
      validators:this.controlsEqual('confirmPassword', 'password')

    });
  }
  
 controlsEqual(
  controlName: string,
  equalToName: string,
  errorKey: string = controlName // here you can customize validation error key 
) {

  return (form: FormGroup) => {
    const control = form.get(controlName);
    if(form.get('password').dirty){
    if (control.value !== form.get(equalToName).value) {
      control.setErrors({ [errorKey]: true });
      return {
        [errorKey]: true
      }
    } else {
      control.setErrors(null);
      return null
    } 
  }
}
}

get f() { return this.form.controls; }

cancel(){
  alert("Do you want to leave?Changesyou have made will not be saved");

  this.router.navigate(['/home'])
 
}
onSubmit(){
   let token:string
  this.submitted = true;
  console.log(this.form.controls.STATUS);
  if(this.form.valid){
    console.log(this.form.value)
    this.user=Object.assign({},this.form.value);
    console.log(this.user)
    this.infoService.jwtAuthRequest().subscribe(
      data=>{
        data = data.replace("{\"token\":\"", "");
      data = data.replace("\"}", "");
      console.log(data)
      data='Bearer '+data;
      console.log(data);
      this.tokenstorageService.saveToken(data.toString());
      //token=this.tokenstorageService.getToken()
      })
    this.infoService.registerNewUser(this.user).subscribe(
      data=>{
        alert("Registered succcessfully!")
        this.form.reset();
        this.router.navigate(['../home'])
        //this.tokenstorageService.signOut()
      },
      err=>{
        console.log(err.error)
        this.infoService.handleServerError(err)
      }
    )
  }
}

}
