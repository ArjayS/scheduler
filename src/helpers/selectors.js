const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3],
      interviewers: [1, 2],
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5],
      interviewers: [1, 2],
    },
  ],
  appointments: {
    1: { id: 1, time: "12pm", interview: null },
    2: { id: 2, time: "1pm", interview: null },
    3: {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 },
    },
    4: { id: 4, time: "3pm", interview: null },
    5: {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 },
    },
  },
  interviewers: {
    1: {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png",
    },
    2: {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png",
    },
  },
};

// OUTCOME
// {
//   "student": "Archie Cohen",
//   "interviewer": {
//     id: 2,
//     name: "Tori Malcolm",
//     avatar: "https://i.imgur.com/Nmx0Qxo.png",
//   }
// }

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
  });
  console.log(interviewersArr);
  // Getting the actual data for the state.appointments using the sorted appointmentsArr
  for (const interviewee of interviewersArr) {
    exactInterviewersArr.push(state.interviewers[interviewee]);
  }

  console.log(exactInterviewersArr);
  return exactInterviewersArr;
};

// getInterviewersForDay(state, "Monday");

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay };
