<template>
    <div class="home-container">
        <section class="block">
            <ul>
                <li class="item">asdasd</li>
                <li class="item">asdasd</li>
                <li class="item">asdasd</li>
            </ul>
        </section>

    </div>
</template>
<style scoped></style>

<script>
    import {mapGetters, mapActions} from "vuex";

    export default {
        data() {
            return {
                page: 0
            }
        },
        beforeCreate:function () {
            console.log("beforeCreate")
        },
        created(){
            console.log("created")
            this.home()
        },
        beforeMount(){
            console.log("beforeMount")
            this.home()
        },
        mounted(){
            console.log("mounted")
            this.home()
        },
        computed:{

        },
        watch: {

        },
        methods: {
            ...mapActions([
                "home"
            ])
        },

    }
</script>
