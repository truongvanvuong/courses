import { Component, OnInit } from '@angular/core';
import { CourseaService } from 'src/app/services/coursea.service';
import { SubcourseService } from 'src/app/services/subcourse.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  courseas:any[]=[];
  subcourseItemCounts: {[courseId: number]: number} = {}; // biến tạm để lưu trữ số lượng người đăng ký

  constructor(
    private _coursea: CourseaService,
    private _subcourse: SubcourseService
  ) {}

  ngOnInit(): void {
    this._coursea.courseas().subscribe(
      (data:any) => {
        this.courseas = data;
        for (let coursea of this.courseas) {
          this._subcourse.subscribedCourseaItem(coursea.id).subscribe((data:any) => {
            this.subcourseItemCounts[coursea.id] = data.length;
            console.log(this.subcourseItemCounts);
          }, error => console.log(error))
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getCountSubcourseItems(courseId: number) {
    return this.subcourseItemCounts[courseId] || 0;
  }
}
