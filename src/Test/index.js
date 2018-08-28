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