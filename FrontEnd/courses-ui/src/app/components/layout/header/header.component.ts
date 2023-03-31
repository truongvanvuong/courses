import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { Coursea } from 'src/app/coursea';
import { CourseaService } from 'src/app/services/coursea.service';
import { SubcourseService } from 'src/app/services/subcourse.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  size: NzButtonSize = 'default';
  value: string=""
  searchResults: Coursea[] |null = [];
  showResults: boolean = false;
  public isPopoverVisible = false;

  constructor(
    private userService: UserService,
    public router: Router,
    private subCouserService: SubcourseService,
    private courseaService : CourseaService
  ) {}

  noCoursea:string ='';
  classNameNoCoursea:string="";
  titleNoCourse:string =''
  nzPopoverVisible = 'false';
  loginClass = {
    className: '',
  };
  myCourseas: any = {};
  User: any = {};
  private userId = localStorage.getItem('userID');
  async ngOnInit(): Promise<void> {
    this.login();
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
    
    if (this.myCourseas && this.myCourseas.length <= 0) {
      this.noCoursea = 'Bạn chưa đăng ký khóa học nào';
      this.titleNoCourse ='title-noCourse'
      this.classNameNoCoursea='show_nocoursea'
    }
    else{
      this.noCoursea = '';
      this.titleNoCourse = '';
    }
  }
  login() {
    if (this.userService.isLoggedInUser()) {
      this.loginClass.className = 'loginUser';
      this.userService.getUser(this.userId).subscribe(
        (data) => {
          this.User = data;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  logOut() {
    this.loginClass.className = '';
    this.userService.logOutUser();
    this.isPopoverVisible = false;
    this.router.navigateByUrl('home');
  }
  public onPopoverVisibleChange(visible: boolean): void {
    this.isPopoverVisible = visible;
  }
  handleClick(courseaId: any) {
    if (this.userService.isLoggedInUser()) {
      const userId = localStorage.getItem('userID');
      this.subCouserService
        .checkSubscribed(courseaId, userId)
        .subscribe((result: boolean) => {
          if (result) {
            this.router.navigate(['/courseacontent/' + courseaId]);
          } else {
            this.router.navigate(['/coursedetailsUser/' + courseaId]);
          }
        });
    } else {
      this.router.navigate(['/coursedetailsUser/' + courseaId]);
    }
  }
  onSearch(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    if (!this.value) { // kiểm tra giá trị từ khóa tìm kiếm có tồn tại hay không
      this.searchResults = null; // nếu không có giá trị tìm kiếm, gán kết quả tìm kiếm là null
      this.showResults = false; 
      return;
    }
     else if (this.value.trim() != "") {
      this.courseaService.searchCourses(this.value).subscribe(
        (results: Coursea[]) => {
          this.searchResults = results;
          this.showResults = true; 
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.showResults = false;
    }
  
  }
}
