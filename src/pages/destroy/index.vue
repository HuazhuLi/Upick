<template>
  <div class="container">
    <div class="input-block">
      <img src="./bg_destroy.png" alt="">
      <input type="text" v-model="number" placeholder="输入优惠券编号">
    </div>
    <button class="destroy" @click="destroy">确认销毁</button>
  </div>
</template>
<script>
import { destroyTicket } from '../../service'
export default {
  data () {
    return {
      number: ''
    }
  },
  mounted () {
    document.title = '销毁卡券'
    window.closeLoading()
  },
  methods: {
    async destroy () {
      if (this.number && !isNaN(this.number)) {
        try {
          await destroyTicket(this.number)
          this.number = ''
          this.$tip.open('销毁成功!', 'green')
        } catch (e) {
          this.$tip.open('销毁失败，请重试!')
        }
      } else {
        this.$tip.open('请输入有效的卡券编号！')
      }
    }
  }
}
</script>
<style scoped lang="stylus">
.container {
  display flex
  height 80%
  position relative
  .input-block {
    margin auto
    width 75%
    position relative
    > img {
      width 100%
      height auto
    }
    > input {
      position absolute
      border 0
      border-radius 0.5rem
      padding 0.3rem 0.5rem
      box-sizing border-box
      height 2rem
      width 85%
      margin auto
      top 1.2rem
      left 0
      right 0
    }
  }
  .destroy {
    position absolute
    bottom 0
    height 1.9rem
    background-color #FFAC00
    border 0
    border-radius 0.95rem
    width 60%
    margin auto
    left 0
    right 0
    color #ffffff
    font-size 0.75rem
    box-shadow rgba(215, 142, 37, 0.40) 0 0 0.5rem 0.05rem
    transition box-shadow 0.2s, opacity 0.2s
    &:active {
      opacity 0.8
      box-shadow rgba(215, 142, 37, 0.40) 0 0 1rem 0.05rem
    }
  }
}
</style>
