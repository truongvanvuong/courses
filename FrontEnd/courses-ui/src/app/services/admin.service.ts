import { Injectable } from '@angular/core';
import baseUrl from './heplper';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Admin } from '../admin';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) { }

  public getAdmin(adminId:any){
    return this.http.get(`${baseUrl}/admin/${adminId}`);
  }
  //add admin
  public addAdmin(admin: Admin) {
    return this.http.post(`${baseUrl}/admin/`, admin);
  }

  public updateAdmin(admin: any) {
    return this.http.put(`${baseUrl}/admin/`, admin);
  }

 public loginAdmin(adminData:Admin):Observable<any> {
    return this.http.post(`${baseUrl}/admin/login`, adminData)
  }

  public isLoggedIn(){
    let token = localStorage.getItem('token');
    if(token == undefined || token == null || token == ''){
      return false;
    }
    return true;
  }
  public logOut(){
    localStorage.removeItem('adminID');
    localStorage.removeItem('token');
    return true;
  }
}
