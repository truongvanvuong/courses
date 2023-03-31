import { Component, OnInit } from '@angular/core';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminService } from 'src/app/services/admin.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-acountadmin',
  templateUrl: './acountadmin.component.html',
  styleUrls: ['./acountadmin.component.css'],
})
export class AcountadminComponent implements OnInit {
  passwordVisible = false;
  password?: string;
  constructor(
    private notification: NzNotificationService,
    private adminService: AdminService,
    private modal: NzModalService,
    private message: NzMessageService,
    public router: Router
  ) {}
  admin: any = {};
  fileList: NzUploadFile[] = [];
  ngOnInit(): void {
    const adminId = localStorage.getItem('adminID');
    this.adminService.getAdmin(adminId).subscribe(
      (data) => {
        this.admin = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  formSubmit() {
    this.fileList.forEach((item) => {
      this.admin.img = item.name;
    });
    if (
      this.admin.passwordOld == undefined &&
      this.admin.passwordNew == undefined
    ) {
      this.adminService.updateAdmin(this.admin).subscribe(
        (data: any) => {
          window.location.reload();
          this.notification.create(
            'success',
            'Thành công',
            ' Cập nhật tài khoản thành công',
            {
              nzDuration: 1600,
            }
          );
        },
        (error) => {
          this.notification.create(
            'error',
            'Thất bại',
            'Cập nhật tài khoản không thành công',
            {
              nzDuration: 1800,
              nzAnimate: true,
            }
          );
          console.log(error);
        }
      );
    } else if (
      this.admin.passwordOld !== undefined ||
      this.admin.passwordNew !== undefined
    ) {
      if (this.admin.passwordOld === this.admin.password && this.admin.passwordNew !== "") {
        if(this.admin.passwordNew == null || this.admin.passwordNew.trim()=="") {
         this.message.info('Hãy nhập mật khẩu mới');
        }
      else{
        this.admin.password = this.admin.passwordNew;
        this.adminService.updateAdmin(this.admin).subscribe((data: any) => {
          this.modal.success({
            nzTitle: 'Đổi mật khẩu thành công',
            nzContent: 'Hãy đăng nhập lại',
            nzCloseIcon: 'null',
            nzOnOk: () => this.router.navigateByUrl('admin'),
          });
        });
      }
      }
      else if(this.admin.passwordOld != this.admin.password){
        this.message.error('Mật khẩu cũ không khớp')
      }
      }
      else{
        this.notification.create(
          'error',
          'Thất bại',
          'Chưa đổi được mật khẩu',
          {
            nzDuration: 1800,
            nzAnimate: true,
          }
        );
      }
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
