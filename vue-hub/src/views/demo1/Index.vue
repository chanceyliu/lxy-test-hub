<template>
  <div class="width-100-per height-100-per">
    <div class="height-100-per layout-left-top width-100-per overflow" v-if="showMenu">
      <a-button class="margin-right-10-px" type="primary" @click="checkCalendar">日历</a-button>
      <a-button class="margin-right-10-px" type="primary" @click="checkChess">#字棋</a-button>
    </div>

    <div class="height-100-per width-100-per border overflow layout-front" v-else>
      <div style="height: 40px" class="width-100-per">
        <a-icon class="trigger" type="rollback" @click="backDemo" />
      </div>
      <div style="height: calc(100% - 50px)" class="width-100-per overflow">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import { Button, Icon } from 'ant-design-vue'

  export default {
    name: 'Index',
    components: {
      AButton: Button,
      AIcon: Icon
    },
    data() {
      return {
        showMenu: true
      }
    },
    methods: {
      //日历
      checkCalendar() {
        this.$router.push('/calendar')
        this.showMenu = false
      },
      //#字棋
      checkChess() {
        this.$router.push('/chess')
        this.showMenu = false
      },
      //返回
      backDemo() {
        this.$router.push('/demo1')
        this.showMenu = true
      }
    }
  }
</script>

<style scoped>
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .trigger:hover {
    color: #1890ff;
  }
</style>
