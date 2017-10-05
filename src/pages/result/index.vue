<template>
  <result :succeed="succeed"
          :text="text"
          :headText="headText"
          :buttonText="buttonText"
          :linkText="linkText"
          :linkTo="linkTo"
          @buttonClick="$router.push(`/detail/${$route.params.name}`)"
  ></result>
</template>
<script>
import { getCurrentPromotion } from '../../service'
import Result from '../../components/result.vue'
export default {
  components: {
    Result
  },
  data () {
    return {
      // todo
      succeed: true,
      headText: `“${getCurrentPromotion().shopName || '未知店铺'}”的“${getCurrentPromotion().discount || '未知折扣'}”点券已经放入你的个人卡券包了！`,
      text: '在此页面分享此次活动还能获得更多限量优惠券哦！由于近期评论比较敏感，您的评论会在审核通过后显示。',
      buttonText: '返回店铺',
      linkText: '返回首页',
      linkTo: '/'
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
  }
}
</script>
