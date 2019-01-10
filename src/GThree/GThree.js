import React, { Component } from 'react';
import './GThree.css';
import Canvas from './Canvas/Canvas';

class GThree extends Component {
  render() {
    return (
      <div className="GThree container">
        <Canvas />
      </div >
    );
  }
}

export default GThree;
