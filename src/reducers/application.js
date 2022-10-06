export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

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
    case SET_DAY:
      return {
        ...state,
        day: action.day,
      };

    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers,
      };

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
