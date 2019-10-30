export function getAppointmentsForDay(state, day) {
  console.log(day)
  const filteredDays = state.days.filter(day => day.name === day);
  return filteredDays;
}

export function selectUserByName(state, name) {
  const filteredNames = state.users.filter(user => user.name === name);
  return filteredNames;
}