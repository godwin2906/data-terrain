import React from "react";
import gmeet from "../../assets/g_meet.png";
import { Eye, Download } from "lucide-react";

const EventPopup = ({ event, onClose }) => {
  const startTime = new Date(event.start).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endTime = new Date(event.end).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const interviewDate = new Date(event.start).toLocaleDateString();

  return (
    <div className="event-popup-overlay">
      <button className="popup-close-btn" onClick={onClose}>
        &times;
      </button>
      <div className="event-box-pop">
        <div className="event-popup">
          <div className="popup-left">
            <h2>Interview with:</h2>
            <p>{`${event.user_det.candidate.candidate_firstName} ${event.user_det.candidate.candidate_lastName}`}</p>
            <p>Position: {event.job_id.jobRequest_Title}</p>
            <p>Interview Date: {interviewDate}</p>
            <p>Interview Time: {`${startTime} - ${endTime}`}</p>
            <p>Interview via: Google Meet</p>

            {/* Resume and Aadharcard Buttons */}
            <div className="document-buttons">
              <button className="doc-button">
                <span>Resume.docx</span>
                <i className="eye-icon">
                  <Eye /> <Download />
                </i>
              </button>
              <button className="doc-button">
                <span>Aadharcard</span>
                <i className="eye-icon">
                  <Eye /> <Download />
                </i>
              </button>
            </div>
          </div>
          <div className="popup-right">
            <img src={gmeet} alt="Google Meet" />
            <button
              className="join-btn"
              onClick={() => window.open(event.link, "_blank")}
            >
              Join Meeting
            </button>
            <button className="close-btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPopup;
