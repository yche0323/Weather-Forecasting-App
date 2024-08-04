import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";
import img from "../images/calendar-icon.svg";
import { format } from "date-fns";

interface CalendarProps {
  onDateSelect: (date: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectDate = (date: Date | null) => {
    setIsOpen(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  useEffect(() => {
    const formattedDate: string = format(selectedDate, "yyyy-MM-dd");
    onDateSelect(formattedDate);
  }, [selectedDate, onDateSelect]);

  return (
    <div>
      <button className="button" onClick={handleButtonClick}>
        <img src={img} alt="Calendar Icon" />
      </button>

      {isOpen && (
        <div style={{ position: "absolute", zIndex: 1000, marginTop: "10px" }}>
          <DatePicker
            selected={selectedDate}
            onChange={handleSelectDate}
            inline
          />
        </div>
      )}
    </div>
  );
};

export default Calendar;
