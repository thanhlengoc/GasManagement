import React from 'react';
import ReactLoading from 'react-loading';

class Loading extends React.Component{
  render() {
    return (
        <div style={{position: 'absolute', left: '50%', top: '50%',zIndex:'9999'}}>
          <ReactLoading type="spokes" color="#827717" height={80} width={80} />
        </div>
    );
  }
}

export default Loading;