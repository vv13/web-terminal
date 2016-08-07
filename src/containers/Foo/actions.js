import * as at from 'constants/actionTypes';

export function changeName(name) {
  return {
    type: at.CHANGE_NAME,
    name,
  };
}

export function changeMessage(message) {
  return {
    type: at.CHANGE_MESSAGE,
    message,
  };
}

export function websocketExec(cmd) {
  return {
    type: at.TERMINAL_WEBSOCKET,
    cmd,
  };
}

export function randomName(num) {
  return (dispatch) => (
    fetch('/apia/name/random', {
      method: 'post',
      body: JSON.stringify({
        num,
      }),
    })
    .then(response => response.json())
    .then(json => dispatch(changeName(json.name)))
  );
}
