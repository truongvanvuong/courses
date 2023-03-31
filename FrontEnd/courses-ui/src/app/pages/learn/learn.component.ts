import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CourseaService } from 'src/app/services/coursea.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { SubcourseService } from 'src/app/services/subcourse.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent implements OnInit {
  courseas: any = [];

  constructor(private _coursea: CourseaService,
    private router: Router,
    private subService: SubcourseService,
    private _userService: UserService) { }
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
    this._coursea.courseas().subscribe(
      (data: any) => {
        this.courseas = data;
      },
      (error) => {
        console.log(error);
      }
    );
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

}
