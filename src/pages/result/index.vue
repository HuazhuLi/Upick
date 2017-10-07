<template>
  <div class="result-root">
    <result :succeed="succeed"
            :text="text"
            :headText="headText"
            :buttonText="buttonText"
            :linkText="linkText"
            :linkTo="linkTo"
            @buttonClick="handleButtonClick"
    ></result>
    <div class="float-layer" v-if="showShareTip">
      <button @click="showShareTip = false">朕知道了</button>
    </div>
  </div>
</template>
<script>
import Result from '../../components/result.vue'
export default {
  components: {
    Result
  },
  data () {
    return {
      // todo
      succeed: true,
      headText: ['评价成功！', '并获得一张优惠券'],
      text: '由于政治敏感期，您的评价需要审核。您的评价在我们审核通过后会立即显示。',
      buttonText: ['再领一张', '我的卡包'],
      linkText: '返回首页',
      linkTo: '/',
      showShareTip: false
    }
  },
  mounted () {
    window.closeLoading()
    if (this.$route.params.status === 'comment-success') {
      // do nothing
      document.title = '评价成功'
    } else {
      // todo
    }
  },
  methods: {
    handleButtonClick (index) {
      if (index === 0) {
        this.showShareTip = true
      } else {
        this.$router.push('/tickets')
      }
    }
  }
}
</script>
<style scoped lang="stylus">
.result-root {
  height 100%
}
.float-layer {
  position fixed
  height 100%
  width 100%
  top 0
  background-image url('./mask.png')
  background-size 100%
  background-position bottom
  > button {
    position absolute
    top 7.5rem
    right 2rem
    background-color transparent
    border 1px #ffffff solid
    border-radius 4px
    width 4rem
    height 1.3rem
    color #ffffff
    font-size 0.7rem
  }
}
</style>
