import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const interviewClass = classNames({
    interviewers__item: true,
    "interviewers__item--selected": props.selected
  });

  return (
    <li
      className={interviewClass}
      onClick={props.setInterviewer && (() => props.setInterviewer(props.name))}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
