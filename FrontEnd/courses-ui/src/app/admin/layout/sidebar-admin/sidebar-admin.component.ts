import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.css']
})
export class SidebarAdminComponent implements OnInit {
  confirmModal?: NzModalRef; // For testing by now
  constructor(private adminService : AdminService, public router: Router, private modal: NzModalService) { }
  ngOnInit(): void {
  }
  logout(){
    (<HTMLElement>document.querySelector('html')).classList.add('hideScroll');
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Bạn có muốn đăng xuất',
      nzContent: 'Sau khi xác nhận, hộp thoại này sẽ đóng sau 1 giây',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          (<HTMLElement>document.querySelector('html')).classList.remove('hideScroll');
          setTimeout(() => {
            this.adminService.logOut();
            this.router.navigateByUrl('/admin');
          }, 1500);
        }).catch(() => console.log('Oops errors!')),
        nzOnCancel: () => {
          (<HTMLElement>document.querySelector('html')).classList.remove('hideScroll');
        }
    });
  }
}
