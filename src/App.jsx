import React, { useState, useEffect } from "react";
import Calendar from "./components/Calender/Calender";
import "../src/components/Calender/Calendar.css";

const App = () => {
  const [isScreenWideEnough, setIsScreenWideEnough] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth <= 1025) {
        setIsScreenWideEnough(false);
      } else {
        setIsScreenWideEnough(true);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="App">
      {!isScreenWideEnough ? (
        <div className="message">
          <p>
            Oops! 😅 It looks like your screen is a bit small for the calendar.
            📅 Please try viewing it on a larger screen (wider than 1025px) for
            the best experience. 🙏
          </p>
        </div>
      ) : (
        <Calendar />
      )}
    </div>
  );
};

export default App;
