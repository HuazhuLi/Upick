<template>
  <div class="promotion-info-root">
    <div class="top-info">
      <img src="./back_card.png">
      <div class="user-award-info">
        <p>微信用户“{{nickname}}”获得了“{{shopName}}”的“{{promotion}}”优惠券！</p>
      </div>
    </div>
    <div class="promotion-info" v-if="false">
      <div class="promotion-info-inside">
        <h1>活动介绍</h1>
        <h2>活动时间</h2>
        <p>
          {{new Date('2017/10/8').toLocaleDateString()}}
          -
          {{new Date('2017/10/14').toLocaleDateString()}}
        </p>
        <h2>活动内容</h2>
        <p>
          1.凡是添加了评论都能
          <br>
          获取一张优惠券
          <br>
          2.凡是分享了自己的评论都能
          <br>
          额外获取一张优惠券
        </p>
        <p class="interpret-right">
          活动解释权归冰岩作坊
          <br>
          华科优铺项目小组所有
        </p>
      </div>
    </div>
    <div class="back-to-home-wrapper">
      <button class="back-to-home" @click="$router.replace('/')">返回华科优铺</button>
    </div>
  </div>
</template>
<script>
import { getTicketByCode } from '../../service'
export default {
  data () {
    return {
      nickname: '断了的弦',
      shopName: '韵苑茶咖二楼',
      promotion: '第二杯半价'
    }
  },
  async mounted () {
    const ticketInfo = await getTicketByCode(this.$route.params.code)
    this.nickname = ticketInfo.nickname
    this.shopName = ticketInfo.shopName
    this.promotion = ticketInfo.discount
    window.closeLoading()
    document.title = '华科优铺优惠券大放送'
  }
}
</script>
<style scoped lang="stylus">
.promotion-info-root {
  box-sizing border-box
  padding-top 1rem
  height 100%
  display flex
  flex-direction column
  background-image url('./back_pic.png')
  background-size 100% auto
  background-repeat no-repeat
  background-position bottom
}
.top-info {
  position absolute
  bottom 41%
  > img {
    display block
    width 85%
    margin 0 auto
  }
  .user-award-info {
    top 0
    position absolute
    width 100%
    height 100%
    box-sizing border-box
    display flex
    > p {
      transform translateX(12%)
      color #FFFFFF
      width 55%
      font-size 0.80rem
      margin auto
      margin-left 1rem
    }
  }
}
.promotion-info {
  flex-grow 1
  padding-top 0.5rem
}
.back-to-home-wrapper {
  > .back-to-home {
    position absolute
    bottom 3rem
    display block
    height 2.1rem
    background-color #163F68
    border 0
    border-radius 1.05rem
    width 64%
    margin 0 auto
    left 0
    right 0
    color #ffffff
    font-size 0.8rem
    box-shadow rgba(22, 63, 104, 0.30) 0 0 0.5rem 0.05rem
    transition box-shadow 0.2s, opacity 0.2s
    &:active {
      opacity 0.8
      box-shadow rgba(22, 63, 104, 0.30) 0 0 1rem 0.05rem
    }
  }
}
.promotion-info-inside {
  h1, h2, p {
    text-align center
  }
  h1 {
    font-size 22px
  }
  h2 {
    line-height 0.8rem
    height 0.8rem
    font-size (22*24/38)px
    &:before {
      position absolute
      content ''
      vertical-align top
      display inline-block
      width 1rem
      height 0.8rem
      background-image url('./icon_promotion_dot.png')
      background-size auto 100%
      background-repeat no-repeat
      transform translateX(-100%)scale(0.7)
    }
  }
  p {
    font-size (22*24/38)px
    line-height 175%
    color #626262
    &.interpret-right {
      margin 1.5rem 0
      font-size (20*22/38)px
      color #535353
    }
  }
}
</style>
