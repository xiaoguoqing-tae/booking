<template>
    <div class="sidebar">
        <img class="userimg" src="../assets/logo.png" alt="">
        <div class="chat" @click="tourl('msg')">
            <img src="../assets/chat.png" />
        </div>
        <div class="friendlist" @click="tourl('friendlist')">
            <img src="../assets/frienlist.png" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        };
    },
    created() {

    },
    mounted() {

    },
    methods: {
        tourl(msg){
            this.$router.push({'name':msg})
        }
    }
};
</script>

<style scoped lang="scss">
.sidebar{
    width: 65px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: #353535;
    .userimg{
        margin-top: 20px;
        margin-bottom: 20px ;
        width: 75%;
        height: 50px;
    }
    .chat,.friendlist{
        width: 100%;
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            width: 25px;
            height: 25px;
        }
    }
}
</style>