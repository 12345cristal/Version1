import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PagesNinoService {
  
  data = signal<any>({});

  saveStep(stepData: any) {
    this.data.update(old => ({ ...old, ...stepData }));
  }

  getAll() {
    return this.data();
  }

  reset() {
    this.data.set({});
  }

}
