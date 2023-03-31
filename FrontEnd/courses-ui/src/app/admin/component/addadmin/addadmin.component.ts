import { Component, OnInit } from '@angular/core';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminService } from 'src/app/services/admin.service';
function ngAfterViewInit() {
  let inputField: HTMLElement = <HTMLElement>(
    document.querySelector('.name_input')
  );
  inputField && inputField.focus();
}
@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.css'],
})
export class AddadminComponent implements OnInit {
  passwordVisible = false;
  password?: string;
  constructor(
    private message: NzMessageService,
    private notification: NzNotificationService,
    private adminService: AdminService
  ) {}

  admin:any ={
    name:'',
    img:'',
    password:"",
  }
  fileList: NzUploadFile[] = [];
  ngOnInit(): void {}
  formSubmit() {
    if (
      this.admin.name == null ||
      this.admin.name.trim() == '' ||
      this.admin.img == null ||
      this.admin.password == null
    ) {
      this.message.info('Các trường vẫn còn trống');
      return;
    }
    this.fileList.forEach((item) => {
      this.admin.img = item.name;
    });
    this.adminService.addAdmin(this.admin).subscribe(
      (data: any) => {
        this.notification.create(
          'success',
          'Thành công',
          'Đã tạo tài khoản',
          {
            nzDuration: 1800,
          }
        );
        (this.admin.name = ''),
          (this.admin.img = ''),
          (this.admin.password = '');
        ngAfterViewInit();
      },
      (error) => {
        this.notification.create(
          'error',
          'Thất bại',
          'Tài khoản chưa được tạo',
          {
            nzDuration: 1800,
            nzAnimate: true,
          }
        );
        console.log(error);
      }
    );
  }
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
