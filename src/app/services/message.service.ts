import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  getMessages(){
    return this.http.get(`${ environment.URLApi }/api/messages`);
  }

  sendMessage(body: string){

    const token = String(localStorage.getItem('token'));

    const headers = new HttpHeaders().set("Authorization", token)

    
    
    return this.http.post(`${ environment.URLApi }/api/messages`, {
      body: body
    }, { headers })

  }

}
