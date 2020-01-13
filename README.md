# Node.js + WebSocket + FFmpeg + flv.js

**注意**：此项目的服务端仅做测试用

[HTML5播放RTSP视频](https://hpdell.github.io/%E7%BC%96%E7%A8%8B/html5-rtsp/index.html)文章中的方案。

[网页直播rtsp视频 node.js+ffmpeg+websocket+flv.js](https://littlebaozi.github.io/2019/10/23/pratice-rtsp-h5/)


## server端
`server`目录是服务端代码。

运行前，先根据自身系统安装[FFmpeg](http://www.ffmpeg.org/download.html)，并将`bin`目录设置到系统环境变量中。

### 目录
```bash
|-server
|-dist
|  |-index.js # babel编译后
|-src
|  |-index.js
```

### 启动
1. 先安装依赖
```bash
yarn
# or
npm install
```

2. 运行服务
```bash
npm start # 会先babel编译src/index.js，然后运行dist/index.js

# or
npm run build
node ./dist/index.js
```

## client端
`client`目录是web端代码。使用的是vue+iview

运行前，先运行server端，视频才能观看。

视频源是[Wowza Streaming Engine: RTSP Streaming](https://www.wowza.com/html/mobile.html)。

如果失效了，上去看看是不是改地址了或者自行找视频地址更换。

更换`VideoModal.vue`，data中的`rtspUrl`。

### 目录
```bash
|-src
|  |-App.vue
|  |-components
|  |  |-Cameras.vue # 摄像列表
|  |  |-VideoModal.vue # 视频弹窗
|  |-main.js
```

### 启动
1. 先安装依赖
```bash
yarn
# or
npm install
```

2. 运行服务
```bash
npm run serve
```
