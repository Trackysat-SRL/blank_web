import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardGuard } from './guard/guard.guard';
import { HomepageComponent } from './modules/appcontent/homepage/homepage.component';
import { MaincontainerComponent } from './modules/appcontent/maincontainer/maincontainer.component';
import { LoginComponent } from './modules/login/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    data: { title: 'Autenticazione' },
    component: LoginComponent,
  },
  {
    path : '',
    component: MaincontainerComponent,
    children : [
      {
        path: 'dashboard',
        data: { title: "homepage" },
        component: HomepageComponent,
        canActivate: [GuardGuard],
      },
    ]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
