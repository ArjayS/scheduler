import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days, day, setDay } = props;
  return (
    <ul>
      {days.map((dayPer) => (
        <DayListItem
          key={dayPer.id}
          selected={dayPer.name === day}
          setDay={setDay}
          {...dayPer}
        />
      ))}
    </ul>
  );
}
