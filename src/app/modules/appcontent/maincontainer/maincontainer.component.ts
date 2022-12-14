import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-maincontainer',
  templateUrl: './maincontainer.component.html',
  styleUrls: ['./maincontainer.component.scss'],
})
export class MaincontainerComponent {
  @HostBinding('class') componentCssClass : any;
  profile: any;
  opened: boolean = false;
  openedsettings: boolean = false;
  theme: string = 'blue-theme';

  constructor(private helper: HelperService,public overlayContainer: OverlayContainer,public appcomponent: AppComponent){
    this.profile = this.helper.getProfile();
  }


  toggleSettings(){
    this.openedsettings=!this.openedsettings;
  }

  onSetTheme(theme: string) {
    this.theme = theme;
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(overlayContainerClasses).filter((item: string) => item.includes('-theme'));
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(theme);
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
  }
}
