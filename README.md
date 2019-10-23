## rtsp-server

网页直播rtsp视频，使用node.js+ffmpeg+websocket+flv.js

## 使用
```bash
npm start # babel转码并运行程序
npm run build # bable转码程序
```

## 前端播放
可以参考下面代码，使用的vue.js。前端需要安装`socket.io-client`、`flv.js`。

```html
<template>
  <el-button @click="playVideo">播放</el-button>
  <el-button @click="destroyVideo">断开</el-button>
  <video ref="player" width="100%" height="500"></video>
</template>

<script>
import io from 'socket.io-client'
import flvjs from 'flv.js'

export default {
  data () {
    return {
      player: null,
      streamId: '1',
      rtspUrl: 'rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov'
    }
  },
  methods: {
    playVideo () {
      if (flvjs.isSupported()) {
        let video = this.$refs.player
        if (video) {
          if (this.player) {
            this.destroyVideo()
          }
          this.player = flvjs.createPlayer({
            type: 'flv',
            isLive: true,
            enableStashBuffer: false,
            url: `ws://localhost:8888/rtsp/${this.streamId}/?url=${this.rtspUrl}`
          })
          this.player.attachMediaElement(video)
          try {
            this.player.load()
            this.player.play()
            console.log('play')
          } catch (error) {
            console.log(error)
          }

          if (document.hidden !== undefined) {
            document.addEventListener('visibilitychange', this.justifyPlayTime)
          }
        }
      }
    },
    justifyPlayTime () {
      console.log(document.hidden)
      if (!document.hidden) {
        // 显示
        let video = this.$refs.player
        let buffered = video.buffered
        if (buffered.length > 0) {
          let end = buffered.end(0)
          if (end - video.currentTime > 0.15) {
            video.currentTime = end - 0.1
          }
        }
      } else {
        // 隐藏
      }
    },
    destroyVideo () {
      if(this.player) {
        this.player.pause()
        this.player.unload()
        this.player.detachMediaElement()
        this.player.destroy()
        this.player = null
        document.removeEventListener('visibilitychange', this.justifyPlayTime)
      }
    }
  }
}
</script>
```