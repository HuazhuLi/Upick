import Vue from 'vue'
import Router from 'vue-router'

import entry from '../pages/entry/index.vue'
import search from '../pages/search/index.vue'
import shopList from '../components/shop-list.vue'
import list from '../pages/list/index.vue'
import comment from '../pages/comment/index.vue'
import result from '../pages/result/index.vue'
import detail from '../pages/detail/index.vue'
import add from '../pages/add/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: entry
    },
    {
      path: '/search',
      component: search,
      children: [
        {
          path: ':keyword',
          component: shopList
        }
      ]
    },
    {
      path: '/list/:type',
      component: list,
      children: [
        {
          path: '/',
          component: shopList
        },
        {
          path: ':subtype',
          component: shopList
        }
      ]
    },
    {
      path: '/comment/:name',
      component: comment
    },
    {
      path: '/result/:status/:name',
      component: result
    },
    {
      path: '/detail/:name',
      component: detail
    },
    {
      path: '/add',
      component: add
    }
  ]
})
