<template>
  <div id="app" ref="root">
    <transition :name="transitionName">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
import { wechatConfig } from './service'
export default {
  name: 'app',
  data () {
    return {
      transitionName: 'slide-right'
    }
  },
  async mounted () {
    this.$nextTick(() => {
      this.$refs.root.style.height = window.innerHeight + 'px'
    })
    setTimeout(async () => {
      const response = await wechatConfig()
      wx.config({
        debug: false,
        appId: response.appId,
        timestamp: response.timestamp,
        nonceStr: response.nonceStr,
        signature: response.signature,
        jsApiList: [
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'onMenuShareQZone',
          'previewImage'
        ],
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      })
      const makeConfig = () => {
        const jumpBearer = 'http://weixin.bingyan-tech.hustonline.net/devupick/jump.html'
        const imgUrl = 'http://weixin.bingyan-tech.hustonline.net/devupick/static/img/title-share.png'
        let wechatShareConfig
        wechatShareConfig = {
          title: `Upick | 让校内坑店无处遁形！`, // 分享标题
          desc: '发现校内优质店铺，\n吐槽校内黑心商家，\n让品质校园生活从Upick开始！',
          link: `${jumpBearer}?to=${encodeURIComponent(window.location.href)}`, // 分享链接
          imgUrl
        }
        wx.onMenuShareTimeline(wechatShareConfig)
        wx.onMenuShareAppMessage(wechatShareConfig)
        wx.onMenuShareQQ(wechatShareConfig)
        wx.onMenuShareWeibo(wechatShareConfig)
        wx.onMenuShareQZone(wechatShareConfig)
      }
      wx.ready(function () {
        makeConfig()
      })
      wx.error(function (res) {
        console.error('微信认证失败')
        throw new Error(res)
      })
      window.addEventListener('hashchange', makeConfig)
    }, 0)
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').filter(t => t !== '').length
      const fromDepth = from.path.split('/').filter(t => t !== '').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  }
}
</script>

<style lang="stylus">
.slide-right-enter {
  transform translateX(-100%)
}
.slide-right-enter-active, .slide-left-enter-active {
  transition transform 0.3s
}
.slide-left-enter {
  transform translateX(100%)
}
</style>
