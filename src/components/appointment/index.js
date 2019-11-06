import React from "react";
import "./styles.scss";
import Header from "components/appointment/Header";
import Empty from "components/appointment/Empty";
import Show from "components/appointment/Show";
import Form from "components/appointment/Form";
import Status from "components/appointment/Status";
import Confirm from "components/appointment/Confirm";
import useVisualMode from "hooks/useVisualMode";
import Error from "components/appointment/Error";

export default function Appointment(props) {
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const EDIT = "EDIT";
  const ERRCREATE = "ERRCREATE";
  const ERRDELETE = "ERRDELETE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(() => {
        transition(ERRCREATE, true);
      });
  }

  function cancel() {
    transition(CONFIRM);
  }

  function destroy() {
    transition(DELETE, true);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => {
        transition(ERRDELETE, true);
      });
  }

  function edit() {
    transition(EDIT);
    // console.log(props.interview.student)
  }

  return (
    <React.Fragment>
      <article className="appointment">
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onEdit={edit}
            onDelete={cancel}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
          />
        )}
        {mode === SAVING && <Status message="Saving" />}
        {mode === CONFIRM && <Confirm onCancel={back} onConfirm={destroy} />}
        {mode === DELETE && <Status message="Deleting" />}
        {mode === EDIT && (
          <Form
            name={props.interview.student}
            interviewers={props.interviewers}
            interviewer={props.interview.interviewer.id}
            onCancel={back}
            onSave={save}
          />
        )}
        {mode === ERRCREATE && (
          <Error message="Could not create appointment" onClose={back} />
        )}
        {mode === ERRDELETE && (
          <Error message="Could not delete appointment" onClose={back} />
        )}
      </article>
    </React.Fragment>
  );
}
