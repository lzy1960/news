<template>
  <div class="refresh" v-show="news">
    <p class="text"><span class="iconfont icon-refresh"></span>{{!dropDown?beforeRefreshText[0]:beforeRefreshText[1]}}</p>
  </div>
</template>
<script>
export default {
  props: {
    news: {
      type: Object
    },
    newsTop: {
      type: Number
    },
    dropDown: {
      type: Boolean
    }
  },
  computed: {
    // refreshText() {

    // }
  },
  data() {
    return {
      beforeRefreshText: ['下拉刷新', '松开刷新'],
      refreshingText: '正在刷新',
      afterRefreshText: '刷新成功'
    }
  }
}

</script>
<style lang="less" scoped>
@import '../common/font/iconfont.css';

.refresh {
  position: absolute;
  width: 100%;
  height: 70px;
  top: 0;
  left: 0;
  background-color: #ccc;
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

</style>
