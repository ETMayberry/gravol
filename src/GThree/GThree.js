import React, { Component } from 'react';
import './GThree.css';
import Canvas from './Canvas/Canvas';

class GThree extends Component {
  constructor(props) {
    super(props);

    this.handleButtonClick = this.handleButtonClick.bind(this);

    this.apiContext = {
      createRecord: (id) => {
        console.debug(id);
        return { _id: id, _name: "create" };
      },
      getRecord: (id) => {
        console.log(id);
        return { _id: id, _name: "get" };
      },
      setRecord: (id) => {
        console.warn(id);
        return { _id: id, _name: "set" };
      },
      deleteRecord: (id) => {
        console.error(id);
        return true;
      }
    };

    this.state = {
      currentval: null
    };
  }

  handleButtonClick() {
    this.setState({ currentval: this.state.currentval ? null : this.apiContext.createRecord(30809) });
    // this.apiContext.getRecord(91741);
    // this.apiContext.setRecord(29211);
    // this.apiContext.deleteRecord(10001);
  };

  render() {
    const newButton =
      <div className="card bg-light position-absolute">
        <div className="card-header">Controls</div>
        <div className="card-body">
          <button className="btn btn-primary" onClick={this.handleButtonClick}>Press me!</button>
        </div>
      </div>
    return (
      <div className="GThree container-fluid">
        {newButton}
        <Canvas curval={this.state.currentval} />
      </div >
    );
  }

  handleSpawn() {
    console.log('boom!');
    this.setState({
      object: !this.state.object
    })
  }
}

export default GThree;
