import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css'],
})
export class LoginAdminComponent implements OnInit {

  constructor(
    private fb: UntypedFormBuilder,
    private adminService: AdminService,
    public router: Router,
    private message: NzMessageService
  ) {}
  validateForm!: UntypedFormGroup;
  submitForm(): void {
    if (this.validateForm.valid) {
      this.adminService.loginAdmin(this.validateForm.value).subscribe(
        (data) => {
          localStorage.setItem('adminID', JSON.stringify(data.admin.id));
          localStorage.setItem('token',JSON.stringify(data.token));
          this.router.navigateByUrl('/admin/home');
        },
        (error) => {
          this.message.create('error', `Tài khoản mật khẩu không đúng`);
          console.log(error);
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
      name: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }
}
