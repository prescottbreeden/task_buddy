import React from "react";
import {VERSION} from "../constants/version";
import Upload from "../features/upload/Upload";

export const Header: React.FC = () => {
  return (
    <div className="header">
      <h1>Dev Buddy v{VERSION}</h1>
      <Upload />
    </div>
  );
};
