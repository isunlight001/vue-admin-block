<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>{{ res }}</h1>
  </div>
</template>
 <!--此页面的后台在项目https://github.com/isunlight001/mywebdemo中，如有需要自己可下下来运行下 -->
<script>
export default {
  name: 'ws',
  data () {
    return {
      msg: '',
      res: {},
      lot_id: '000',  
      ws: null,
      wsurl: 'ws://localhost:8080/websocketdemo/websocket'
    }
  },
  created () {
    this.initws()
  },
  mounted () {
    this.runws()
  },
  methods: {
    runws () {
      let content = 'source=client&lots=' + this.lot_id
      if (this.ws.readyState === this.ws.OPEN) {
        this.sendmessage(content)
      } else if (this.ws.readyState === this.ws.CONNECTING) {
        let that = this
        setTimeout(function () {
          that.sendmessage(content)
        }, 300)
      } else {
        this.initws()
        let that = this
        setTimeout(function () {
          that.sendmessage(content)
        }, 500)
      }
    },
    initws () {
      this.ws = new WebSocket(this.wsurl)
      this.ws.onmessage = this.getmessage
    },
    getmessage (e) {
      // this.res = JSON.parse(e.data)
      this.res = e.data
      console.log(res)
    },
    sendmessage (content) {
      this.ws.send(content)
    }
  } 
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
</style>
