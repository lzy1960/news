<template>
  <div class="refresh" v-show="news" ref="refresh">
    <p class="text"><span class="iconfont icon-refresh"></span>{{refreshText}}</p>
  </div>
</template>
<script>
export default {
  props: {
    news: {
      type: Object
    }
  },
  data() {
    return {
      refreshText: '',
      pullDownText: '下拉刷新',
      refreshReady: '释放立即刷新',
      refreshingText: '正在刷新',
      successText: '刷新成功'
    }
  },
  methods: {
    refresh() {

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

</style>
