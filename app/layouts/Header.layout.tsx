import React, {ChangeEvent} from "react";
import {VERSION} from "../constants/version";
import {useDispatch} from "react-redux";
import {uploadFile} from "../redux/actions/file.actions";

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const handleCSV = (event: ChangeEvent<HTMLInputElement>) => {
    const data: FileList | null = event.target.files;
    if (!data) return;
    dispatch(uploadFile(data));
  }
  return (
    <div className="header">
      <h1>Dev Buddy v{VERSION}</h1>
      <input
        accept="*.csv"
        type="file"
        onChange={handleCSV}
      />
    </div>
  );
};
