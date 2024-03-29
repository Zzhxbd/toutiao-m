import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/icon/iconfont.css";
// 加载全局样式
import "@/styles/index.less";
import '@/vant'
import 'amfe-flexible'
import '@/utils/dayjs'
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");