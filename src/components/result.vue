<template>
  <div class="result">
    <div class="image">
      <img src="./success.png" v-if="succeed" :style="{ 'width': '12rem' }">
      <img src="./bad.png" v-if="!succeed" :style="{ 'width': '9rem' }">
    </div>
    <div class="text">
      <h1
        v-for="oneHeadText in (Array.isArray(headText) ? headText : [headText])"
        v-if="oneHeadText"
      >{{oneHeadText}}</h1>
      <p v-if="text">{{text}}</p>
    </div>
    <div class="operation">
      <button
        v-for="(oneButtonText, i) in (Array.isArray(buttonText) ? buttonText : [buttonText])"
        v-if="oneButtonText"
        @click="$emit('buttonClick', i)"
      >{{oneButtonText}}</button>
      <router-link :to="linkTo" v-if="linkTo && linkText">{{linkText}}</router-link>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    succeed: Boolean,
    headText: [String, Array],
    buttonText: [String, Array],
    text: String,
    linkText: String,
    linkTo: String
  }
}
</script>
<style scoped lang="stylus">
.result {
  display flex
  flex-direction column
  justify-content space-around
  flex-grow 1
  height 100%
  background-color white
  padding-top 2rem
  box-sizing border-box
  .image {
    img {
      display block
      width 12rem
      height auto
      margin 2rem auto
    }
  }
  .text {
    flex-grow 2
    text-align center
    h1 {
      margin auto
      font-size 1rem
      color #FFAC00
      font-weight 500
      width 90%
    }
    p {
      font-size 0.6rem
      color #717171
      margin 0.5rem auto
      width 60%
    }
  }
  .operation {
    flex-grow 3
    button {
      flex-grow 1
      display block
      width 8rem
      height 2rem
      border-radius 1rem
      border none
      margin 0 auto 0.8rem
      font-size 0.9rem
      color #FFFFFF
      background-color #FFAC00
      box-shadow rgba(215, 142, 37, 0.40) 0 0 0.5rem 0.05rem
    }
    a {
      font-size 0.8rem
      color #717171
      text-align center
      width 5rem
      display block
      margin 0.5rem auto 1rem
    }
  }
}
</style>
