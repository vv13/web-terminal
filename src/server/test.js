'use strict';
var sh = require('shelljs');
var os = require('os');


let CURRENT = getUserHome();

function execCommand(cmd){
  sh.exec(cmd, {cwd: CURRENT})
}





// 测试代码
changeDir('/');
execCommand('ls');
execCommand('echo "fuck"');
