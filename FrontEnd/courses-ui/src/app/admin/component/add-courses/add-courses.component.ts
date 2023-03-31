import { Component, OnInit } from '@angular/core';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { CourseaService } from 'src/app/services/coursea.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import * as moment from 'moment';
function ngAfterViewInit() {
  let inputField: HTMLElement = <HTMLElement>(
    document.querySelector('.name_input')
  );
  inputField && inputField.focus();
}
@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.css'],
})
export class AddCoursesComponent implements OnInit {
  public Editor: any = ClassicEditorBuild;

  coursea = {
    id: '',
    title: '',
    img: '',
    description: '',
    createdat: '',
    updatedat: '',
  };
  fileList: NzUploadFile[] = [];
  event: any;
  constructor(
    private message: NzMessageService,
    private notification: NzNotificationService,
    private _coursea: CourseaService
  ) {}

  formSubmit() {
    const now = moment();
    // Định dạng thời gian theo định dạng ngày/tháng/năm giờ:phút
    const formattedNow = now.format('DD/MM/YYYY');
    this.coursea.createdat = formattedNow;
    if (
      this.coursea.title == null ||
      this.coursea.title.trim() == '' ||
      this.coursea.img == null
    ) {
      this.message.info('Các trường vẫn còn trống');
      return;
    }
    this.fileList.forEach((item) => {
      this.coursea.img = item.name;
    });
    this.coursea.createdat = formattedNow;
    this._coursea.addCoursea(this.coursea).subscribe(
      (data: any) => {
        this.notification.create(
          'success',
          'Thành công',
          'Khóa học đã được thêm',
          {
            nzDuration: 1500,
          }
        );
        (this.coursea.title = ''),
          (this.coursea.img = ''),
          (this.coursea.description = '');
        ngAfterViewInit();
      },
      (error) => {
        this.notification.create(
          'error',
          'Thất bại',
          'Khóa học chưa được thêm',
          {
            nzDuration: 1500,
            nzAnimate: true,
          }
        );
        console.log(error);
      }
    );
  }

  ngOnInit(): void {}

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
}
