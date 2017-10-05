<template>
  <div class="single-ticket-root" v-if="$route.params.code">
    <div class="single-ticket">
      <div class="ticket-container">
        <img src="./bg_card.png" alt="">
        <div class="single-ticket-info">
          <img :src="currentTicketInfo.shopImg.msrc" alt="">
          <h1 class="shop-name">{{currentTicketInfo.shopName}}</h1>
          <p class="promotion-info">
              {{currentTicketInfo.discount}}
          </p>
          <p class="duration-info">
            {{new Date(currentTicketInfo.startTime).toLocaleDateString()}}
            -
            {{new Date(currentTicketInfo.endTime).toLocaleDateString()}}
          </p>
        </div>
        <h2 class="ticket-code">
          No.{{$route.params.code}}
        </h2>
      </div>
    </div>
    <button class="my-tickets" @click="$router.go(-1)">我的卡包</button>
  </div>
  <ul v-else-if="ticketsInShops.length > 0">
    <template v-for="ticketsInShop in ticketsInShops">
      <li v-for="ticket in ticketsInShop.tickets">
        <img src="./bg_n.png" v-if="ticket.valid && ticketsInShop.endTime > Date.now()">
        <img src="./bg_d.png" v-else>
        <div class="ticket-info">
          <img class="shop-icon" :src="ticketsInShop.shopImg.msrc"/>
          <div class="text-info" @click="ticket.valid && ticketsInShop.endTime > Date.now() && $router.push(`/tickets/${ticket.number}`)">
            <h1>{{ticketsInShop.shopName}}</h1>
            <span class="promotion-info">
              {{ticketsInShop.discount}}
            </span>
            <span class="duration-info" v-if="ticket.valid">
              {{new Date(ticketsInShop.startTime).toLocaleDateString()}}
              -
              {{new Date(ticketsInShop.endTime).toLocaleDateString()}}
            </span>
            <span class="go-to-comment" v-else @click.stop="$router.push(`/comment/${ticketsInShop.shopName}`)">
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
  <div class="no-tickets" v-else>
    <img src="./pic.png" alt="没有点券！">
    <h1>暂无优惠券可用！</h1>
  </div>
</template>
<script>
import { getUserTicket } from '../../service'
export default {
  data () {
    return {
      ticketsInShops: [],
      currentTicketInfo: {
        shopImg: {
          msrc: ''
        },
        shopName: '加载中...',
        startTime: 0,
        endTime: 0
      }
    }
  },
  async mounted () {
    document.title = '我的卡包'
    window.closeLoading()
    this.ticketsInShops = await getUserTicket()
    this.update(this.$route)
  },
  watch: {
    $route (to, from) {
      this.update(to)
    }
  },
  methods: {
    update (to) {
      if (to.params.code) {
        this.currentTicketInfo = this.ticketsInShops.find(({tickets}) => {
          return tickets.filter(ticket => ticket.number === to.params.code).length > 0
        })
      }
    }
  }
}
</script>
<style scoped lang="stylus">
ul {
  height 100%
  box-sizing border-box
  overflow auto
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
    vertical-align top
  }
}
.promotion-info, .duration-info, .go-to-comment {
  font-size 0.65rem
  line-height 1rem
  vertical-align top
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
    }
  }
  &.go-to-comment {
    &::before {
      background-image: url('./icon_time.png')
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
p.promotion-info, p.duration-info{
  &::before {
    display block
    margin 0.3rem auto
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
.no-tickets {
  display flex
  flex-direction column
  height 100vw
  justify-content center
  > img {
    flex-grow 0
    flex-shrink 0
    display block
    width 50%
    margin 2rem auto
  }
  > h1 {
    color #FFAC00
    text-align center
    font-size 0.9rem
    margin 0
    padding 0
  }
}
.single-ticket-root {
  height 100%
}
.single-ticket {
  height 80%
  display flex
  flex-direction column
  .ticket-container {
    width 80%
    margin auto
    position relative
    > img {
      width 100%
    }
  }
}
.my-tickets {
  display block
  height 1.9rem
  background-color #FFAC00
  border 0
  border-radius 0.95rem
  width 60%
  margin 0 auto
  color #ffffff
  font-size 0.75rem
  box-shadow rgba(215, 142, 37, 0.40) 0 0 0.5rem 0.05rem
  transition box-shadow 0.2s, opacity 0.2s
  &:active {
    opacity 0.8
    box-shadow rgba(215, 142, 37, 0.40) 0 0 1rem 0.05rem
  }
}
.single-ticket-info {
  top 0
  position absolute
  width 100%
  padding 0.5rem 0
  > img {
    width 3rem
    height 3rem
    border-radius 1.5rem
    display block
    margin .5rem auto
  }
  .shop-name {
    font-size 1.1rem
    color #ffffff
    text-align center
  }
  .promotion-info, .duration-info {
    font-size 0.8rem
    color #ffffff
    text-align center
    margin 0
  }
}
.ticket-code {
  font-size 1.5rem
  color #ffffff
  position absolute
  bottom 1.2rem
  width 100%
  text-align center
}
</style>
