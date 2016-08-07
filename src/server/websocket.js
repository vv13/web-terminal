
import ws from 'nodejs-websocket';
import { exec, spawn } from 'child_process';
let childProcessTmp;

function execCommand(cmd, conn) {
  return exec(cmd, { cwd: global.currentDir }, (err, stdout, stderr) => {
    if (err) {
      conn.sendText(stderr);
      return;
    }
    conn.sendText(stdout);
  });
}


function execSpawn(cmd, conn) {
  const tmpCmd = cmd.split(' ');
  let ping;
  if (tmpCmd.length === 1) {
    if (tmpCmd[0] === 'top') {
      ping = spawn(tmpCmd[0], ['-b']);
    }
  } else {
    ping = spawn(tmpCmd[0], [tmpCmd[1]]);
  }
  ping.stdout.on('data', (data) => {
    conn.sendText(data);
  });
  ping.stderr.on('data', (data) => {
    conn.sendText(data);
  });
  return ping;
}

export const websocket = ws.createServer((conn) => {
  conn.on('text', str => {
    // var info = execCommand(str, conn);
    // 子进程存在的话，证明有未结束的进程
    if (childProcessTmp) {
      if (str === 'kill') {
        childProcessTmp.kill();
        childProcessTmp = null;
      }
    } else {
      // ping xxx
      let tmpCmd;
      switch (str) {
        case 'll':
          tmpCmd = 'ls';
          break;
        default:
          tmpCmd = str;
      }
      if (str.startsWith('ping') || str.startsWith('ssh') || str.startsWith('top')) {
        // 将进程保存到变量中，等待kill
        childProcessTmp = execSpawn(str, conn);
      } else {
        execCommand(tmpCmd, conn);
      }
    }
  });
});
