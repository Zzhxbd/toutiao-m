import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/home',
        component: () => import('@/views/layout'),
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('@/views/layout/home')
            },
            {
                path: 'qa',
                name: 'qa',
                component: () => import('@/views/layout/qa')
            },
            {
                path: 'video',
                name: 'video',
                component: () => import('@/views/layout/video')
            },
            {
                path: 'my',
                name: 'my',
                component: () => import('@/views/layout/my')
            }
        ]
    },
    {
        path: "/login",
        name: "login",
        component: () =>
            import("@/views/login"),
    },
    {
        path: "/search",
        name: "search",
        component: () =>
            import("@/views/search"),
    },
    {
        path: "/article/:articleId",
        name: "article",
        component: () =>
            import("@/views/article"),
        props:true 
    }


];

const router = new VueRouter({
    routes,
});

export default router;