import Axios from './axios'

/**获取邀请用户列表 */
export const getInviteUserList = data =>Axios({method:'post',url:'/api/v1/activity/getUserInvitationList',data})

/**活动奖励 */
export const getReward = data =>Axios({method:'post',url:'/api/v1/activity/getReward',data})

/**编辑领奖地址 */
export const editAddress = data =>Axios({method:'post',url:'/api/v1/user/address',data})

/**用户商品信息 */
export const getUserGoods = data =>Axios({method:'post',url:'/api/v1/user/getUserGoodsInfo',data})

/**提交反馈 */
export const prob_submit = data => Axios({method:"get",url:'http://xcx.suohabb.com:8891/feedback/addFeedback',data}) 

/**获取问题表格 */
export const prob_table = data => Axios({method:"get",url:'http://xcx.suohabb.com:8891/feedback/feedbackList',data}) 

