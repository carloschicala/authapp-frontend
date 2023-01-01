import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  //styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  miFormulario: FormGroup = this.fb.group({
    name: ['Carlos', [ Validators.required, Validators.minLength(3)]],
    lastname: ['Chicala', [ Validators.required, Validators.minLength(3)]],
    email: ['test2@test.com', [ Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(4) ]]
  });

  
  constructor(private fb: FormBuilder,
              private router: Router,
              private AuthService: AuthService
              ) { }

  registro() {
    console.log(this.miFormulario.value);

    const { email, name, lastname, password } = this.miFormulario.value;
    
    //console.log(this.miFormulario.valid);

    this.AuthService.register(email, name, lastname, password).subscribe(
      data => {
        console.log(data)
        this.router.navigateByUrl('/login')
      },
      err => {
        console.log(err)
        const msg = err.error.errors[0].msg;
        alert(msg);
      }
    )

  
    //this.router.navigateByUrl('/dashboard')
  } 

  

}
