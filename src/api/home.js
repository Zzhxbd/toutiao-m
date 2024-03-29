import request from "@/utils/request";
export const getArticles = (params) => {
    return request({
        method: "GET",
        url: "/v1_0/articles",
        params
    });
};
//获取用户频道列表
export const getUserChannel = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/channels'
    })
}
//获取所有频道列表
export const getAllChannel = () => {
    return request({
        method: 'GET',
        url: '/v1_0/channels'
    })
}
//设置用户的频道（部分覆盖）
export const addUserChannel = channel => {
    return request({
      method: 'PATCH',
      url: '/v1_0/user/channels',
      data: {
        channels: [channel]
      }
    })
  }
//   删除用户频道
 export const deleteUserChannel = channelId => {
   return request({
     method: 'DELETE',
     url: `/v1_0/user/channels/${channelId}`
   })
 }