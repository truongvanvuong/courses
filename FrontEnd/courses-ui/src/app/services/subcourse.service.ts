import { Injectable } from '@angular/core';
import baseUrl from './heplper';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubcourseService {

  constructor( private http :HttpClient) { }

  public addUSubCourse(SubCoursea: any) {
    return this.http.post(`${baseUrl}/subcourse/`, SubCoursea);
  }
  //load all the subcouresa
  public subCoursesAll(){
    return this.http.get(`${baseUrl}/subcourse/`);
  }
  //get subcourse of user
  subscribedCoursea(userID: any) {
    return this.http.get(`${baseUrl}/subcourse/${userID}`);
  }
  //get each subcourse 
  subscribedCourseaItem(courseID: number) {
    return this.http.get(`${baseUrl}/subcourse/courseitem/${courseID}`);
  }

  checkSubscribed(courseId: any, userId: any): Observable<boolean> {
    return this.http.get<boolean>(`${baseUrl}/subcourse/${courseId}/${userId}`);
  }
}
