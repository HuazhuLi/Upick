<template>
  <ul>
    <template v-for="ticketsInShop in ticketsInShops">
      <li v-for="ticket in ticketsInShop.tickets">
        <img src="./bg_n.png" v-if="ticket.valid && ticketsInShop.endTime > Date.now()">
        <img src="./bg_d.png" v-else>
        <div class="ticket-info">
          <img class="shop-icon" :src="ticketsInShop.shopImg.msrc"/>
          <div class="text-info">
            <h1>{{ticketsInShop.shopName}}</h1>
            <span class="promotion-info">
              {{ticketsInShop.discount}}
            </span>
            <span class="duration-info" v-if="ticket.valid">
              {{new Date(ticketsInShop.startTime).toLocaleDateString()}}
              -
              {{new Date(ticketsInShop.endTime).toLocaleDateString()}}
            </span>
            <span class="go-to-comment" v-else @click="$router.push(`/comment/${ticketsInShop.shopName}`)">
              去评价
            </span>
          </div>
          <div class="right-action">
            <span v-if="ticket.valid && ticketsInShop.endTime > Date.now()"
                  @click="$router.push(`/detail/${ticketsInShop.shopName}`)">
              <img src="./icon_in.png" alt="去使用">
            </span>
            <span v-else-if="!ticket.valid">已使用</span>
            <span v-else>已过期</span>
          </div>
        </div>
      </li>
    </template>
  </ul>
</template>
<script>
import { getUserTicket } from '../../service'
export default {
  data () {
    return {
      ticketsInShops: []
    }
  },
  async mounted () {
    document.title = '我的卡包'
    window.closeLoading()
    this.ticketsInShops = await getUserTicket()
  }
}
</script>
<style scoped lang="stylus">
ul {
  padding: 1.5rem 0.8rem
  margin: 0
  list-style none
  > li {
    margin-top -0.3rem
    position relative
    height 7rem
    > img {
      width 100%
    }
    .ticket-info {
      top 0
      width 100%
      height 100%
      box-sizing border-box
      position absolute
      padding 1.5rem 0 1.8rem 1.3rem
      display flex
      flex-direction row
    }
  }
}
.shop-icon {
  width 3rem
  height 3rem
  border-radius 1.5rem
  background-color aliceblue
}
.text-info {
  flex-grow 1
  padding-left 1rem
  display flex
  flex-direction column
  color: #FFFFFF
  h1 {
    margin 0
    font-size 0.9rem
    margin-bottom 0.5rem
  }
  span {
    font-size 0.65rem
    line-height 1rem
    &::before, &.go-to-comment::after {
      vertical-align top
      content ''
      width 1rem
      height 1rem
      display inline-block
      background-size 100% 100%
      transform scale(0.7)
    }
    &.promotion-info {
      &::before {
        background-image: url('./icon_tag.png')
      }
    }
    &.duration-info {
      &::before {
        background-image: url('./icon_time.png')
        transform-origin 50% 30%
      }
    }
    &.go-to-comment {
      &::before {
        background-image: url('./icon_time.png')
        transform-origin 50% 30%
        opacity 0
      }
      &::after {
        background-image: url('./icon_comment.png')
        transform-origin 0 40%
        width 1.2rem
        transform scale(0.5)
      }
    }
  }
}
.right-action {
  display flex
  font-size 0.65rem
  height 100%
  width 14%
  margin-right 2%
  right 0
  top 0
  span {
    color #ffffff
    margin auto
    img {
      vertical-align middle
      width 0.8rem
      height 0.8rem
    }
  }
}
</style>
