<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="onPostComment"
      :disabled="!message.length"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'CommentPost',
  props: {
    target: {
      type: [String, Number, Object],
      required: true,
    },
    type: {
      type: String,
      default: 'a',
    },
  },
  data() {
    return {
      message: '',
    }
  },
  inject: {
    articleId: {
      type: [Number, String, Object]
    },
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onPostComment() {
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true,
        duration: 0,
      })
      if (!this.$store.state.user) return this.$toast('请先登录')
      try {
        const { data } = await addComment({
          target: this.target,
          content: this.message,
          art_id: this.type === 'a' ? null : this.articleId,
        })
        console.log(data)
        //关闭弹出层
        //内容发布显示到顶部
        //内容清空
        this.message = ''
        this.$emit('post-success', data.data)
        this.$toast.success('发布成功')
      } catch (err) {
        this.$toast('发布失败')
      }
    },
  },
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>