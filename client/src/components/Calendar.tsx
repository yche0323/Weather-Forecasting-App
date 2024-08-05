import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";
import img from "../images/calendar-icon.svg";
import { format, addDays, isBefore, isAfter } from "date-fns";

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
    if (date) {
      const minDate = new Date("2016-01-01");
      const maxDate = addDays(new Date(), 15);

      if (isBefore(date, minDate)) {
        alert("Selected date cannot be before 2016-01-01.");
        return;
      }

      if (isAfter(date, maxDate)) {
        alert(
          `Selected date cannot be after ${maxDate.getFullYear()}-${String(
            maxDate.getMonth() + 1
          ).padStart(2, "0")}-${String(maxDate.getDate()).padStart(2, "0")}.`
        );
        return;
      }

      setSelectedDate(date);
      setIsOpen(false);
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
