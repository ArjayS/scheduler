//eslint-disable-next-line
import React, { useState, useEffect } from "react";
import "components/Application.scss";

import DayList from "./DayList";
import Appointment from "components/Appointment";

import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

import useApplicationData from "../hooks/useApplicationData";

export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  const dailyInterviewers = getInterviewersForDay(state, state.day);

  const dailyAppointmentsObject = getAppointmentsForDay(state, state.day);
  const dailyAppointments = dailyAppointmentsObject.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

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
  });

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
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
