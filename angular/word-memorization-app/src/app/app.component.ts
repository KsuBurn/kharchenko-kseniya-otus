import { Component } from '@angular/core';
import {SettingsService} from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Words Memorizing';

  constructor(private readonly settings: SettingsService) {
  }

  get langFrom(): string {
    return this.settings.langFrom;
  }

  get langTo(): string {
    return this.settings.langTo;
  }
}
