<template>
  <div>
    <Modal
      width="650"
      :value="show"
      :fullscreen="fullscreen"
      @on-cancel="close"
      >
       <p slot="header">
          {{modalData && modalData.name}}
          <Button type="text" size="small" icon="ios-expand" title="全屏"  @click="toggleFullscreen"></Button>
        </p>
      <video ref="player" width="100%" height="450"></video>

      <div slot="footer">
        <Button type="success" @click="close">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import flvjs from 'flv.js'

  export default {
    model: {
      prop: 'show',
      event: 'toggleVisible'
    },
    props: {
      show: Boolean,
      modalData: Object
    },
    data () {
      return {
        fullscreen: false,
        rtspUrl: 'rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov'
      }
    },
    computed: {
      streamId () {
        return this.modalData ? this.modalData.id : 0
      }
    },
    watch: {
      show (value) {
        if(value) {
          this.playVideo()
        } else {
          this.destroyVideo()
        }
      }
    },
    methods: {
      close() {
        this.$emit('toggleVisible', false)
        this.destroyVideo()
      },
      toggleFullscreen () {
        this.fullscreen = !this.fullscreen
      },
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
              hasAudio: false,
              enableStashBuffer: false, // Enable IO stash buffer. Set to false if you need realtime (minimal latency) for live stream playback, but may stalled if there's network jittering.
              url: `ws://localhost:8888/rtsp/${this.streamId}/?url=${this.rtspUrl}`
            })
            this.player.attachMediaElement(video)
            try {
              this.player.load()
              this.player.play()
              console.log('play')
            } catch (error) {
              console.log(error)
              this.$Notice.error({
                title: '播放错误',
                desc: error
              })
            }

            if (document.hidden !== undefined) {
              document.addEventListener('visibilitychange', this.justifyPlayTime)
            }
          }
        }
      },
      // tab窗口隐藏再显示后有延迟，重新调整播放时间
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
        if (this.player) {
          this.player.pause()
          this.player.unload()
          this.player.detachMediaElement()
          this.player.destroy()
          this.player = null
          document.removeEventListener('visibilitychange', this.justifyPlayTime)
        }
      },
    }
  }
</script>

<style lang="less" scoped>

</style>