<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      :error.sync="error"
      finished-text="没有更多了"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in searchResult"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      searchResult: [],
      loading: false,
      finished: false,
      error: false,
      page: 1,
      per_page: 10,
    }
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText,
        })
        // //测试代码
        // if(Math.random()>0.5){
        //     JSON.parse('aaa')
        // }
        console.log(data)
        this.searchResult = [...this.searchResult, ...data.data.results]
        this.loading = false
        if (data.data.results.length < 10) {
          this.finished = true
        } else {
          this.page = this.page + 1
        }
      } catch (err) {
        this.error = true;
        this.loading=false
      }
    },
  },
}
</script>

<style>
</style>