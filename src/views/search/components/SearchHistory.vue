<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <van-icon
        name="delete-o"
        @click="isShowDel = !isShowDel"
        v-if="!isShowDel"
      />
      <div v-else>
        <span @click="delAll">全部删除</span>
        <span @click="isShowDel = false" class="finish">完成</span>
      </div>
    </van-cell>
    <van-cell
      :title="text"
      v-for="(text, index) in SearchHistories"
      :key="index"
      @click="delFn(text, index)"
    >
      <van-icon name="close" v-show="isShowDel" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    SearchHistories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isShowDel: false,
    }
  },
  methods: {
    delFn(text, index) {
      if (!this.isShowDel) {
        this.$emit('onSearch', text)
      } else {
        this.$emit('delList', index)
      }
    },
    delAll() {
      this.$emit('delAll')
    },
  },
}
</script>

<style lang='less'>
.search-history{
    .finish{
        padding-left: 20px;
    }
}
</style>