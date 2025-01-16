import React from "react";

const formatTime = (isoTime) => {
  const date = new Date(isoTime);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${formattedMinutes} ${ampm}`;
};

const EventCard = ({ event, onClick }) => {
  const { user_det, job_id, summary, start, end } = event;
  const { handled_by } = user_det;

  return (
    <div className="event-card" onClick={onClick}>
      <h4 className="heading-event-card">{job_id.jobRequest_Title}</h4>
      <p className="interview-event-card">
        Interviewer: {handled_by.firstName}
      </p>
      <p className="time-event-card">
        Time: {formatTime(start)} to {formatTime(end)}
      </p>
    </div>
  );
};

export default EventCard;
