import React from 'react';

export default function BeersList(props) {
  return (
    <ul>
      {props.beers.map(beer => {
        return (
          <li key={beer.id}>
            <figure>
              <img src={beer.image_url}></img>
            </figure>
            <div>
              <p>{beer.name}</p>
              <ul>
                {/* <li><small>ABV: {beer.abv}</small></li> */}
                {/* <li><small>Volume: {beer.volume.unit} {beer.volume.unit}</small></li> */}
              </ul>
            </div>
          </li>
        )
      })}
    </ul>
  );
}