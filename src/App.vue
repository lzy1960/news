<template>
  <div id="app">
    <v-header @update-news="changeData" :news="news" :channels="channels"></v-header>
    <keep-alive>
      <router-view :news="news" :channels="channels" @update-news="changeData" />
    </keep-alive>
  </div>
</template>
<script>
import header from '@/components/header'
import news from '@/components/news'

export default {
  data() {
    return {
      news: {},
      channels: {}
    }
  },
  created() {
    // this.$axios.get('/api/0').then((response) => {
    //   response = response.data
    //   this.news = response.data
    // }).catch((err) => {
    //   console.log(err)
    // })
    // export const evidence_url = process.env.API_ROOT + '/' + ''

    this.$axios.get(`channel?appkey=00d348dad5abd28e`).then((response) => {
      // this.$axios.get('/channels').then((response) => {
      // response = response.data
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
