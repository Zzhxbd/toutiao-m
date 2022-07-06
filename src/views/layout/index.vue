<template>
  <div class="layout-container">
    <router-view />
    <van-tabbar route class="layout-tabbar">
      <van-tabbar-item icon-prefix="toutiao" replace to="/home" icon="shouye"
        >首页</van-tabbar-item
      >
      <van-tabbar-item icon-prefix="toutiao" replace to="/qa" icon="wenda"
        >问答</van-tabbar-item
      >
      <van-tabbar-item icon-prefix="toutiao" replace to="/video" icon="shipin"
        >视频</van-tabbar-item
      >
      <van-tabbar-item icon-prefix="toutiao" replace to="/my" icon="wode"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
}
</script>

<style lang="less" scoped>
</style>