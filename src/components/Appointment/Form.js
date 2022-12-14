import React, { useState } from "react";

import Button from "../Button";
import InterviewerList from "../InterviewerList";

export default function Form(props) {
  const { student, interviewer, interviewers, onSave, onCancel } = props;

  const [studentName, setStudentName] = useState(student || "");
  const [interviewerId, setInterviewerId] = useState(interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setStudentName("");
    setInterviewerId(null);
  };

  const cancel = () => {
    reset();
    onCancel();
  };

  function validate() {
    if (studentName === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (interviewerId === null) {
      setError("Please select an interviewer");
      return;
    }

    setError("");
    onSave(studentName, interviewerId);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="Student Name"
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => {
              setStudentName(event.target.value);
              setError("");
            }}
            value={studentName}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          /* your code goes here */
          interviewers={interviewers}
          onChange={setInterviewerId}
          value={interviewerId}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
