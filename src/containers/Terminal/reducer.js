import { EXEC_COMMAND_INFO } from 'constants/actionTypes';
import immutable from 'immutable';

const INITIAL_STATE = immutable.fromJS({
  terminalInfoList: ['欢迎来到控制台！'],
});

// 更新state
export default function terminal(state = INITIAL_STATE, action) {
  switch (action.type) {
    case EXEC_COMMAND_INFO:
      return state.update('terminalInfoList', (info) =>
        state.terminalInfoList.append(info));
    default:
      return state;
  }
}
