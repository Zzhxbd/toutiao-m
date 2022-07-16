import request from '@/utils/request'
// import store from '@/store'
export const login = data => request({
  url: '/v1_0/authorizations',
  method: 'POST',
  data
})
//发送验证码
export const sendSms = (mobile) => {
    return request({
        method: "GET",
        url: `/v1_0/sms/codes/${mobile}`,
    });
};
//获取用户自己的信息
export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user',
        // headers:{
        //     Authorization:`Bearer ${store.state.user.token}`
        // }
    })
}
//获取用户个人资料
export const getUserProfile = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/profile'
    })
}
//编辑用户个人资料
export const editUserProfile = (data) => {
    return request({
        method: 'PATCH',
        url: '/v1_0/user/profile',
        data
    })
}
//编辑用户照片资料（头像、身份证照片）
export const editUserAvatar = (data) => {
    return request({
        method: 'PATCH',
        url: '/v1_0/user/photo',
        data
    })
}