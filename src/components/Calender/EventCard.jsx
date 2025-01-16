import { Pencil, Trash2 } from "lucide-react";

const EventCard = ({ event, onClick, isGrouped }) => {
  const { user_det, job_id, summary, start, end } = event;
  const { handled_by } = user_det;

  const formatTime = (isoTime) => {
    const date = new Date(isoTime);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${formattedMinutes} ${ampm}`;
  };

  const eventDate = new Date(start);
  const formattedDate = `${eventDate.getDate()} ${eventDate.toLocaleString(
    "en",
    { month: "short" }
  )} ${eventDate.getFullYear()}`;

  return (
    <div className={`event-card ${isGrouped ? "grp-event-card":""}`} onClick={onClick}>
      {isGrouped ? (
        <div className="grouped-edit">
          <h4 className="heading-event-card">{job_id.jobRequest_Title}</h4>{" "}
          <span className="icon-box">
            <Pencil /> <Trash2 color="#ff0000" />
          </span>
        </div>
      ) : (
        <h4 className="heading-event-card">{job_id.jobRequest_Title}</h4>
      )}

      {isGrouped ? (
        <div className="grouped-flex-box">
          <p className="summary-grouped">{summary}</p>
          <p className="interviewer-grouped">
            Interviewer: {handled_by.firstName}
          </p>
        </div>
      ) : (
        <p className="interview-event-card">
          Interviewer: {handled_by.firstName}
        </p>
      )}

      {isGrouped ? (
        <div className="grouped-flex-box">
          <p className="date-grouped">Date: {formattedDate}</p>
          <p className="time-grouped">
            Time: {formatTime(start)} to {formatTime(end)}
          </p>
        </div>
      ) : (
        <p className="time-event-card">
          Time: {formatTime(start)} to {formatTime(end)}
        </p>
      )}
    </div>
  );
};

export default EventCard;
