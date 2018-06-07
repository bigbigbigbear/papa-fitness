<template>
    <el-scrollbar wrapClass="scrollbar-wrapper">
      <el-menu mode="vertical" :show-timeout="200" :default-active="$route.path" :collapse="isCollapse" background-color="#26272C"
        text-color="#C0C4CC" active-text-color="#FF7C35">
        <sidebar-item :routes="stadiumRouters"></sidebar-item>
      </el-menu>
    </el-scrollbar>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import SidebarItem from './SidebarItem'
  export default {
    data () {
      return {
      }
    },
    components: {
      SidebarItem
    },
    computed: {
      ...mapGetters([
        'stadiumRouters',
        'sidebar'
      ]),
      isCollapse () {
        return !this.sidebar.opened
      }
    }
  }

</script>
