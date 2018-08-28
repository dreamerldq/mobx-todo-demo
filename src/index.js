import { observer, action } from 'mobx-react'
import {observable, observe} from 'mobx';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
var appState = observable({
  timer: 0
});
appState.resetTimer = action(function reset() {
  appState.timer = 0;
});

setInterval(action(function tick() {
  appState.timer += 1;
}), 1000);
import {observable, observe} from 'mobx';
import { observer } from 'mobx-react'

@observer
class TimerView extends React.Component {
    render() {
        return (<button onClick={this.onReset.bind(this)}>
                Seconds passed: {this.props.appState.timer}
            </button>);
    }

    onReset () {
        this.props.appState.resetTimer();
    }
};

ReactDOM.render(<TimerView appState={appState} />, document.body);
