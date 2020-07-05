import React from 'react';
import { Footer } from '../layouts/Footer.layout';
import Tasks from '../features/tasks/Tasks';
import NotePad from '../features/notepad/NotePad';
import FileUploader from '../features/fileUploader/FileUploader';

export default function Home(): JSX.Element {
  return (
    <>
      <div data-tid="container">
        <div className="container">
          <Tasks />
          <NotePad />
        </div>
        <Footer />
        <FileUploader />
      </div>
    </>
  );
}
