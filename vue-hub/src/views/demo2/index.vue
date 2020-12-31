<template>
  <div class="width-100-per height-100-per page">
    <span class="wii">837878</span>
    <div class="wii-card">卡片</div>
  </div>
</template>
<script>
export default {
  name: "index",
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="less" scoped>
@page-bg: #534534;
@wii-prefix: ~"wii";
@wii-card: ~"@{wii-prefix}-card";
@background: {
  background: red;
};
// 带参数方法
.border(@a:10px,@b:50px,@c:30px,@color:#000) {
  border: solid 1px @color;
  box-shadow: @arguments; //指代的是 全部参数
}
// 无参方法
.card() {
  width: 66px;
  height: 66px;
  background: #f6f6f6;
  box-shadow: 0 1px 2px rgba(151, 151, 151, 0.58);
}

.page {
  background-color: @page-bg;
  .@{wii-prefix} {
    color: red;
  }
  @background();
  .@{wii-card} {
    .card();
    .border();
  }
}
</style>
