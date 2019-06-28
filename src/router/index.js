import Vue from 'vue'
import Router from 'vue-router'
import news from '@/components/news'
import article from '@/components/article'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/news'
  }, {
    path: '/news',
    name: 'news',
    component: news,
    children: [{
      path: 'article',
      name: 'article',
      component: article
    }]
  }]
})
