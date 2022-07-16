<template>
  <div class="user-info">
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />
    <input type="file" hidden ref="file" @change="onFileChange" />
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image
        class="avatar"
        round
        fit="cover"
        :src="user.photo"
      />
    </van-cell>
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="editNameShow = true"
    />
    <van-cell
      title="性别"
      :value="user.gender === 1 ? '女' : '男'"
      is-link
      @click="editSexShow = true"
    />
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="editBirthdayShow = true"
    />
    <!-- 昵称弹出层 -->
    <van-popup
      v-model="editNameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <UpdateName
        @close="editNameShow = false"
        v-model="user.name"
        v-if="editNameShow"
      ></UpdateName>
    </van-popup>
    <!-- 性别弹出层 -->
    <van-popup v-model="editSexShow" position="bottom">
      <UpdateSex
        @close="editSexShow = false"
        v-model="user.gender"
        v-if="editSexShow"
      ></UpdateSex>
    </van-popup>
    <!-- 生日弹出层 -->
    <van-popup v-model="editBirthdayShow" position="bottom">
      <UpdateBirthday
        v-model="user.birthday"
        @close="editBirthdayShow = false"
        v-if="editBirthdayShow"
      ></UpdateBirthday>
    </van-popup>
    <!-- 头像弹出层 -->
    <van-popup v-model="editAvatarShow" position="bottom" style="height: 100%">
      <UpdateAvatar
        v-if="editAvatarShow"
        :img="img"
        @close="editAvatarShow = false"
        @updateAvatar="user.photo = $event"
      ></UpdateAvatar>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name.vue'
import UpdateSex from './components/update-sex.vue'
import UpdateBirthday from './components/update-birthday.vue'
import UpdateAvatar from './components/update-avatar.vue'
export default {
  name: 'UserInfo',
  data() {
    return {
      user: {},
      editNameShow: false,
      editSexShow: false,
      editBirthdayShow: false,
      editAvatarShow: false,
      img: null,
    }
  },
  components: {
    UpdateName,
    UpdateSex,
    UpdateBirthday,
    UpdateAvatar,
  },
  created() {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile() {
      try {
        const { data } = await getUserProfile()
        // console.log(data)
        this.user = data.data
      } catch (err) {
        console.log(err)
        this.$toast('数据获取失败')
      }
    },
    onFileChange() {
      const file = this.$refs.file.files[0]
      const data = window.URL.createObjectURL(file)
      this.editAvatarShow = true
      this.img = data
      this.$refs.file.value = ''
    },
  },
}
</script>

<style lang='less'>
.user-info {
  .van-icon-arrow-left {
    color: #fff;
  }
  .avatar {
    width: 60px;
    height: 60px;
  }
  .van-popup {
    background-color: #f5f7f9 !important;
  }
}
</style>