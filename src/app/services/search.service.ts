import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchService {

  private searchTrigger = new Subject<void>();
  trigger$ = this.searchTrigger.asObservable();

  constructor() {
    window.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.searchTrigger.next(); // 🔥 Solo dispara el evento
      }
    });
  }
}
