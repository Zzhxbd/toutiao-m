<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar" fixed placeholder>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>
    <van-tabs class="tabs" v-model="active" swipeable animated>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <ArticleList :channels="item"></ArticleList>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="gengduo" @click="isChannelsShow = true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道编辑 -->
    <van-popup
      v-model="isChannelsShow"
      closeable
      position="top"
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <ChannelsEdit
        :channels="channels"
        :newIndex="active"
        @update-active="updateFn"
      ></ChannelsEdit>
    </van-popup>
  </div>
</template>
 
<script>
import { getUserChannel } from '@/api/home'
import ArticleList from '@/views/layout/home/components/ArticleList.vue'
import ChannelsEdit from '@/views/layout/home/components/ChannelsEdit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomeIndex',
  data() {
    return {
      active: 0,
      channels: [],
      isChannelsShow: false,
    }
  },
  computed: {
    ...mapState(['user']),
  },
  components: {
    ArticleList,
    ChannelsEdit,
  },
  created() {
    this.loadChannels()
  },
  methods: {
    async loadChannels() {
      try {
        const { data } = await getUserChannel()
        // console.log(data)
        // this.channels = data.data.channels
        if (this.user) {
          //登录状态
          this.channels = data.data.channels
        } else {
          //未登录状态
          const loadChannels = getItem('TOUTIAO_CHANNELS')
          if (loadChannels) {
            this.channels = loadChannels
          } else {
            const { data } = await getUserChannel()
            this.channels = data.data.channels
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
    updateFn(index, isShow) {
      this.active = index
      this.isChannelsShow = isShow
    },
  },
}
</script>

<style lang="less" scoped>
.home-container {
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon-search {
      color: #fff;
      font-size: 32px;
    }
  }
  /deep/.tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      height: 82px;
      z-index: 999;
    }
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
      margin-bottom: 8px;
    }
    .placeholder {
      width: 66px;
      height: 86px;
      flex-shrink: 0;
    }
    .gengduo {
      position: fixed;
      right: 0;
      width: 66px;
      height: 86px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      opacity: 0.9;
      .toutiao-gengduo {
        font-size: 33px;
      }
      &:before {
        content: '';
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-image: url('@/assets/gradient-gray-line.png');
        background-size: contain;
      }
    }
  }
}
</style>