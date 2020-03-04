<template>
    <div class="app">
         <!--页面展示-->
        <keep-alive>
                        <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script>
import vconsole from 'vconsole'

export default {
    data(){
    },
    components:{
    },
    mounted(){
        new vconsole()
    },
    methods:{

    },
}
</script>
<style lang="stylus" >
.app 
    font-size .16rem
    font-family PingFangSC-Regular
    width 100vw
    height 100vh
</style>
