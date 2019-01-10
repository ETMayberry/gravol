import React from 'react';
import ReactDOM from 'react-dom';
import GThree from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GThree />, div);
  ReactDOM.unmountComponentAtNode(div);
});
