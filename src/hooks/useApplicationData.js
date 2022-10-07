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

  const bookInterview = (id, interview) => {
    return axios.put(`api/appointments/${id}`, { interview }).then((res) => {
      dispatch({ type: SET_INTERVIEW, id, interview });
    });
  };

  const cancelInterview = (id) => {
    return axios.delete(`api/appointments/${id}`).then((res) => {
      dispatch({ type: SET_INTERVIEW, id, interview: null });
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
