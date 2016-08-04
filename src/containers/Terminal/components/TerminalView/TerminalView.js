import style from './style.css';
import React, { Component, PropTypes } from 'react';
import TerminalInfo from '../TerminalInfo';


class TerminalView extends Component {
  static propTypes = {
    terminalInfoList: PropTypes.array,
  };

  state = {};

  render() {
    const { terminalInfoList } = this.props;
    return (
      <div className={style.terminalViewContainer}>
        <span>
          Message:{terminalInfoList}
        </span>
        <TerminalInfo />
        <TerminalInfo />
        <TerminalInfo />
        <TerminalInfo />
      </div>
    );
  }
}

export default TerminalView;
