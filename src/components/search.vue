<template>
  <transition name="move">
    <div class="search" v-show="searching">
      <div class="header">
        <div class="back" @click="back">
          <span class="iconfont icon-left"></span>
        </div>
        <div class="input">
          <input type="text" placeholder="搜索" />
        </div>
        <div class="button" @click="search">
          <span class="iconfont icon-search"></span>
        </div>
      </div>
      <v-news :news="newsFn2" v-if="newsFn2.msg==='ok'"></v-news>
      <!-- <div class="search-wrapper" v-if="newsFn2.msg==='ok'">
        <ul class="search-list">
          <li class="search-item search-item-hook" v-for="(anew,index) in newsFn2.result.list" :key="index" @click="viewNews(anew,$event)">
            <div class="search-item-left">
              <h2 class="title">{{anew.title}}</h2>
              <div class="pics-wrapper clearfix" v-show="anew.pic">
                <img :src="anew.pic">
              </div>
              <div class="desc">
                <span class="icon" v-show="anew.label">{{anew.label}}</span>
                <span class="source">{{anew.src}}</span>
                <span class="time">{{anew.time}}</span>
              </div>
            </div>
            <div class="search-item-right" v-show="anew.pic">
              <img :src="anew.pic">
            </div>
          </li>
        </ul>
      </div> -->
    </div>
  </transition>
</template>
<script>
import axios from 'axios'
import news from '@/components/news'

export default {
  props: {
    news: {
      type: Object
    },
    channels: {
      type: Object
    },
    searching: {
      type: Boolean
    }
  },
  data() {
    return {
      newsFn2: {}
    }
  },
  components: {
    'v-news': news
  },
  methods: {
    back() {
      this.searching = false
      this.newsFn2 = {}
      this.$emit('change-search', this.searching)
    },
    search() {
      axios.get('/api/yaoming').then((response) => {
        response = response.data
        this.newsFn2 = response.data
        // this.back()
      }).catch(() => {
        this.newsFn2 = {}
      })
    }
  }
}

</script>
<style lang="less" scoped>
@import '../common/font/iconfont.css';

.search {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 30;

  &.move-enter-active,
  &.move-leave-active {
    transition: all 0.3s;
  }

  &.move-enter,
  &.move-leave-to {
    transform: translate3d(0, 100%, 0);
  }

  &.move-leave,
  &.move-enter-to {
    transform: translate3d(0, 0, 0);
  }

  .header {
    display: flex;
    padding: 10px;
    background-color: #f85959;

    .back {
      flex: 0 0 32px;
      width: 32px;
      color: #fff;

      .iconfont {
        padding: 4px;
        font-size: 16px;
        line-height: 28px;
      }
    }

    .input {
      flex: 1;

      input {
        width: 100%;
        height: 100%;
        color: #7e8c8d;
        padding: 0 10px;
        font-size: 14px;
        line-height: 28px;
        background-color: #fff;
        border-radius: 5px;
        box-sizing: border-box;
      }
    }

    .button {
      flex: 0 0 32px;
      width: 32px;
      color: #fff;
      margin-left: 10px;

      .iconfont {
        padding: 4px;
        font-size: 24px;
        line-height: 28px;
      }
    }
  }
}

</style>
