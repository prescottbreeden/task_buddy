import React from "react";
import {VERSION} from "../constants/version";
import UploadButton from "../features/uploadButton/UploadButton";
import MenuButton from "../features/menuButton/MenuButton";

export const Footer: React.FC = () => {
  return (
    <div className="footer">
      <MenuButton />
      <p 
        tabIndex={-1}
        className="footer__text"
      >
          My Task Buddy (version {VERSION})
      </p>
      <UploadButton />
    </div>
  );
};
