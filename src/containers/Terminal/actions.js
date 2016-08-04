import { EXEC_COMMAND_INFO, CHANGE_DIRECTORY } from 'constants/actionTypes';


// 执行命令事件
function execCommandEvent(info) {
  return {
    type: EXEC_COMMAND_INFO,
    info,
  };
}

// 更改目录事件
function changeDirectoryEvent(dir) {
  return {
    type: CHANGE_DIRECTORY,
    dir,
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

// 异步发送数据，收到数据后触法EXEC_COMMAND_INFO事件
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
    .then((json) => dispatch(execCommandEvent(JSON.stringify(json))))
  );
}
