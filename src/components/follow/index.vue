<template>
  <van-button
    v-if="!value"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="loading"
    @click="followed()"
    >关注</van-button
  >
  <van-button v-else round :loading="loading" size="small" @click="followed()"
    >已关注</van-button
  >
</template>

<script>
import { followingsYes, followingsNo } from '@/api/article'
export default {
  name: 'followIndex',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    userId: {
      type: [String, Number, Object],
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    async followed() {
      this.loading = true
      try {
        if (!this.value) {
          await followingsYes(this.userId)
          // console.log(res)
          this.$toast.success('关注成功')
        } else {
          try {
            await followingsNo(this.userId)
            // console.log(res)
            this.$toast.success('已取消关注')
          } catch (err) {
            // console.log(err)
            this.$toast.fail('取消失败')
          }
        }
        // this.value = !this.value
        this.$emit('input',!this.value)
      } catch (err) {
        console.log(err);
        if (err.response && err.response.status === 400) {
          this.$toast.fail('不可关注自己')
        } else {
          this.$toast.fail('操作失败')
        }
      }
      this.loading = false
    },
  },
}
</script>

<style>
</style>