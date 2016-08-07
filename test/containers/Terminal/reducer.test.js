import { expect } from 'chai';
import terminal from 'containers/Terminal/reducer';
import * as at from 'constants/actionTypes';
import immutable from 'immutable';

describe('terminal reducer', () => {
  it('should change dir', () => {
    const result = terminal(immutable.fromJS({}), {
      type: at.TERMINAL_DIR,
      dir: '/home/vv',
    });
    expect(result.get('directory')).to.be.equal('/home/vv');
  });

  it('should clear info', () => {
    const result = terminal(immutable.fromJS({}), {
      type: at.TERMINAL_CLEAR,
    });
    expect(result.get('terminalInfoList')).to.be.equal(immutable.fromJS([]));
  });

  it('should append info', () => {
    const result = terminal(immutable.fromJS({
      terminalInfoList: [],
    }), {
      type: at.TERMINAL_INFO_APPEND,
      info: 'this is a info',
    });
    // 比较对象用eql
    expect(result.get('terminalInfoList')).to.be.eql(immutable.fromJS(['this is a info']));
  });
});
