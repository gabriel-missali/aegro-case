import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { doOnSubscribe } from "../utils/observable.util";

@Injectable()
export class BaseRequestObject<T, R = T> {

  observable: Observable<T>;
  loading = false;
  error = false;
  response: R;

  showContent = () => !this.loading && !this.error;

  constructor(requestObservable?: Observable<any>) {
    if (!requestObservable) {
      requestObservable = of(null);
    }

    this.observable = requestObservable.pipe(
      doOnSubscribe(() => {
        this.loading = true;
        this.error = false;
      }),
      finalize(() => this.loading = false),
      catchError(error => {
        this.error = true;
        return throwError(error);
      }),
    );
  }
}