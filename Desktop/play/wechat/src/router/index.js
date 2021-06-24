import Vue from "vue"
import VueRouter from "vue-router";
Vue.use(VueRouter)

import login from "../views/login.vue"
import chat from "../views/chat.vue"
import msg from "../components/chatlist.vue"
import chatroom from "../components/chatroom.vue"
const routes = [
    {
        path:"/",
        name:"login",
        component:login
    },
    {
        path:"/chat",
        name:"chat",
        component:chat,
        children:[
            {
                path:"/chat/msg",
                name:"msg",
                component:msg,
                children:[
                    {
                        path:"/chat/msg/chatroom",
                        name:"chatroom",
                        component:chatroom,
                    }
                ]
            }
        ]
    }
]
const router = new VueRouter({
    routes
})
export default router