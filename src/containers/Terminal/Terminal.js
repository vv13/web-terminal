import style from './style.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { execCommand, changeDirectory } from './actions';

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
    changeDirectoryFunc: bindActionCreators(changeDirectory, dispatch),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class Terminal extends Component {
  static propTypes = {
    terminal: PropTypes.object.isRequired,
    execCommandFunc: PropTypes.func.isRequired,
    changeDirectoryFunc: PropTypes.func.isRequired,
  };
  state ={}

  render() {
    const { terminalInfoList, directory } = this.props.terminal.toJS();
    return (
      <div>
        <div className={style.TerminalHeader}>
          <TerminalInput
            directory={directory}
            changeDirectoryFunc={this.props.changeDirectoryFunc}
            execCommandFunc={this.props.execCommandFunc}
          />
        </div>

        <TerminalView terminalInfoList={terminalInfoList} />
      </div>
    );
  }
}

export default Terminal;
