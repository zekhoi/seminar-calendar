import { useState } from "react";
import Modal from "../modal/Modal";
import { isGoing } from "../../utils/calendar";

export default function UpcomingEvent({ event }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeFormat = { hour: "2-digit", minute: "2-digit" };
  return (
    <>
      <div className="py-5 border-b border-gray-400 border-dashed">
        <p className="text-xs leading-3 text-gray-500">
          {isGoing(event).status === "ongoing" ? (
            <span className="capitalize text-white bg-primary text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
              On Going
            </span>
          ) : isGoing(event).status === "ended" ? (
            <span className="capitalize text-white bg-danger text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
              Ended
            </span>
          ) : (
            <span className="capitalize text-white bg-primary text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
              Scheduled
            </span>
          )}

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
    </>
  );
}
