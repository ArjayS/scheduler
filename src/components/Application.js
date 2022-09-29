import React, { useState, useEffect } from "react";
import "components/Application.scss";

import DayList from "./DayList";
import Appointment from "components/Appointment";
import axios from "axios";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const dailyInterviewers = getInterviewersForDay(state, state.day);

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const setDay = (day) => setState({ ...state, day });

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

  return (
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
            days={state.days}
            value={state.day}
            onChange={setDay}
            bookInterview={bookInterview}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => {
          const interview = getInterview(state, appointment.interview); // <----------
          return (
            <Appointment
              {...appointment}
              key={appointment.id}
              interviewers={dailyInterviewers}
              interview={interview}
              bookInterview={bookInterview}
              cancelInterview={cancelInterview}
            />
          );
        })}
        <Appointment key="last" time="5pm" bookInterview={bookInterview} />
      </section>
    </main>
  );
}
