
import React from 'react';
import Navigation from '../../components/Navigation';
import "../../scss/Header.scss";

const Header = () => {

  return (
    <div className="App">
      <header className="App-header">
        <Navigation />
        <h1>人資系統</h1>
      </header>
    </div>
  );
}

export default Header