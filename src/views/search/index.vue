<template>
  <div class="search-container">
    <div class="box">
      <form action="/">
        <van-search
          background="#3296fa"
          v-model="searchText"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
          @focus="isResultShow = false"
        />
      </form>
    </div>
    <div class="bottom"></div>
    <!-- 搜索结果 -->
    <SearchResult v-if="isResultShow" :searchText="searchText"></SearchResult>
    <!-- 联想建议 -->
    <SearchSuggestion
      v-else-if="searchText"
      @search="onSearch"
      :searchText="searchText"
    ></SearchSuggestion>
    <!-- 搜索历史记录 -->
    <SearchHistory
      v-else
      :SearchHistories="SearchHistories"
      @onSearch="onSearch"
      @delList="delThis"
      @delAll="delAll"
    ></SearchHistory>
  </div>
</template>

<script>
import SearchHistory from '@/views/search/components/SearchHistory.vue'
import SearchSuggestion from '@/views/search/components/SearchSuggestion.vue'
import SearchResult from '@/views/search/components/SearchResult.vue'
import {getItem, setItem} from '@/utils/storage'
export default {
  name: 'SearchIndex',
  data() {
    return {
      searchText: '',
      isResultShow: false,
      SearchHistories: getItem('TOUTIAO_SEARCH_HISTORY') ||[],
    }
  },
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult,
  },
  methods: {
    onSearch(val) {
      //回车
      this.searchText = val //更新文本内容

      const index = this.SearchHistories.indexOf(val)
      if (index !== -1) {
        this.SearchHistories.splice(index, 1)
      }
      this.SearchHistories.unshift(val)
      this.isResultShow = true //渲染搜索结果
    },
    onCancel() {
      //取消
      this.$router.back()
    },
    delThis(index) {
      this.SearchHistories.splice(index, 1)
    },
    delAll() {
      this.SearchHistories = []
    },
  },
  watch:{
    SearchHistories(val){
        setItem('TOUTIAO_SEARCH_HISTORY',val)
    }
  }
}
</script>

<style lang='less'>
.search-container {
  .van-search__action {
    color: #fff;
  }
  .box {
    position: fixed;
    width: 100%;
    height: 108px;
    z-index: 999;
  }
  .bottom {
    padding-top: 108px;
  }
}
</style>