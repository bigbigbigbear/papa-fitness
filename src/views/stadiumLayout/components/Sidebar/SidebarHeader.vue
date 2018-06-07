<template>
  <div class="stadium-container pointer">
    <div class="stadium-container--l">
      <img :src="logoUrl" :alt="stadiumName">
    </div>
    <div class="stadium-container--r" @click="showStadiumList">
      {{stadiumName}}
      <svg-icon class="icon" icon-class="icon-caret-right-down"></svg-icon>
      <div class="stadium-content" v-show="showList">
        <ul>
          <li class="item" v-for="(item, index) in stadiumList" :key="index">
            {{item.name}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
.stadium-container{
  display: flex;
  flex-wrap: nowrap;
  box-sizing: border-box;
  width: 100%;
  height: 78px;
  padding: 24px 20px 24px;
  background-color: #26272C;
  .stadium-container--l{
    width: 32px;
    img {
      width: 32px;
      border-radius: 50%;
    }
  }
  .stadium-container--r{
    flex: 1;
    position: relative;
    line-height: 32px;
    text-indent: 12px;
    font-size: 24px;
    color: #efeff4;
    .icon {
      position: absolute;
      right: -12px;
      bottom: 0;
      width: 10px;
      height: 10px;
      color: #c0c4cc;
    }
    .stadium-content{
      position: absolute;
      top: 30px;
      left: 0;
      z-index: 9999;
      width: 100%;
      background-color: rgb(240, 240, 240);
      font-size: 14px;
      color: #333;
      .item {
        width: 100%;
        height: 40px;
        line-height: 40px;
      }
    }
  }
}
</style>
<script>
  import logoUrl from '@/assets/imgs/stadium-logo-none.png'
  export default {
    data () {
      return {
        logoUrl: logoUrl,
        stadiumName: '测试馆',
        showList: false,
        stadiumList: [
          { name: '测试馆1', id: 1 },
          { name: '测试馆2', id: 2 }
        ]
      }
    },
    methods: {
      showStadiumList () {
        this.showList = !this.showList
      }
    }
  }

</script>
