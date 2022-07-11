<template>
  <div class="articleList">
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      :success-text="successText"
      success-duration="1000"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <ArticleItem v-for="(obj, index) in list" :key="index" :article='obj'></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/home'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  props: {
    channels: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      timestamp: null,
      refreshing: false,
      successText: '刷新成功',
    }
  },
  methods: {
    async onLoad() {
      try {
        const res = await getArticles({
          channel_id: this.channels.id,
          timestamp: this.timestamp || +new Date(),
        })
        // console.log(res)
        this.list = [...this.list, ...res.data.data.results]
        this.loading = false
        if (res.data.data.results.length) {
          this.timestamp = res.data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        // console.log(err)
        this.error = true
        this.loading = false
      }
    },
    async onRefresh() {
      try {
        const res = await getArticles({
          channel_id: this.channels.id,
          timestamp: +new Date(),
        })
        // console.log(res)
        this.list.unshift(...res.data.data.results)
        this.successText = `刷新成功,更新了${res.data.data.results.length}条数据`
        this.refreshing = false
      } catch (err) {
        this.refreshing = false
        this.successText = '刷新失败'
      }
    },
  },
  components: {
    ArticleItem,
  },
}
</script>

<style lang='less'>
.articleList {
  height: 86vh;
  overflow-y: auto;
  .van-list {
    margin-top: 82px;
  }
}
</style>