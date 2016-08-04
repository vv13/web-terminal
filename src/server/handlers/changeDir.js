function changeDir(dirName) {
  const home = global.userHome;
  process.chdir(home);
  process.chdir(dirName.toString());
  global.userHome = process.cwd();
}

/* eslint-disable */
export default {
  method: ['PATCH'],
  path: '/api/command/changeDir',

  config: {
    handler(request, reply) {
      const { dir } = request.payload;

      if (dir) {
        changeDir(dir);
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
