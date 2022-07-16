<template>
  <div class="update-avatar">
    <img :src="img" alt="" class="img" ref="img" />
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { editUserAvatar } from '@/api/user'
export default {
  name: 'UpdateAvatar',
  props: {
    img: {
      type: [String, Object],
      required: true,
    },
  },
  data() {
    return {
      cropper: null,
    }
  },
  mounted() {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      // autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
    })
  },
  methods: {
    onConfirm() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0,
      })
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        try {
          const formData = new FormData()

          // Pass the image file name as the third parameter if necessary.
          formData.append('photo', blob /*, 'example.png' */)
          const { data } = await editUserAvatar(formData)
          console.log(data)
          this.$emit('close')
          this.$emit('updateAvatar', data.data.photo)
          this.$toast.success('更新成功')
        } catch (err) {
          this.$toast.fail('更新失败')
        }
      })
    },
  },
}
</script>

<style lang='less'>
.update-avatar {
  background-color: #000;
  height: 100%;
  .img {
    display: block;
    max-width: 100%;
  }
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
</style>