import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import DayListItem from "components/DayListItem"
import Button from "components/Button";
import "components/Application.scss";
import Appointment from 'components/appointment'
import axios from 'axios';

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Jones Miller-Lydia",
      interviewer: {
        id: 1,
        name: "Pfteven Sylvia",
        avatar: "https://api.adorable.io/avatars/285/phteven.png",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Logan Montana",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://api.adorable.io/avatars/285/phteven.png",
      }
    }
  }
];

export default function Application(props) {



  const [day, setDay] = useState("days");
  return (
    <>
    <main className="layout">
      <section className="sidebar">
          <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler"
          />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
            <DayList
              days = {days}
              day = {day}
              setDay = {day => setDay(day)}
            />
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
      </section>
      <section className="schedule">
        {
          appointments.map(app => {
            return <Appointment key={app.id} time={app.time} interview={app.interview} />
          })
        }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
    </>
  );
}

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
