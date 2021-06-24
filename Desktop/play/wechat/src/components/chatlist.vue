<template>
    <div class="container">
        <div class="left">
            <search></search>
            <div class="infoItem" @click="openchatroom">
                <div class="info-img">
                    <img src="../assets/tx.jpeg" />
                </div>
                <div class="info-msg">
                    <div class="msg-box">
                        <div class="name">蜡笔小新</div>
                        <div class="message">妈妈妈妈妈妈妈妈妈妈妈妈妈妈妈妈妈妈妈妈妈妈</div>
                    </div> 
                </div>
                <div class="info-time">
                    <div class="time-box">
                        <div class="time">21/10/01</div>
                        <div class="message"></div>
                    </div> 
                </div>
            </div>

            <div class="infoItem">
                <div class="info-img">
                    <img src="../assets/tx.jpeg" />
                </div>
                <div class="info-msg">
                    <div class="msg-box">
                        <div class="name">蜡笔小新</div>
                        <div class="message">妈妈妈妈妈妈妈妈妈妈妈妈妈妈妈妈妈妈妈妈妈妈</div>
                    </div> 
                </div>
                <div class="info-time">
                    <div class="time-box">
                        <div class="time">21/10/01</div>
                        <div class="message"></div>
                    </div> 
                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import search from "../components/search.vue"
export default {
    data() {
        return {

        };
    },
    components:{
        search
    },
    created() {

    },
    mounted() {

    },
    methods: {
        openchatroom(){
            this.$router.push({'name':"chatroom"})
        }
    }
};
</script>

<style scoped lang="scss">
    .container{
        width: 100%;
        height: 100vh;
        display: flex;
        .left{
        width: 300px;
        height: 100vh;
        background:#e4e2e2;
        .infoItem{
            width: 100%;
            height: 90px;
            display: flex;
            .info-img{
                width: 70px;
                height: 90px;
                display: flex;
                justify-content: center;
                align-items: center;
                img{
                    width: 80%;
                    height: 70%;
                }
            }
            .info-msg{
                width: 140px;
                height: 90px;
                display: flex;
                align-items: center;
                .msg-box{
                    width: 80%;
                    height: 80%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    align-items: flex-start;
                    .name{
                        font-size: 18px;
                        font-weight: bold;
                    }
                    .message{
                        width: 140px;
                        font-size: 13px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        color: #aca8a8
                    }
                }
            }
            .info-time{
                flex: 1;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding-right: 10px;
                .time-box{
                    width: 100%;
                    height: 80%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    align-items: flex-start;
                    .time{
                        font-size: 15px;
                        color: #aca8a8
                    }
                    .message{
                        visibility: hidden;
                    }
                }
            }
        }
    }
}
</style>
