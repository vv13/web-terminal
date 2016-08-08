import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import TerminalInput from 'containers/Terminal/components/TerminalInput';

const props = {
  terminalClearFunc: sinon.spy(),
  conn: { send: sinon.spy() },
  changeDirectoryFunc: sinon.spy(),
};


describe('TerminalInput component', () => {
  it('render correctly', () => {
    const wrap = shallow(<TerminalInput />);
    expect(wrap.find('span').length).to.equal(1);
    expect(wrap.find('input')).to.have.length(1);
  });

  it('exec normal command correctly', () => {
    const wrap = shallow(<TerminalInput {...props} />);
    wrap.find('input').simulate('keyUp', {
      keyCode: 13, target: { value: 'hello world' } });
    expect(props.conn.send.callCount).to.equal(1);
  });

  it('exec clear command correctly', () => {
    const wrap = shallow(<TerminalInput {...props} />);
    wrap.find('input').simulate('keyUp', {
      keyCode: 13, target: { value: 'clear' } });
    expect(props.terminalClearFunc.callCount).to.equal(1);
  });

  it('exec cd command correctly', () => {
    const wrap = shallow(<TerminalInput {...props} />);
    wrap.find('input').simulate('keyUp', {
      keyCode: 13, target: { value: 'cd' } });
    wrap.find('input').simulate('keyUp', {
      keyCode: 13, target: { value: 'cd aa' } });
    expect(props.changeDirectoryFunc.callCount).to.equal(2);
  });

  it('should clear input when push enter', () => {
    const wrap = mount(<TerminalInput {...props} />);
    wrap.find('input').simulate('keyUp', {
      keyCode: 13, target: { value: 'asdasdsadsad' } });
    // TODO how to valid it
  });
});
