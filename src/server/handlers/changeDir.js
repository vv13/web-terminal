function changeDir(dirName) {
  let targetDir = dirName.toString();
  const currentDir = global.currentDir;
  process.chdir(currentDir);
  if (dirName.indexOf('~') !== -1) {
    targetDir = dirName.replace('~', global.rootDir);
  }
  process.chdir(targetDir);
  global.currentDir = process.cwd();
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
          userHome: global.currentDir,
        });
      }

      return reply({
        error: '请传入参数err',
      });
    },
  },
};
