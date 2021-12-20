import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor() { }

  translate = (word: string, langFrom: string, langTo: string) => {
    fetch(`https://api.mymemory.translated.net/get?q=${word}&langpair=${langFrom}|${langTo}`)
      .then(response => response.json())
      .then(result => {
        console.log(result)
      });
  }
}
