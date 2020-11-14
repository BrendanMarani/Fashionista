import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import { User } from '../entities/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) {

  }

  public $user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  getLogin(credential){
    return this.http.post(`${environment.api_url}/api/login`, credential);
  }

  getUsers() {
    return this.http.get<User[]>(`${environment.api_url}/api/user`);
  }
}
