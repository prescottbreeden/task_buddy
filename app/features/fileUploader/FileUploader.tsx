import React, { FC, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadFile } from "../../redux/actions/file.actions";
import {updateApplication} from '../../redux/actions/application.actions';
import {useDispatch, connect} from 'react-redux';
import {getUploadState} from '../../redux/selectors/application.selectors';
import Icon from '../icon/Icon';

const FileUploader: FC = ({ upload }: any) => {
  const dispatch = useDispatch();
  const handleCSV = (acceptedFiles: any) => {
    if (!acceptedFiles) return;
    dispatch(uploadFile(acceptedFiles));
    handleClose();
  }
  const onDrop = useCallback(handleCSV, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const handleClose = () => dispatch(updateApplication({ upload: false }));

  const clsName = () => {
    return upload ?
      "dropzone__container open-dropzone" :
      "dropzone__container";
  };

  return (
    <div className={clsName()}>
      <div onClick={handleClose} className="options-menu__close">
        <Icon title="cancel" className="options-menu__close-icon" />
      </div>
      <div className="dropzone__header">
        <p className="dropzone__title">File Upload</p>
      </div>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p className="dropzone__drop--drag-active">
              Drop the files here ...
            </p> :
            <p className="dropzone__drop">
              Drag 'n' drop a .csv file here, or click to select files
            </p>
        }
      </div>
    </div>
  )
};

const mapStateToProps = (state: any) => {
  const upload = getUploadState(state);
  return { upload };
}

export default connect(mapStateToProps)(FileUploader);
