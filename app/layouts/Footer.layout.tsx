import React from "react";
import {VERSION} from "../constants/version";

export const Footer: React.FC = () => {
  return (
    <div className="footer">
      <p>Dev Buddy v{VERSION}</p>
      <p>Rubber baby buggy bumpers</p>
    </div>
  );
};
