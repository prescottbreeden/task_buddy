import React from "react";
import {VERSION} from "../constants/version";
import UploadButton from "../features/uploadButton/UploadButton";

export const Header: React.FC = () => {
  return (
    <div className="header">
      <h1>Dev Buddy v{VERSION}</h1>
      <UploadButton />
    </div>
  );
};
