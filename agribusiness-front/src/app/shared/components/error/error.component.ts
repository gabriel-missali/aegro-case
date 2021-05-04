import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  @Input() tryAgainObservable: Observable<any>;

  constructor() { }

  ngOnInit(): void {
  }

  retry() {
    this.tryAgainObservable.subscribe();
  }

}
