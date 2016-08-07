import * as at from 'constants/actionTypes';


// 更改目录事件
function changeDirectoryEvent(dir) {
  return {
    type: at.TERMINAL_DIR,
    dir,
  };
}

// 将执行结果添加到命令行
export function appendTerminalInfo(info) {
  return {
    type: at.TERMINAL_INFO_APPEND,
    info,
  };
}

// 更改目录
export function changeDirectory(dir) {
  return (dispatch) => (
    fetch('/api/command/changeDir', {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dir }),
    })
    .then(res => res.json())
    .then(json => dispatch(changeDirectoryEvent(json.userHome)))
  );
}

// 异步发送数据，收到数据后触法TERMINAL_EXEC事件
export function execCommand(command) {
  // 判定前缀是否为cd
  return (dispatch) => (
    fetch('/api/command/execCommand', {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        command,
      }),
    })
    .then(response => response.json())
    .then((json) => dispatch(appendTerminalInfo(json.info)))
  );
}

export function terminalClear() {
  return {
    type: at.TERMINAL_CLEAR,
  };
}
