<template>
  <div class="article" ref="article">
    <div class="article-wrapper">
      <div class="article-top">
        <div class="back" @click="back">
          <span class="iconfont icon-left"></span>
        </div>
        <h1 class="article-title">{{selectNews.title}}</h1>
      </div>
      <div class="desc">
        <span class="time">{{selectNews.time}}</span>
        <span class="name">{{selectNews.src}}</span>
      </div>
      <div class="article-content" v-html="selectNews.content">
        {{selectNews.content}}
      </div>
      <!-- <a class="source-link" :href="selectNews.url">阅读原文</a> -->
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'

export default {
  props: {
    selectNews: {
      type: Object
    }
  },
  mounted() {
    this.getImg()
    this._initScroll()
  },
  updated() {
    this.getImg()
    this._initScroll()
  },
  methods: {
    back() {
      this.$router.go(-1)
      console.log('OK')
    },
    _initScroll() {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.article, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    getImg() {
      // 加载图片时刷新BScroll，使高度能正常获取
      let img = this.$refs.article.getElementsByTagName('img')
      let count = 0
      if (img && img.length) {
        let timer = setInterval(() => {
          if (count === img.length) {
            this.scroll.refresh()
            clearInterval(timer)
          } else {
            count++
          }
        }, 500)
      }
    }
  }
}

</script>
<style lang="less">
@import '../common/font/iconfont.css';

.article {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  overflow: hidden;
  z-index: 10;

  .article-wrapper {
    .article-top {
      display: flex;

      .back {
        flex: 0 0 40px;
        width: 40px;
        color: #000;

        .iconfont {
          padding: 4px;
          font-size: 20px;
          line-height: 70px;
        }
      }

      .article-title {
        flex: 1;
        font-size: 24px;
        line-height: 36px;
        padding: 16px;
      }
    }

    .desc {
      font-size: 0;
      padding: 0 16px;

      .time,
      .name {
        font-size: 12px;
        color: #7e8c8d;
        margin-right: 12px;
      }
    }

    .article-content {
      padding: 0 16px;

      .video {
        video {
          width: 100%;
        }
      }

      .more-client {
        font-size: 14px;
        line-height: 28px;
      }

      .art_t {
        display: block;
        text-indent: 0;

        video {
          width: 100%;
        }
      }

      .art_p,
      p,
      div {
        font-size: 16px;
        line-height: 24px;
        // text-indent: 2em;
        padding: 10px 0;
        text-align: justify;

        img {
          width: 100%;
        }

        .img_descr {
          font-size: 12px;
          line-height: 18px;
          color: #7e8c8d;
          margin-top: 5px;
          text-align: center;
        }

        strong {
          font-weight: 700;
        }
      }

      .art_img_mini {
        .art_img_mini_img {
          width: 100%;
        }

        .art_img_tit {
          font-size: 12px;
          line-height: 18px;
          color: #7e8c8d;
          margin-top: 5px;
          text-align: center;
        }
      }

      .photo {
        margin: 20px 0;
        text-align: center;

        a {
          display: block;

          img {
            width: 100%;
          }

          span {
            font-size: 12px;
            line-height: 16px;

          }
        }
      }
    }

    .source-link {
      display: block;
      font-size: 12px;
      padding: 16px;
      text-align: right;
    }
  }
}

</style>
