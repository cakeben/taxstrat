import React from "react";

export const Input = (props) => (
  <input
    {...props}
    className={`p-2 border rounded w-full mb-4 ${props.className}`}
  />
);
