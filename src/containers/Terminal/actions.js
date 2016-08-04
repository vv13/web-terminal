import { EXEC_COMMAND_INFO } from 'constants/actionTypes';


// 将结果返回到命令行
export function appendTerminalInfo(info) {
  return {
    type: EXEC_COMMAND_INFO,
    info,
  };
}

// 异步发送数据，收到数据后触法EXEC_COMMAND_INFO事件
export function execCommand(cmd) {
  return (dispatch) => (
    fetch('/api/command', {
      method: 'PATCH',
      body: JSON.stringify({
        cmd,
      }),
    })
    .then(response => response.json())
    .then(json => dispatch(appendTerminalInfo(json)))
  );
}
