import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PracticePageComponent } from './components/practice-page/practice-page.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guards/auth.guard';
import { InitialsetupComponent } from './components/initialsetup/initialsetup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidenavComponent } from './dashboard/sidenav/sidenav.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { DashboardhomeComponent } from './dashboard/dashboardhome/dashboardhome.component';
import { DashhomeComponent } from './dashboard/dashhome/dashhome.component';
import { ContactsComponent } from './dashboard/contacts/contacts.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/home', 
    pathMatch: 'full' 
  },
  // { path: '**', redirectTo: '/pagenotfound', pathMatch: 'full' },

  {
    component: HomeComponent,
    path: 'home'
  },
  {
    component: LoginComponent,
    path: 'login'
  },
  {
    component: SignupComponent,
    path: 'signup'
  },
  {
    component: PracticePageComponent,
    path: 'practice-page'
  },
  {
    component: InitialsetupComponent,
    path: 'initialsetup',
    canActivate: [authGuard]
  },
  {
        component: DashboardComponent,
        path: 'dashboard',
        canActivate: [authGuard],
        children: [
          { path: 'sidenav', component: SidenavComponent, canActivate: [authGuard],},
          { path: 'header', component: HeaderComponent, canActivate: [authGuard], },
          { path: 'dashboardhome', component: DashboardhomeComponent, canActivate: [authGuard], },
          { path: 'dashhome', component: DashhomeComponent, canActivate: [authGuard], },
          { path: 'contacts', component: ContactsComponent, canActivate: [authGuard], },
        ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
