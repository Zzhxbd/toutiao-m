<template>
  <van-loading v-if="loading" />
  <van-icon
    v-else
    color="#777"
    :name="value ? 'star-o' : 'star'"
    @click="isCollect"
  />
</template>

<script>
import { isCollectApi, isNotCollectApi } from '@/api/article'
export default {
  nameL: 'CollectArticle',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    async isCollect() {
      this.loading = true
      try {
        if (!this.$store.state.user) return this.$toast('请先登录')
        if (this.value) {
          await isNotCollectApi(this.articleId)
        } else {
          await isCollectApi(this.articleId)
        }
        this.$emit('input',!this.value)
        this.$toast.success(this.value ? '收藏成功' : '取消收藏')
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    },
  },
}
</script>

<style>
</style>