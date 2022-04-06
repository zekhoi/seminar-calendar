import _ from "lodash";

export const renderCalender = (currentYear, currentMonth) => {
  const tempCalender = [];
  const thisMonthLastDay = new Date(currentYear, currentMonth + 1, 0).getDate();

  const previousMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const lastDayIndex = new Date(currentYear, currentMonth + 1, 0).getDay();
  const nextDays = 7 - lastDayIndex - 1;
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

  return _.chunk(tempCalender, 7);
};

export const isGoing = (event) => {
  const start = new Date(event.start.dateTime);
  const now = new Date();
  const end = new Date(event.end.dateTime);
  if (now > start && now < end) {
    return { status: "ongoing" };
  }
  if (now > end) {
    return { status: "ended" };
  }
  if (now < start) {
    return { status: "scheduled" };
  }
};

export const isToday = (events, date) => {
  const now = date.toDateString();
  return events.some((event) => {
    const start = new Date(event.start.dateTime).toDateString();
    return now === start;
  });
};

export const getToday = (events, now) => {
  const date = now.toDateString();
  const tempToday = [];
  events.map((event) => {
    const start = new Date(event.start.dateTime);
    if (start.toDateString() === date) {
      return tempToday.push(event);
    }
    return;
  });
  return tempToday;
};
