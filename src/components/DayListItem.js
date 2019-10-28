import React from "react";
import classNames from "classnames";

import 'components/DayListItem.scss'

export default function DayListItem(props) {
  
  const dayClass = classNames({
    'day-list__item': true,
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots <= 0
  });

  const spotter = function(spots){
    let print;
    if (spots === 1){
      print = '1 spot remaining';
      return print;
    } else if (spots === 0){
      print = 'no spots remaining';
      return print;
    } else {
      print = `${spots} spots remaining`;
      return print;
    }
  };

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{spotter(props.spots)}</h3>  
    </li>
  );
}