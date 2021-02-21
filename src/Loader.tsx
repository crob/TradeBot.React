import React from 'react';
import logo from './logo.svg';
import './Loader.scss';

function Loader() {
  return (
    <div className="Loader-container">
      <div className="flexFix">
        <img src={logo} className="Loader" alt="logo" />
        <h1>Diamond Hands<br />wants your stonks</h1>
      </div>
    </div>
  );
}

export default Loader;

