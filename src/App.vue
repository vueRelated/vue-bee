<template>
    <div id="app">

        <header-component :pageTitle="pageTitle"></header-component>
        <div class="container">
            <router-view></router-view>
        </div>

        <footer-menu-component ></footer-menu-component>
    </div>
</template>

<style>
    .container{
        margin-top: 2rem;
        height: 600px;
        display: flex;
        transition: all .1s;
        box-shadow: 0 0 3px 5px rgba(222, 222, 222, .3);
        transform: rotate(30deg);
    }
</style>
<script>
    import {mapGetters, mapActions} from "vuex";
    import HeaderComponent from "./components/header.vue";
    import FooterMenuComponent from "./components/footerMenu.vue";

    export default {
        name: "app",
        data(){
            return {pageTitle:"首页"}
        },
        computed: mapGetters([
            "loading"
        ]),
        components: {
            HeaderComponent,
            FooterMenuComponent
        }
    }
</script>

