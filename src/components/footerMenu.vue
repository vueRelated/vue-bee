<template>
    <div class="footerMenu">
        <ul>
            <li>我的</li>
            <li><router-link to="/">大厅</router-link></li>
            <li><router-link to="/login">登录</router-link></li>
        </ul>
    </div>
</template>

<style scoped>

    .footerMenu {
        width: 100%;
        height: 2rem;
        background: #f8f8f8;
        position: fixed;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 99;
        line-height: 2rem;
    }
    .footerMenu ul li{
        float: left;
        font-size: 0.6rem;
        text-align: center;
        width: 30%;
        box-sizing: border-box;
    }


</style>

<script>
    export default{
        data(){
            return {pageTitle:"..."}
        },
        name: "FooterMenuComponent"
    }
</script>
