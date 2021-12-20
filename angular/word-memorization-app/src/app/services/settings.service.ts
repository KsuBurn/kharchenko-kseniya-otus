import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private settings = new BehaviorSubject<{
    langFrom: string,
    langTo: string,
  }>({
    langFrom: 'en',
    langTo: 'ru',
  });

  get langFrom(): string {
    return this.settings.getValue().langFrom;
  }

  get langTo(): string {
    return this.settings.getValue().langTo;
  }

  constructor() {
    this.settings.subscribe((settings: { langFrom: string, langTo: string }) => {
      this.settings.next(settings);
    })
  }

  changeSettings = (settings: { langFrom: string, langTo: string }) => {
    this.settings.next(settings);
  }
}
