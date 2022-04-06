import React from "react";

export default function Ping({ children }) {
  return (
    <>
      <div className="relative">
        {children}
        <span className="absolute top-0 right-0 w-2 h-2 -mt-1 -mr-1 rounded-full bg-primary animate-ping"></span>
        <span className="absolute top-0 right-0 w-2 h-2 -mt-1 -mr-1 rounded-full bg-primary"></span>
      </div>
    </>
  );
}
