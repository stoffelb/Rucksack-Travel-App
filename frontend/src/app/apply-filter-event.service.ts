import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApplyFilterEventService {
  private applyFilterSubject = new Subject<any>();

  constructor() { }

  publishSomeData(data: any) {
    this.applyFilterSubject.next(data);
  }

  getObservable(): Subject<any> {
    return this.applyFilterSubject;
  }
}
