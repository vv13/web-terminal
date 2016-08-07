import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import TerminalView from 'containers/Terminal/components/TerminalView';

describe('TerminalView component', () => {
  it('render correctly', () => {
    const wrap = mount(<TerminalView />);
    expect(wrap.find('div')).to.have.length(2);
  });


  it('show info correctly', () => {
    const info = ['hello', 'world'];
    const wrap = shallow(<TerminalView terminalInfoList={info} />);
    expect(wrap.find('div > div').html()).to.be.equal('<div>helloworld</div>');
  });
});
