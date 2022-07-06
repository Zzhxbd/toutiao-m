<template>
  <div class="my-container">
    <div
      class="header not-login"
      @click="$router.push({ path: '/login' })"
      v-if="!user"
    >
      <div class="login-btn">
        <img class="img" src="~@/assets/mobile.png" alt="" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <div class="header user-info" v-else>
      <div class="base-info">
        <div class="left">
          <van-image
            class="avatar"
            round
            fit="cover"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
          <span class="name">张子函</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 导航 -->
    <van-grid class="grid-nav" :column-num="2" clickable>
      <van-grid-item text="收藏">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
      </van-grid-item>
      <van-grid-item text="点赞">
        <i slot="icon" class="toutiao toutiao-lishi"></i
      ></van-grid-item>
    </van-grid>
    <!-- 导航 -->
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" class="mb-9" is-link />
      <van-cell
        title="退出登录"
        class="logout-cell"
        v-if="user"
        @click="onLogout"
        clickable
      />
    </van-cell-group>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MyIndex',
  computed: {
    ...mapState(['user']),
  },
  methods: {
    onLogout() {
      // 退出提示
      this.$dialog
        .confirm({
          title: '确认退出吗?',
        })
        .then(() => {
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
  },
}
</script>

<style lang="less" scoped>
.my-container {
  .header {
    height: 361px;
    background: url('~@/assets/banner.png');
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .img {
        width: 132px;
        height: 132px;
      }
      .text {
        margin-top: 15px;
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 2px solid #fff;
        }
        .name {
          font-size: 30px;
          color: #fff;
          margin-right: 23px;
        }
      }
    }
    .data-stats {
      height: 130px;
      display: flex;
      justify-content: space-around;
      .data-item {
        height: 130px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    .van-grid-item {
      height: 141px;
    }
    /deep/.van-grid-item__text {
      font-size: 28px;
    }
    /deep/.toutiao-shoucang {
      font-size: 45px;
      color: #eb5253;
    }
    /deep/.toutiao-lishi {
      font-size: 45px;
      color: #ff9d1d;
    }
  }
  .logout-cell {
    color: red;
    text-align: center;
  }
}
</style>