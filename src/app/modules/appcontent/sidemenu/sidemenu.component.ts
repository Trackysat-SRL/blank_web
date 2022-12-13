import { Component } from '@angular/core';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent {
  displayMode: any;
  profile: any;
  role: string = '';
  constructor(
    private helper: HelperService,
  ) {
    this.profile = this.helper.getProfile();
  }

  ngOnInit() {
    this.role = this.helper.getRole(this.profile);
  }
}
