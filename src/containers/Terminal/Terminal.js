// import style from './style.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { appendTerminalInfo, execCommand } from './actions';

import TerminalInput from './components/TerminalInput';
import TerminalView from './components/TerminalView';

function mapStateToProps(state) {
  // 解构reducer定义的state中的命令行信息
  const { terminal } = state;
  return {
    terminal,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // 通过bindActionCreators，每一个组件可以不用知道redux的存在，直接调用即可
    execCommandFunc: bindActionCreators(execCommand, dispatch),
    appendTerminalInfoFunc: bindActionCreators(appendTerminalInfo, dispatch),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class Terminal extends Component {
  static propTypes = {
    terminal: PropTypes.object.isRequired,
    execCommandFunc: PropTypes.func.isRequired,
    appendTerminalInfoFunc: PropTypes.func.isRequired,
  };
  state ={}

  render() {
    // immutable对象的toJS
    const { terminalInfoList } = this.props.terminal.toJS();
    return (
      <div>
        <TerminalInput />
        <TerminalView terminalInfoList={terminalInfoList} />
      </div>
    );
  }
}

export default Terminal;
