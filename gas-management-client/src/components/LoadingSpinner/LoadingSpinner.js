import React from 'react';

export default class LoadingSpinner extends React.Component {
  render() {
    return (
        <div className="sk-wave"
             style={{position: 'absolute', left: '50%', top: '70%',zIndex:'100'}}>
          <div className="sk-rect sk-rect1"></div>
          &nbsp;
          <div className="sk-rect sk-rect2"></div>
          &nbsp;
          <div className="sk-rect sk-rect3"></div>
          &nbsp;
          <div className="sk-rect sk-rect4"></div>
          &nbsp;
          <div className="sk-rect sk-rect5"></div>
        </div>
    );
  }
}