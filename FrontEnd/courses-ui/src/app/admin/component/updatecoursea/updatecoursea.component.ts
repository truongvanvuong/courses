import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { CourseaService } from 'src/app/services/coursea.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import * as moment from 'moment';

@Component({
  selector: 'app-updatecoursea',
  templateUrl: './updatecoursea.component.html',
  styleUrls: ['./updatecoursea.component.css'],
})
export class UpdatecourseaComponent implements OnInit {
  courseaId: any = 0;
  public Editor: any = ClassicEditorBuild;

  courseaData = {
    id: '',
    title: '',
    img: '',
    description: '',
    createdat: '',
    updatedat:  '',
  };

  fileList: NzUploadFile[] = [];
  event: any;
  constructor(
    private _route: ActivatedRoute,
    private notification: NzNotificationService,
    private _coursea: CourseaService
  ) {}

  handleChange(info: NzUploadChangeParam): void {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-2);
    fileList = fileList.map((file) => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });

    this.fileList = fileList;
  }

  showUploadList = {
    showRemoveIcon: true,
    showDownloadIcon: false,
  };
  ngOnInit(): void {
    this.courseaId = this._route.snapshot.params['id'];
    this._coursea.coursea(this.courseaId).subscribe(
      (data: any) => {
        this.courseaData = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //update form submit
  public updateCousea() {
    this.fileList.forEach((item) => {
      this.courseaData.img = item.name;
    });
    const now = moment();
    // Định dạng thời gian theo định dạng ngày/tháng/năm giờ:phút
    const formattedNow = now.format('DD/MM/YYYY');
    this.courseaData.updatedat = formattedNow
    this._coursea.updateCousea(this.courseaData).subscribe(
      (data) => {
        this.notification.create(
          'success',
          'Thành công',
          'Khóa học đã được cập nhật',
          {
            nzDuration: 1500,
          }
        );
      },
      (error) => {
        this.notification.create(
          'error',
          'Thất bại',
          'Khóa học chưa được cập nhật',
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
