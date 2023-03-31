import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { CourseaService } from 'src/app/services/coursea.service';
import { LessonsService } from 'src/app/services/lessons.service';

@Component({
  selector: 'app-updatelesson',
  templateUrl: './updatelesson.component.html',
  styleUrls: ['./updatelesson.component.css']
})

export class UpdatelessonComponent implements OnInit {
  courseas: any=[];
  lessonId: any = 0;
  public baseUrl: string = 'https://www.youtube.com/embed/';
  public Editor: any = ClassicEditorBuild;

  courseaData = {
    id: '',
    title: '',
  };
  lessonData={
    nameLessons: '',
    img: '',
    url: '',
    description: '',
    coursea: {
      id: '',
    },
  }
  event: any;
  previewImage: string | undefined = '';
  previewVisible = false;
  constructor(
    private _route: ActivatedRoute,
    private notification: NzNotificationService,
    private _coursea: CourseaService,
    private _lessons: LessonsService,
  ) {}
  handleClick() {
    let url= this.baseUrl + this.lessonData.url.slice(17);
    (<HTMLIFrameElement>document.querySelector('.ifram')).src = url;
  }

  showUploadList = {
    showRemoveIcon: true,
    showDownloadIcon: false,
  };
  ngOnInit(): void {
    this._coursea.courseas().subscribe(
      (data: any) => {
        this.courseas = data;
      },
      (error) => {
        console.log(error);
      }
    );
    this.lessonId = this._route.snapshot.params['lessonid'];
    this._lessons.lesson(this.lessonId).subscribe(
      (data: any) => {
        this.lessonData = data;
        (<HTMLIFrameElement>document.querySelector('.ifram')).src = this.lessonData.url;
        this.lessonData.url = 'https://youtu.be' + this.lessonData.url.slice(29)
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //update form submit
  public updateLesson() {
    const idVideo = this.lessonData.url.slice(17);
    this.lessonData.img = `https://i.ytimg.com/vi/${idVideo}/hqdefault.jpg`
    this.lessonData.url = this.baseUrl + idVideo
    this._lessons.updateLesson(this.lessonData).subscribe(
      (data) => {
        this.notification.create(
          'success',
          'Thành công',
          'Bài học đã được cập nhật',
          {
            nzDuration: 1500,
          }
        );
      },
      (error) => {
        this.notification.create(
          'error',
          'Thất bại',
          'Bài học chưa được cập nhật',
          {
            nzDuration: 1500,
            nzAnimate: true,
          }
        );
        console.log(error);
      }
    );
  }
  }


