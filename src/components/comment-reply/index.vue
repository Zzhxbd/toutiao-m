<template>
  <div class="comment-reply">
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'
      "
    >
      <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>

    <div class="scroll-wrap">
      <!-- 当前评论项 -->
      <comment-item :comment="comment" />
      <!-- /当前评论项 -->
      <van-cell title="全部回复" />
      <!-- 评论的回复列表 -->
      <CommentList :source="comment.com_id" type="c" :commentList="list"/>
      <!-- /评论的回复列表 -->
    </div>

    <!-- 底部区域 -->
    <div class="reply-bottom">
      <van-button class="write-btn" size="small" round @click="isPostShow=true">写评论</van-button>
    </div>
    <!-- /底部区域 -->

    <!-- 发布评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <CommentPost
        :target="comment.com_id"
        type='c'
        @post-success="onPostSuccess"
      ></CommentPost>
    </van-popup>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import CommentItem from '@/components/comment-item'
import CommentList from '@/components/comment-list'
import CommentPost from '@/components/comment-post'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList,
    CommentPost,
  },
  props: {
    // 点击回复的那行评论信息
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isPostShow:false,
      list:[]
    }
  },
  methods:{
    onPostSuccess(data){
       //关闭弹出层
      //内容发布显示到顶部
      this.list.unshift(data.new_obj)
      this.comment.reply_count++
      this.isPostShow = false

    }
  }
}
</script>

<style scoped lang="less">
.van-icon-cross {
  color: #fff;
}
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}

.reply-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .write-btn {
    width: 60%;
  }
}
</style>