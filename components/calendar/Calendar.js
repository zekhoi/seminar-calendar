import { useEffect, useState } from "react";
import { renderCalender, isToday, getToday } from "../../utils/calendar";
import UpcomingEvent from "../item/EventItem";
import Loading from "../loader/Loading";
import NoItem from "../item/NoItem";
import Ping from "../loader/Ping";
import Day from "./Day";

export default function Calendar({ date = new Date(), events = [] }) {
  // const realDate = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const [calendar, setCalendar] = useState([]);
  const [currentYear, setCurrentYear] = useState(date.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(date.getMonth());
  const [currentDate, setCurrentDate] = useState(date.getDate());
  const [textMonth, setTextMonth] = useState(months[currentMonth]);
  const previousMonth = () => {
    if (currentMonth <= 0) {
      setCurrentMonth(11);
      setCurrentDate(1);
      setCurrentYear(currentYear - 1);
      return;
    }
    setCurrentDate(1);
    setCurrentMonth(currentMonth - 1);
  };
  const nextMonth = () => {
    if (currentMonth >= 11) {
      setCurrentMonth(0);
      setCurrentDate(1);
      setCurrentYear(currentYear + 1);
      return;
    }
    setCurrentDate(1);
    setCurrentMonth(currentMonth + 1);
  };

  useEffect(() => {
    setCalendar(renderCalender(currentYear, currentMonth));
    setTextMonth(months[currentMonth]);
    date.setFullYear(currentYear, currentMonth, currentDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonth]);

  return (
    <>
      <div className="w-full max-w-sm shadow-lg">
        <div className="p-5 bg-white rounded-t h-96">
          <div className="flex items-center justify-between px-3">
            <span
              tabIndex={0}
              className="text-base font-bold focus:outline-none"
            >
              {textMonth} {currentYear}
            </span>
            <div className="flex items-center">
              <button
                onClick={() => previousMonth()}
                aria-label="calendar backward"
                className="focus:text-gray-400 hover:text-gray-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-chevron-left"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="15 6 9 12 15 18" />
                </svg>
              </button>
              <button
                onClick={() => nextMonth()}
                aria-label="calendar forward"
                className="ml-3 focus:text-gray-400 hover:text-gray-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-chevron-right"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="9 6 15 12 9 18" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between pt-12 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {days.length > 0 ? (
                    days.map((day, index) => (
                      <Day key={day + index} day={day} />
                    ))
                  ) : (
                    <Loading />
                  )}
                </tr>
              </thead>
              <tbody className="pt-6">
                {calendar.length > 0 ? (
                  calendar.map((week, index) => (
                    <tr key={index + "week"}>
                      {week.map((day, index) => (
                        <td
                          key={index + "day"}
                          onClick={() =>
                            day.status === "current"
                              ? setCurrentDate(day.date)
                              : day.status === "previous"
                              ? (previousMonth(), setCurrentDate(day.date))
                              : day.status === "next"
                              ? (nextMonth(), setCurrentDate(day.date))
                              : setCurrentDate(new Date())
                          }
                        >
                          <div
                            className={`flex justify-center w-full px-2 py-2 rounded-full ${
                              day.date === currentDate &&
                              currentMonth === currentMonth &&
                              day.status === "current"
                                ? "bg-danger"
                                : "hover:cursor-pointer hover:bg-warning hover:text-white"
                            }`}
                          >
                            {isToday(
                              events,
                              new Date(currentYear, currentMonth, day.date),
                            ) && day.status === "current" ? (
                              <Ping>
                                <p
                                  className={`text-base font-medium ${
                                    day.date === currentDate &&
                                    day.status === "current"
                                      ? "text-white"
                                      : day.status === "current"
                                      ? "opacity-100"
                                      : "opacity-30"
                                  }`}
                                >
                                  {day.date}
                                </p>
                              </Ping>
                            ) : (
                              <p
                                className={`text-base font-medium ${
                                  day.date === currentDate &&
                                  currentMonth === currentMonth
                                    ? "text-white"
                                    : day.status === "current"
                                    ? "opacity-100"
                                    : "opacity-30"
                                }`}
                              >
                                {day.date}
                              </p>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7}>
                      <Loading />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="py-5 pb-8 overflow-y-auto rounded-b bg-gray-50 h-72">
          <div className="px-8">
            <h1 className="py-3 text-xl font-medium">
              Events on{" "}
              {new Date(currentYear, currentMonth, currentDate).toDateString()}
            </h1>
            {getToday(events, new Date(currentYear, currentMonth, currentDate))
              .length > 0 ? (
              getToday(
                events,
                new Date(currentYear, currentMonth, currentDate),
              ).map((event) => <UpcomingEvent key={event.id} event={event} />)
            ) : (
              <NoItem>No Event</NoItem>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
