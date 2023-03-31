import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './heplper';
import { User } from '../user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public addUser(user: any) {
    return this.http.post(`${baseUrl}/user/`, user);
  }
  public getUser(userId: any) {
    return this.http.get(`${baseUrl}/user/${userId}`);
  }

  public updateUser(user: any) {
    return this.http.put(`${baseUrl}/user/`, user);
  }

  loginUser(user: User): Observable<any> {
    return this.http.post(`${baseUrl}/user/login`, user);
  }

  public isLoggedInUser() {
    let token = localStorage.getItem('tokenUser');
    if (token == undefined || token == null || token == '') {
      return false;
    }
    return true;
  }

  public logOutUser() {
    localStorage.removeItem('userID');
    localStorage.removeItem('tokenUser');
    return true;
  }
}
