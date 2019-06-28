<template>
  <div class="header">
    <div class="header-inner">
      <div class="message">
        <span class="iconfont icon-aui-icon-mail"></span>
      </div>
      <h1 class="title">大标题<span class="iconfont icon-refresh"></span></h1>
      <div class="search">
        <span class="iconfont icon-search"></span>
      </div>
    </div>
    <div class="header-nav">
      <div class="nav-wrapper" ref="navWrapper">
        <ul class="nav-list" ref="navList">
          <li class="nav-item" :class="{'active':navIndex===index}" v-for="(item,index) in channels.result" :key="index" @click="changeTab($event)">{{item}}</li>
        </ul>
      </div>
      <!-- <div class="nav-plus">
              <span class="iconfont icon-plus"></span>
      </div> -->
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import { loadFromUrl } from '../common/js/getJson'

export default {
  props: {
    news: {
      type: Object
    },
    channels: {
      type: Object
    }
  },
  data() {
    return {
      navIndex: 0,
      newsFn1: {},
      jsonList: []
    }
  },
  updated() {
    this._initNav()
    this.getChannel()
  },
  watch: {
    channels: function() {
      this.getChannel()
    }
  },
  methods: {
    _initNav() {
      let navWidth = 32
      let padding = 18
      let width = (navWidth + padding * 2) * 17

      this.$refs.navList.style.width = `${width}px`
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.navWrapper, {
            click: true,
            scrollX: true,
            eventPassthrough: 'vertical'
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    changeTab(event) {
      // 点击获取索引值，如果channels[index]===被点击的
      if (event._constructed) {
        return
      }
      if (event.target.innerText === this.channels.result[this.navIndex]) {
        return
      }
      let text = event.target.innerText
      for (let i = 0; i < this.channels.result.length; i++) {
        let channel = this.channels.result[i]
        if (channel === text) {
          this.$router.push({ path: `?channel=${text}`, meta: { keepAlive: true } })
          this.navIndex = i
          return
        }
      }
    },
    getChannel() {
      if (this.channels) {
        // 寻找url和channels中匹配的索引,赋值给navIndex
        for (let i = 0; i < this.channels.result.length; i++) {
          if (this.channels.result[i] === loadFromUrl().channel) {
            this.navIndex = i
            break
          }
        }
        if (!this.jsonList[this.navIndex]) {
          // 格式为
          // 【https://api.jisuapi.com/news/get?channel=头条&start=0&num=10&appkey=00d348dad5abd28e】
          axios.get(`/api/${this.navIndex}`).then((response) => {
            response = response.data
            this.newsFn1 = response.data
            this.jsonList[this.navIndex] = this.newsFn1
            this.$emit('update-news', this.newsFn1)
          }).catch(() => {
            this.newsFn1 = {}
            this.jsonList[this.navIndex] = this.newsFn1
            this.$emit('update-news', this.newsFn1)
          })
        } else {
          this.newsFn1 = this.jsonList[this.navIndex]
          this.$emit('update-news', this.newsFn1)
        }
      }
    }
  }
}

</script>
<style lang="less" scoped>
@import '../common/font/iconfont.css';

.header {
  background: linear-gradient(#f85959, #fff);

  .header-inner {
    display: flex;
    padding: 10px;

    .message {
      flex: 0 0 32px;
      width: 32px;

      .iconfont {
        padding: 4px;
        font-size: 24px;
        line-height: 28px;
      }
    }

    .title {
      flex: 1;
      text-align: center;
      font-size: 20px;
      line-height: 28px;
      // color: #fff;

      .iconfont {
        font-size: 16px;
        padding: 6px 4px;
      }
    }

    .search {
      flex: 0 0 32px;
      width: 32px;

      .iconfont {
        font-size: 24px;
        line-height: 28px;
      }
    }
  }

  .header-nav {
    // background-color: #f4f5f6;
    position: relative;
    display: flex;
    box-shadow: rgba(0, 0, 0, 0.4) 0 2px 10px -3px;
    z-index: 10;

    .nav-wrapper {
      flex: 1;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;

      .nav-list {
        font-size: 0;

        .nav-item {
          display: inline-block;
          font-size: 16px;
          padding: 12px 18px;

          &.active {
            color: #f85959;
            border-bottom: 2px solid #f85959;
            box-sizing: border-box;
          }
        }
      }
    }

    .nav-plus {
      flex: 0 0 40px;
      width: 40px;
      padding: 5px;
      // background-color: #f4f5f6;
      box-shadow: rgba(0, 0, 0, 0.4) -3px 0 10px -3px;
      box-sizing: border-box;

      .iconfont {
        font-size: 28px;
      }
    }
  }
}

</style>
