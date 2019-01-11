import React, { Component } from 'react';
import './Canvas.css';
import * as THREE from 'three';

class Canvas extends Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  // Properties

  /**Canvas element which serves as the root for a Three.js scene. */
  _canvas;
  _scene;
  _camera;
  _renderer;


  // Lifecycle

  componentDidMount() {
    if (!this.canvasRef) {
      console.warn('there is no canvas!');
      return;
    } else {
      console.log(this.canvasRef);
      this._canvas = this.canvasRef;
    }

    window.onresize = this.resizeCanvas.bind(this);

    // componentDidMount executes from the bottom-up, so we need to wait for our parent's turn
    // in order to resize correctly
    setTimeout(() => {
      this.resizeCanvas();
    }, 500);

    const deviceDimensions = { width: this._canvas.width, height: this._canvas.height };

    this._camera = this.buildCamera(deviceDimensions);
    this._renderer = this.buildRenderer(deviceDimensions);
    this._scene = this.buildScene();

    this._render();
  };

  componentWillUnmount() {
    console.log('Canvas unloaded!!');
    // this._renderer.dispose();
    if (this._renderer) {
      this._renderer.forceContextLoss();
      this._renderer.context = null;
      this._renderer.domElement = null;
      this._renderer = null;
    }
  };

  render() {
    return (
      <div>
        <canvas className="GThree-canvas" ref={el => this.canvasRef = el} />
      </div>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate');
    // this.handleButtonClick();

    this.cube = this.buildCube();
    console.log(this.cube);
    this._scene.add(this.cube);
    return false;
  }

  // Functions

  resizeCanvas() {
    if (this._canvas) {
      this._canvas.style.width = '100%';
      this._canvas.style.height = '100%';
    }
  }

  /**Update scene objects */
  update() {
    if (this.cube) {
      this.cube.rotation.x += 0.01;
      this.cube.rotation.y += 0.01;
    }
  }

  _render() {
    requestAnimationFrame(this._render.bind(this));
    this._renderer.render(this._scene, this._camera);
    this.update();
  }

  buildScene() {
    const scene = new THREE.Scene();
    // scene.background = new THREE.Color("#FFF");

    const ambientLight = new THREE.AmbientLight();
    scene.add(ambientLight);

    return scene;
  }

  buildCube() {
    var geometry = new THREE.BoxGeometry(10, 10, 10);
    var material = new THREE.MeshBasicMaterial({ color: 0xaabbcc });
    var cube = new THREE.Mesh(geometry, material);
    return cube;
  }

  buildRenderer({ width, height }) {
    const renderer = new THREE.WebGLRenderer({ canvas: this._canvas, antialias: true, alpha: true });
    const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
    renderer.setPixelRatio(DPR);
    renderer.setSize(width, height);
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    return renderer;
  }

  buildCamera({ width, height }) {
    const aspectRatio = width / height;
    const fieldOfView = 60;
    const nearPlane = 4;
    const farPlane = 100;
    const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

    camera.position.z = 40;

    return camera;
  }

}

export default Canvas;
