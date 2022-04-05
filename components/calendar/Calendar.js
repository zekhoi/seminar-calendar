import { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import _ from "lodash";

export default function Calendar({ date = new Date(), events = [] }) {
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
  const timeFormat = { hour: "2-digit", minute: "2-digit" };

  const [isOpen, setIsOpen] = useState(false);
  const [calendar, setCalendar] = useState([]);
  const [fullDate, setFullDate] = useState(date.getDate());
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

  const thisMonthLastDay = new Date(currentYear, currentMonth + 1, 0).getDate();

  const previousMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const lastDayIndex = new Date(currentYear, currentMonth + 1, 0).getDay();
  const nextDays = 7 - lastDayIndex - 1;

  const renderCalender = () => {
    const tempCalender = [];
    if (firstDayIndex !== 0) {
      for (let x = firstDayIndex; x > 0; x--) {
        tempCalender.push({
          date: previousMonthLastDay - x + 1,
          status: "previous",
        });
      }
    }

    for (let i = 1; i <= thisMonthLastDay; i++) {
      tempCalender.push({ date: i, status: "current" });
    }

    if (nextDays > 0) {
      for (let j = 1; j <= nextDays; j++) {
        tempCalender.push({ date: j, status: "next" });
      }
    }

    setCalendar(_.chunk(tempCalender, 7));
  };

  useEffect(() => {
    renderCalender();
    setTextMonth(months[currentMonth]);
    setFullDate(date.setFullYear(currentYear, currentMonth, currentDate));
  }, [currentDate, currentMonth, currentYear]);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen px-4 py-8 text-gray-700 bg-basecolor">
        <div className="w-full max-w-sm shadow-lg">
          <div className="p-5 bg-white rounded-t">
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
                    <th>
                      <div className="flex justify-center w-full">
                        <p className="text-base font-medium text-center">Mo</p>
                      </div>
                    </th>
                    <th>
                      <div className="flex justify-center w-full">
                        <p className="text-base font-medium text-center">Tu</p>
                      </div>
                    </th>
                    <th>
                      <div className="flex justify-center w-full">
                        <p className="text-base font-medium text-center">We</p>
                      </div>
                    </th>
                    <th>
                      <div className="flex justify-center w-full">
                        <p className="text-base font-medium text-center">Th</p>
                      </div>
                    </th>
                    <th>
                      <div className="flex justify-center w-full">
                        <p className="text-base font-medium text-center">Fr</p>
                      </div>
                    </th>
                    <th>
                      <div className="flex justify-center w-full">
                        <p className="text-base font-medium text-center">Sa</p>
                      </div>
                    </th>
                    <th>
                      <div className="flex justify-center w-full">
                        <p className="text-base font-medium text-center">Su</p>
                      </div>
                    </th>
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
                              className={`flex justify-center w-full px-3 py-3 rounded-full ${
                                day.date === new Date().getDate() &&
                                currentMonth === new Date().getMonth()
                                  ? "bg-primary"
                                  : ""
                              }`}
                            >
                              <p
                                className={`text-base font-medium ${
                                  day.date === new Date().getDate() &&
                                  currentMonth === new Date().getMonth()
                                    ? "text-white"
                                    : day.status === "current"
                                    ? "opacity-80"
                                    : "opacity-30"
                                }`}
                              >
                                {day.date}
                              </p>
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7}>
                        <div className="flex items-center justify-center w-full h-52">
                          <svg
                            role="status"
                            className="w-8 h-8 mr-2 text-gray-400 animate-spin fill-primary"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="py-5 pb-8 rounded-b bg-gray-50">
            <div className="px-8">
              <h1 className="py-3 text-xl font-medium">Upcoming Events</h1>
              {events.map((event) => (
                <div
                  key={event.id}
                  className="py-5 border-b border-gray-400 border-dashed"
                >
                  <p className="text-xs leading-3 text-gray-500">
                    <span className="capitalize text-white bg-success text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
                      {event.status}
                    </span>
                    {new Date(event.start.dateTime).toDateString()}
                  </p>
                  <a
                    tabIndex={0}
                    className="mt-2 text-lg font-medium leading-5 focus:outline-none"
                  >
                    {event.summary}
                  </a>
                  <p className="pt-2 text-sm leading-4 text-gray-600">
                    {new Date(event.start.dateTime).toLocaleTimeString(
                      "en-US",
                      timeFormat,
                    ) +
                      " - " +
                      new Date(event.end.dateTime).toLocaleTimeString(
                        "en-US",
                        timeFormat,
                      )}
                  </p>
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    className="text-white bg-primary hover:bg-secondary active:bg-secondary font-medium rounded-lg text-sm px-5 py-2.5 mr-2 my-2 focus:outline-none"
                  >
                    View
                  </button>
                  <Modal isOpen={isOpen} setIsOpen={setIsOpen} data={event} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
