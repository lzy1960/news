<template>
  <div id="app">
    <v-header @update-news="changeData" :news="news" :channels="channels"></v-header>
    <keep-alive>
      <router-view :news="news" @update-news="changeData" />
    </keep-alive>
  </div>
</template>
<script>
import axios from 'axios'
import header from '@/components/header'
import news from '@/components/news'

// const appKey = '00d348dad5abd28e'

export default {
  data() {
    return {
      news: {},
      channels: {}
    }
  },
  created() {
    // axios.get('/api/0').then((response) => {
    //   response = response.data
    //   this.news = response.data
    // }).catch((err) => {
    //   console.log(err)
    // })
    axios.get('/api/channels').then((response) => {
      response = response.data
      this.channels = response.data
    }).catch((err) => {
      console.log(err)
    })
  },
  components: {
    'v-header': header,
    'v-news': news
  },
  methods: {
    changeData(newsFn1) {
      this.news = newsFn1
    }
  }
}

</script>
<style>
</style>
