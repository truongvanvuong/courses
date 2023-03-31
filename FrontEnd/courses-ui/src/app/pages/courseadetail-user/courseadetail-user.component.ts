import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseaService } from 'src/app/services/coursea.service';
import { LessonsService } from 'src/app/services/lessons.service';
import { SubcourseService } from 'src/app/services/subcourse.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-courseadetail-user',
  templateUrl: './courseadetail-user.component.html',
  styleUrls: ['./courseadetail-user.component.css'],
})
export class CourseadetailUserComponent implements OnInit {
  isSubscribed: boolean = false;
  counter: number = 0;
  coursea: any = [];
  lessonss: any = [];
  subCourse: any = {
    id: "",
    coursea: {
        id: ""
    },
    user: {
        id: ""
    }
  };
  id: any;
  isVisible = false;
  isConfirmLoading = false;
  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _coursea: CourseaService,
    private _lessons: LessonsService,
    public router: Router,
    private _subCourse: SubcourseService
  ) {}

  ngOnInit(): void {
    this.id = this._route.snapshot.params['id'];
    this._coursea.coursea(this.id).subscribe(
      (data: any) => {
        this.coursea = data;
      },
      (error) => {
        console.log(error);
      }
    );
    this._lessons.lessonsOfCoursea(this.id).subscribe(
      (data: any) => {
        this.lessonss = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  @ViewChild('myIframe') myIframe!: ElementRef<HTMLIFrameElement>;

  showModal1(): void {
    (<HTMLElement>document.querySelector('html')).classList.add('hideScroll');
    this.isVisible = true;
    setTimeout(() => {
      const iframe = this.myIframe?.nativeElement;
      iframe.src = this.lessonss[0].url;
    }, 500);
  }

  handleCancel(): void {
    (<HTMLElement>document.querySelector('html')).classList.remove(
      'hideScroll'
    );
    this.isVisible = false;
  }
  subHandle() {
    const userId = localStorage.getItem('userID');
    this.subCourse.coursea.id = this.coursea.id;
    this.subCourse.user.id = userId;
    if (this._userService.isLoggedInUser()) {
      this._subCourse.addUSubCourse(this.subCourse).subscribe(
        (data) => {
          this.subCourse = data;
          this.router.navigate(['/courseacontent/' + this.coursea.id]);
        },
        (error) => {
          console.log(error);
        }
      );
    } else this.router.navigate(['login']);
  }
}
