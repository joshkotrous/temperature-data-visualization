import {
  Button,
  ButtonGroup,
  DateRangePicker,
  Calendar,
  Dropdown,
} from "@nextui-org/react";
import { CalendarDate, DateValue, DateDuration } from "@internationalized/date";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import React from "react";

const Controls = () => {
  const [date, setDate] = useState<CalendarDate>(new CalendarDate(1950, 1, 1));
  const [showCalendar, setShowCalendar] = useState(false);
  const handleChange = (event: CalendarDate): void => {
    // Extract the new value from the event
    const month = event.month;
    const day = event.day;
    const year = event.year;

    // console.log(event);
    // Update the state variable using the new value
    setDate(new CalendarDate(year, month, day));
    console.log(date);
  };
  return (
    <div className="absolute z-100 bottom-[30px] right-1/2 translate-x-1/2 w-[400px]">
      {showCalendar && (
        <Calendar
          showMonthAndYearPickers
          // defaultFocusedValue={new CalendarDate(1950, 10, 10)}
          value={date}
          onChange={handleChange}
        />
      )}
      <ButtonGroup>
        <Button
          onClick={() => {
            setDate(date.subtract({ years: 1 }));
          }}
        >
          <IoIosArrowBack />
        </Button>

        <Button
          onClick={() => {
            if (showCalendar) {
              setShowCalendar(false);
            } else {
              setShowCalendar(true);
            }
          }}
        >{`${date.month}/${date.day}/${date.year}`}</Button>
        <Button
          onClick={() => {
            setDate(date.add({ years: 1 }));
          }}
        >
          <IoIosArrowForward />
        </Button>
        <Button>Increment: Months</Button>
      </ButtonGroup>
    </div>
  );
};

export default Controls;
