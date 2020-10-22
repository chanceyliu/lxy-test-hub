<template>
  <div>
    <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']">
      <a-menu-item key="1">
        <router-link to="/demo1">
          <a-icon type="bug"/>
          <span>demo1</span>
        </router-link>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
  import {Menu,Icon} from 'ant-design-vue'

  export default {
    name: "PublicMenu",
    components: {
      AMenu: Menu,
      AMenuItem: Menu.Item,
      AIcon: Icon,
    },
    mounted() {
      console.log(this.$store.getters)
    }
  }
</script>

<style scoped>

</style>
