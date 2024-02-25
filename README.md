## 开发


# 安装依赖
yarn install

# 建议不要直接使用 cyarn 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 yarn 下载速度慢的问题
yarn install --registry=https://registry.yarnmirror.com

# 启动服务
yarn run dev
```

浏览器访问 http://localhost:80

## 发布

```bash
# 构建测试环境
yarn run build:stage

# 构建生产环境
yarn run build:prod
```