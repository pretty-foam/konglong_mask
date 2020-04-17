<template>
    <div class="app">
         <!--页面展示-->
        <keep-alive>
                        <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script>

export default {
    components:{
    },
    mounted(){
    },
    methods:{
    },
}
</script>
<style lang="stylus">
.app 
    width 100vw
    height 100vh 
    background   #f7f8fa
</style>
