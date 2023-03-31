import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './heplper';
import { Observable } from 'rxjs';
import { Coursea } from '../coursea';


@Injectable({
  providedIn: 'root'
})
export class CourseaService {
  baseUrl: any;
  constructor(private _http:HttpClient) { }
  //load all the couresa

  public courseas(){
    return this._http.get(`${baseUrl}/coursea/`);
  }
  //add coursea
  public addCoursea(couresa:object) {
    return this._http.post(`${baseUrl}/coursea/`,couresa);
  }
  // get cousea
  public coursea(courseaId:number){
    return this._http.get(`${baseUrl}/coursea/${courseaId}`);
  }
  //delete
  public deleteCousea(courseaId:number){
    return this._http.delete(`${baseUrl}/coursea/${courseaId}`);

  }
  //update
  public updateCousea(coursea:any){
    return this._http.put(`${baseUrl}/coursea/`, coursea);

  }
  // search courses
  searchCourses(keyvalue: string): Observable<Coursea[]> {
    const url = `${baseUrl}/coursea/search/${keyvalue}`;
    return this._http.get<Coursea[]>(url);
  }
}
