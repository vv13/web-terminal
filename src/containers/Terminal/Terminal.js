
// import style from './style.css';


import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from './actions';

import TerminalInput from './components/TerminalInput';

function mapStateToProps(state) {
  return {
    state: state.terminal,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class Terminal extends Component {
  static propTypes = {
    state: PropTypes.object,
    actions: PropTypes.object.isRequired,
  };

  static defaultProps = {
  };

  render() {
    return (
      <div>
        <TerminalInput />
      </div>
    );
  }
}

export default Terminal;
