(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9181179e"],{"84f1":function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{ref:"Sub",staticClass:"Sub"},[a("div",{staticClass:"Sub_container"},[a("van-nav-bar",{attrs:{title:"用户反馈"}}),a("van-tabs",{model:{value:e.active,callback:function(t){e.active=t},expression:"active"}},[a("van-tab",{attrs:{title:"提交反馈"}},[a("van-form",{on:{submit:e.onSubmit}},[a("van-field",{attrs:{readonly:"",clickable:"",name:"type",value:e.form.type,label:"问题类型",placeholder:"点击选择问题类型",rules:[{required:!0,message:"请选择问题"}]},on:{click:function(t){e.showPicker_type=!0}}}),a("van-field",{attrs:{name:"inviteCode",label:"邀请码",placeholder:"请填写本人邀请码",rules:[{required:!0,validator:function(e){return e.length<20},message:"请填写正确的邀请码"}]},model:{value:e.form.code,callback:function(t){e.$set(e.form,"code",t)},expression:"form.code"}}),2==e.form.typeVal?a("van-field",{attrs:{name:"brushCode",label:"刷子邀请码",placeholder:"请填写邀请码",rules:[{required:!0,message:"请填写邀请码"}]},model:{value:e.form.brushCode,callback:function(t){e.$set(e.form,"brushCode",t)},expression:"form.brushCode"}}):e._e(),3==e.form.typeVal?a("van-field",{attrs:{name:"brushCode",label:"徒弟邀请码",placeholder:"请填写邀请码",rules:[{required:!0,message:"请填写邀请码"}]},model:{value:e.form.childCode,callback:function(t){e.$set(e.form,"childCode",t)},expression:"form.childCode"}}):e._e(),0==e.form.typeVal?a("van-field",{attrs:{name:"exMoney",type:"number",label:"提现金额",placeholder:"金额",rules:[{required:!0,message:"请输入提现金额"}]},model:{value:e.form.money,callback:function(t){e.$set(e.form,"money",t)},expression:"form.money"}}):e._e(),3==e.form.typeVal?a("van-field",{attrs:{readonly:"",clickable:"",name:"relationDate",value:e.form.childTime,label:"关联日期",placeholder:"点击选择日期"},on:{click:function(t){e.showPicker_time=!0}}}):e._e(),0==e.form.typeVal?a("van-field",{attrs:{readonly:"",clickable:"",name:"exDate",value:e.form.time,label:"提现日期",placeholder:"点击选择日期"},on:{click:function(t){e.showPicker_time=!0}}}):e._e(),a("van-field",{attrs:{autosize:"","show-word-limit":"",type:"textarea",name:"remark",label:"备注",maxlength:"300",placeholder:"备注信息"},model:{value:e.form.remarks,callback:function(t){e.$set(e.form,"remarks",t)},expression:"form.remarks"}}),a("div",{staticStyle:{margin:"16px"}},[a("van-button",{attrs:{round:"",block:"",type:"info","native-type":"submit"}},[e._v("\n                    提交反馈\n                    ")])],1)],1)],1),a("van-tab",{attrs:{title:"查询反馈"}},[a("van-field",{attrs:{name:"inviteCode",label:"邀请码",placeholder:"请填写本人邀请码",rules:[{required:!0,validator:function(e){return e.length<20},message:"请填写正确的邀请码"}]},model:{value:e.form.code,callback:function(t){e.$set(e.form,"code",t)},expression:"form.code"}}),a("div",{staticStyle:{margin:"16px"}},[a("van-button",{attrs:{round:"",block:"",type:"info"},on:{click:e.toQuery}},[e._v("\n                        查询反馈\n                    ")])],1)],1)],1),a("div",{staticClass:"copyright"},[e._v("\n            Copyright © 2020 上海易慕网络科技有限公司\n        ")])],1),a("van-popup",{attrs:{position:"bottom"},model:{value:e.showPicker_type,callback:function(t){e.showPicker_type=t},expression:"showPicker_type"}},[a("van-picker",{attrs:{"show-toolbar":"",columns:e.columns_list},on:{confirm:e.onConfirm,cancel:function(t){e.showPicker_type=!1}}})],1),a("van-calendar",{attrs:{"min-date":e.minDate,"default-date":e.defaultDate},on:{confirm:e.onConfirm_time},model:{value:e.showPicker_time,callback:function(t){e.showPicker_time=t},expression:"showPicker_time"}})],1)},n=[],r=(a("419a"),a("e980")),i=a("a3be"),l={data:function(){return{form:{type:"",typeVal:4,code:"",remarks:"",childCode:"",money:"",childTime:"",time:""},columns:["提现不到账","解封账号","账户被刷","师徒无关联","其他问题","口罩问题"],columns_list:["提现不到账","解封账号","账户被刷","师徒无关联","口罩问题","其他问题"],showPicker_type:!1,showPicker_time:!1,minDate:new Date(2019,12,1),maxDate:new Date,defaultDate:new Date,active:0}},methods:{onSubmit:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.type=this.form.typeVal+1,t.sysType="klyq",e.next=4,Object(i["b"])(t);case 4:this.form={typeVal:4,code:"",remarks:""},this.$toast("提交成功！");case 6:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),onConfirm:function(e){this.form={remarks:""},this.form.type=e,this.form.typeVal=this.columns.indexOf(e),this.showPicker_type=!1},onConfirm_time:function(e){this.form.time="".concat(e.getFullYear(),"-").concat(e.getMonth()+1,"-").concat(e.getDate()),this.form.childTime="".concat(e.getFullYear(),"-").concat(e.getMonth()+1,"-").concat(e.getDate()),this.showPicker_time=!1},initHeight:function(){var e=window.document.body.offsetHeight;this.$refs.Sub.style="height:".concat(e,"px")},toQuery:function(){if(!this.form.code)return this.$toast("请填写邀请码");this.$router.push({path:"/problem_query",query:{id:this.form.code}})}},mounted:function(){this.initHeight()}},c=l,s=(a("abb9"),a("623f")),m=Object(s["a"])(c,o,n,!1,null,"44f595ba",null);t["default"]=m.exports},"956a":function(e,t,a){},abb9:function(e,t,a){"use strict";var o=a("956a"),n=a.n(o);n.a}}]);