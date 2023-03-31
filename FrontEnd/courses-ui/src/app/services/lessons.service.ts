import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './heplper';

@Injectable({
  providedIn: 'root',
})
export class LessonsService {
  constructor(private _http: HttpClient) {}
  // get all
  public lessonss() {
    return this._http.get(`${baseUrl}/lessons/`);
  }
  // get sing
  public lesson(lessonsId:number) {
    return this._http.get(`${baseUrl}/lessons/${lessonsId}`);
  }
  // add
  public addlessons(lessons: any) {
    return this._http.post(`${baseUrl}/lessons/`, lessons);
  }
  // lessonsOfCoursea
  public lessonsOfCoursea(courseaId: any) {
    return this._http.get(`${baseUrl}/lessons/coursea/${courseaId}`);
  }
  //delete
  public deleteLesson(lessonsId:number){
    return this._http.delete(`${baseUrl}/lessons/${lessonsId}`);
  }
  public updateLesson(lessons:any){
    return this._http.put(`${baseUrl}/lessons/`, lessons);
  }
}
