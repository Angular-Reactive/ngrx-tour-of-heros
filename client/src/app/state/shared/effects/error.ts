import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import { map, tap } from "rxjs/operators";
import { HTTP_ERROR, HttpError } from "../actions/error";
import { SnackbarOpen } from "../actions/snackbar";

@Injectable()
export class ErrorEffects {

  @Effect()
  showError: Observable<any> = this.actions
    .pipe(
      ofType<HttpError>(HTTP_ERROR),
      tap(action => console.error(action.payload)),
      map(action => {
        if(action.payload.status !== undefined && action.payload.status == 0) {
          return `This is embarrassing, we're having an issue.`
        }
        return action.payload.message;
      }),
      map(message => new SnackbarOpen({ message: message }))
    );

  constructor(private actions: Actions) {
  }

}
