import Axios from 'axios'
import { Toast } from 'vant';
import qs from 'qs'

// Axios.defaults.baseURL='http://192.168.199.193:8888'
Axios.defaults.baseURL='http://apiv2.higaoyao.com:9527'
// Axios.defaults.baseURL='http://192.168.177.111:7000'


Axios.interceptors.response.use(
    res=>{
       if(res.data['code']!=200){
            let errMsg = res.data['msg']||'系统错误'
            Toast(errMsg)
            throw new Error(errMsg)
       }
       return res.data
    }
)
Axios.interceptors.request.use(
    res=>{
        if(res.method==='get'){
            res.params = res.data
            delete res.data
        }else{
            res.headers.authorization = res.data.token
            delete res.data.token
            res.data = qs.stringify(res.data)
        }
        return res  
    },
)
export default Axios