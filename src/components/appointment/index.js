import React from "react";
import './styles.scss';
import Header from "components/appointment/Header";
import Empty from "components/appointment/Empty";
import Show from "components/appointment/Show";
// import Confirm from "components/appointment/Confirm";
// import Status from "components/appointment/Status";
// import Error from "components/appointment/Error";
// import Form from 'components/appointment/Form';
export default function Appointment(props) {
  console.log(props.key)

  return (
    <React.Fragment>
      <article className="appointment"></article>
      <Header time={props.time}/>
        { props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty /> }
    </React.Fragment>
  )
}