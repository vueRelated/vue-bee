<template>
    <div class="footerMenu">
        <ul>
            <li>发布广告</li>
            <li>我的</li>
            <li>广告大厅</li>
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
