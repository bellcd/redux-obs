import { switchMap, map, debounceTime, delay, filter, catchError, takeUntil, tap, mapTo, withLatestFrom, pluck } from 'rxjs/operators';
import { concat, of, merge, fromEvent, race } from 'rxjs';
import { fetchFailed, fetchFulfilled, SEARCH, CANCEL, setStatus, reset } from '../reducers/beersActions';
import { ofType } from 'redux-observable';

const search = (apiBase, perPage, term) =>
  `${apiBase}?beer_name=${encodeURIComponent(term)}&per_page=${perPage}`

export function fetchBeersEpic(action$, state$, { getJSON, document }) {
  return action$.pipe(
    ofType(SEARCH),
    debounceTime(500),
    filter(({ payload }) => payload.trim() !== ''),
    withLatestFrom(state$.pipe(pluck('config'))),
    switchMap(([{ payload }, config]) => {
      const ajax$ = getJSON(search(config.apiBase, config.perPage, payload)).pipe(
        // delay(3000),
        map(response => fetchFulfilled(response)),
        catchError(error => {
          console.error(error);
          return of(fetchFailed(error.response.message))
        })
      );

      const blocker$ = merge(
        action$.pipe(ofType(CANCEL)),
        fromEvent(document, 'keyup').pipe(
          filter(event => event.key === 'Escape' || event.key === 'Esc')
        )
      ).pipe(mapTo(reset()))

      return concat(
        of(setStatus('pending')),
        race(ajax$, blocker$)
      )
    })
  );
}