import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DictionaryStorageService {

  constructor() { }

  getStorage = (key: string) => {
    return localStorage.getItem(key)
  }

  saveInStorage = (key: string, value) => {
    const currentLocalStorage = this.getStorage(key);
  }
}
