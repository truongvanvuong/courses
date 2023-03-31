import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { User } from '../../user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: UntypedFormBuilder,
    private userService: UserService,
    public router: Router,
    private message: NzMessageService
  ) {}
  user: User = new User();
  validateForm!: UntypedFormGroup;
  submitForm(): void {
    if (this.validateForm.valid) {
      this.userService.loginUser(this.validateForm.value).subscribe(
        (data) => {
          localStorage.setItem('userID', JSON.stringify(data.user.id));
          localStorage.setItem('tokenUser',JSON.stringify(data.token));
          this.router.navigateByUrl('home');
        },
        (error) => {
          this.message.create('error', `Tài khoản email hoặc mật khẩu không đúng`);
          console.log(error)
        }
      );
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email:[null,[Validators.email,Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }
}
