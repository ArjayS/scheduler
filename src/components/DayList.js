import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days, value, onChange } = props;
  return (
    <ul>
      {days.map((dayPer) => (
        <DayListItem
          key={dayPer.id}
          selected={dayPer.name === value}
          setDay={onChange}
          {...dayPer}
        />
      ))}
    </ul>
  );
}
