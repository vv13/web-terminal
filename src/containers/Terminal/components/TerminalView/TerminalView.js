import style from './style.css';
import React, { Component, PropTypes } from 'react';


class TerminalView extends Component {
  static propTypes = {
    terminalInfoList: PropTypes.array,
  };

  state = {};

  render() {
    const { terminalInfoList } = this.props;
    return (
      <div className={style.terminalViewContainer}>
        <p>
          {terminalInfoList.join('\n\r')}
        </p>
      </div>
    );
  }
}

export default TerminalView;
