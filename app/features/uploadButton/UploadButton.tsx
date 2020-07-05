import React, { FC } from 'react';
import Icon from '../icon/Icon';
import {useDispatch, connect} from 'react-redux';
import {updateApplication} from '../../redux/actions/application.actions';
import {getUploadState} from '../../redux/selectors/application.selectors';

const UploadButton: FC = ({ upload }: any) => {
  const dispatch = useDispatch();
  const toggleUpload = () => dispatch(updateApplication({ upload: !upload }));
  return (
    <div tabIndex={0} className="upload" onClick={toggleUpload}>
      <Icon title="file-upload" className="upload__icon" />
      <p>Upload .CSV file</p>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  const upload = getUploadState(state);
  return { upload };
}

export default connect(mapStateToProps)(UploadButton);
