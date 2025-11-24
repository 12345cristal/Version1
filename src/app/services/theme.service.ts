import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private themeSubject = new BehaviorSubject<'light' | 'dark'>('light');
  theme$ = this.themeSubject.asObservable();

  constructor() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      this.setDark();
    } else {
      this.setLight();
    }
  }

  /** ⭐ GETTER PÚBLICO QUE SOLUCIONA TU ERROR */
  get currentTheme(): 'light' | 'dark' {
    return this.themeSubject.value;
  }

  toggleTheme() {
    const current = this.themeSubject.value;
    current === 'light' ? this.setDark() : this.setLight();
  }

  setLight() {
    document.documentElement.classList.remove('dark-theme');
    document.documentElement.classList.add('light-theme');
    localStorage.setItem('theme', 'light');
    this.themeSubject.next('light');
  }

  setDark() {
    document.documentElement.classList.remove('light-theme');
    document.documentElement.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
    this.themeSubject.next('dark');
  }
}
