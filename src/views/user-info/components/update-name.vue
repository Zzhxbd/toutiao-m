<template>
  <div class="update-name">
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <div class="filed">
      <van-field
        v-model.trim="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { editUserProfile } from '@/api/user'
export default {
  name: 'UpdateName',
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localName: this.value,
    }
  },
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0,
      })
      try {
        const localName = this.localName
        if (!localName.length) return this.$toast('昵称不能为空')
        await editUserProfile({
          name: localName,
        })
        this.$emit('input', localName)
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('更新失败')
      }
    },
  },
}
</script>

<style lang='less'>
.update-name {
  .van-nav-bar__content {
    background-color: #fff !important;
  }
  .van-nav-bar__title {
    color: #333 !important;
  }
  .filed {
    padding: 20px;
  }
}
</style>