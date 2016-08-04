import style from './style.css';
import React, { Component, PropTypes } from 'react';


class TerminalInput extends Component {
  static propTypes = {
    execCommandFunc: PropTypes.func.isRequired,
    changeDirectoryFunc: PropTypes.func.isRequired,
    directory: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {};
    this.clickEnterCommitCmd = this.clickEnterCommitCmd.bind(this);
  }

  // 回车事件
  clickEnterCommitCmd(event) {
    if (event.keyCode === 13) {
      // 获取输入框内容
      const value = event.target.value;
      if (!value) {
        return false;
      }
      if (value.startsWith('cd')) {
        const homes = value.split(' ');
        if (homes.length === 2) {
          this.props.changeDirectoryFunc(homes[1]);
        }
      } else {
        // 提交命令
        this.props.execCommandFunc(value);
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
