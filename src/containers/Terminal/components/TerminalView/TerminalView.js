
import style from './style.css';


import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions';
import TerminalInfo from '../TerminalInfo';

function mapStateToProps(state) {
  return {
    style: PropTypes.string,
    state: state.terminalview,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class TerminalView extends Component {
  static propTypes = {
    state: PropTypes.object,
    actions: PropTypes.object,
  };

  static defaultProps = {
  };

  state = {};

  render() {
    return (
      <div className={style.terminalViewContainer}>
        <TerminalInfo />
        <TerminalInfo />
        <TerminalInfo />
        <TerminalInfo />
      </div>
    );
  }
}

export default TerminalView;
