import { useState, useEffect } from "react";
import axios from "axios";

const getSpotsForDay = (state, dayObjName) => {
  return state.days
    .find((day) => day.name === dayObjName)
    .appointments.reduce((accumulator, currentValue) => {
      return state.appointments[currentValue].interview
        ? accumulator
        : accumulator + 1;
    }, 0);
};

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    const daysAPI = axios.get("/api/days");
    const appointmentsAPI = axios.get("/api/appointments");
    const interviewersAPI = axios.get("/api/interviewers");

    const allPromises = [daysAPI, appointmentsAPI, interviewersAPI];

    Promise.all(allPromises).then((promises) => {
      setState((prev) => ({
        ...state,
        days: promises[0].data,
        appointments: promises[1].data,
        interviewers: promises[2].data,
      }));
    });
  }, []);
  // console.log(state.days);
  const bookInterview = (id, interview) => {
    return axios.put(`api/appointments/${id}`, { interview }).then((res) => {
      // console.log(id);
      const updatedStateAppointment = {
        ...state,
        appointments: {
          ...state.appointments,
          [id]: {
            ...state.appointments[id],
            interview: { ...interview },
          },
        },
      };

      const days = state.days.map((dayObj) => ({
        ...dayObj,
        spots: getSpotsForDay(updatedStateAppointment, dayObj.name),
      }));

      setState({ ...updatedStateAppointment, days });
    });
  };

  const cancelInterview = (id) => {
    return axios.delete(`api/appointments/${id}`).then((res) => {
      // console.log(id);

      const updatedStateAppointment = {
        ...state,
        appointments: {
          ...state.appointments,
          [id]: {
            ...state.appointments[id],
            interview: null,
          },
        },
      };

      const days = state.days.map((dayObj) => ({
        ...dayObj,
        spots: getSpotsForDay(updatedStateAppointment, dayObj.name),
      }));

      setState({ ...updatedStateAppointment, days });
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
