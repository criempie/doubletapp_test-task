import React from 'react';
import Header from './Header/index.js';
import ButtonAddStudent from './ButtonAddStudent/index.js'
import TextStudents from './TextStudents/index.js';
import SearchLine from './SearchLine/index.js';
import SortButton from './SortButton/index.js';
import './fonts/Geometria/stylesheet.css';
import './App.css';


function App() {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="container-text-and-button">
          <TextStudents />
          <ButtonAddStudent />
        </div>
        <div className="container-tools">
          <SearchLine />
          <SortButton />
        </div>
      </div>
    </div>
  );
}

export default App;
