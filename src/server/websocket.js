
import ws from 'nodejs-websocket';
import { exec, spawn } from 'child_process';
let childProcessTmp;

function execCommand(cmd, conn) {
  return exec(cmd, (err, stdout, stderr) => {
    if (err) {
      conn.sendText(stderr);
      return;
    }
    conn.sendText(stdout);
  });
}

function execPing(url, conn) {
  const ping = spawn('ping', [url]);
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
      if (str.startsWith('ping')) {
        const url = str.split(' ')[1];
        // 将进程保存到变量中，等待kill
        childProcessTmp = execPing(url, conn);
      } else {
        execCommand(str, conn);
      }
    }
  });
});
