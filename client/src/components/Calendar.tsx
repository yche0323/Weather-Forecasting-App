import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";
import img from "../images/calendar-icon.svg";
import { format } from "date-fns";

interface CalendarProps {
  onDateSelect: (date: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectDate = (date: Date | null) => {
    setSelectedDate(date);
    setIsOpen(false);
    if (date) {
      const formattedDate: string = format(date, "yyyy-MM-dd");
      onDateSelect(formattedDate);
    } else {
      onDateSelect("");
    }
  };

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
