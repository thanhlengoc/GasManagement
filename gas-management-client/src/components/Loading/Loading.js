import React, {Component} from 'react';
import 'spinkit/css/spinkit.css';

class Loading extends Component {
    render() {
        return (
            <div className="sk-wave" style={{position:'absolute', left:'50%'}}>
                  <div className="sk-rect sk-rect1"></div>&nbsp;
                  <div className="sk-rect sk-rect2"></div>&nbsp;
                  <div className="sk-rect sk-rect3"></div>&nbsp;
                  <div className="sk-rect sk-rect4"></div>&nbsp;
                  <div className="sk-rect sk-rect5"></div>
                </div>
        )
    }
}

export default Loading;