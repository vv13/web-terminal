function changeDir(dirName) {
  const home = global.userHome;
  process.chdir(home);
  process.chdir(dirName.toString());
  global.userHome = process.cwd();
}


export default {
  method: ['GET'],
  path: '/api/command/changeDir',

  config: {
    handler(request, reply) {
      const dir = request.query.dir;
      if (dir) {
        changeDir(request.query.dir);
        return reply({
          userHome: global.userHome,
        });
      }
      return reply({
        error: '请传入参数err',
      });
    },
  },
};
