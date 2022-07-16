<template>
  <van-loading v-if="loading" />
  <van-icon
    v-else
    color="#777"
    :name="attitude === 1 ? 'good-job' : 'good-job-o'"
    @click="isLike"
  />
</template>

<script>
import { addLike, delLike } from '@/api/article'
export default {
  name: 'LikeIndex',
  props: {
    attitude: {
      type: [Number, String],
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
    async isLike() {
      this.loading = true
      try {
        if (!this.$store.state.user) return this.$toast('请先登录')
        if (this.attitude === 1) {
          await delLike(this.articleId)
        } else {
          await addLike(this.articleId)
        }
        let newAttitude = this.attitude === 1 ? 0 : 1
        this.$emit('update:attitude', newAttitude)
        this.$toast.success(this.attitude ? '取消点赞' : '点赞成功')
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