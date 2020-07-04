import React, { ChangeEvent, FC, useRef } from 'react';
import {useDispatch} from "react-redux";
import {uploadFile} from "../../redux/actions/file.actions";
import Icon from '../icon/Icon';

const Upload: FC = () => {
  const dispatch = useDispatch();
  const handleCSV = (event: ChangeEvent<HTMLInputElement>) => {
    const data: FileList | null = event.target.files;
    if (!data) return;
    dispatch(uploadFile(data));
  }
  const ref = useRef(null);
  return (
    <div className="upload" onClick={() => null}>
      <Icon title="file-upload" className="upload__icon" />
      <p>Upload .CSV file</p>
      <input
        ref={ref}
        accept="*.csv"
        className="upload__input"
        onChange={handleCSV}
        type="file"
      />
    </div>
  );
}

export default Upload;
