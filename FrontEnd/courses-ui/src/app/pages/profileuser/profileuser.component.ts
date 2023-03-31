import { Component, OnInit } from '@angular/core';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { Router } from '@angular/router';
import { SubcourseService } from 'src/app/services/subcourse.service';
import { UserService } from 'src/app/services/user.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
@Component({
  selector: 'app-profileuser',
  templateUrl: './profileuser.component.html',
  styleUrls: ['./profileuser.component.css']
})
export class ProfileuserComponent implements OnInit {
  bannerDefault: string = 'cover-profile.png';
  User:any= {};
  myCourseas:any= [];
  public isPopoverVisible = false;
  fileList: NzUploadFile[] = [];
  private userId = localStorage.getItem('userID');
  constructor(
    private userService: UserService,
    public router: Router,
    private subCouserService: SubcourseService,
    private notification: NzNotificationService,
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
      this.fileList.forEach((item) => {
        (<HTMLElement>(
          document.querySelector('.profile_banner')
        )).style.backgroundImage = `url(./assets/${item.name})`;
      });
  }
  async ngOnInit(): Promise<void> {
    if (this.userService.isLoggedInUser()) {
      this.userService.getUser(this.userId).subscribe(
        (data) => {
          this.User = data;
          this.handlebaner();
        },
        (error) => {
          console.log(error);
        }
      );
    }
    await this.subCouserService
      .subscribedCoursea(this.userId)
      .toPromise()
      .then(
        (data) => {
          this.myCourseas = data;
        },
        (error) => {
          console.log(error);
        }
      );
    if (this.myCourseas && this.myCourseas.length > 0) {
      (<HTMLElement>document.querySelector('.no__coursea')).style.display =
        'none';
    } else {
      (<HTMLElement>(
        document.querySelector('.profile_myCourseas')
      )).style.display = 'none';
      (<HTMLElement>document.querySelector('.no__coursea')).style.display = '';
    }
  }
  handlebaner(){
    if (this.User.coverimage == null || this.User.coverimage == '') {
      (<HTMLElement>(
        document.querySelector('.profile_banner')
      )).style.backgroundImage = `url(./assets/${this.bannerDefault})`;
    } else if (this.User.coverimage !== null || this.User.coverimage !== '') {
      (<HTMLElement>(
        document.querySelector('.profile_banner')
      )).style.backgroundImage = `url(./assets/${this.User.coverimage})`;
    }
  }
  logOut() {
    this.userService.logOutUser();
    this.isPopoverVisible = false;
    this.router.navigateByUrl('home');
  }
  public onPopoverVisibleChange(visible: boolean): void {
    this.isPopoverVisible = visible;
  }
  handleClick() {
    setTimeout(() => {
      (<HTMLElement>document.querySelector('.btn_confirm')).style.display =
        'flex';
    }, 1000);
  }
  handleCancel() {
    this.fileList = [];
    this.handlebaner();
    (<HTMLElement>document.querySelector('.btn_confirm')).style.display =
      'none';
  }
  handleSave() {
    this.fileList.forEach((file) => {
      this.User.coverimage = file.name;
    })
    this.userService.updateUser(this.User).subscribe(
      (data: any) => {
        this.ngOnInit();
        (<HTMLElement>document.querySelector('.btn_confirm')).style.display ='none';
        this.notification.create(
          'success',
          'Thành công',
          'Ảnh bìa đã được lưu',
          {
            nzDuration: 1600,
          }
        );
      },
      (error) => {
        this.notification.create(
          'error',
          'Thất bại',
          'Ảnh bìa chưa được lưu',
          {
            nzDuration: 1800,
            nzAnimate: true,
          }
        );
        console.log(error);
      }
    );
  }
}

