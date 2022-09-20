import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props;
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map((interviewerPer) => (
          <InterviewerListItem
            key={interviewerPer.id}
            selected={interviewerPer.id === value}
            setInterviewer={() => onChange(interviewerPer.id)}
            {...interviewerPer}
          />
        ))}
      </ul>
    </section>
  );
}
