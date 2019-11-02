import React, {useState, Fragment, useEffect} from 'react';
import axios from 'axios';

export default function useApplicationData (){
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
  return {
    cancelInterview, 
    bookInterview, 
    state, 
    setDay
  }
}