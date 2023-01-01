import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { AuthService } from '../../auth/services/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
    `
    * {
      margin: 15px;
    }
    `
    ]
})
export class DashboardComponent {

  name: string = "";
  lastname: string = "";
  messages: any;

  miFormulario: FormGroup = this.fb.group({
    body: ['', [ Validators.required]],
  });

  constructor( private router: Router,
    private fb: FormBuilder,
      private msgService: MessageService
    ) {

    this.name = JSON.parse(localStorage.getItem('user') || "").name
    this.lastname = JSON.parse(localStorage.getItem('user') || "").lastname
    
    this.getAllMessages();
  
  }

  public getAllMessages(){
    
    this.msgService.getMessages().subscribe(
      messages => {
        console.log(messages);
        this.messages = messages;
      }
    )

  }

  logout() {
    this.router.navigateByUrl('/auth');
  }

  sendMessage(){
    
    
  const { body } = this.miFormulario.value;


    this.msgService.sendMessage(body).subscribe(
      (data: any) => {
        location.reload();
      },
      err => {
        alert(err.error.errors[0].msg)
      }
    )

  }
  
}
