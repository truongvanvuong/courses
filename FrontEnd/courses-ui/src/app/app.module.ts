import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { SafePipe } from './safe.pipe';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { HeaderAdminComponent } from './admin/layout/header-admin/header-admin.component';
import { SidebarAdminComponent } from './admin/layout/sidebar-admin/sidebar-admin.component';
import { LoginAdminComponent } from './admin/pages/login-admin/login-admin.component';
import { HomeAdminComponent } from './admin/pages/home-admin/home-admin.component';
import { CoursesComponent } from './admin/component/courses/courses.component';
import { AddCoursesComponent } from './admin/component/add-courses/add-courses.component';
import { AddlessonsComponent } from './admin/component/addlessons/addlessons.component';
import { CourseaDetailsComponent } from './admin/component/coursea-details/coursea-details.component';
import { UpdatecourseaComponent } from './admin/component/updatecoursea/updatecoursea.component';
import { UpdatelessonComponent } from './admin/component/updatelesson/updatelesson.component';

import { HeaderComponent } from './components/layout/header/header.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { StudyrouteComponent } from './pages/studyroute/studyroute.component';
import { LearnComponent } from './pages/learn/learn.component';
import { AddadminComponent } from './admin/component/addadmin/addadmin.component';
import { AcountadminComponent } from './admin/component/acountadmin/acountadmin.component';
import { CourseadetailUserComponent } from './pages/courseadetail-user/courseadetail-user.component';
import { CoursecontentComponent } from './pages/coursecontent/coursecontent.component';
import { SettingaccountComponent } from './pages/settingaccount/settingaccount.component';
import { ProfileuserComponent } from './pages/profileuser/profileuser.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    HeaderAdminComponent,
    SidebarAdminComponent,
    LoginAdminComponent,
    HomeAdminComponent,
    CoursesComponent,
    AddCoursesComponent,
    AddlessonsComponent,
    CourseaDetailsComponent,
    UpdatecourseaComponent,
    UpdatelessonComponent,
    SafePipe,
    StudyrouteComponent,
    LearnComponent,
    AddadminComponent,
    AcountadminComponent,
    CourseadetailUserComponent,
    CoursecontentComponent,
    SettingaccountComponent,
    ProfileuserComponent,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzMessageModule,
    NzIconModule,
    NzLayoutModule,
    NzGridModule,
    NzInputNumberModule,
    NzUploadModule,
    CKEditorModule,
    NzNotificationModule,
    NzToolTipModule,
    NzModalModule,
    NzCheckboxModule,
    NzCarouselModule,
    NzPopoverModule,
    NzCollapseModule,
    NzMenuModule,
  ]
})
export class AppModule {}
