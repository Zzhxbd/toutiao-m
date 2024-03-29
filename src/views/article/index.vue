<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <Follow
            v-model="article.is_followed"
            :userId="article.aut_id"
            class="follow-btn"
          ></Follow>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>
        <CommentList
          :source="article.art_id"
          @totalCommentCount="totalCommentCount = $event"
          :commentList="list"
          @reply-click="onReplyClick"
        ></CommentList>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            @click="isPostShow = true"
            class="comment-btn"
            type="default"
            round
            size="small"
            >写评论</van-button
          >
          <van-icon name="comment-o" :badge="totalCommentCount" color="#777" />
          <CollectArticle
            v-model="article.is_collected"
            :articleId="article.art_id"
          ></CollectArticle>

          <!-- <van-icon color="#777" name="good-job-o" /> -->
          <articleLike
            :attitude.sync="article.attitude"
            :articleId="article.art_id"
          ></articleLike>
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- 发布评论 -->
        <van-popup v-model="isPostShow" position="bottom">
          <CommentPost
            :target="article.art_id"
            @post-success="onPostSuccess"
          ></CommentPost>
        </van-popup>
        <!-- 发布评论 -->
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <!-- 评论回复 -->
    <van-popup v-model="isReplyShow" position="bottom" style="height: 100%">
      <CommentReply
        :comment="currentComment"
        @close="isReplyShow = false"
        v-if="isReplyShow"
      ></CommentReply>
    </van-popup>
    <!-- /评论回复 -->
  </div>
</template>

<script>
import { getArticleById } from '@/api/article'
import { ImagePreview } from 'vant'
import Follow from '@/components/follow'
import CollectArticle from '@/components/collect-article'
import articleLike from '@/components/articleLike'
import CommentList from '@/components/comment-list'
import CommentPost from '@/components/comment-post'
import CommentReply from '@/components/comment-reply'
export default {
  name: 'ArticleIndex',
  components: {
    Follow,
    CollectArticle,
    articleLike,
    CommentList,
    CommentPost,
    CommentReply,
  },
  props: {
    // 使用props获取动态路由的数据
    articleId: {
      type: [Number, String, Object],
      required: true,
      errStatus: 0,
    },
  },
  data() {
    return {
      article: {},
      loading: true,
      totalCommentCount: 0,
      isPostShow: false,
      isReplyShow: false,
      list: [],
      currentComment: [],
    }
  },
  provide: function () {
    return {
        articleId: this.articleId  // 或者写成 this.$route.params.articleId  也可以
    }
},
  computed: {},
  watch: {},
  created() {
    this.loadArticle()
  },
  mounted() {},
  methods: {
    async loadArticle() {
      this.loading = true
      try {
        const { data } = await getArticleById(this.articleId)
        // console.log(data)
        this.article = data.data
        setTimeout(() => {
          this.previewImage()
        }, 0)
      } catch (err) {
        // 3.2 失败处理
        console.log(err)
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
      }
      this.loading = false
    },
    previewImage() {
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      const images = []
      imgs.forEach((img, index) => {
        images.push(img.src)
        img.onclick = () => {
          ImagePreview({
            images: images,
            startPosition: index,
          })
        }
      })
    },
    updateTotalCommentCount(val) {
      this.totalCommentCount = val
    },
    onPostSuccess(data) {
      //关闭弹出层
      this.isPostShow = false
      //内容发布显示到顶部
      this.list.unshift(data.new_obj)
      this.totalCommentCount++
    },
    onReplyClick(comment) {
      this.isReplyShow = true
      this.currentComment = comment
    },
  },
}
</script>

<style scoped lang="less">
@import './github-markdown.css';
.article-container {
  /deep/.van-icon-arrow-left {
    color: #fff;
  }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>