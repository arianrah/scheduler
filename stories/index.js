
import React, { Fragment } from 'react'

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import DayListItem from "components/DayListItem"
import DayList from "components/DayList";
import Button from "components/Button";
import InterviewerListItem from "components/InterviewerListItem";
import InterviewerList from "components/InterviewerList";
import Appointment from "components/appointment/";
import Header from "components/appointment/Header";
import Empty from "components/appointment/Empty";
import Show from "components/appointment/Show";
import Confirm from "components/appointment/Confirm";
import Status from "components/appointment/Status";
import Error from "components/appointment/Error";
import Form from 'components/appointment/Form';

import "index.scss";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};
const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button clickable onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));
  storiesOf("DayListItem", module)
    .addParameters({
      backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
    }) 
    .add("Unselected", () => <DayListItem name="Monday" spots={5} />)
    .add("Selected", () => <DayListItem name="Monday" spots={5} selected />) 
    .add("Full", () => <DayListItem name="Monday" spots={0} />)
    .add("Clickable", () => (
      <DayListItem name="Tuesday" setDay={action("setDay")} spots={5} />
    ));

  storiesOf("DayList", module)
    .addParameters({
      backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
    })
    .add("Monday", () => (
      <DayList days={days} day={"Monday"} setDay={action("setDay")} />
    ))
    .add("Tuesday", () => (
      <DayList days={days} day={"Tuesday"} setDay={action("setDay")} />
    ));

  storiesOf("InterviewerListItem", module)
    .addParameters({
      backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
    })
    .add("Unselected", () => (
      <InterviewerListItem
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
      />
    ))
    .add("Selected", () => (
      <InterviewerListItem
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected
      />
    ))
    .add("Clickable", () => (
      <InterviewerListItem
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        setInterviewer={() => action("setInterviewer")(interviewer.id)}
      />
    ));
  storiesOf("InterviewerList", module)
    .addParameters({
      backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
    })
    .add("Initial", () => (
      <InterviewerList
        interviewers={interviewers}
        setInterviewer={action("setInterviewer")}
      />
    ))
    .add("Preselected", () => (
      <InterviewerList
        interviewers={interviewers}
        interviewer={3}
        setInterviewer={action("setInterviewer")}
      />
    ));
  storiesOf("Appointment", module)
    .addParameters({
      backgrounds: [{ name: "white", value: "#fff", default: true }]
    })
    .add("Appointment", () => <Appointment />)
    .add("Appointment with Time", () => <Appointment time="12pm" />)
    .add("Appointment Empty", () => (
      <Fragment>
        <Appointment id={1} time="12pm" />
        <Appointment id="last" time="1pm" />
      </Fragment>
    ))
    .add("Appointment Booked", () => (
      <Fragment>
        <Appointment
          id={1}
          time="12pm"
          interview={{ student: "Lydia Miller-Jones", interviewer }}
        />
        <Appointment id="last" time="1pm" />
      </Fragment>
    ))
    .add("Header", () => <Header time="12pm" />)
    .add("Empty", () => <Empty onAdd={action("onAdd")} />)
    .add("Show", () => <Show student="Phteven" interviewer={interviewer} onEdit={action("onEdit")} onDelete={action("onDelete")} />)
    .add("Confirm", () => <Confirm onConfirm={action("onConfirm")} onCancel={action("onCancel")}/>)
    .add("Status", () => <Status message='lolz get deleted' />)
    .add("Error", () => <Error onClose={action("onClose")} />)
    .add("Form Create", () => (
      <Form 
        interviewers={interviewers}
        onSave={action("onSave")}
        onCancel={action("onCancel")}
      />))
    .add("Form Edit", () => (
      <Form 
        name="Phteven"
        interviewers={interviewers}
        interviewer={interviewer.id}
        onSave={action("onSave")}
        onCancel={action("onCancel")}
      />))