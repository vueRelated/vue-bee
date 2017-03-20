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
    @import 'style/normalize.css';
    @import 'style/reset.css';
</style>
<style lang="scss">
    @import 'style/main.scss';
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
        beforeEnter: (to, from, next) => {
            console.log(to)
            console.log(from)
            console.log(next)
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

