import style from './style.css';
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

class TerminalView extends Component {
  static propTypes = {
    terminalInfoList: PropTypes.array,
  };

  state = {};

  // 在组件更新内容之后执行此方法
  componentDidUpdate() {
    const terminalDOM = findDOMNode(this.refs.terminal);
    terminalDOM.scrollTop = terminalDOM.scrollHeight;
  }


  render() {
    const { terminalInfoList } = this.props;
    return (
      <div ref="terminal" className={style.terminalViewContainer}>
        <div>
          {terminalInfoList}
        </div>
      </div>
    );
  }
}

export default TerminalView;
