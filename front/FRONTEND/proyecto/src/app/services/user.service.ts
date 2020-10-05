import { User } from './../classes/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {




  private URLbase = 'http://localhost:3000/login';
  constructor(private hhtpcliente: HttpClient) { }

  login(user: User): Observable<{ token: string }> {

    return this.hhtpcliente.post<{ token: string }>(this.URLbase, user);


  }

  checkauthen(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    return false;
  }

}
