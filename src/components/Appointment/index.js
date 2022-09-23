import React from "react";
import "./styles.scss";

import Headers from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {
  const { id, time, interview } = props;
  return (
    <article className="appointment">
      <Headers time={time} />
      {interview && (
        <Show
          id={id}
          student={interview.student}
          interviewer={interview.interviewer.name}
        />
      )}
      {!interview && <Empty />}
    </article>
  );
}
