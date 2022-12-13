import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaincontainerComponent } from './maincontainer/maincontainer.component';
import { SharedModule } from '../shared/shared.module';
import { HomepageComponent } from './homepage/homepage.component';
import { RouterModule } from '@angular/router';
import { SidemenuComponent } from './sidemenu/sidemenu.component';



@NgModule({
  declarations: [
    MaincontainerComponent,
    HomepageComponent,
    SidemenuComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    SharedModule
  ]
})
export class AppcontentModule { }
