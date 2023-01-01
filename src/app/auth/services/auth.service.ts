import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) {}

  login(user: string, pass: string) {
    // Aca se hace toda la logica con backend del login 

    return this.http.post("http://localhost:3001/api/auth/login", {
        user: user,
        password: pass
    });

  }

  register(email: string, name: string, lastname: string, password: string){
    return this.http.post("http://localhost:3001/api/users", {
        email: email,
        password: password,
        name: name,
        lastname: lastname
    });
  }

}
