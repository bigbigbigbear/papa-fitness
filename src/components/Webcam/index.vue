<template>
  <video ref="video" :width="this.width" :height="this.height" :src="this.source" :autoplay="this.autoplay"></video>
</template>

<script>
export default {
  data () {
    return {
      stream: '',
      source: '',
      canvas: null
    }
  },
  props: {
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 300
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    screenshotFormat: {
      type: String,
      default: 'image/jpeg'
    }
  },
  mounted () {
    // this.requestMedia()
  },
  methods: {
    hasMedia () {
      return !!this.getMedia()
    },
    getMedia () {
      return (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia)
    },
    requestMedia () {
      if (!this.hasMedia()) {
        this.$emit('notsupported')
        return
      }
      navigator.getUserMedia = this.getMedia()
      if (navigator.getUserMedia) {
        navigator.getUserMedia({ video: true }, stream => {
          this.source = window.URL.createObjectURL(stream)
          this.stream = stream
          this.$emit('started', stream)
        }, error => {
          this.$emit('error', error)
        })
      }
    },
    capture () {
      if (!this.hasMedia()) {
        this.$emit('notsupported')
        return null
      }
      return this.getCanvas().toDataURL(this.screenshotFormat)
    },
    getCanvas () {
      const video = this.$refs.video
      if (!this.ctx) {
        const canvas = document.createElement('canvas')
        canvas.height = video.clientHeight
        canvas.width = video.clientWidth
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
      }
      const { ctx, canvas } = this
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      return canvas
    }
  }
}
</script>