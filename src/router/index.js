import Vue from 'vue'
import Router from 'vue-router'
import news from '@/components/news'
import article from '@/components/article'
import search from '@/components/search'
import searchResult from '@/components/searchResult'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/news'
  }, {
    path: '/news',
    name: 'news',
    component: news,
    meta: {
      title: '今日新闻'
    },
    children: [{
      path: 'article',
      name: 'article-in-news',
      meta: {
        title: '新闻详情'
      },
      component: article
    }]
  }, {
    path: '/search',
    name: 'search',
    component: search,
    meta: {
      title: '搜索'
    },
    children: [{
      path: 'result',
      name: 'searchResult',
      component: searchResult,
      meta: {
        title: '搜索结果'
      },
      children: [{
        path: 'article',
        name: 'article-in-search',
        meta: {
          title: '新闻详情'
        },
        component: article
      }]
    }]
  }]
})
