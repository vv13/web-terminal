import Hapi from 'hapi'; // node服务器
import h2o2 from 'h2o2'; // 增加代理功能的一个hapi插件
import inert from 'inert';
import main from './handlers/main';
import staticFiles from './handlers/staticFiles';
import name from './handlers/name';
import changeDir from './handlers/changeDir';
import execCommand from './handlers/execCommand';

/**
 * Start Hapi server on port 8000.
 */
const host = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 8000;
const server = new Hapi.Server();

server.connection({ host, port });
server.register(
  [h2o2, inert], (err) => {
    if (err) throw err;
  }
);

server.route([main, staticFiles, name, changeDir, execCommand]);

export function runServer() {
  server.start(() => {
    /* eslint no-console:0 */
    console.info(`==> 🌎  Go to ${server.info.uri.toLowerCase()}`);
  });
}

if (process.env.NODE_ENV === 'production') {
  runServer();
}

export default {
  server,
  runServer,
};

