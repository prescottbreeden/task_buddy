import electron from 'electron';
import path from 'path';
import fs from 'fs';

export default class DataStorage {
  path: string;
  data: any;
  constructor(opts: any) {
    // Renderer process has to get `app` module via `remote`, whereas the main process can get it directly
    // app.getPath('userData') will return a string of the user's app data directory path.
    const userDataPath = (electron.app || electron.remote.app).getPath('userData');
    // We'll use the `configName` property to set the file name and path.join to bring it all together as a string
    this.path = path.join(userDataPath, opts.configName + '.json');
    
    this.data = parseDataFile(this.path, opts.defaults);
  }

  get(key: string) {
    return this.data[key];
  }


  set(key: string, val: any) {
    this.data[key] = val;
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}

function parseDataFile(filePath: string, defaults: any) {
  try {
    return JSON.parse(fs.readFileSync(filePath) as unknown as string);
  } catch(error) {
    return defaults;
  }
}

// ===========================================================================
//                            Data Storage
// ===========================================================================
// const dataStorage = new DataStorage({
//   configName: 'user-preferences',
//   defaults: {
//     windowBounds: {
//       width: 1400,
//       height: 728,
//     }
//   }
// });

// const { width, height } = dataStorage.get('windowBounds');
// app.on('ready', () => {
//   createWindow();

//   if (mainWindow) {
//     mainWindow.on('resize', () => {
//       const { width, height } = mainWindow!.getBounds();
//       dataStorage.set('windowBounds', { width, height });
//     });
//   };
// });
