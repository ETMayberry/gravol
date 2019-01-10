import React, { Component } from 'react';
import './Canvas.css';

class Canvas extends Component {

  componentDidMount() {
    console.log('Canvas loaded!');
  }

  componentWillUnmount() {
    console.log('Canvas unloaded!!');
  }

  render() {
    return (
      <canvas className="GThree-canvas">
      </canvas >
    );
  }
}

export default Canvas;
