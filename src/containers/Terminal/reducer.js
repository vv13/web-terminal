import { EXEC_COMMAND_INFO, CHANGE_DIRECTORY, TERMINAL_CLEAR } from 'constants/actionTypes';
import immutable from 'immutable';

const INITIAL_STATE = immutable.fromJS({
  terminalInfoList: ['欢迎来到控制台！', '请使用回车键进行输入'],
  directory: '/home/vv',
});

// 更新state
export default function terminal(state = INITIAL_STATE, action) {
  let tmpList;
  switch (action.type) {
    case EXEC_COMMAND_INFO:
      tmpList = state.get('terminalInfoList').toJS();
      tmpList.push(action.info);
      return state.update('terminalInfoList', () => immutable.fromJS(tmpList));
    case CHANGE_DIRECTORY:
      return state.update('directory', () => action.dir);
    case TERMINAL_CLEAR:
      return state.update('terminalInfoList', () => immutable.fromJS([]));
    default:
      return state;
  }
}
