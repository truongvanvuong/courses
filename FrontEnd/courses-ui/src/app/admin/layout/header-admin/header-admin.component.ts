import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/admin';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css'],
})
export class HeaderAdminComponent implements OnInit {
  constructor(private adminService: AdminService) {}
  adminData:any = {};
  ngOnInit(): void {
    const adminId = localStorage.getItem('adminID');
    // if (adminId !== null) {
    //   this.adminId = JSON.parse(adminId);
    // }
    this.adminService.getAdmin(adminId).subscribe(
      (data) => {
        this.adminData = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
