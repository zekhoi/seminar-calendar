const { google } = require("googleapis");
require("dotenv").config();

const client = new google.auth.OAuth2({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

const calendar = google.calendar({
  version: "v3",
  auth: client,
});

export const getCalendar = async (minDate) => {
  try {
    const result = await calendar.events
      .list({
        calendarId: process.env.CALENDAR_ID,
        timeMin: minDate,
        showDeleted: false,
      })
      .then((schedules) => {
        schedules.data.items = schedules.data.items.sort(
          (valuea, valueb) =>
            new Date(valuea.start.dateTime) - new Date(valueb.start.dateTime),
        );
        return schedules.data;
      });
    return result.items;
  } catch (error) {
    console.log(error);
  }
};
