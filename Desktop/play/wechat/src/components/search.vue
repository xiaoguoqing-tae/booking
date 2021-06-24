<template>
    <div class="seach">
        <div class="search-box">
            <input placeholder="搜索" />
        </div>
        <div class="add">＋</div>
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

    }
};
</script>

<style scoped lang="scss">
.seach{
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 80px;
    background: #ffffff;
    .search-box{
        height: 10px;
        display: flex;
        align-items: center;
        input{
            height: 100%;
            border-radius: 5px;
            border: 1px solid #dfd9d9;
            background:#dfd9d9;
            padding: 10px;
            outline: none;
        }
        input:focus{
            background: #ffffff;
        }
    }
    .add{
        width: 30px;
        height: 30px;
        background: #c7c4c4;
        line-height: 30px;
        font-size: 30px;
        border-radius: 5px;
    }
}
</style>
