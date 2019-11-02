import React, { useState, useEffect } from 'react'
import DayList from 'components/DayList'
import 'components/Application.scss'
import Appointment from 'components/appointment'
import useApplicationData from 'hooks/useApplicationData'
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from 'helpers/selectors'

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  return (
    <>
      <main className='layout'>
        <section className='sidebar'>
            <img
              className='sidebar--centered'
              src='images/logo.png'
              alt='Interview Scheduler'
            />
            <hr className='sidebar__separator sidebar--centered' />
            <nav className='sidebar__menu'>
              <DayList
                days = {state.days}
                day = {state.day}
                setDay = {setDay}
              />
            </nav>
            <img
              className='sidebar__lhl sidebar--centered'
              src='images/lhl.png'
              alt='Lighthouse Labs'
            />
        </section>
        <section className='schedule'>
          {
            getAppointmentsForDay(state, state.day).map(app => {
              const interview = getInterview(state, app.interview);
              const interviewers = getInterviewersForDay(state, state.day);
              // console.log(interviewers)
              return (
                <Appointment 
                  key={app.id} 
                  id={app.id}
                  time={app.time} 
                  interview={interview}
                  interviewers={interviewers}
                  bookInterview={bookInterview}
                  cancelInterview={cancelInterview} 
                />
              )
            })
          }
          <Appointment key='last' time='5pm' />
        </section>
      </main>
    </>
  )
}