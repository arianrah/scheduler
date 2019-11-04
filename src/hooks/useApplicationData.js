import { useEffect, useReducer } from "react";
import axios from "axios";

const initialState = {
  day: "Monday",
  days: [],
  appointments: [],
  interviewers: {}
};

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const NULL_INTERVIEW = "NULL_INTERVIEW";
const ADD_SPOT = "ADD_SPOT";
const SUB_SPOT = "SUB_SPOT";

export default function useApplicationData() {
  let [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    const { day, days, appointments, interviewers, id, interview } = action;

    switch (action.type) {
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
      case SET_DAY:
        return { ...state, day };
      case SET_APPLICATION_DATA:
        return { ...state, days, appointments, interviewers };
      case SET_INTERVIEW: {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        return { ...state, appointments };
      }
      case NULL_INTERVIEW: {
        const appointment = {
          ...state.appointments[id],
          interview: null
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        return { ...state, appointments };
      }
      case ADD_SPOT: {
        const days = state.days.map(r => {
          if (r.name !== state.day) {
            return r;
          }
          return { ...r, spots: r.spots + 1 };
        });
        return { ...state, days };
      }
      case SUB_SPOT: {
        const days = state.days.map(r => {
          if (r.name !== state.day) {
            return r;
          }
          return { ...r, spots: r.spots - 1 };
        });
        return { ...state, days };
      }
    }
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      });
    });
  }, []);

  const setDay = day => dispatch({ type: SET_DAY, day });

  async function bookInterview(id, interview) {
    await axios.put(`/api/appointments/${id}`, { interview });
    let x = state.day;
    dispatch({ type: SET_INTERVIEW, id, interview });
    dispatch({ type: SUB_SPOT, x });
  }

  async function cancelInterview(id) {
    await axios.delete(`/api/appointments/${id}`);
    let x = state.day;
    dispatch({ type: NULL_INTERVIEW, id });
    dispatch({ type: ADD_SPOT, x });
  }

  return {
    cancelInterview,
    bookInterview,
    state,
    setDay
  };
}
