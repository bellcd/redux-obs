import React from 'react';
import { connect } from 'react-redux';
import { random, cancel, search } from '../reducers/beersActions'
import { setConfig } from '../reducers/configActions';
import BeerList from './BeersList';

export function Beers(props) {
  const { data, status, messages, search, random, cancel, config, setConfig } = props;
  return (
    <>
      <div className="App-inputs">
        <select
          name="per-page"
          defaultValue={config.perPage}
          onChange={event => setConfig({ perPage: Number(event.target.value)})}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => {
            return <option key={value} value={value}>{value} results</option>
          })}
        </select>
        {/* <button
          type="button"
          onClick={random}
        >Random</button> */}
        <input
          type="text"
          placeholder="Search beers"
          onChange={event => search(event.target.value)}
        />
        {status === 'pending' && (
          <>
            <span className="App-spinner">
              loading...
            </span>
            <button type="button" onClick={cancel}>cancel</button>
          </>
        )}
      </div>
      {status === 'success' && (
        <div className="App-content">
          <BeerList beers={data} />
        </div>
      )}
      {status === 'failure' && (
        <div className="App-content">
          <p>Oops! {messages[0].text}</p>
        </div>
      )}
    </>
  )
}

function mapStateToProps(state) {
  return {
    ...state.beers,
    config: state.config
  }
}

export default connect(mapStateToProps, { random, search, cancel, setConfig })(Beers);