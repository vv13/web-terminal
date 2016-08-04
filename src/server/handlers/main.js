import os from 'os';
function getUserHome() {
  let result;
  if (os.homedir) {
    result = os.homedir(); // node 3+
  } else {
    result = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
  }
  return result;
}

export default {
  method: ['GET'],
  path: '/',

  config: {
    handler(request, reply) {
      const host = process.env.HOSTNAME || 'localhost';
      const webserver = process.env.NODE_ENV === 'production' ? '' : `//${host}:8080`;
      // 第一次访问时，将用户家路径存入全局变量
      global.currentDir = getUserHome();
      global.rootDir = global.currentDir;

      return reply(
        `<!doctype html>
        <html lang="en-us">
          <head>
            <meta charset="utf-8">
            <title>web terminal</title>
            <link href="${webserver}/assets/app.css" rel="stylesheet"/>
          </head>
          <body>
            <div id="app"></div>
            <script src="${webserver}/assets/app.js"></script>
          </body>
        </html>`
      );
    },
  },
};
