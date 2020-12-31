<template>
  <a-layout class="height-100-per" id="components-layout-demo-custom-trigger">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed">
      <div class="logo"></div>
      <public-menu></public-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="() => (collapsed = !collapsed)" />
      </a-layout-header>
      <a-layout-content class="padding-10-px height-100-per width-100-per overflow">
        <div class="page-main">
          <router-view></router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
  import { Layout, Icon } from 'ant-design-vue'
  import PublicMenu from '../components/PublicMenu'

  export default {
    name: 'Index',
    props: {
      msg: String
    },
    components: {
      PublicMenu,
      ALayout: Layout,
      ALayoutHeader: Layout.Header,
      ALayoutContent: Layout.Content,
      ALayoutSider: Layout.Sider,
      AIcon: Icon
    },
    data() {
      return {
        // 该注释为package.json的eslintConfig下extends内容
        // "eslint:recommended"
        collapsed: false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  #components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
  }

  #components-layout-demo-custom-trigger .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
</style>
