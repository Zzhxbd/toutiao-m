<template>
  <div class="comment-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      :immediate-check='false'
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <comment-item
        v-for="(item, index) in commentList"
        :key="index"
        :comment="item"
        @reply-click="$emit('reply-click',$event)"
      />
    </van-list>
  </div>
</template>

<script>
import { getComment } from '@/api/comment'
import CommentItem from '@/components/comment-item'
export default {
  name: 'CommentList',
  components: {
    CommentItem,
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true,
    },
    commentList: {
      type: Array,
      default: () => [],
    },
    type:{
      type:String,
      default:'a'
    }
  },
  data() {
    return {
      // commentList: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false,
    }
  },
  created() {
    this.loading=true
    this.onLoad()
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getComment({
          type:this.type,
          source: this.source,
          offset: this.offset,
          limit: this.limit,
        })
        // console.log(data)
        this.commentList.push(...data.data.results)
        this.$emit('totalCommentCount', data.data.total_count)
        this.loading = false
        this.$emit('commentList',this.commentList)
        if (data.data.results.length < 10) {
          this.finished = true
        } else {
          this.offset = data.data.last_id
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
  },
}
</script>

<style>
</style>