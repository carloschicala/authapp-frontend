
import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  //styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public nombre = "ANA";

  miFormulario: FormGroup = this.fb.group({
    email: ['admin@admin.com', [ Validators.required, Validators.email]],
    password: ['1234', [Validators.required, Validators.minLength(4) ]]
  });

  constructor( private fb: FormBuilder,
              private router: Router,
              private AuthService: AuthService,
              private storage: StorageService
              ) {}

login() {
  console.log(this.miFormulario.value);

  const { email, password } = this.miFormulario.value;
  this.AuthService.login(email, password).subscribe(
    (info: any) => {

      console.log(info);
      localStorage.setItem('token', info.token );
      localStorage.setItem('user', JSON.stringify(info.user) );

      
      console.log("Obteniendo token", localStorage.getItem('token'));
      console.log("Obteniendo user", JSON.parse(localStorage.getItem('user') || "").name );


      this.router.navigateByUrl('/dashboard')

    },
    fallo => {
      console.log(fallo)
      alert(fallo.error.msg)
    }
  )
  
  //console.log(this.miFormulario.valid);
  
} 

}
