import style from './style.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeDirectory, terminalClear, appendTerminalInfo, execCommand } from './actions';
import TerminalInput from './components/TerminalInput';
import TerminalView from './components/TerminalView';
import { Row, Col } from 'antd';

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
    appendTerminalInfoFunc: bindActionCreators(appendTerminalInfo, dispatch),
    changeDirectoryFunc: bindActionCreators(changeDirectory, dispatch),
    terminalClearFunc: bindActionCreators(terminalClear, dispatch),
    execCommandFunc: bindActionCreators(execCommand, dispatch),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class Terminal extends Component {
  static propTypes = {
    terminal: PropTypes.object.isRequired,
    appendTerminalInfoFunc: PropTypes.func.isRequired,
    changeDirectoryFunc: PropTypes.func.isRequired,
    terminalClearFunc: PropTypes.func.isRequired,
    execCommandFunc: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    // 通过后端渲染到script标签来获取到的数据
    const homedir = JSON.parse(document.querySelector('#data').text).homedir;
    this.state = { homedir };
    this.state.conn = this.connWebsocket();
  }
  state ={}

  connWebsocket() {
    const tmpConn = new WebSocket('ws://127.0.0.1:8090');
    // 监听服务器端的消息
    tmpConn.onmessage = e => {
      // 将信息添加到terminalView
      this.props.appendTerminalInfoFunc(e.data);
    };
    return tmpConn;
  }

  render() {
    const { terminalInfoList } = this.props.terminal.toJS();
    let { directory } = this.props.terminal.toJS();
    if (!directory) {
      directory = this.state.homedir;
    }
    return (
      <div>
        <Row>
          <Col span={12} offset={6}>
            <div className={style.TerminalHeader}>
              <TerminalInput
                directory={directory}
                changeDirectoryFunc={this.props.changeDirectoryFunc}
                execCommandFunc={this.props.execCommandFunc}
                terminalClearFunc={this.props.terminalClearFunc}
                conn={this.state.conn}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={16} offset={4}>
            <TerminalView terminalInfoList={terminalInfoList} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Terminal;
