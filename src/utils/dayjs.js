import Vue from 'vue'
import dayjs from 'dayjs' // ES 2015
// 默认英文,加载中文
import 'dayjs/locale/zh-cn'
//配置相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('zh-cn')//全局使用中文

dayjs.extend(relativeTime)//处理相对时间

// 定义全局过滤器
Vue.filter('relativeTime', (val) => {
    return dayjs().to(dayjs(val))
})