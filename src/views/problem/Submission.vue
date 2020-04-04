<template>
    <!--问题提交页面-->
    <div class="Sub" ref="Sub">
        <div class="Sub_container">
            <div class="title">用户反馈</div>
            <van-form @submit="onSubmit">
                <van-field
                readonly
                clickable
                name="type"
                :value="form.type"
                label="问题类型"
                placeholder="点击选择问题类型"
                @click="showPicker_type = true"
                :rules="[{ required: true, message: '请选择问题' }]"
                />
                <van-field
                    v-model="form.code"
                    name="inviteCode"
                    label="邀请码"
                    placeholder="请填写本人邀请码"
                    :rules="[{ required: true,validator:val=>val.length<20, message: '请填写正确的邀请码' }]"
                />
                 <van-field
                    v-model="form.brushCode"
                    v-if="form.typeVal ==2"
                    name="brushCode"
                    label="刷子邀请码"
                    placeholder="请填写邀请码"
                    :rules="[{ required: true, message: '请填写邀请码' }]"
                />
                 <van-field
                    v-if="form.typeVal ==3"
                    v-model="form.childCode"
                    name="brushCode"
                    label="徒弟邀请码"
                    placeholder="请填写邀请码"
                    :rules="[{ required: true, message: '请填写邀请码' }]"
                />
                <van-field
                    v-if="form.typeVal ==0"
                    v-model="form.money"
                    name="exMoney"
                    type='number'
                    label="提现金额"
                    placeholder="金额"
                    :rules="[{ required: true, message: '请输入提现金额' }]"
                />
                 <van-field
                readonly
                clickable
                name="relationDate"
                :value="form.childTime"
                v-if="form.typeVal ==3"
                label="关联日期"
                placeholder="点击选择日期"
                @click="showPicker_time = true"
                />
                <van-field
                v-if="form.typeVal ==0"
                readonly
                clickable
                name="exDate"
                :value="form.time"
                label="提现日期"
                placeholder="点击选择日期"
                @click="showPicker_time = true"
                />
                <van-field
                    autosize
                    show-word-limit
                    type="textarea"
                    v-model="form.remarks"
                    name="remark"
                    label="备注"
                    maxlength="300"
                    placeholder="备注信息"
                />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">
                    提交反馈
                    </van-button>
                </div>
            </van-form>
            <div class="copyright">
                Copyright © 2020 上海易慕网络科技有限公司
            </div>
        </div>
        <!--问题类型弹窗-->
        <van-popup v-model="showPicker_type" position="bottom">
            <van-picker
                show-toolbar
                :columns="columns_list"
                @confirm="onConfirm"
                @cancel="showPicker_type = false"
            />
        </van-popup>
        <!--日历弹窗-->
        <van-calendar 
        v-model="showPicker_time" 
        @confirm="onConfirm_time" 
        :min-date="minDate"
        :default-date	=defaultDate
         />

    </div>    
</template>
<script>
import {prob_submit} from '../../config/api' 
// import vconsole from 'vconsole'
export default {
  data() {
    return {
      form:{
          type:"", //类型
          typeVal:4,//类型值 0 提现不到账 1师徒无关联 2账户被刷 3封号 4其他问题 5口罩问题
          code:"",   //邀请码
          remarks:"", //备注
          childCode:"",//徒弟邀请码
          money:"",// 提现金额
          childTime:"",// 师徒关联时间
          time:'', //提现时间
      }, //表单信息
      columns: ['提现不到账', '解封账号', '账户被刷', '师徒无关联', '其他问题','口罩问题'],  //问题类型（获取对应索引）
      columns_list: ['提现不到账', '解封账号', '账户被刷', '师徒无关联', '口罩问题','其他问题'],  //问题类型 
      showPicker_type: false,  //问题类型弹窗显示控制
      showPicker_time:false,// 日历弹窗
      minDate:new Date(2019,12,1),
      maxDate:new Date(),
      defaultDate:new Date()
    };
  },
  methods: {
    /**提交 */
    async onSubmit(values) {
      values.type =this.form.typeVal + 1   //  +1 与后端保持一致
      values.sysType = 'klyq'
      await prob_submit(values)
      this.form ={typeVal:4,code:'',remarks:''}
      this.$toast('提交成功！')
    },
    /**问题类型弹窗 */
     onConfirm(value) {
      this.form={remarks:''}
      this.form.type = value;
      this.form.typeVal = this.columns.indexOf(value)
      this.showPicker_type= false;
    },
    /**日历弹窗 */
     onConfirm_time(value) {
      this.form.time = `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`;
      this.form.childTime = `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`;
      this.showPicker_time= false;
    },
    /**初始化高度 */
    initHeight(){
      const h = window.document.body.offsetHeight
      this.$refs.Sub.style=`height:${h}px`
    }
  },
  mounted(){
    // this.scrollInit('.Sub',this)
    // new vconsole()
    this.initHeight()
  }
};
</script>
<style lang="stylus" scoped>
.Sub
   width 100vw
   height 100vh
   overflow hidden
   background #f7f8fa
   .Sub_container
        background #f7f8fa
        width 100vw
        height 100%
        position relative
        .title 
            font-size .16rem
            text-align center
            padding .2rem 0
            color rgba(0,0,0,.8)
            font-weight 600
        .copyright
            font-size .12rem
            color rgba(0,0,0,.6)
            text-align center
            position absolute
            bottom 2%
            left 0 
            right 0
            margin auto
</style>