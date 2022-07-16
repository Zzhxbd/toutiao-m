<template>
  <div class="update-sex">
    <van-picker
      title="标题"
      show-toolbar
      :default-index="value"
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onPickerChange"
    />
  </div>
</template>

<script>
import { editUserProfile } from '@/api/user'
export default {
  name: 'UpdateSex',
  data() {
    return {
      columns: ['男', '女'],
      localGender:this.value
    }
  },
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration:0,
      })
      try {
        const localGender = this.localGender
        await editUserProfile({
          gender:localGender,
        })
        this.$emit('input', localGender)  
        this.$toast.success('更新成功')
        this.$emit('close')
      } catch (err) {
        console.log(err)
        this.$toast.fail('更新失败')
      }
    },
    onPickerChange(picker, value, index){
        this.localGender=index
    }
  },
}
</script>

<style>
</style>