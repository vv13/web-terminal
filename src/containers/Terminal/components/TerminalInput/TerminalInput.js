import style from './style.css';
import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';


class TerminalInput extends Component {
  static propTypes = {
    style: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  render() {
    const { className } = this.props;
    return (
      <div className={style.terminalInputWrapper} >
        <span className={style.terminalInputIcon}>$</span>
        <input className={classnames(...className.split(), style.terminalInput)}>
        </input>
      </div>
    );
  }
}

export default TerminalInput;
