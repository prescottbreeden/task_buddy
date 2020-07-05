import React, { FC, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadFile } from "../../redux/actions/file.actions";
import {updateApplication} from '../../redux/actions/application.actions';
import {useDispatch, connect} from 'react-redux';
import {getUploadState} from '../../redux/selectors/application.selectors';

const FileUploader: FC = ({ upload }: any) => {
  const dispatch = useDispatch();
  const handleCSV = (acceptedFiles: any) => {
    if (!acceptedFiles) return;
    dispatch(uploadFile(acceptedFiles));
    dispatch(updateApplication({ upload: false }))
  }
  const onDrop = useCallback(handleCSV, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const clsName = () => {
    return upload ?
      "dropzone__container open-dropzone" :
      "dropzone__container";
  }

  return (
    <div className={clsName()}>
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

const mapStateToProps = (state: any) => {
  const upload = getUploadState(state);
  return { upload };
}

export default connect(mapStateToProps)(FileUploader);
