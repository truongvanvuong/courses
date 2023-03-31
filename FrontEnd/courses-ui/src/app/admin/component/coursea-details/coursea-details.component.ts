import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseaService } from 'src/app/services/coursea.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LessonsService } from 'src/app/services/lessons.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-coursea-details',
  templateUrl: './coursea-details.component.html',
  styleUrls: ['./coursea-details.component.css'],
})
export class CourseaDetailsComponent implements OnInit {
  confirmModal?: NzModalRef; // For testing by now
  coursea: any = [];
  lessons: any = [];
  id: any;
  isVisible = false;

  constructor(
    private modal: NzModalService,
    private notification: NzNotificationService,
    private _route: ActivatedRoute,
    private _coursea: CourseaService,
    private _lessons: LessonsService,
    public router: Router
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
        this.lessons = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  deleteCousea(courseaId: any) {
    (<HTMLElement>document.querySelector('html')).classList.add('hideScroll');
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Bạn có muốn xóa mục này không?',
      nzContent: 'Sau khi xác nhận, hộp thoại này sẽ đóng sau 1 giây',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          this._coursea.deleteCousea(courseaId).subscribe(
            (data: any) => {
              setTimeout(() => {
                this.router.navigateByUrl('/admin/home');
                this.notification.create(
                  'success',
                  'Thành công',
                  'Khóa học đã được xóa',
                  {
                    nzDuration: 1500,
                  }
                );
              }, 1200);
            },
            (error) => {
              this.notification.create(
                'error',
                'Thất bại',
                'Khóa học chưa được xóa',
                {
                  nzDuration: 1500,
                }
              );
              console.log(error);
            }
          );
        }).catch(() => console.log('Oops errors!')),
        nzOnCancel: () => {
          this.handleCancel();
        }
    });
  }
  deleteLesson(lessonId: any) {
    (<HTMLElement>document.querySelector('html')).classList.add('hideScroll');
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Bạn có muốn xóa mục này không?',
      nzContent: 'Sau khi xác nhận, hộp thoại này sẽ đóng sau 1 giây',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          this._lessons.deleteLesson(lessonId).subscribe(
            (data: any) => {
              (<HTMLElement>document.querySelector('html')).classList.remove('hideScroll');
              setTimeout(() => {
                this.notification.create(
                  'success',
                  'Thành công',
                  'Bài học đã được xóa',
                  {
                    nzDuration: 2000,
                  }
                  );
                  this.ngOnInit();
              }, 1100);
            },
            (error) => {
              this.notification.create(
                'error',
                'Thất bại',
                'Bài học chưa được xóa',
                {
                  nzDuration: 2000,
                }
              );
              console.log(error);
            }
          );
        }).catch(() => console.log('Oops errors!')),
        nzOnCancel: () => {
          this.handleCancel();
        }
    });
  }
  handleCancel(): void {
    (<HTMLElement>document.querySelector('html')).classList.remove('hideScroll');
    this.isVisible = false;
  }
}
