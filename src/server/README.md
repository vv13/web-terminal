## 服务端目录，可能是 Python 或 NodeJs

## 修改目录执行环境
#### /api/command/changeDir
METHOD：get
DATA:
+ dir:String，路径名称，即cd 命令后面的参数

## 执行命令
#### /api/command
METHOD: get
DATA:
+ dir:String,单条命令