import style from './style.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { execCommand, changeDirectory, terminalClear } from './actions';
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
    terminalClearFunc: bindActionCreators(terminalClear, dispatch),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class Terminal extends Component {
  static propTypes = {
    terminal: PropTypes.object.isRequired,
    execCommandFunc: PropTypes.func.isRequired,
    changeDirectoryFunc: PropTypes.func.isRequired,
    terminalClearFunc: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    // 通过后端渲染到script标签来获取到的数据
    const homedir = JSON.parse(document.querySelector('#data').text).homedir;
    this.state = { homedir };
  }
  state ={}

  render() {
    const { terminalInfoList } = this.props.terminal.toJS();
    let { directory } = this.props.terminal.toJS();
    if (!directory) {
      directory = this.state.homedir;
    }
    return (
      <div>
        <div className={style.TerminalHeader}>
          <TerminalInput
            directory={directory}
            changeDirectoryFunc={this.props.changeDirectoryFunc}
            execCommandFunc={this.props.execCommandFunc}
            terminalClearFunc={this.props.terminalClearFunc}
          />
        </div>

        <TerminalView terminalInfoList={terminalInfoList} />
      </div>
    );
  }
}

export default Terminal;
