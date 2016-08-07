import * as at from 'constants/actionTypes';
import immutable from 'immutable';

const INITIAL_STATE = immutable.fromJS({
  terminalInfoList: ['欢迎来到控制台！', '请使用回车键进行输入'],
  directory: '',
});

// 更新state
export default function terminal(state = INITIAL_STATE, action) {
  let tmpList;
  switch (action.type) {
    case at.TERMINAL_DIR:
      return state.update('directory', () => action.dir);
    case at.TERMINAL_CLEAR:
      return state.update('terminalInfoList', () => immutable.fromJS([]));
    case at.TERMINAL_INFO_APPEND:
      tmpList = state.get('terminalInfoList').toJS();
      tmpList.push(action.info);
      return state.update('terminalInfoList', () => immutable.fromJS(tmpList));
    default:
      return state;
  }
}
