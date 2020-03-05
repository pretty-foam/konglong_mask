<template>
    <div class="home">
           <div class="honewContainer">
                <img src="../assert/img/h5_bg.png" alt="" class="pic">
                <div class='inviteState' @click="isJump(info.state)">
                        {{inviteState[info.state]}}
                </div>
                <div class='content'>
                    <div class="c_top">
                        <div class="describe">
                            新老用户邀请5个好友达标，即可领取免费口罩（10只）
                        </div>
                        <div class="c_top_title ">
                                   <van-divider :style="{'font-size':'.14rem',padding:0,color:'rgb(255, 203, 143)'}">
                                       <span v-if="info.state==0||info.state==1">邀请列表</span>
                                       <span v-else>奖品列表</span>
                                   </van-divider>
                        </div>
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
                                            口罩(10只) <span class="logistics_suspe">待发货</span>
                                        </div>
                                        <div class="logistics_right_number">
                                            正在等待快递公司揽货
                                        </div>
                                        <!--悬浮发货状态-->
                                        <!-- <div class="logistics_suspe">
                                                待发货
                                        </div> -->
                                </div>
                                 <div class='logistics_right' v-if='info.logistics.state==2'>
                                        <div class="logistics_right_state">
                                            口罩(10只) <span class="logistics_suspe">已发货</span>
                                        </div>
                                        <div class="logistics_right_number">
                                            订单号：({{info.logistics.company}}){{info.logistics.number}}
                                        </div>
                                         <!--悬浮发货状态-->
                                        <!-- <div class="logistics_suspe">
                                                已发货
                                        </div> -->
                                </div>
                                 <div class='logistics_right' v-if='info.logistics.state!=2||info.logistics.state!=1'>
                                        <div class="logistics_right_state">
                                            口罩(10只) <span class="logistics_suspe">{{logistics_status[info.logistics.state]}}</span>
                                        </div>
                                        <div class="logistics_right_number">
                                            订单号：({{info.logistics.company}}){{info.logistics.number}}
                                        </div>
                                         <!--悬浮发货状态-->
                                        <!-- <div class="logistics_suspe">
                                                已签收
                                        </div> -->
                                </div>
                         </div>
                    </div>
                    <!--活动说明-->
                    <div class="c_bottom">
                            <div class="c_bottom_title">
                                   <van-divider :style="{'font-size':'.14rem',padding:0,color:'rgb(255, 203, 143)'}">活动规则</van-divider>
                            </div>
                            <div class="c_bottom_details">
                                <p>加油，武汉！加油，中国！恐龙有钱团队积极响应国家号召！每天为大家免费送10万只口罩！限量领取！尽量少出门，勤洗手！在家玩恐龙有钱，玩游戏还能赚点零钱！恐龙有钱将与您一起打赢疫情防控狙击战！ </p>
                                <p></p>
                                <p>活动规则：</p>
                                <p>新老用户皆可参与</p>
                                <p>新老用户邀请5个好友达标，即可领取免费口罩（10只）。</p>
                                <p></p>
                                <p>活动周期：</p>
                                <p>3.4号-3.10号，先到先得，每天限量！</p>
                            </div>
                    </div>
                </div>
           </div>
           <!--分享弹窗-->
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
            showShareArea: false,  //是否显示分享弹窗
            info:{
                state:null, //奖励状态 0邀请状态 1领取状态 2发放中 3 领取成功
                logistics:{
                    state:0,  // 0 待发货 1 发货中 4签收 
                    number:'',
                    company:'',
                },//物流信息
                picHead:['','','','',''],  //邀请用户头像
            },
            inviteState:['立即邀请','马上领取','奖励发放中','领取成功'],//领取状态
            logistics_status:[
                '查询出错',
                '待发货',
                '已发货',
                '派送中',
                '已签收',
                '拒收',
                '疑难件',
                '退回'
            ],//物流状态
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
            height 5.6rem
        .inviteState
            position absolute
            top 4.12rem
            left 0
            right 0
            margin auto
            width 3.2rem
            height .6rem
            display flex 
            justify-content center 
            align-items center
            background url('../assert/img/btn.png') no-repeat 
            background-size contain
            font-size .16rem
            font-weight 600 
            color: #A62353
            z-index 2
            & >img 
                height .19rem
        .content
            width 3.45rem 
            margin -1.1rem auto 0 auto 
            box-shadow: 0 2Px 4Px 0 rgba(0,0,0,0.10);
            font-size .12rem 
            color rgb(236,167,129)
            .c_top
                height 1.71rem
                padding .2rem .05rem
                background #a62353d4
                position relative
                text-align center
                border-radius: 8px;
                .c_top_title 
                    color #FFCB8F 
                    font-size .14rem
                    display inline-block
                    width 1.6rem
                    margin-top .2rem
                .describe
                    margin .1rem .1rem 0 .1rem
                    text-align center
                .logistics_suspe
                    background #FFE765 
                    display inline-block
                    width .6rem
                    height .21rem
                    border-radius .21rem
                    text-align center
                    line-height .21rem
                    color #B4214D 
                    font-size .12rem
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
                        text-align start
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
                margin-top .15rem
                width 100%
                height 2.6rem
                background: #A62353d4
                text-align center
                border-radius: 8px;
                .c_bottom_title
                    color #FFCB8F 
                    font-size .14rem
                    display inline-block
                    width 1.6rem
                .c_bottom_details
                    font-size  .12rem
                    text-align start
                    padding 0 .15rem
                    line-height .18rem
                    color rgb(236,167,129)
                    & >p 
                        min-height .16rem

</style>