import React, { useState, useEffect } from 'react'
import DayList from 'components/DayList'
import 'components/Application.scss'
import Appointment from 'components/appointment'
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from 'helpers/selectors'
import axios from 'axios'

export default function Application(props) {

  useEffect(()=>{
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then((all) =>{
      setState(prev => ({...prev, 
        days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data
      }))
    })
   }, [])
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: [],
    interviewers: {}
  })
  const setDay = (day) => {setState(prev => ({ ...prev, day }))}
  

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    // console.log('appointment bookInt', appointment)
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // console.log('appointments bookInt', appointments)
    return axios.put (`/api/appointments/${id}`, {interview})
    .then(()=>{
      setState({
        ...state,
        appointments
      })
    })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    // console.log('appointment Cancel Int', appointment)
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // console.log('appointments Cancel Int', appointments)

   
  
    return axios.delete (`/api/appointments/${id}`)
    .then(()=>{
      setState({
        ...state,
        appointments
      })
    })
  }

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