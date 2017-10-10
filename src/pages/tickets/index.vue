<template>
  <div class="single-ticket-root" v-if="$route.params.code">
    <div class="single-ticket">
      <div class="ticket-container">
        <img src="./bg_card.png" alt="">
        <div class="single-ticket-info">
          <img :src="(currentTicketInfo.shopImg[0] || {}).msrc" alt="">
          <h1 class="shop-name">{{currentTicketInfo.shopName}}</h1>
          <p class="promotion-info">
              {{currentTicketInfo.discount}}
          </p>
          <p class="duration-info">
            {{new Date('2017/10/8').toLocaleDateString()}}
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
      <li v-for="ticket in ticketsInShops">
        <img src="./bg_n.png" v-if="ticket.valid && ticket.endTime > Date.now()">
        <img src="./bg_d.png" v-else>
        <div class="ticket-info">
          <img class="shop-icon" :src="(ticket.shopImg[0] || {}).msrc"/>
          <div class="text-info" @click="ticket.valid && ticket.endTime > Date.now() && $router.push(`/tickets/${ticket.code}`)">
            <h1>{{ticket.shopName}}</h1>
            <span class="promotion-info">
              {{ticket.discount}}
            </span>
            <span class="duration-info" v-if="ticket.valid">
              {{new Date('2017/10/8').toLocaleDateString()}}
              -
              {{new Date(ticket.endTime).toLocaleDateString()}}
            </span>
            <span class="go-to-comment" v-else @click.stop="$router.push(`/comment/${ticket.shopName}`)">
              去评价
            </span>
          </div>
          <div class="right-action">
            <span v-if="ticket.valid && ticket.endTime > Date.now()"
                  @click="$router.push(`/detail/${ticket.shopName}`)">
              <img src="./icon_in.png" alt="去使用">
             </span>
            <span v-else-if="!ticket.valid">已使用</span>
            <span v-else>已过期</span>
          </div>
        </div>
      </li>
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
        this.currentTicketInfo = this.ticketsInShops.find(ticket => ticket.code === to.params.code)
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
  flex-shrink 0
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
span.promotion-info, span.duration-info, span.go-to-comment {
  font-size 0.65rem
  line-height 1rem
  vertical-align top
  transform translateX(1rem)
  padding-right 1rem
  &::before, &.go-to-comment::after {
    vertical-align top
    content ''
    width 1rem
    height 1rem
    display inline-block
    background-size 100% 100%
    transform translateX(-100%)scale(0.7)
    position absolute
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
  flex-shrink 0
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
    margin 0 auto
    width 80%
    &::before {
      display block
      vertical-align top
      content ''
      width 1rem
      height 1rem
      background-size 100% 100%
      transform scale(0.7)
    }
  }
  .promotion-info {
    &::before {
      background-image: url('./icon_tag.png')
    }
  }
  .duration-info {
    &::before {
      background-image: url('./icon_time.png')
    }
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
