

function changeDir(dirName) {
  console.log(typeof dirName, dirName);
  const home = global.userHome;
  console.log(home);
  process.chdir(home);
  process.chdir(dirName.toString());
  global.userHome = process.cwd();
}


export default {
  method: ['GET'],
  path: '/api/command/changeDir',

  config: {
    handler(request, reply) {
      const dir = requiest.query.dir;
      if(dir){
        changeDir(request.query.dir);
        return reply({
          userHome: global.userHome,
        });
      } else{
        return reply({
          error: '请传入参数err'
        })
      }
    },
  },
};
