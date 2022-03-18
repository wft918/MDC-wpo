<template>
  <!-- 有子级 -->
  <el-submenu v-if="system.children && system.children.length" :index="system.id">
    <template slot="title">
      <span>{{ system.name }}</span>
    </template>
    <!-- 递归 -->
    <sub-menu @embed="subEmbed" v-for="item in system.children" :key="item.id" :system="item">
    </sub-menu>
  </el-submenu>

  <!-- 无子级 -->
  <el-menu-item v-else :index="system.id" @click="embed(system)">
    <span slot="title">{{ system.name }}</span>
  </el-menu-item>
</template>
<script>
  import subMenu from './subMenu'
  export default {
    name: 'sub-menu',
    data() {
      return {

      }
    },
    components: {
      subMenu
    },
    props: {
      system: {
        type: Object,
        required:true
      }
    },
    methods: {
      // 点击嵌入
      embed(system) {
        this.$emit('embed',system.url || '')
      },

      subEmbed(url) {
        this.$emit('embed',url)
      }
    },
  }
</script>
<style scoped>
  /deep/ .el-submenu__title {
    height: .2917rem;
    line-height: .2917rem;
  }
  /deep/ .el-menu-item {
    height: .2604rem;
    line-height: .2604rem;
    min-width: 0;
  }
</style>