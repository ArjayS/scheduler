import React from "react";
import "./styles.scss";

import Headers from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview } = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    if ((name, interviewer)) {
      transition(SAVING);
    }

    const interview = {
      student: name,
      interviewer,
    };

    const bookPromise = bookInterview(id, interview);
    console.log(bookPromise);
    bookPromise.then(() => {
      transition(SHOW);
    });
  };

  return (
    <article className="appointment">
      <Headers time={time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          id={id}
          student={interview.student}
          interviewer={interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          student=""
          // interviewer={[]}
          interviewers={interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
    </article>
  );
}
