import { useEffect, useState } from "react";
import UpcomingEvent from "./EventItem";
import NoItem from "./NoItem";

export default function PastEvent({ data }) {
  const date = new Date().getTime();
  const [pastEvent, setPastEvent] = useState([]);

  useEffect(() => {
    const tempEvent = data.filter((event) => {
      return new Date(event.start.dateTime).getTime() < date;
    });
    setPastEvent(tempEvent);
  }, []);
  return (
    <>
      <div className="w-full max-w-sm shadow-lg">
        {" "}
        <div className="py-5 pb-8 overflow-y-auto bg-white rounded-b h-80">
          <div className="px-8">
            <h1 className="py-3 text-xl font-medium">Past Events</h1>
            {pastEvent.length > 0 ? (
              pastEvent.map((event) => (
                <UpcomingEvent key={event.id} event={event} />
              ))
            ) : (
              <NoItem>No Event</NoItem>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
