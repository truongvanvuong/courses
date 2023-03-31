import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginAdminComponent } from './admin/pages/login-admin/login-admin.component';
import { HomeAdminComponent } from './admin/pages/home-admin/home-admin.component';
import { AddCoursesComponent } from './admin/component/add-courses/add-courses.component';
import { AddlessonsComponent } from './admin/component/addlessons/addlessons.component';
import { CourseaDetailsComponent } from './admin/component/coursea-details/coursea-details.component';
import { UpdatecourseaComponent } from './admin/component/updatecoursea/updatecoursea.component';
import { UpdatelessonComponent } from './admin/component/updatelesson/updatelesson.component';
import { AdminGuard } from './services/admin.guard';
import { StudyrouteComponent } from './pages/studyroute/studyroute.component';
import { LearnComponent } from './pages/learn/learn.component';
import { AddadminComponent } from './admin/component/addadmin/addadmin.component';
import { AcountadminComponent } from './admin/component/acountadmin/acountadmin.component';
import { CourseadetailUserComponent } from './pages/courseadetail-user/courseadetail-user.component';
import { CoursecontentComponent } from './pages/coursecontent/coursecontent.component';
import { UserGuard } from './services/user.guard';
import { SettingaccountComponent } from './pages/settingaccount/settingaccount.component';
import { ProfileuserComponent } from './pages/profileuser/profileuser.component';


const routes: Routes = [
  {
    path: '',
    redirectTo:"home",
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'studyroute',
    component: StudyrouteComponent,
    pathMatch: 'full',
  },
  {
    path: 'learn',
    component: LearnComponent,
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'setting',
    component: SettingaccountComponent,
    pathMatch: 'full',
    canActivate:[UserGuard]
  },
  {
    path: 'profileuser',
    component: ProfileuserComponent,
    pathMatch: 'full',
    canActivate:[UserGuard]
  },
  {
    path: 'coursedetailsUser/:id',
    component: CourseadetailUserComponent,
    pathMatch: 'full',
  },
  {
    path: 'courseacontent/:id',
    component: CoursecontentComponent,
    pathMatch: 'full',
    canActivate:[UserGuard]
  },
  {
    path: 'admin',
    component: LoginAdminComponent,
    pathMatch: 'full',
  },
  {
    path: 'admin/home',
    component: HomeAdminComponent,
    pathMatch: 'full',
    canActivate: [AdminGuard],
  },
  {
    path: 'Courseadetails/:id',
    component: CourseaDetailsComponent,
    pathMatch: 'full',
    canActivate: [AdminGuard],
  },
  {
    path: 'updatecoursea/:id',
    component: UpdatecourseaComponent,
    pathMatch: 'full',
    canActivate: [AdminGuard],

  },
  {
    path: 'updatelesson/:lessonid',
    component: UpdatelessonComponent,
    pathMatch: 'full',
    canActivate: [AdminGuard],
  },
  {
    path: 'addcoursea',
    component: AddCoursesComponent,
    canActivate: [AdminGuard],
    pathMatch:'full',
  },
  {
    path: 'addlessons',
    component: AddlessonsComponent,
    pathMatch: 'full',
    canActivate: [AdminGuard],
  },
  {
    path: 'addadmin',
    component: AddadminComponent,
    pathMatch: 'full',
    canActivate: [AdminGuard],
  },
  {
    path: 'profile',
    component: AcountadminComponent,
    pathMatch: 'full',
    canActivate: [AdminGuard],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
