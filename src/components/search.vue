<template>
  <transition name="move">
    <div class="search">
      <div class="header">
        <div class="back" @click="back">
          <span class="iconfont icon-left"></span>
        </div>
        <div class="input">
          <input type="text" maxlength="10" placeholder="搜索" autofocus v-model="inputText" ref="input" @keyup.enter="search" />
          <div class="clear" @click="clear" v-show="inputText">
            <span class="iconfont icon-close"></span>
          </div>
        </div>
        <div class="button" @click="search">
          <span class="iconfont icon-search"></span>
        </div>
      </div>
      <div class="history">
        <div class="list">
          <span class="title" v-show="historyList[0]">搜索历史</span>
          <p class="no-history" v-show="!historyList[0]">还没有搜索历史</p>
          <span class="item" v-for="(item,index) in historyList" :key="index" @click="inputSearch">{{item}}</span>
        </div>
        <p class="clear-history" v-show="historyList[0]" @click="clearHistory">清除历史</p>
      </div>
      <!-- <v-news :news="newsFn2" v-if="newsFn2.msg==='ok'"></v-news> -->
      <transition name="move">
        <keep-alive>
          <router-view :newsFn2="newsFn2" :inputText="inputText" @change-input="_changeInput" />
        </keep-alive>
      </transition>
      <!-- <div class=" search-wrapper" v-if="newsFn2.msg==='ok'">
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
import { saveToLocal, loadFromLocal, clearHistory } from '../common/js/searchHistory'

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
      newsFn2: {},
      historyList: (() => {
        return loadFromLocal()
      })(),
      inputText: ''
    }
  },
  components: {
    'v-news': news
  },
  methods: {
    _changeInput(inputText) {
      this.inputText = inputText
    },
    back() {
      this.$router.back(-1)
      this.newsFn2 = {}
    },
    search() {
      if (!this.inputText) {
        return
      }
      this.newsFn2 = {}
      axios.get(`search?keyword=${this.inputText}&appkey=00d348dad5abd28e`).then((response) => {
        // response = response.data
        this.newsFn2 = response.data
        // this.back()
      }).catch(() => {
        this.newsFn2 = {}
      })
      let hasHistory = false
      // 遍历，如果有相同的历史记录，则不保存
      for (let i in this.historyList) {
        if (this.historyList[i] === this.inputText) {
          hasHistory = true
          break
        }
      }
      if (!hasHistory) {
        saveToLocal(this.inputText)
        this.historyList = loadFromLocal()
      }
      this.$router.push(`${this.$route.path}/result?keyword=${this.inputText}`)
    },
    inputSearch(event) {
      this.inputText = event.target.innerText
    },
    clear() {
      this.$refs.input.value = ''
    },
    clearHistory() {
      clearHistory()
      this.historyList = loadFromLocal()
    }
  }
}

</script>
<style lang="less" scoped>
@import '../common/font/iconfont.css';

.search {
  position: fixed;
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
        line-height: 30px;
      }
    }

    .input {
      position: relative;
      flex: 1;

      input {
        width: 100%;
        height: 100%;
        color: #7e8c8d;
        padding: 0 30px 0 10px;
        font-size: 14px;
        line-height: 30px;
        background-color: #fff;
        border-radius: 5px;
        box-sizing: border-box;
      }

      .clear {
        position: absolute;
        top: 0;
        right: 5px;
        color: #7e8c8d;
        opacity: 0.5;

        .iconfont {
          padding: 4px;
          font-size: 16px;
          line-height: 30px;
        }
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
        line-height: 30px;
      }
    }
  }

  .history {
    width: 100%;
    padding: 10px;
    font-size: 0;
    background-color: #eee;
    box-sizing: border-box;

    .list {
      width: 100%;

      .title {
        font-size: 12px;
        line-height: 20px;
        margin-right: 16px;
      }

      .no-history {
        font-size: 12px;
        line-height: 20px;
        text-align: center;
        color: #7e8c8d;
      }

      .item {
        display: inline-block;
        border: 1px solid #7e8c8d;
        border-radius: 5px;
        font-size: 8px;
        line-height: 10px;
        color: #7e8c8d;
        padding: 4px;
        margin-right: 8px;
        margin-bottom: 8px;
      }
    }

    .clear-history {
      text-align: center;
      font-size: 12px;
      line-height: 20px;
      color: #7e8c8d;
    }
  }
}

</style>
