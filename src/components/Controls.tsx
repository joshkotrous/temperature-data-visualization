import {
  Button,
  ButtonGroup,
  DateRangePicker,
  Calendar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import { CalendarDate, DateValue, DateDuration } from "@internationalized/date";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import React from "react";
interface ControlsProps {
  date: CalendarDate;
  setDate: React.Dispatch<React.SetStateAction<CalendarDate>>;
}

const Controls: React.FC<ControlsProps> = ({ date, setDate }) => {
  //   const [date, setDate] = useState<CalendarDate>(new CalendarDate(1950, 1, 1));
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(["years"]);
  const [incrementAmount, setIncrementAmount] = useState({
    years: 1,
    months: 0,
    days: 0,
  });
  const handleDrownDownChange = (event: any): void => {
    // Extract the new value from the event

    // console.log(event);
    // Update the state variable using the new value

    setSelectedKeys([event.anchorKey]);
    if (event.anchorKey === "months") {
      setIncrementAmount({
        months: 1,
        days: 0,
        years: 0,
      });
    } else if (event.anchorKey === "days") {
      setIncrementAmount({
        months: 0,
        days: 1,
        years: 0,
      });
    } else if (event.anchorKey === "years") {
      setIncrementAmount({
        months: 0,
        days: 0,
        years: 1,
      });
    } else if (event.anchorKey === "decades") {
      setIncrementAmount({
        months: 0,
        days: 0,
        years: 10,
      });
    }
  };
  const handleChange = (event: any): void => {
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
            setDate(date.subtract(incrementAmount));
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
        >
          {selectedKeys[0] === "months" && `${date.month}/${date.year}`}

          {(selectedKeys[0] === "years" || selectedKeys[0] === "decades") &&
            `${date.year}`}
        </Button>
        <Button
          onClick={() => {
            setDate(date.add(incrementAmount));
          }}
        >
          <IoIosArrowForward />
        </Button>
        <Dropdown>
          <DropdownTrigger>
            <Button className="capitalize">Increment: {selectedKeys}</Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Single selection example"
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedKeys}
            onSelectionChange={handleDrownDownChange}
          >
            <DropdownItem key="decades">Decades</DropdownItem>

            <DropdownItem key="years">Years</DropdownItem>

            <DropdownItem key="months">Months</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </ButtonGroup>
    </div>
  );
};

export default Controls;
