<template>
    <!--反馈查询-->
    <div class="query">
         <van-nav-bar
                title="反馈结果"
                left-arrow
                left-text="返回"
                @click-left="$router.go(-1)"

        />
        <div class="content">
            <div class="content_container">
                    <div class="cell" v-for="(val,index) of tableData" :key="index">
                        <div v-for="(val_c,key_c,index_c) in val" :key="index_c">
                            <van-field 
                            readonly 
                            v-show="val[key_c]"
                            v-model="val[key_c]"  
                            :label="tableTitles.filter(el=>el.value==key_c)[0].label"
                            rows="1"
                            autosize
                            type="textarea"
                              > 
                                <div 
                                  slot="input" 
                                  :class="{'status--red':key_c=='status'&&val[key_c]=='正在处理中...','status--green':key_c=='status'&&val[key_c]=='已处理'}">
                                      {{val[key_c]}}
                                </div>
                            </van-field> 
                        </div>
                    </div>
                    <div class="noInfo" v-if="tableData.length==0">暂无反馈信息</div>
            </div>
        </div>
    </div>
</template>

<script>
import {prob_feedback} from '../../config/api' 
export default {
    data(){
        return{
            tableData:[{}],
             tableTitles:[
              {
                label:"邀请码",
                value:"inviteCode",
              },
               {
                label:"类型",
                value:"type",
              },
               {
                label:"申请时间",
                value:"createTime",
              },
               {
                label:"提现金额",
                value:"exMoney",
              },
               {
                label:"提现日期",
                value:"exDate",
              },
               {
                label:"刷子邀请码",
                value:"brushCode",
              },
              {
                label:"徒弟邀请码",
                value:"discipleCode",
              },
              {
                label:"关联徒弟时间",
                value:"relationDate",
              },
              {
                label:"备注",
                value:"remark",
              },
              {
                  label:"状态",
                  value:"status"
              },
              {
                  label:"处理结果",
                  value:"result"
              }
            ],
            columns:[
               {
                label:"提现不到账",
                value:1
              },
               {
                label:"封号",
                value:2
              },
               {
                label:"账户被刷",
                value:3
              },
               {
                label:"师徒无关联",
                value:4
              },
               {
                label:"口罩问题",
                value:6
              }, {
                label:"其他问题",
                value:5
              },
            ],
        }
    },
    methods:{
        /**初始化 */
        init(){
            this.getList()
        },
        /**获取列表 */
        async getList(){
                if(!this.$route.query.id){
                    return this.$router.push('/problem')
                }
                const {data} = await prob_feedback({
                        page:1,
                        sysType:"klyq",
                        type:0,
                        inviteCode:this.$route.query.id
                    })
                this.tableData = data.result 
                this.tableData.forEach((val,index)=>{
                    this.tableData[index] ={
                            // inviteCode:val.inviteCode,
                            type:this.columns.filter(el=>el.value==val.type)[0].label,
                            status:val.status?'已处理':'正在处理中...',
                            createTime:val.createTime,
                            exMoney:val.exMoney,
                            discipleCode:val.discipleCode,
                            relationDate:val.relationDate,
                            exDate:val.exDate,
                            brushCode:val.brushCode,
                            remark:val.remark,
                            result:val.result,
                    }
                })
        }
    },
    activated(){
            this.init()
            this.scrollInit('.content',this)
    }
}
</script>

<style lang="stylus" scoped>
.query
    width 100vw
    height 100vh
    font-size .14rem
    .content
        width 100vw
        height calc(100vh - 0.6rem)
        overflow hidden
        .content_container
            padding .1rem 0
            .cell 
                margin .2rem  .15rem
                background white
                .status--red
                  color red 
                .status-green
                  color green 
            .noInfo
                text-align center
                margin-top 2rem
                font-weight 600
</style>