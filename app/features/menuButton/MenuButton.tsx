import React, { FC } from 'react';
/* import {ipcRenderer} from 'electron'; */

const MenuButton: FC = () => {
  /* const openWindow = () => ipcRenderer.send('upload-window:open'); */
  return (
    <button tabIndex={0} className="menuButton">
      Options
    </button>
  );
}

export default MenuButton;
