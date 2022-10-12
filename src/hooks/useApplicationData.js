import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
} from "../reducers/application";

export default function useApplicationData(props) {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => dispatch({ type: SET_DAY, day: day });

  // using axios.get inside useEffect hook to obtain data from the running scheduler-api
  useEffect(() => {
    const daysAPI = axios.get("/api/days");
    const appointmentsAPI = axios.get("/api/appointments");
    const interviewersAPI = axios.get("/api/interviewers");

    const allPromises = [daysAPI, appointmentsAPI, interviewersAPI];

    Promise.all(allPromises).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      });
    });
  }, []);

  // bookInterview takes in an id and interview arguments to create a new appointment and saving it in the database using axios.put and then as a resonse it updates the front-end
  const bookInterview = (id, interview) => {
    return axios.put(`api/appointments/${id}`, { interview }).then((res) => {
      dispatch({ type: SET_INTERVIEW, id, interview });
    });
  };

  //cancelInterview only takes in an id to permanently delete that specific id in the database using axios.delete and then as a response it updates the front-end
  const cancelInterview = (id) => {
    return axios.delete(`api/appointments/${id}`).then((res) => {
      dispatch({ type: SET_INTERVIEW, id, interview: null });
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
