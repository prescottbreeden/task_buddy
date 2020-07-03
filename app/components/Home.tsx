import React from 'react';
import styles from './Home.css';
import { Header } from '../layouts/Header.layout';
import Tasks from '../features/tasks/Tasks';
import NotePad from '../features/notepad/NotePad';
import { Footer } from '../layouts/Footer.layout';

export default function Home(): JSX.Element {
  return (
    <div className={styles.container} data-tid="container">
      <h2>Home</h2>
      <Header />
      <div className="container">
        <Tasks />
        <NotePad />
      </div>
      <Footer />
    </div>
  );
}