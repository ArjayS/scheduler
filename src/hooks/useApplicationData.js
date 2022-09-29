import { useState, useEffect } from "react";
import axios from "axios";

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

  const bookInterview = (id, interview) => {
    return axios.put(`api/appointments/${id}`, { interview }).then((res) => {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview },
      };

      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };

      setState({ ...state, appointments });
    });
  };

  const cancelInterview = (id) => {
    return axios.delete(`api/appointments/${id}`).then((res) => {
      console.log(id);

      const appointment = {
        ...state.appointments[id],
        interview: null,
      };

      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };

      setState({ ...state, appointments });
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
