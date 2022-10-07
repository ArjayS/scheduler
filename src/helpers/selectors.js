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

  // console.log(exactAppointmentsArr);
  return exactAppointmentsArr;
};

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

const getInterviewersForDay = (state, day) => {
  const exactInterviewersArr = [];
  const interviewersArr = [];

  // Mapping through the state.days
  state.days.map((daySelect) => {
    // Finding the correct day inside the state.days to get the state.days.appointments array(appointmentsArr)
    if (daySelect.name === day) {
      console.log(daySelect.interviewers);
      daySelect.interviewers.forEach((interviewerId) =>
        interviewersArr.push(interviewerId)
      );
    }

    return interviewersArr;
  });

  // Getting the actual data for the state.appointments using the sorted appointmentsArr
  for (const interviewee of interviewersArr) {
    exactInterviewersArr.push(state.interviewers[interviewee]);
  }

  return exactInterviewersArr;
};

// getInterviewersForDay(state, "Monday");

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay };
