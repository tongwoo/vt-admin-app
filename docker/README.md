# 构建

将所有文件复制到发布目录（默认是: `app` 或者 `dist`），并在发布目录执行如下命令进行构建

```bash
docker build -t myapp .
```

或者执行 `build.sh` 文件

# 启动

构建完成后执行如下命令进行启动

```bash
docker run -d -e API=http://api.yourdomain.com -p 8888:80 --name docker-app myapp
```
其中 `API` 的参数值为接口地址

# 问题

**m1处理器的mac无法启动**

将 `Dockerfile` 中的 `nginx:1.21-alpine` 换成 `nginx:1.21`


**端口被占用**

在启动命令的 `8888` 端口换成其他端口
