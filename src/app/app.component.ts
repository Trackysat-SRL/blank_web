import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'seqprocessWeb';
  currentLang: string;
  constructor (private translate: TranslateService) {
    this.translate.addLangs(['it', 'en']);
    this.translate.setDefaultLang('it');
    this.translate.use('it');
    this.currentLang = 'it';
  }

  useLanguage(language: string) {
    this.translate.use(language);
    this.currentLang = language;
  }
}
