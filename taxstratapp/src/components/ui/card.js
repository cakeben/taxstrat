import React from "react";

export const Card = ({ children, className }) => (
  <div className={`p-4 border rounded-lg shadow ${className}`}>{children}</div>
);

export const CardContent = ({ children }) => <div>{children}</div>;
