import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';
import { CourseaService } from 'src/app/services/coursea.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { SubcourseService } from 'src/app/services/subcourse.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  effect = 'fade';
  nzAutoPlaySpeed = 4000;
  slides = [
    {
      background:
        'linear-gradient(to right, rgb(40, 119, 250), rgb(103, 23, 205))',
      title: 'Học ReactJS Miễn Phí!',
      description:
        'Để đạt được kết quả tốt trong mọi việc ta cần xác định mục tiêu rõ ràng cho việc đó. Học lập trình cũng không là ngoại lệ.',
      titleBtn: 'Đăng ký ngay',
      link: '#',
      img: 'Banner_web_ReactJS.png',
      classhover: 'btn_link_1',
    },
    {
      background:
        'linear-gradient(to right, rgb(118, 18, 255), rgb(5, 178, 255))',
      title: 'Thành Quả của Học Viên',
      description:
        'Để đạt được kết quả tốt trong mọi việc ta cần xác định mục tiêu rõ ràng cho việc đó. Học lập trình cũng không là ngoại lệ.',
      titleBtn: 'Xem thành quả',
      link: '#',
      img: 'Banner_01_2.png',
      classhover: 'btn_link_2',
    },
    {
      background:
        'linear-gradient(to right, rgb(254, 33, 94), rgb(255, 148, 2))',
      title: 'F8 trên Youtube',
      description:
        'F8 được nhắc tới ở mọi nơi, ở đâu có cơ hội việc làm cho nghề IT và có những con người yêu thích lập trình F8 sẽ ở đó.',
      titleBtn: 'Truy cập kênh',
      link: 'https://www.youtube.com/channel/UCNSCWwgW-rwmoE3Yc4WmJhw',
      img: 'Banner_03_youtube.png',
      classhover: 'btn_link_3',
    },
    {
      background:
        'linear-gradient(to right, rgb(0, 126, 254), rgb(6, 195, 254))',
      title: 'F8 trên Facebook',
      description:
        'F8 được nhắc tới ở mọi nơi, ở đâu có cơ hội việc làm cho nghề IT và có những con người yêu thích lập trình F8 sẽ ở đó.',
      titleBtn: 'Truy cập Facebook',
      link: 'https://www.facebook.com/f8vnofficial',
      img: 'Banner_04_2.png',
      classhover: 'btn_link_4',
    },
  ];
  subcourseItemCounts: {[courseId: number]: number} = {}; // biến tạm để lưu trữ số lượng người đăng ký
  nameBtn = '';
  subcourse: any = {};
  courseaId = '';
  courseas: any = [];
  subCourse: any = {
    id: '',
    coursea: {
      id: '',
    },
    user: {
      id: '',
    },
  };

  constructor(
    private _coursea: CourseaService,
    private router: Router,
    private subService: SubcourseService,
    private _userService: UserService,
  ) {}
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
    this._coursea.courseas().subscribe(
      (data: any) => {
        this.courseas = data;
        for (let coursea of this.courseas) {
          this.subService.subscribedCourseaItem(coursea.id).subscribe((data:any) => {
            this.subcourseItemCounts[coursea.id] = data.length;
            console.log(this.subcourseItemCounts);
          }, error => console.log(error))
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  @ViewChild(NzCarouselComponent, { static: false })
  myCarousel!: NzCarouselComponent;

  next() {
    console.log(this.myCarousel.activeIndex);
    this.myCarousel.next();
  }
  prev() {
    this.myCarousel.pre();
  }
  handleClick(courseaId: any) {
    if (this._userService.isLoggedInUser()) {
      const userId = localStorage.getItem('userID');
      this.subService
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
  getCountSubcourseItems(courseId: number) {
    return this.subcourseItemCounts[courseId] || 0;
  }
}
