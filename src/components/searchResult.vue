<template>
  <div class="searchResult">
    <div class="back" @click="back">
      <span class="iconfont icon-left"></span>
    </div>
    <h1 class="title">搜索结果</h1>
    <p class="text">“{{inputText}}”</p>
    <div class="no-content" v-show="newsFn2.msg==='请求超过次数限制'">暂无内容</div>
    <div class="no-content" v-if="newsFn2.msg!=='请求超过次数限制' && !newsFn2.result">加载中……</div>
    <div class="result">
      <v-news :news="newsFn2" v-if="newsFn2.msg==='ok'"></v-news>
    </div>
  </div>
</template>
<script>
import news from '@/components/news'

export default {
  props: {
    newsFn2: {
      type: Object
    },
    inputText: {
      type: String
    }
  },
  data() {
    return {
      inputTextFn1: this.inputText
    }
  },
  components: {
    'v-news': news
  },
  methods: {
    back() {
      this.$router.go(-1)
      this.inputTextFn1 = ''
      this.$emit('change-input', this.inputTextFn1)
    }
  }
}

</script>
<style lang="less" scoped>
@import '../common/font/iconfont.css';

.searchResult {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #fff;

  &.move-enter-active,
  &.move-leave-active {
    transition: all 0.3s;
  }

  &.move-enter,
  &.move-leave-to {
    transform: translate3d(100%, 0, 0);
  }

  &.move-leave,
  &.move-enter-to {
    transform: translate3d(0, 0, 0);
  }

  .back {
    position: absolute;
    left: 10px;
    top: 10px;
    color: #fff;

    .iconfont {
      padding: 4px;
      font-size: 18px;
      line-height: 30px;
    }
  }

  .title {
    font-size: 20px;
    line-height: 50px;
    text-align: center;
    font-weight: 700;
    color: #fff;
    background-color: #f85959;
  }

  .text {
    display: block;
    font-size: 16px;
    line-height: 20px;
    padding: 9px 0;
    text-align: center;
    // margin: 0 20px;
    border-bottom: 1px solid #ccc;
    color: #fff;
    background-color: #f85959;
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
}

</style>
