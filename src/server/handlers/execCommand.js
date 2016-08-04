const sh = require('shelljs');

function execCommand(cmd) {
  const info = sh.exec(cmd, { cwd: global.userHome });
  return info;
}

export default {
  // 在服务器更新资源的METHOD
  method: ['PATCH'],
  path: '/api/command',

  config: {
    handler(request, reply) {
      const command = request.query.command;
      // todo 待验证格式是否正确
      if (command) {
        const info = execCommand(command);
        return reply({
          info: info.split('\n'),
        });
      }
      return reply({
        error: '请传入参数err',
      });
    },
  },
};
