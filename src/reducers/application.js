export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

// getSpotsForDay Function updates
const getSpotsForDay = (state, dayObjName) => {
  return state.days
    .find((day) => day.name === dayObjName)
    .appointments.reduce((accumulator, currentValue) => {
      return state.appointments[currentValue].interview
        ? accumulator
        : accumulator + 1;
    }, 0);
};

export default function reducer(state, action) {
  switch (action.type) {
    // SET_DAY returns an updated state with a new day
    case SET_DAY:
      return {
        ...state,
        day: action.day,
      };

    // SET_APPLICATION_DATA returns an updated state with a new days, appointments, and interviewers database
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers,
      };

    // SET_INTERVIEW updates the states for both state.appointment for having (or not having) an interview, and state.days for updating the spots for that given day
    case SET_INTERVIEW: {
      const updatedStateAppointment = {
        ...state,
        appointments: {
          ...state.appointments,
          [action.id]: {
            ...state.appointments[action.id],
            interview: action.interview,
          },
        },
      };

      const days = state.days.map((dayObj) => ({
        ...dayObj,

        // Uses getSpotsForDay and takes in updated state for when a new interview (or not) is updated in /api/appointment route and takes in the specific day in /api/days route
        spots: getSpotsForDay(updatedStateAppointment, dayObj.name),
      }));

      return {
        ...updatedStateAppointment,
        days,
      };
    }

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
