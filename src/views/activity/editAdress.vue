<template>
    <!--编写地址-->
    <div class='editAdress'>
            <div class="editAdressContainer">
                    <div class='title'>
                        恭喜完成,填写地址领取奖励
                    </div>
                    <van-form @submit="onSubmit" >
                           <div class='content'>
                                <van-field 
                                v-model="info.name" 
                                placeholder="收货人"  
                                :rules="[{ required: true, message: '请填写收货人' }]"/>
                                <van-field 
                                    v-model="info.phone" 
                                    type="tel" 
                                    placeholder="手机号码" 
                                    :rules="[{required: true, message: '请填写正确的手机号码',pattern:/^[1][3,4,5,7,8,9][0-9]{9}$/ }]" />
                                <van-field 
                                    v-model="info.address"
                                    placeholder="详细地址" 
                                :rules="[{ required: true, message: '请填写详细地址' }]" />
                           </div>
                            <van-button  block type="info" native-type="submit" class='button'>
                                确定
                            </van-button>
                    </van-form>
            </div>
    </div>
</template>
<script>
import {editAddress}  from '../config/api'
export default {
    data(){
        return{
            info:{
                name:'',
                phone:'',
                address:''
            }
        }
    },
    mounted(){
        this.scrollInit('.editAdress',this)
    },
    methods:{
     //提交信息
        async onSubmit(val){
           await editAddress({
               token:this.getUserID(),
               username:this.info.name,
               phone:this.info.phone,
               address:this.info.address,
               isAdd:1,        
           })
           this.$toast('提交成功!')
           this.$router.go('-1')
        }
    }
}
</script>
<style lang="stylus" scoped>
.editAdress
    width 100vw
    height 100vh
    background red
    overflow hidden
    background: linear-gradient(to top, #FF074F 0%, #FF9E3C 100%);
    .title 
        color white
        font-size .14rem
        padding .15rem
    .content
        width 3.45rem
        margin 0 .15rem .15rem
        border-radius .08rem
        overflow hidden
    .button
        width 3.45rem
        height .5rem
        background white
        border-radius .08rem
        line-height .5rem
        text-align center
        color #FF104E 
        font-size .16rem
        margin auto
        border none
</style>