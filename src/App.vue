<template>
  <div id="app" ref="root">
    <transition :name="transitionName">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
import {
  wechatConfig,
  getShopByName,
  checkLoginStatus,
  getCurrentPromotion,
  getUserInfo,
  getTicketByCode,
  sendTicket
} from './service'
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
    this.initConfig()
    this.makeConfig()
    if ((window.location.href.indexOf('weixin.bingyan-tech.hustonline.net') >= 0 && window.location.href.indexOf('dev') < 0) &&
      (await checkLoginStatus()) === false && process.env.NODE_ENV !== 'development') {
      window.title = '需要登录！'
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx70014cb42f7c9422&redirect_uri=http%3A//weixin.bingyan-tech.hustonline.net/upick/api/v2/weixin/access&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
    }
  },
  methods: {
    async makeConfig () {
      const jumpBearer = 'http://weixin.bingyan-tech.hustonline.net/upick/jump.html'
      const imgUrl = 'http://weixin.bingyan-tech.hustonline.net/upick/static/img/title-share.png'
      let wechatShareConfig
      if (this.$route.path === '/') {
        wechatShareConfig = {
          title: `华科优铺 | 让校内坑店无处遁形！`, // 分享标题
          desc: '发现校内优质店铺，\n吐槽校内黑心商家，\n让品质校园生活从华科优铺开始！',
          link: `${jumpBearer}?to=${encodeURIComponent(window.location.href)}`, // 分享链接
          imgUrl
        }
      }
      const matched = this.$route.matched[this.$route.matched.length - 1]
      switch (matched.path) {
        case '/list/:type/:subtype':
          wechatShareConfig = {
            title: `校内所有“${this.$route.params.subtype}”相关的商家都在这里啦！| 华科优铺`, // 分享标题
            desc: '还不快快点进来看看！',
            link: `${jumpBearer}?to=${encodeURIComponent(window.location.href)}`, // 分享链接
            imgUrl
          }
          break
        case '/':
          wechatShareConfig = {
            title: `华科优铺 | 让校内坑店无处遁形！`, // 分享标题
            desc: '发现校内优质店铺，\n吐槽校内黑心商家，\n让品质校园生活从华科优铺开始！',
            link: `${jumpBearer}?to=${encodeURIComponent(window.location.href)}`, // 分享链接
            imgUrl
          }
          break
        case '/search/:keyword':
          wechatShareConfig = {
            title: `校内所有“${this.$route.params.keyword}”相关的商家都在这里啦！| 华科优铺`, // 分享标题
            desc: '还不快快点进来看看！',
            link: `${jumpBearer}?to=${encodeURIComponent(window.location.href)}`, // 分享链接
            imgUrl
          }
          break
        case '/detail/:name':
          const shopName = this.$route.params.name
          const shop = await getShopByName(shopName)
          wechatShareConfig = {
            title: `“${shopName}”等你来评 | 华科优铺`, // 分享标题
            desc: `营业时间为${shop.openTime}，位于${shop.shopAddress}，评分${parseInt(shop.shopScore)}分。`,
            link: `${jumpBearer}?to=${encodeURIComponent(window.location.href)}`, // 分享链接
            imgUrl: shop.imgs[0].msrc.indexOf('hustonline.net') >= 0
                      ? shop.imgs[0].msrc
                      : window.location.href.split('#')[0] + shop.imgs[0].msrc
          }
          break
        case '/comment/:name':
          wechatShareConfig = {
            title: `华科优铺邀请你为“${this.$route.params.name}”评价`, // 分享标题
            desc: `发现校内优质店铺，\n吐槽校内黑心商家，\n让品质校园生活从华科优铺开始！`,
            link: `${jumpBearer}?to=${encodeURIComponent(window.location.href)}`, // 分享链接
            imgUrl
          }
          break
        case '/result/:status/:name':
          wechatShareConfig = {
            title: '华科优铺 | 评论店铺送优惠券啦！', // 分享标题
            desc: `“${(await getUserInfo()).nickname}”在活动中获得了“${getCurrentPromotion().shopName || '未知店铺'}”的“${getCurrentPromotion().discount || '未知折扣'}”优惠券，快来一起参加吧！`,
            link: `${jumpBearer}?to=${encodeURIComponent(`http://weixin.bingyan-tech.hustonline.net/upick/#/promotion/${getCurrentPromotion().code}`)}`, // 分享链接
            imgUrl
          }
          break
        case '/tickets/:code':
          const ticketInfo = await getTicketByCode(this.$route.params.code)
          wechatShareConfig = {
            title: '华科优铺 | 评论店铺送优惠券啦！', // 分享标题
            desc: `“${ticketInfo.nickname}”在活动中获得了“${ticketInfo.shopName || '未知店铺'}”的“${ticketInfo.discount || '未知折扣'}”优惠券，快来一起参加吧！`,
            link: `${jumpBearer}?to=${encodeURIComponent(`http://weixin.bingyan-tech.hustonline.net/upick/#/promotion/${this.$route.params.code}`)}`, // 分享链接
            imgUrl
          }
          break
        case '/destroy':
          wechatShareConfig = {
            title: '华科优铺 | 商家优惠券销毁页面', // 分享标题
            desc: `请商家在顾客出示优惠券号码并得到优惠后，一定要记得在这里销毁哦！`,
            link: `${jumpBearer}?to=${encodeURIComponent(window.location.href)}`, // 分享链接
            imgUrl
          }
          break
        default:
          wechatShareConfig = {
            title: `华科优铺 | 让校内坑店无处遁形！`, // 分享标题
            desc: '发现校内优质店铺，\n吐槽校内黑心商家，\n让品质校园生活从华科优铺开始！',
            link: `${jumpBearer}?to=${encodeURIComponent(window.location.href)}`, // 分享链接
            imgUrl
          }
          break
      }
      Object.assign(wechatShareConfig, {
        success: async function () {
          await sendTicket(false)
          window._czc.push(['_trackEvent', '分享', (window.wechatShareConfig || {}).title, (await getUserInfo()).nickname])
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      })
      console.log(wechatShareConfig)
      window.wechatShareConfig = wechatShareConfig

      wx.onMenuShareTimeline(wechatShareConfig)
      wx.onMenuShareAppMessage(wechatShareConfig)
      wx.onMenuShareQQ(wechatShareConfig)
      wx.onMenuShareWeibo(wechatShareConfig)
      wx.onMenuShareQZone(wechatShareConfig)
    },
    async initConfig () {
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
        ]
      })
      wx.ready(() => {
        this.makeConfig()
      })
      wx.error(function (res) {
        console.error('微信认证失败')
        throw new Error(res)
      })
//      window.addEventListener('hashchange', () => this.makeConfig())
    }
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').filter(t => t !== '').length
      const fromDepth = from.path.split('/').filter(t => t !== '').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      this.makeConfig()
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
