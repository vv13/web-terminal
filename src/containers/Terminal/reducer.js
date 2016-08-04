import { EXEC_COMMAND_INFO } from 'constants/actionTypes';
import immutable from 'immutable';

const INITIAL_STATE = immutable.fromJS({
  terminalInfoList: ['欢迎来到控制台！', '请使用回车键进行输入'],
});

// 更新state
export default function terminal(state = INITIAL_STATE, action) {
  let v;
  switch (action.type) {
    case EXEC_COMMAND_INFO:
      // state.terminalInfoList.push(action.info);
      v = state.get('terminalInfoList').toJS();
      v.push(action.info);
      return state.update('terminalInfoList', () => immutable.fromJS(v));
      // return state.update('terminalInfoList', () =>
      //   state.terminalInfoList);
      // const newInfoList = (action.info);
      // INITIAL_STATE.terminalInfoList.push('asdasdasd');
      // return Object.assign({}, state,
      //   { terminalInfoList: INITIAL_STATE.terminalInfoList });
    default:
      return state;
  }
}
