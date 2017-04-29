import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4>Cities</h4>
    There are { props.cities.length } cities.
    {props.cities.map(city => <ListItem city={city}/>)}
  </div>
)

export default List;