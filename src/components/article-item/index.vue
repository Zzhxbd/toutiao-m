<template>
  <van-cell class="article-item">
    <div slot="title" class="title van-multi-ellipsis--l2">
      {{ article.title }}
    </div>
    <div slot="label">
      <div class="images" v-if="article.cover.type === 3">
        <div
          class="imageItem"
          v-for="(images, index) in article.cover.images"
          :key="index"
        >
          <van-image fit="cover" :src="images" class="imgs" />
        </div>
      </div>
      <div class="label-info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <div slot="default" v-if="article.cover.type === 1">
      <van-image
        class="right-cover"
        fit="cover"
        :src="article.cover.images[0]"
      />
    </div>
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang='less'>
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .right-cover {
    width: 232px;
    height: 146px;
  }
  .label-info-wrap {
    span {
      font-size: 22px;
      color: #b4b4b4;
      margin-right: 25px;
    }
  }

  .images {
    display: flex;
    padding: 30px 0;
    .imageItem {
      flex: 1;
      height: 146px;
      .imgs {
        width: 100%;
        height: 146px;
      }
      &:not(:last-child) {
        padding-right: 4px;
      }
    }
  }
}
</style>