<template>
    <!--表格-->
    <div class="table">
      <!--筛选-->
        <div class="choose">
            <el-select v-model="input.type" placeholder="请选择类型"  class="input">
                <el-option
                v-for="val in columns"
                :key=val.value
                :label=val.label
                :value=val.value>
                </el-option>
              </el-select>
              <el-select v-model="input.cStatus" placeholder="请选择状态"  class="input">
                <el-option
                v-for="val in statusList"
                :key=val.value
                :label=val.label
                :value=val.value>
                </el-option>
              </el-select>
              <el-input v-model="input.inviteCode" placeholder="请输入邀请码" class="input"></el-input>
            <el-button  type='primary' class="btn" @click="getList({page:1})">查询</el-button>
      </div>
      <el-table
      :data="tableData"
      style="width: 100%">
        <el-table-column
          v-for="(val,key) in tableTitles"
          :key =key 
          :prop=val.value
          :label=val.label
           align="center"
          :show-overflow-tooltip=val.tips
          :min-width=val.width
          >
        </el-table-column>
      </el-table>
      <!--分页-->   
        <pagination
        v-if="total>listQuery.limit"
        class="page"
        :total="total"
        style="margin-bottom:120Px"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList" />
    </div>
</template>

<script>
import fingerprint2 from 'fingerprintjs2'
import pagination from '../../components/pagination'
import {prob_table} from '../../config/api' 

export default {
    data(){
        return{
            tableData:[],
            tableTitles:[
              {
                label:"邀请码",
                value:"inviteCode",
                width:80,
              },
               {
                label:"类型",
                value:"typeVal",
                width:100,
              },
               {
                label:"申请时间",
                value:"createTime",
                width:100
              },
               {
                label:"处理状态",
                value:"status",
              },
               {
                label:"提现金额",
                value:"exMoney",
                width:100
              },
               {
                label:"提现日期",
                value:"exDate",
                width:100
              },
               {
                label:"刷子邀请码",
                value:"brushCode",
                width:100
              },
              {
                label:"徒弟邀请码",
                value:"discipleCode",
                width:100
              },
              {
                label:"关联徒弟时间",
                value:"relationDate",
                width:130
              },
              {
                label:"备注",
                value:"remark",
                 width:200
              },
              {
                label:"处理结果",
                value:"result",
                 width:200
              },
            ],
            listQuery:{
                page:1,
                limit:30
            },//分页基数
            total:0,
            userId:null,
            columns:[
              {
                label:"全部",
                value:0
              },
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
            input:{
              type:0,
              cStatus:0,
            },
            statusList:[
              {
                label:"全部",
                value:0,
              },
              {
                label:'未处理',
                value:1,
              },
              {
                label:'已处理',
                value:2
              },
            ],
        }
    },
    components:{
      pagination
    },
    methods:{
      /**分页获取数据
       * @param {any}  info  分页信息 
       */
        async getList(info){
          this.listQuery.page = info?info.page:this.listQuery.page
          if(!this.input.inviteCode){delete this.input.inviteCode}
          const {data} = await prob_table({
               browserId:this.userId||0,
               page:this.listQuery.page-1,
               sysType:"klyq",
               ...this.input,
           })
           this.total = data.total 
           this.tableData = data.result 
           this.tableData.forEach(val=>{
                 val.typeVal =this.columns.filter(el=>el.value==val.type)[0].label
                 val.status = val.status?"已处理":"未处理"
           })
        },
        /**获取游览器指纹 */
        getBrowserId(){
          fingerprint2.get({canvas:true},data=>{
             this.userId = data[18].value[1].slice(-32)
             console.log("浏览器指纹：",this.userId)
          })
        }
    },
    mounted(){
        this.getBrowserId()
        setTimeout(()=>{
          this.getList()
        },1000)
    }
}
</script>

<style lang="stylus" scoped>
.table 
  padding 20Px
  background rgba(0,0,0,.05)
  height 100vh
  font-size 14Px
  overflow auto
  .choose
   height 40Px
   display flex
   margin-bottom 20Px
   .input
      margin-right 20Px
      width 155Px
</style>