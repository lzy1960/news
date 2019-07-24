<template>
  <div>
    <div class="news" ref="news">
      <div class="news-wrapper" ref="newsWrapper">
        <ul class="news-list" v-if="news.msg==='ok'">
          <div class="refresh" v-show="news" ref="refresh">
            <p class="text"><span class="iconfont icon-ellipsis" v-show="refreshText===refreshingText"></span>{{refreshText}}</p>
          </div>
          <li class="news-item news-item-hook" v-for="(anew,index) in news.result.list" :key="index" @click="viewNews(anew,$event)">
            <div class="news-item-left">
              <h2 class="title">{{anew.title}}</h2>
              <!-- <div class="pics-wrapper clearfix" v-show="anew.pic">
                <img :src="anew.pic">
              </div> -->
              <div class="desc">
                <span class="icon" v-show="anew.label">{{anew.label}}</span>
                <span class="source">{{anew.src}}</span>
                <span class="time">{{anew.time}}</span>
              </div>
            </div>
            <div class="news-item-right" v-show="anew.pic">
              <img :src="anew.pic">
            </div>
          </li>
        </ul>
      </div>
      <div class="no-content" v-show="news.msg==='请求超过次数限制'">暂无内容</div>
      <div class="no-content" v-show="news.msg!=='请求超过次数限制' && news.msg!=='ok'">加载中……</div>
      <!-- 下拉刷新模块 -->
      <!-- <v-refresh :news="news" :newsTop="newsTop":dropDown="dropDown"></v-refresh> -->
    </div>
    <transition name="move">
      <keep-alive>
        <router-view :selectNews="selectNews" />
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
// import refresh from '@/components/refresh'
import { loadFromUrl } from '../common/js/getJson'

export default {
  props: {
    news: {
      type: Object
    },
    channels: {
      type: Object
    },
    newsFn2: {
      type: Object
    }
  },
  data() {
    return {
      newsFn1: {},
      selectNews: {},
      refreshText: '',
      pullDownText: '下拉刷新',
      refreshReady: '释放立即刷新',
      refreshingText: '正在刷新',
      successText: '刷新成功'
    }
  },
  created() {
    const _this = this

    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.news, {
        probeType: 2,
        click: true
      })
      this.refreshText = this.pullDownText
      this.scroll.refresh()
      // 滑动事件
      // this.scroll.on('scroll', (pos) => {
      //   if (pos.y > 70) {
      //     this.refreshText = this.refreshReady
      //   } else {
      //     this.refreshText = this.pullDownText
      //   }
      // })
      // 滑动结束
      this.scroll.on('touchend', (pos) => {
        if (pos.y > 70) {
          this.refreshText = this.refreshingText
          this.$refs.newsWrapper.style.marginTop = '70px'
          setTimeout(() => {
            _this.getData()
            // _this.scroll.refresh()
            // this.refreshText = this.successText
            console.log('OK')
          }, 500)
        }
      })
    })
  },
  updated() {
    if (this.news) {
      let img = this.$refs.news.getElementsByTagName('img')
      let count = 0
      if (img && img.length) {
        let timer = setInterval(() => {
          if (count === img.length) {
            this.scroll.refresh()
            clearInterval(timer)
          } else {
            count++
          }
        }, 100)
      }
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    }
  },
  mounted() {
    // this._initScroll()
  },
  watch: {
    news: function() {
      if (this.news) {
        let img = this.$refs.news.getElementsByTagName('img')
        let count = 0
        if (img && img.length) {
          let timer = setInterval(() => {
            if (count === img.length) {
              this.scroll.refresh()
              clearInterval(timer)
            } else {
              count++
            }
          }, 100)
        }
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      }
    }
  },
  methods: {
    viewNews(news, event) {
      if (!event._constructed) {
        return
      }
      this.selectNews = {}
      this.selectNews = news
      this.$router.push(`${this.$route.path}/article`)
    },
    _initScroll() {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.news, {
            click: true,
            probeType: 3
          })
        } else {
          // this.scroll.refresh()
          this.pullDownRefresh()
        }
      })
    },
    getData() {
      let navIndex = 0
      let _this = this
      if (this.channels) {
        for (let i = 0; i < this.channels.result.length; i++) {
          if (this.channels.result[i] === loadFromUrl().channel) {
            navIndex = i
            break
          }
        }
      }
      if (location.hash.split('/')[1].split('?')[0] === 'news') {
        this.$axios.get(`get?channel=${this.channels.result[navIndex]}&start=0&num=40&appkey=00d348dad5abd28e`).then((response) => {
          // this.$axios.get(`${this.navIndex}`).then((response) => {
          // response = response.data
          this.newsFn1 = response.data
          // this.jsonList[this.navIndex] = this.newsFn1
          this.refreshText = this.successText
          this.$emit('update-news', this.newsFn1)

          setTimeout(() => {
            _this.$refs.newsWrapper.style.marginTop = '0'
            this.refreshText = this.pullDownText
            _this.$nextTick(() => {
              _this.scroll.refresh()
            })
          }, 1000)
        }).catch(() => {
          this.newsFn1 = {}
          // this.jsonList[navIndex] = this.newsFn1
          this.$emit('update-news', this.newsFn1)
        })
      } else {
        this.$axios.get(`search?keyword=${loadFromUrl().keyword}&appkey=00d348dad5abd28e`).then((response) => {
          // this.$axios.get(`${this.navIndex}`).then((response) => {
          // response = response.data
          this.newsFn1 = response.data
          // this.jsonList[this.navIndex] = this.newsFn1
          this.refreshText = this.successText
          this.$emit('update-news', this.newsFn1)

          setTimeout(() => {
            _this.$refs.newsWrapper.style.marginTop = '0'
            this.refreshText = this.pullDownText
            _this.$nextTick(() => {
              _this.scroll.refresh()
            })
          }, 1000)
        }).catch(() => {
          this.newsFn1 = {}
          // this.jsonList[navIndex] = this.newsFn1
          this.$emit('update-news', this.newsFn1)
        })
      }
    }
  },
  components: {
    // 'v-refresh': refresh
  }
}

</script>
<style lang="less" scoped>
@import '../common/font/iconfont.css';

.move-enter-active,
.move-leave-active {
  transition: all 0.3s;
}

.move-enter,
.move-leave-to {
  transform: translate3d(100%, 0, 0);
}

.move-leave,
.move-enter-to {
  transform: translate3d(0, 0, 0);
}

.no-content {
  width: 100%;
  height: 70px;
  font-size: 16px;
  line-height: 70px;
  background-color: #f6f6f6;
  color: #7e8c8d;
  text-align: center;
  z-index: 10;
}

.news {
  position: absolute;
  top: 90px;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #f6f6f6;
  z-index: 9;
  overflow: hidden;

  .news-wrapper {
    background-color: #f6f6f6;

    .news-list {
      position: relative;
      background-color: #fff;

      .refresh {
        position: absolute;
        width: 100%;
        height: 70px;
        top: -70px;
        left: 0;
        background-color: #f6f6f6;
        z-index: 0;

        .text {
          text-align: center;
          font-size: 14px;
          line-height: 70px;
          color: #7e8c8d;

          .iconfont {
            font-size: 14px;
            margin-right: 5px;
          }
        }
      }

      .news-item {
        padding: 20px 0;
        margin: 0 20px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        display: flex;

        &:last-child {
          border: none;
        }

        .news-item-left {
          flex: 1;

          .title {
            font-size: 16px;
            line-height: 24px;
          }

          .pics-wrapper {
            margin-top: 6px;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .desc {
            font-size: 0;
            margin-top: 6px;

            .icon {
              border: 1px solid #f85959;
              border-radius: 2px;
              font-size: 10px;
              line-height: 16px;
              color: #f85959;
              padding: 2px 3px;
            }

            .source,
            .comment,
            .time {
              font-size: 10px;
              line-height: 16px;
              font-weight: 200;
              margin-right: 6px;
              color: #9c9c9c;
            }
          }
        }

        .news-item-right {
          flex: 0 0 33%;
          width: 33%;
          height: 100%;
          margin-left: 5px;

          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }

  .refresh {
    position: absolute;
    width: 100%;
    height: 70px;
    top: 0;
    left: 0;
    background-color: #f6f6f6;
    z-index: -1;

    .text {
      text-align: center;
      font-size: 14px;
      line-height: 70px;
      color: #7e8c8d;

      .iconfont {
        font-size: 14px;
        margin-right: 5px;
      }
    }
  }
}

</style>
