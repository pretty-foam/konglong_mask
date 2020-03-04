<template>
    <div class="home">
           <div class="honewContainer">
                <img src="../assert/img/h5_bg.png" alt="" class="pic">
                <div class='inviteState' @click="isJump(info.state)">
                    <img  :src="img[info.state]" alt="" >
                </div>
                <div class='content'>
                    <div class="c_top">
                        <!--未领取奖励显示-->
                        <div class="c_top_state" v-if ='info.state==0||info.state==1'>
                                <div class="cell" v-for="(key,index) of info.picHead" :key="index">
                                     <img :src=key.avatarUrl  alt="" srcset="" class="pichead">
                                </div>
                        </div>
                         <!--已领取时显示，收货信息-->
                         <div class="logistics" v-if ='info.state==2||info.state==3'>
                                <div class='logistics_left'>
                                        <img class="logistics_left_img" src="../assert/img/口罩图片.png" alt="" srcset="">
                                </div>
                                <div class='logistics_right' v-if="info.logistics.state==1">
                                        <div class="logistics_right_state">
                                            口罩(10只)待发货
                                        </div>
                                        <div class="logistics_right_number">
                                            正在等待快递公司揽货
                                        </div>
                                        <!--悬浮发货状态-->
                                        <div class="logistics_suspe">
                                                待发货
                                        </div>
                                </div>
                                 <div class='logistics_right' v-if='info.logistics.state==2'>
                                        <div class="logistics_right_state">
                                            口罩(10只)已发货
                                        </div>
                                        <div class="logistics_right_number">
                                            订单号：({{info.logistics.company}}){{info.logistics.number}}
                                        </div>
                                         <!--悬浮发货状态-->
                                        <div class="logistics_suspe">
                                                已发货
                                        </div>
                                </div>
                                 <div class='logistics_right' v-if='info.logistics.state==4'>
                                        <div class="logistics_right_state">
                                            口罩(10只)已签收
                                        </div>
                                        <div class="logistics_right_number">
                                            订单号：({{info.logistics.company}}){{info.logistics.number}}
                                        </div>
                                         <!--悬浮发货状态-->
                                        <div class="logistics_suspe">
                                                已签收
                                        </div>
                                </div>
                         </div>
                    </div>
                    <div class="c_bottom">
                            <div class="c_bottom_title">
                                   <van-divider :style="{'font-size':'.14rem',padding:0,color:'rgb(255, 203, 143)'}">活动规则</van-divider>
                            </div>
                            <div class="c_bottom_details">
                                <p>1.领取条件：活动期间邀请满5个新徒弟，即可免费领取10片口罩</p>
                                <p>2.活动时间：3月4日-3月14号，每天限量10万片，先到先得</p>
                                <p>3.发货时间：活动结束后即3月15号会陆续包邮发货送到您的手上</p>
                            </div>
                    </div>
                </div>
           </div>
            <van-popup v-model="showShareArea" position="bottom" class="shadow_share" @click=offShare>
                <div class="share_area">
                    <div class="share_buttons" @click.stop=''>
                        <div class="share_button"  @click="share(4)">
                            <img src="../assert/img/invite_wechat.png">
                            <p>发送给朋友</p>
                        </div>
                        <div  class="share_button" @click="share(1)">
                            <img src="../assert/img/invite_friendship.png">
                            <p>朋友圈</p>
                        </div>
                    </div>
                    <div class="cancelShare" @click=offShare>取消</div>
                </div>
            </van-popup>
    </div>
</template>

<script>
import {getInviteUserList,getUserGoods,getReward}  from '../config/api'
export default {
    data(){
        return{
            showShareArea: false,
            info:{
                state:null, //奖励状态 0邀请状态 1领取状态 2发放中 3 领取成功
                logistics:{
                    state:0,  // 0 待发货 1 发货中 4签收 
                    number:'12312332112',
                    company:'',
                },//物流信息
                picHead:['','','','',''],  //
            },
            img:['./img/btn_立即邀请.png','./img/btn_马上领取.png','./img/btn_励发放中.png','./img/btn_领取成功.png'],
        }
    },
    mounted(){
        this.scrollInit('.home',this)
        this.init()
    },
    activated(){
        this.init()
    },
    methods:{
        init(){
            let token = null
            let time = setInterval(async()=>{
                token = this.getUserID()
                if(!token)return  ;
                clearInterval(time)
                let  res =  await getInviteUserList({token})
                this.info.state=res.data.isReward
                this.info.picHead=this.info.picHead.map((key,index)=>res.data.invitationList[index]||{})
                if(this.info.state<2)return;    //未领取，不需要请求物流信息
                res = await getUserGoods({token})
                this.info.logistics.state = res.data.goods.status
                this.info.logistics.number = res.data.goods['courier_number']
                this.info.logistics.company = res.data.goods['company']
            },100)
        },
        //判断跳转
       async isJump(state){
            // 领取状态
            if(state==1){
                await getReward({token:this.getUserID()})
                this.$router.push('/editAdress')
            //  分享状态
            }else if(state==0){
                this.showShareArea = true
            }
        },
        offShare() {
            this.showShareArea = false
            this.shareAreaBottom = '1.5rem'
        },
        //app 分享  num 1朋友圈 4微信好友
        share(num){
            this.showShareArea = false
            window.Share.postMessage(JSON.stringify({type:num,args:'kouzhao'}))
        },
    }
}
</script>
<style lang="stylus" scoped>
.home
    width 100vw
    height 100vh
    .shadow_share
        width 100vw
        height 100vh
        background rgba(0,0,0,0)
        position fixed
        top 0
        left 0
        z-index 2
        .share_area
            position absolute
            bottom 0
            left 50%
            transform translateX(-50%)
            transition bottom 2s
            width 3.45rem
            height 1.5rem
            background rgba(255,255,255,1)
            border-radius 30px 30px 0px 0px
            .share_buttons
                display flex
                justify-content  space-around
                align-items  center
                width 100%
                height 1.05rem
                border-bottom 1px solid rgba(188,188,188,1)
                .share_button
                    display flex
                    flex-direction column
                    align-items center
                    & > img
                        width 0.4rem
                        height 0.4rem
                    & > p
                        margin-top 0.07rem
                        font-size 0.13rem
                        font-weight 500
                        color rgba(97,97,97,1)
            .cancelShare
                width 100%
                height 0.45rem
                line-height 0.45rem
                text-align center
                font-size 0.16rem
                font-weight 500
                color rgba(0,0,0,.7)
    .honewContainer
        position relative
        background rgb(255,32,65)
        padding-bottom .5rem
        .pic
            height 5.28rem
        .inviteState
            position absolute
            top 4.32rem
            left 0
            right 0
            margin auto
            width 3rem
            height .6rem
            display flex 
            justify-content center 
            align-items center
            & >img 
                height .19rem

        .content
            width 3.45rem 
            height 3.1rem
            margin auto
            box-shadow: 0 2Px 4Px 0 rgba(0,0,0,0.10);
            border-radius: 8px;
            border-radius: 8px;
            overflow hidden
            .c_top
                height .6rem
                padding .2rem .05rem
                background #a62353d4
                position relative
                .logistics_suspe
                    background #FFE765 
                    width .6rem
                    height .21rem
                    border-bottom-left-radius .21rem
                    border-top-left-radius .21rem
                    text-align center
                    line-height .21rem
                    color #B4214D 
                    font-size .12rem
                    position absolute
                    top .15rem
                    right  0
                .logistics
                    padding 0 .1rem
                    display flex
                    flex-flow row nowrap
                    .logistics_left
                        .logistics_left_img
                            width .64rem 
                            height .64rem
                            background white
                    .logistics_right
                        display flex
                        flex-flow column nowrap
                        justify-content space-around
                        margin-left .15rem
                        color  rgb(255, 203, 143)
                        font-size .14rem
                .c_top_state
                    display flex
                    justify-content space-around
                    .cell 
                        width .54rem
                        height .54rem
                        border-radius 50%
                        background url('../assert/img/虚位以待.png') no-repeat ;
                        background-size  cover
                        overflow hidden
                        .pichead
                            width .54rem
                            height .54rem
            .c_bottom
                width 100%
                height 2rem
                padding-top .1rem
                background: #A62353;
                text-align center
                .c_bottom_title
                    color #FFCB8F 
                    font-size .14rem
                    display inline-block
                    width 1.6rem
                .c_bottom_details
                    font-size  .14rem
                    text-align start
                    padding 0 .15rem
                    line-height .21rem
                    color rgb(236,167,129)

</style>