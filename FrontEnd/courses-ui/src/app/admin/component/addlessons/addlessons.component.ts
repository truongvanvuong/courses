import { Component, OnInit } from '@angular/core';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { CourseaService } from 'src/app/services/coursea.service';
import { LessonsService } from 'src/app/services/lessons.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzMessageService } from 'ng-zorro-antd/message';

function ngAfterViewInit() {
  let inputField: HTMLElement = <HTMLElement>(
    document.querySelector('.name_input')
  );
  inputField && inputField.focus();
}
const baseUrl: string = 'https://www.youtube.com/embed/';
@Component({
  selector: 'app-addlessons',
  templateUrl: './addlessons.component.html',
  styleUrls: ['./addlessons.component.css'],
})
export class AddlessonsComponent implements OnInit {
  public Editor: any = ClassicEditorBuild;
  courseas: any = [];
  lessons = {
    nameLessons: '',
    img: '',
    url: '',
    description: '',
    coursea: {
      id: '',
    },
  };

  constructor(
    private _coursea: CourseaService,
    private notification: NzNotificationService,
    private message: NzMessageService,
    private _lessons: LessonsService
  ) {}

  event: any;
  previewImage: string | undefined = '';
  previewVisible = false;

  handleClick() {
    const iframe = document.querySelector('.ifram');
    iframe?.setAttribute('src', baseUrl + this.lessons.url.slice(17));
  }
  showUploadList = {
    showRemoveIcon: true,
    showDownloadIcon: false,
  };
  addLessons() {

    const idVideo = this.lessons.url.slice(17);
    if (
      this.lessons.nameLessons == null ||
      this.lessons.nameLessons.trim() == '' ||
      this.lessons.img == null ||
      this.lessons.url == null ||
      this.lessons.coursea == null
    ) {
      this.message.info('Các trường vẫn còn trống');
      return;
    }
    const currentUrl = this.lessons.url;
    this.lessons.url = idVideo;
    this.lessons.img = `https://i.ytimg.com/vi/${idVideo}/hqdefault.jpg`
    this._lessons.addlessons(this.lessons).subscribe(
      (data: any) => {
        this.lessons = {
          nameLessons: '',
          img: '',
          url: '',
          description: '',
          coursea: {
            id: '',
          },
        };
        this.notification.create(
          'success',
          'Thành công',
          'Bài học đã được thêm ',
          {
            nzDuration: 1500,
          }
        );
        (this.lessons.nameLessons = ''),
          (this.lessons.img = ''),
          (this.lessons.url = ''),
          (this.lessons.coursea.id = ''),
          (this.lessons.description = '');
          (<HTMLIFrameElement>document.querySelector('.ifram')).src = baseUrl;
        ngAfterViewInit();
      },
      (error) => {
        this.lessons.url = currentUrl;
        this.notification.create(
          'error',
          'Thất bại',
          'Bài học chưa được thêm ',
          {
            nzDuration: 1500,
            nzAnimate: true,
          }
        );
        console.log(error);
      }
    );
  }
  ngOnInit(): void {
    this._coursea.courseas().subscribe(
      (data: any) => {
        this.courseas = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
