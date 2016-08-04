
import style from './style.css';

import React, { Component, PropTypes } from 'react';


class TerminalInfo extends Component {
  static propTypes = {
    directory: PropTypes.string.isRequired,
  };

  static defaultProps = {
    className: '',
  };

  state = {};

  render() {
    const { directory } = this.props;
    return (
      <span className={style.terminalDirectory}>
        {directory}
      </span>
    );
  }
}

export default TerminalInfo;
