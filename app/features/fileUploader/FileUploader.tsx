import React, { FC, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadFile } from "../../redux/actions/file.actions";
import { useDispatch } from "react-redux";
import {remote} from 'electron';

const FileUploader: FC = () => {
  const dispatch = useDispatch();
  const handleCSV = (acceptedFiles: any) => {
    if (!acceptedFiles) return;
    dispatch(uploadFile(acceptedFiles));
  }
  const onDrop = useCallback(acceptedFiles => {
    handleCSV(acceptedFiles)
    const currWindow = remote.getCurrentWindow();
    currWindow.close();
  }, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div className="dropzone__container">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p className="dropzone__drop--drag-active">
              Drop the files here ...
            </p> :
            <p className="dropzone__drop">
              Drag 'n' drop some files here, or click to select files
            </p>
        }
      </div>
    </div>
  )
};

export default FileUploader;
