<template>
    <div class="chatroom">
        <div class="head">
            <div class="name">蜡笔小新</div>
            <img src="../assets/more.png" alt="">
        </div>
        <div class="chatpanel"></div>
        <div class="chatinput">
            <div class="tools">
                <div class="tool" @click="opennemoji">
                    <img src="../assets/emoji.png" alt="">
                </div>
                <div class="tool">
                    <img src="../assets/image.png" alt="">
                </div>
            </div>
            <textarea @focus="focus" v-model="value" />
            <button>发送</button>
        </div>
        <emoji @sendemoji="accept" v-show="emoji"></emoji>
    </div>
</template>

<script>
import emoji from "../components/emoji.vue"
export default {
    data() {
        return {
            emoji:false,
            value:""
        };
    },
    components:{
        emoji
    },
    created() {

    },
    mounted() {
        
    },
    methods: {
        opennemoji(){
            this.emoji = true
        },
        focus(){
            this.emoji = false
        },
        accept(msg){
            console.log(msg)
            this.value+= msg
        }
    }
};
</script>

<style scoped lang="scss">
    .chatroom{
        width: 100%;
        height: 100vh;
        border-right: 1px solid #f7f3f3;
        border-left: 1px solid #f7f3f3;
        position: relative;
        .head{
            width: 100%;
            height: 80px;
            background: #ffffff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom:1px solid #f7f3f3;
            .name{
                padding-left: 50px;
                font-size: 25px;
                font-weight: bold;
            }
            img{
                width: 30px;
                padding-right: 20px;
            }
        }
        .chatinput{
            width: 100%;
            height: 200px;
            background: #ffffff;
            position: absolute;
            bottom: 0;
            .tools{
                width: 100%;
                height: 40px;
                display: flex;
                align-items: center;
                .tool{
                    display: flex;
                    width: 25px;
                    height: 25px;
                    margin: 15px;
                    cursor: pointer;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            textarea{
                width: 95%;
                height: 120px;
                border: none;
                outline:none;
                font-size: 18px;
                padding: 15px;
            }
            button{
                width: 70px;
                height: 30px;
                position: absolute;
                bottom: 10px;
                right: 50px;
            }
        }
    }
    
</style>
