import { Component, OnInit } from '@angular/core';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settingaccount',
  templateUrl: './settingaccount.component.html',
  styleUrls: ['./settingaccount.component.css'],
})
export class SettingaccountComponent implements OnInit {
  isUpload = false;
  isEdit = false;
  avatar = 'avatar_default.jpg';
  passwordVisible = false;
  password?: string;
  constructor(
    private notification: NzNotificationService,
    private userService: UserService,
    private modal: NzModalService,
    private message: NzMessageService,
    public router: Router
  ) { }
  private userID = localStorage.getItem('userID');
  user: any = {};
  fileList: NzUploadFile[] = [
   
  ];
  ngOnInit(): void {
    this.userService.getUser(this.userID).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  update() {
    this.userService.updateUser(this.user).subscribe(
      (data: any) => {
        this.isUpload = false;
    this.isEdit = false;
    (<HTMLElement>document.querySelector('.coursea_btn')).classList.remove(
      'save'
    );
        this.ngOnInit();
        this.notification.create(
          'success',
          'Thành công',
          'Đã lưu thông tin tài khoản',
          {
            nzDuration: 1600,
          }
        );
      },
      (error) => {
        this.notification.create(
          'error',
          'Thất bại',
          'Thông tin chưa được lưu',
          {
            nzDuration: 1800,
            nzAnimate: true,
          }
        );
        console.log(error);
      }
    );
  }
  formSubmit() {
    this.fileList.forEach((item) => {
      this.user.avatar = item.name;
    });
    if (
      this.user.passwordOld == undefined &&
      this.user.passwordNew == undefined
    ) {
      this.update();
    } else if (
      this.user.passwordOld !== undefined ||
      this.user.passwordNew !== undefined
    ) {
      if (
        this.user.passwordOld === this.user.password &&
        this.user.passwordNew !== ''
      ) {
        if (
          this.user.passwordNew == null ||
          this.user.passwordNew.trim() == ''
        ) {
          this.message.info('Hãy nhập mật khẩu mới');
        } else {
          this.user.password = this.user.passwordNew;
          this.userService.updateUser(this.user).subscribe(
            (data: any) => {
              (<HTMLElement>document.querySelector('html')).classList.add(
                'hideScroll'
              );
              this.modal.success({
                nzTitle: 'Đổi mật khẩu thành công',
                nzContent: 'Hãy đăng nhập lại',
                nzCloseIcon: 'null',
                nzOnOk: () => {
                  (<HTMLElement>(document.querySelector('html'))).classList.remove('hideScroll');
                  this.router.navigateByUrl('login');
                },
              });
            },
            (error) => {
              this.notification.create(
                'error',
                'Thất bại',
                'Thông tin chưa được lưu',
                {
                  nzDuration: 1800,
                  nzAnimate: true,
                }
              );
              console.log(error);
            }
          );
        }
      } else if (this.user.passwordOld != this.user.password) {
        this.message.error('Mật khẩu cũ không khớp');
      }
    } else {
      this.notification.create('error', 'Thất bại', 'Chưa đổi được mật khẩu', {
        nzDuration: 1800,
        nzAnimate: true,
      });
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
    this.fileList.forEach((item) => {
      (<HTMLElement>document.querySelector('.img_avatar')).setAttribute(
        'src',
        './assets/' + item.name
      );
    });
  }

  showUploadList = {
    status: 'done',
    showRemoveIcon: true,
    showDownloadIcon: false,
  };
  handleEdit() {
    this.isUpload = true;
    this.isEdit = true;
    (<HTMLElement>document.querySelector('.coursea_btn')).classList.add('save');
    let inputField: HTMLElement = <HTMLElement>(
      document.querySelector('.name_input')
    );
    inputField && inputField.focus();
  }

  handleCanle() {
    this.userService.getUser(this.userID).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.log(error);
      }
    );
    if (this.user.avatar === null) {
      this.user.avatar = 'avatar_default.jpg';
    }
    (<HTMLElement>document.querySelector('.img_avatar')).setAttribute(
      'src',
      './assets/' + this.user.avatar
    );
    this.isUpload = false;
    this.isEdit = false;
    (<HTMLElement>document.querySelector('.coursea_btn')).classList.remove(
      'save'
    );
  }
}
