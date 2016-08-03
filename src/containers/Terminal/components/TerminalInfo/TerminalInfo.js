
import style from './style.css';

import React, { Component, PropTypes } from 'react';


class TerminalInfo extends Component {
  static propTypes = {
    style: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  state = {};

  render() {
    return (
      <div className={style.terminalInfo}>
        Lorem ipsum dolor sit amet vpr dsfsad fs     fdsaf sadf sdaf sdfds  dsf
      </div>
    );
  }
}

export default TerminalInfo;
