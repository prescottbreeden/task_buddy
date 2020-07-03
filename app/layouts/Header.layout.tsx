import React from "react";
import {VERSION} from "../constants/version";

export const Header: React.FC = () => {
  return (
    <div className="header">
      <h1>Dev Buddy v{VERSION}</h1>
    </div>
  );
};
