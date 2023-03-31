import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonsService } from 'src/app/services/lessons.service';

const lessons = document.getElementsByClassName('lesson');
@Component({
  selector: 'app-coursecontent',
  templateUrl: './coursecontent.component.html',
  styleUrls: ['./coursecontent.component.css'],
})
export class CoursecontentComponent implements OnInit {
  lessons: any = [];
  id: any;
  idlesson: any = 0;
  currentLesson: any = [];
  menu: string = '';
  currentLessonIndex: number = 0;
  activeElement: HTMLElement = document.activeElement as HTMLElement;
  constructor(
    private _route: ActivatedRoute,
    private _lessons: LessonsService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.id = this._route.snapshot.params['id'];
    this._lessons.lessonsOfCoursea(this.id).subscribe(
      (data: any) => {
        this.lessons = data;
        setTimeout(() => {
          if (lessons.length > 0) {
            (lessons[0] as HTMLElement).click();
          }
        }, 400);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  handleLesson(lessonId: number, index: number) {
    this._lessons.lesson(lessonId).subscribe(
      (data: any) => {
        this.currentLesson = data;
        (<HTMLIFrameElement>document.querySelector('.ifram')).src =
          this.currentLesson.url;
        this.updateLessonTitle();
        if (index === this.lessons.length - 1) {
          // Nếu bài học hiện tại là bài cuối cùng trong danh sách, vô hiệu hóa nút next
          (<HTMLElement>document.querySelector('.btn_next')).classList.add(
            'disable'
          );
          (<HTMLElement>document.querySelector('.btn_prev')).classList.remove(
            'disable'
          );
        } else if (index === 0) {
          (<HTMLElement>document.querySelector('.btn_prev')).classList.add(
            'disable'
          );
          (<HTMLElement>document.querySelector('.btn_next')).classList.remove(
            'disable'
          );
        } else {
          (<HTMLElement>document.querySelector('.btn_prev')).classList.remove(
            'disable'
          );
          (<HTMLElement>document.querySelector('.btn_next')).classList.remove(
            'disable'
          );
        }
      },
      (error) => {
        console.log(error);
        this.currentLesson = null;
      }
    );
    const menuItems = document.querySelectorAll(
      '.ant-menu-item'
    ) as NodeListOf<HTMLElement>;
    menuItems.forEach((item: Element, i: number) => {
      const lessonId = item.getAttribute('data-id');
      if (lessonId === this.idlesson.toString()) {
        item.classList.remove('ant-menu-item-selected');
      }
    });
    
  }

  updataeLesson(lessonId: number) {
    this._lessons.lesson(lessonId).subscribe(
      (data: any) => {
        this.currentLesson = data;
        (<HTMLIFrameElement>document.querySelector('.ifram')).src =
          this.currentLesson.url;
        this.updateLessonTitle();
      },
      (error) => {
        console.log(error);
        this.currentLesson = null;
      }
    );
  }
  updateLessonTitle() {
    if (this.currentLesson) {
      (<HTMLElement>document.querySelector('.lesson_title')).innerText =
        this.currentLesson.nameLessons;
    }
  }
  handleMenu() {
    if (this.menu == '') {
      (<HTMLElement>document.querySelector('.content')).classList.add(
        'full-width'
      );
      this.menu = 'menu';
    } else {
      (<HTMLElement>document.querySelector('.content')).classList.remove(
        'full-width'
      );
      this.menu = '';
    }
  }
  setActiveLesson() {
    // Cập nhật trạng thái active cho menu item
    const menuItems = document.querySelectorAll(
      '.ant-menu-item'
    ) as NodeListOf<HTMLElement>;
    menuItems.forEach((item: Element, i: number) => {
      const lessonId = item.getAttribute('data-id');
      if (lessonId === this.idlesson.toString()) {
        item.classList.add('ant-menu-item-selected');
      } else {
        item.classList.remove('ant-menu-item-selected');
      }
    });
  }
  next() {
    const currentLessonIndex = this.lessons.findIndex(
      (lesson: any) =>
        this.currentLesson !== undefined && lesson.id === this.currentLesson.id
    );
    let nextLessonIndex = currentLessonIndex + 1;
    if (nextLessonIndex === this.lessons.length - 1) {
      (<HTMLElement>document.querySelector('.btn_next')).classList.add(
        'disable'
      );
    }
    if (nextLessonIndex > 0) {
      (<HTMLElement>document.querySelector('.btn_prev')).classList.remove(
        'disable'
      );
    }
    if (nextLessonIndex === this.lessons.length - 1) {
      (<HTMLElement>document.querySelector('.btn_next')).classList.add(
        'disable'
      );
    }
    if (nextLessonIndex < this.lessons.length) {
      // update the ID of the current lesson
      this.currentLesson = this.lessons[nextLessonIndex];
      this.idlesson = this.currentLesson.id;
      this.currentLessonIndex = nextLessonIndex;

      // display the content of the new lesson
      this.updataeLesson(this.idlesson);
      this.setActiveLesson();
    }
  }
  prev() {
    const currentLessonIndex = this.lessons.findIndex(
      (lesson: any) =>
        this.currentLesson !== undefined && lesson.id === this.currentLesson.id
    );

    // decrement the index to show the previous lesson
    let prevLessonIndex = currentLessonIndex - 1;

    // if the current lesson is the first lesson, set the index to the last lesson index

    if (prevLessonIndex < this.lessons.length - 1) {
      (<HTMLElement>document.querySelector('.btn_next')).classList.remove(
        'disable'
      );
    }
    if (prevLessonIndex <= 0) {
      (<HTMLElement>document.querySelector('.btn_prev')).classList.add(
        'disable'
      );
    }
    if (prevLessonIndex < this.lessons.length) {
      // update the ID of the current lesson
      this.currentLesson = this.lessons[prevLessonIndex];
      console.log(this.currentLesson);
      this.idlesson = this.currentLesson.id;
      this.currentLessonIndex = prevLessonIndex;

      // display the content of the new lesson
      this.updataeLesson(this.idlesson);
      this.setActiveLesson();
    }
  }
}
