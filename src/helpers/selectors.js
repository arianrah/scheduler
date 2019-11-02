export function getAppointmentsForDay(state, day) {
  const appointments=[];
  const filteredDays = state.days.find(dayCheck => dayCheck.name === day)
  if(!filteredDays) return appointments;
  for (let id of filteredDays.appointments) {
    appointments.push(state.appointments[id])
  }
  // console.log(appointments)
    return appointments;
}

  export function getInterview(state, interview) {
    if (interview == null){
      return null
    } else {
      let student = interview.student
      let interviewer = state.interviewers[interview.interviewer]
      let obj = {student, interviewer}
      return obj
    }
  }

  export function getInterviewersForDay(state, day){
    const interviewers=[];
    const filterDay = state.days.find(dayCheck => dayCheck.name === day)
    if(!filterDay) return interviewers;
    for (let id of filterDay.interviewers) {
      interviewers.push(state.interviewers[id])
    }
      return interviewers;
  }