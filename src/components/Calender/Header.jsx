import React from "react";

import { Plus } from "lucide-react";

const Header = ({ view, setView, selectedDate, setSelectedDate }) => {
  const handleNext = () => {
    const newDate = new Date(selectedDate);
    if (view === "week") newDate.setDate(newDate.getDate() + 7);
    else if (view === "day") newDate.setDate(newDate.getDate() + 1);
    else if (view === "month") newDate.setMonth(newDate.getMonth() + 1);
    else if (view === "year") newDate.setFullYear(newDate.getFullYear() + 1);
    setSelectedDate(newDate);
  };

  const handlePrevious = () => {
    const newDate = new Date(selectedDate);
    if (view === "week") newDate.setDate(newDate.getDate() - 7);
    else if (view === "day") newDate.setDate(newDate.getDate() - 1);
    else if (view === "month") newDate.setMonth(newDate.getMonth() - 1);
    else if (view === "year") newDate.setFullYear(newDate.getFullYear() - 1);
    setSelectedDate(newDate);
  };

  const getDisplayText = () => {
    const formatWeekDate = (date, includeYear = false) => {
      const day = date.getDate();
      const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
        date
      );
      const year = date.getFullYear();
  
      // Add ordinal suffix as superscript
      const ordinalSuffix = (day) => {
        if (day % 10 === 1 && day !== 11) return `<sup>st</sup>`;
        if (day % 10 === 2 && day !== 12) return `<sup>nd</sup>`;
        if (day % 10 === 3 && day !== 13) return `<sup>rd</sup>`;
        return `<sup>th</sup>`;
      };
  
      const dayWithSuffix = `${day}${ordinalSuffix(day)}`;
      return includeYear
        ? `${dayWithSuffix} ${month}, ${year}`
        : `${dayWithSuffix} ${month}`;
    };
  
    if (view === "day") {
      return formatWeekDate(selectedDate, true); 
    } else if (view === "week") {
      const startOfWeek = new Date(selectedDate);
      startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay()); 
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
  
      return `${formatWeekDate(startOfWeek)} to ${formatWeekDate(
        endOfWeek,
        true
      )}`;
    } else if (view === "month") {
      return selectedDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    } else if (view === "year") {
      return selectedDate.getFullYear(); 
    }
  };
  

  return (
    <>
      <div className="header-top-box">
        <button className="sch-button">
          <Plus /> Create Schedule
        </button>
      </div>
      <div className="header">
        <div className="prev-next-button-div">
          <button onClick={handlePrevious} className="prev-next-button">
            {"<"}
          </button>
          <button onClick={handleNext} className="prev-next-button">
            {">"}
          </button>
        </div>
        <h2
          dangerouslySetInnerHTML={{
            __html: getDisplayText(),
          }}
        ></h2>
        <div className="view-buttons">
          {["day", "week", "month", "year"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`view-button ${view === v ? "active" : ""}`}
            >
              {v.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
