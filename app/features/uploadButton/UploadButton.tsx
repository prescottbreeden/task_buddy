import React, { FC } from 'react';
import Icon from '../icon/Icon';
import {Link} from 'react-router-dom';
/* import {ipcRenderer} from 'electron'; */

const UploadButton: FC = () => {
  /* const openWindow = () => ipcRenderer.send('upload-window:open'); */
  return (
    <Link to="/upload" target="_blank" tabIndex={-1}>
      <div tabIndex={0} className="upload" onClick={() => console.log('clicked')}>
        <Icon title="file-upload" className="upload__icon" />
        <p>Upload .CSV file</p>
      </div>
    </Link>
  );
}

export default UploadButton;
