import style from './style.css';
import React, { Component, PropTypes } from 'react';


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
  }

  // 回车事件
  clickEnterCommitCmd(event) {
    if (event.keyCode === 13) {
      // 获取输入框内容
      const value = event.target.value.trim();
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
      event.target.value = '';
    }
    return true;
  }

  render() {
    const { directory } = this.props;
    return (
      <div>
        <span className={style.terminalInputIcon}>
          <span className={style.terminalDirectory}>{directory}</span>$
        </span>
        <input className={style.terminalInput} onKeyUp={this.clickEnterCommitCmd}>
        </input>
      </div>
    );
  }
}

export default TerminalInput;
