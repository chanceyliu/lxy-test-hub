<template>
  <div>
    <a-menu theme="dark" mode="inline" v-model="activeMenu">
      <template v-for="item in menuList">
        <a-menu-item :key="item.name">
          <router-link :to="item.path">
            <a-icon type="bug" />
            <span>{{ item.name }}</span>
          </router-link>
        </a-menu-item>
      </template>
    </a-menu>
  </div>
</template>

<script>
  import { Menu, Icon } from 'ant-design-vue'

  export default {
    name: 'PublicMenu',
    components: {
      AMenu: Menu,
      AMenuItem: Menu.Item,
      AIcon: Icon
    },
    watch: {
      $route: {
        handler(value) {
          this.activeMenu = [value.name]
        }
      }
    },
    data() {
      return {
        menuList: [],
        activeMenu: []
      }
    },
    created() {
      try {
        this.menuList = this.$router.options.routes[0].children
        this.activeMenu = [this.$route.name]
      } catch (error) {
        console.log(error)
        this.menuList = []
      }
    }
  }
</script>

<style scoped>
</style>
