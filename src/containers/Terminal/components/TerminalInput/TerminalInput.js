import style from './style.css';
import React, { Component, PropTypes } from 'react';
import { Icon } from 'antd';

class TerminalInput extends Component {
  static propTypes = {
    execCommandFunc: PropTypes.func,
    changeDirectoryFunc: PropTypes.func,
    directory: PropTypes.string,
    terminalClearFunc: PropTypes.func,
    conn: PropTypes.object,
  };
  constructor(props) {
    super(props);
    this.state = { inputText: '' };
    this.clickEnterCommitCmd = this.clickEnterCommitCmd.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // 回车事件
  clickEnterCommitCmd(event) {
    if (event.keyCode === 13) {
      // 获取输入框内容
      const value = this.state.inputText;
      if (!value) {
        return false;
      }
      /**
      特殊事件转换：
      1、ll->ls
      2、cd->根目录
      3、clear->单独触法清空窗口事件
      */
      if (value.startsWith('cd')) {
        const homes = value.split(' ');
        if (value === 'cd') {
          this.props.changeDirectoryFunc('/home/vv');
        } else if (homes.length === 2) {
          this.props.changeDirectoryFunc(homes[1]);
        }
      } else if (value === 'clear') {
        // 提交命令
        this.props.terminalClearFunc();
      } else {
        switch (value) {
          case 'll':
            this.props.execCommandFunc('ls');
            break;
          default:
            this.props.conn.send(value);
        }
      }
      // 清空输入框
      // eslint-disable-next-line
      // event.target.value = '';
      this.state.inputText = '';
    }
    return true;
  }
  handleChange(e) {
    this.setState({ inputText: e.target.value });
  }
  render() {
    const { directory } = this.props;
    return (
      <div>
        <span className={style.terminalDirectory}>
          {directory}
        </span>
        <input
          className={style.terminalInput}
          onKeyUp={this.clickEnterCommitCmd}
          onChange={this.handleChange}
          value={this.state.inputText}
        >
        </input>
        <Icon type="enter" className={style.enterInfo} />
      </div>
    );
  }
}

export default TerminalInput;
