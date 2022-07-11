<template>
  <div class="channels-edit">
    <van-cell title="我的频道" :border="false" class="title-text">
      <van-button
        slot="default"
        round
        size="mini"
        type="danger"
        plain
        class="edit-btn"
        @click="isEdit = !isEdit"
        >{{ isEdit !== true ? '编辑' : '完成' }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channels, index) in channels"
        :key="index"
        @click="onMyChannelClick(channels, index)"
      >
        <van-icon
          slot="icon"
          name="close"
          v-show="isEdit && !fixeChannel.includes(channels.id)"
        ></van-icon>
        <span
          slot="text"
          class="text"
          :class="{ active: index === newIndex }"
          >{{ channels.name }}</span
        >
      </van-grid-item>
    </van-grid>

    <van-cell title="频道推荐" :border="false" class="title-text" />
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(item, index) in otherChannels"
        :key="index"
        :text="item.name"
        icon="plus"
        class="grid-item"
        @click="onAddChannel(item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannel, addUserChannel, deleteUserChannel } from '@/api/home'
import { mapState } from 'vuex'
import { setItem} from '@/utils/storage'
export default {
  name: 'ChannelsEdit',
  props: {
    channels: {
      type: Array,
      required: true,
    },
    newIndex: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      allChannels: [],
      isEdit: false,
      fixeChannel: [0],
    }
  },
  computed: {
    ...mapState(['user']),
    otherChannels() {
      return this.allChannels.filter((item) => {
        return !this.channels.find((myChannels) => myChannels.id === item.id)
      })
      // const channels=[]
      // this.allChannels.forEach(item=>{
      // const res= this.channels.find(myChannels=>{
      //     return myChannels.id===item.id
      //   })
      //   if(!res){
      //     channels.push(item)
      //   }
      // })
      // return channels
    },
  },
  created() {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels() {
      try {
        const res = await getAllChannel()
        console.log(res)
        this.allChannels = res.data.data.channels
      } catch (err) {
        // console.log(err)
        this.$toast('数据获取失败')
      }
    },
    async onAddChannel(item) {
      this.channels.push(item)
      if (this.user) {
        //登录状态
        try {
          await addUserChannel({
            id: item.id,
            seq: this.channels.length,
          })
        } catch (err) {
          this.$toast('添加失败,请稍后再试')
        }
      } else {
        //未登录状态
        setItem('TOUTIAO_CHANNELS', this.channels)
      }
    },
    onMyChannelClick(channels, index) {
      if (this.isEdit) {
        //编辑状态
        if (this.fixeChannel.includes(channels.id)) {
          this.$toast('该项不可删除')
        } else {
          if (index <= this.newIndex) {
            this.$emit('update-active', this.newIndex - 1, true)
          }
          this.channels.splice(index, 1)
          this.deleteChannel(channels.id,this.channels)
        }
      } else {
        //非编辑状态
        this.$emit('update-active', index, false)
      }
    },
    async deleteChannel(id,channels) {
      if (this.user) {
        try {
          await deleteUserChannel(id)
        } catch (err) {
          this.$toast('删除失败,请稍后再试')
        }
      }else{
        setItem('TOUTIAO_CHANNELS',channels)
      }
    },
  },
}
</script>

<style lang="less">
.channels-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    line-height: 48px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text {
        margin: 0;
        font-size: 28px;
        color: #222;
      }
      .text {
        font-size: 28px;
        color: #222;
      }
      .active {
        color: #f85959;
      }
    }
    .van-grid-item__content--center {
      flex-direction: row;
      .van-icon-plus {
        font-size: 28px;
        padding-right: 5px;
      }
      .van-icon-close {
        position: absolute;
        right: -6px;
        top: -6px;
        font-size: 16px;
        color: #f85959;
        z-index: 999;
      }
    }
    .van-grid-item__icon-wrapper {
      position: unset;
    }
  }
}
</style>