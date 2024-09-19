import {createApp} from 'vue'
import App from './App.vue'

import {createWebHistory, createRouter} from 'vue-router'
import MainView from "./views/MainView.vue"
import PostView from "./views/PostView.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: MainView},
        {path: '/post/:id', component: PostView},
    ],
    linkActiveClass: 'active'
})

createApp(App)
    .use(router)
    .mount('#app')
