<template>
    <div class="header">{{pageTitle}}</div>
</template>

<style scoped>

    .header {
        width: 100%;
        height: 2rem;
        background: #55BD47;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        z-index: 99;
        text-align: center;
        line-height: 2rem;
        color: #FFF;
    }


</style>

<script>
    export default{
       /* data(){
          return {pageTitle1:"..."}
        },*/
        props:[
            "pageTitle"
        ],
        name: "HeaderComponent"
    }
</script>
