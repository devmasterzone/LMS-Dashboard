import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  getProfessorById(id: string) {
    throw new Error('Method not implemented.');
  }
  private idSource = new BehaviorSubject<string>('');
  currentId$ = this.idSource.asObservable();

  setId(id: string) {
    this.idSource.next(id);
  }
}
