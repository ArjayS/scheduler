// getAppointmentsForDay accepts the state and the state.day arguments to obtain the exact appointment for that specific day from the /api/days route
const getAppointmentsForDay = (state, day) => {
  const exactAppointmentsArr = [];
  const appointmentsArr = [];

  // Mapping through the state.days
  state.days.map((daySelect) => {
    // Finding the correct day inside the state.days to get the state.days.appointments array(appointmentsArr)
    if (daySelect.name === day) {
      daySelect.appointments.forEach((appointmentId) =>
        appointmentsArr.push(appointmentId)
      );
    }

    return appointmentsArr;
  });

  // Getting the actual data for the state.appointments using the sorted appointmentsArr
  for (const appointment of appointmentsArr) {
    exactAppointmentsArr.push(state.appointments[appointment]);
  }

  return exactAppointmentsArr;
};

// getInterview Function accepts state and appointment.interview arguments to obtain the exact interview details (student, and interviewer) from the /api/appointment route
const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  }

  if (interview) {
    const interviewTime = [interview.interviewer];
    return {
      student: interview.student,
      interviewer: state.interviewers[interviewTime],
    };
  }
};

// getInterviewersForDay accepts the state and the state.day arguments to obtain the exact interviewers for that specific day from the /api/days route
const getInterviewersForDay = (state, day) => {
  const exactInterviewersArr = [];
  const interviewersArr = [];

  // Mapping through the state.days
  state.days.map((daySelect) => {
    // Finding the correct day inside the state.days to get the state.days.appointments array(appointmentsArr)
    if (daySelect.name === day) {
      daySelect.interviewers.forEach((interviewerId) =>
        interviewersArr.push(interviewerId)
      );
    }

    return interviewersArr;
  });

  // Getting the actual data for the state.appointments using the sorted interviewersArr
  for (const interviewee of interviewersArr) {
    exactInterviewersArr.push(state.interviewers[interviewee]);
  }

  return exactInterviewersArr;
};

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay };
