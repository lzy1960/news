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
    children: [{
      path: 'article',
      name: 'article-in-news',
      component: article
    }]
  }, {
    path: '/search',
    name: 'search',
    component: search,
    children: [{
      path: 'result',
      name: 'searchResult',
      component: searchResult,
      children: [{
        path: 'article',
        name: 'article-in-search',
        component: article
      }]
    }]
  }]
})
