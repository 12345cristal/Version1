import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchService {

  private searchSubject = new Subject<string>();
  search$ = this.searchSubject.asObservable();

  constructor() {
    window.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const query = prompt('Buscar personal:');
        if (query) this.searchSubject.next(query);
      }
    });
  }
}
