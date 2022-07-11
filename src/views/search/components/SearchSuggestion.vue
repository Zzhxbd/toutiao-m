<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(text, index) in SearchSuggestionList"
      :key="index"
      @click="$emit('search', text)"
    >
      <div slot="title" v-html="hightLight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      SuggestionList: [],
      //   timer: null,
    }
  },
  computed: {
    SearchSuggestionList() {
       return this.SuggestionList=this.SuggestionList.filter(item=>{
            return item!==null
        })
    },
  },
  watch: {
    searchText: {
      handler: debounce(function (val) {
        this.loadGetSuggestion(val)
      }, 900),
      //   handler(val) {
      //     this.loadGetSuggestion(val)
      //   },
      immediate: true,
    },
  },

  //   created() {
  //     this.loadGetSuggestion()
  //   },
  methods: {
    async loadGetSuggestion(val) {
      try {
        const { data } = await getSuggestion({
          q: val,
        })
        // console.log(data)
        this.SuggestionList = data.data.options
      } catch (err) {
        this.$toast('获取失败,请稍后再试')
      }
    },
    // async loadGetSuggestion(val) {
    //     clearTimeout(this.timer)
    //   this.timer = setTimeout(async () => {
    //     try {
    //       const { data } = await getSuggestion({
    //         q: val,
    //       })
    //       console.log(data)
    //       this.SuggestionList = data.data.options
    //     } catch (err) {
    //       this.$toast('获取失败,请稍后再试')
    //     }
    //   }, 900)
    // },
    hightLight(text) {
      const reg = new RegExp(this.searchText, 'gi')
      if (text) {
        return text.replace(
          reg,
          `<span class="active">${this.searchText}</span>`
        )
      } else {
        return
      }
    },
  },
}
</script>

<style lang='less' scoped>
/deep/span.active {
  color: rgba(14, 122, 238, 0.982);
}
</style>