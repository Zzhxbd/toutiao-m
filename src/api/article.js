import request from "@/utils/request";
// 根据 id 获取指定文章
export const getArticleById = articleId => {
 return request({
   method: 'GET',
   url: `/v1_0/articles/${articleId}`
 })
}
// 关注用户
export const followingsYes = target => {
  return request({
    method: 'POST',
    url: `/v1_0/user/followings`,
    data:{
      target
    }
  })
 }
 // 取消关注
export const followingsNo = id => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${id}`,
  })
 }
 //收藏文章
 export const isCollectApi = id => {
  return request({
    method: 'POST',
    url: `/v1_0/article/collections`,
    data:{
      target:id
    }
  })
 }
 //取消收藏文章
 export const isNotCollectApi = id => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${id}`,
  })
 }
 //点赞
 export const addLike = id => {
  return request({
    method: 'POST',
    url: `/v1_0/article/likings`,
    data:{
      target:id
    }
  })
 }
 //取消点赞
 export const delLike = id => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${id}`,
  })
 }