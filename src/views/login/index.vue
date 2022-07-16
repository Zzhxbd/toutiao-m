<template>
  <div class="login-container">
    <van-nav-bar
      class="page-nav-bar"
      title="登录"
      left-arrow
      @click-left="$router.back()"
    />
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        name="mobile"
        type="number"
        maxlength="11"
        placeholder="请输入手机号"
        v-model="user.mobile"
        :rules="userFormRules.mobile"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        name="code"
        placeholder="请输入验证码"
        v-model="user.code"
        :rules="userFormRules.code"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down
            :time="1000 * 60"
            format="ss s"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            @click="onSendS"
            native-type="button"
            class="send-sms-btn"
            round
            size="small"
            type="default"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button block type="info" native-type="submit" class="login-btn"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  data() {
    return {
      user: {
        mobile: 13637040274,
        code: '246810',
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空',
          },
          {
            pattern:
              /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
            message: '手机号格式错误',
          },
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' },
        ],
      },
      isCountDownShow: false,
    }
  },
  methods: {
    async onSubmit(data) {
      //1.获取表单数据
      //2.表单验证
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0,
      })
      //3.提交表单请求登录
      try {
        const res = await login (data)
        // console.log(data);
        console.log('登陆成功', res)
        this.$toast.success('登录成功')
        this.$store.commit('setUser', res.data.data)
        this.$router.push('/my')
      } catch (err) {
        console.log(err);
        if (err.response.status ===400) {
          //   console.log("手机号或验证码错误");
          this.$toast.fail('手机号或验证码错误')
        } else {
            console.log("登陆失败,请稍后重试", err);
          this.$toast.fail('登陆失败,请稍后重试')
        }
      }
      //4.根据请求响应结果处理后续操作
    },
    // 发送验证码
    async onSendS() {
      this.$toast.loading({
        message: '发送中...',
        forbidClick: true,
        duration: 0,
      })
      try {
        await this.$refs.loginForm.validate('mobile')
        // console.log("验证通过");
      } catch (err) {
        return console.log('验证失败', err)
      }
      //验证通过显示倒计时
      this.isCountDownShow = true
      //获取验证码
      try {
        await sendSms(this.user.mobile)
        //    console.log('发送成功',res);
        this.$toast.success('发送成功')
      } catch (err) {
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁,请稍后再试')
        } else {
          this.$toast.fail('发送失败,请稍后再试')
        }
      }
    },
  },
  created(){
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 165px;
    height: 46px;
    line-height: 46px;
    font-size: 22px !important;
    color: #666;
    background-color: #ededed;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      bottom: none;
    }
  }
  /deep/.van-nav-bar .van-icon {
    color: #fff;
  }
}
</style>>
