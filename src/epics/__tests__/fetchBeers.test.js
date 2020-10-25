import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { fetchFulfilled, search, setStatus } from '../../reducers/beersActions';
import { initialState } from '../../reducers/configReducer';
import { fetchBeersEpic } from '../fetchBeers';

it('produces correct actions', () => {
  const testScheduler = new TestScheduler((actual, expected) => {
    return expect(actual).toEqual(expected);
  });

  testScheduler.run(({ hot, cold, expectObservable }) => {
    const action$ = hot('a', {
      a: search('ship')
    });
    const state$ = of({
      config: initialState
    });
    const dependencies = {
      getJSON: url => {
        return cold('-a', {
          a: [{ name: 'Beer 1' }]
        })
      }
    };
    const output$ = fetchBeersEpic(action$, state$, dependencies);
    expectObservable(output$).toBe('500ms a-b', {
      a: setStatus('pending'),
      b: fetchFulfilled([{ name: 'Beer 1' }])
    })
  });
});