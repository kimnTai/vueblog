import axios from 'axios'
import {ElMessage} from 'element-plus'
import router from './router'
import store from './store'


axios.defaults.baseURL = "http://localhost:8081"

// 前置攔截
axios.interceptors.request.use(config => {
    console.log("前置攔截")
    // 可以统一設置請求頭
    console.log(config)
    return config
})

axios.interceptors.response.use(
    response => {
        let res = response.data;
        console.log("後置攔截")
        // 當结果的code是否為200的情况
        if (res.code === 200) {
            ElMessage({
                showClose: true,
                message: response.data.msg,
                type: 'success'
            });
            return response
        } else {
            ElMessage({
                showClose: true,
                message: response.data.msg,
                type: 'error'
            });
            // 直接拒绝往下面返回结果信息
            return Promise.reject(response.data.msg)
        }


    },
    error => {
        console.log('err' + error)// for debug
        if (error.response.data) {
            error.message = error.response.data.msg
        }
        // 根據請求狀態覺得是否登入或者提示其他
        if (error.response.status === 401) {
            store.commit('REMOVE_INFO');
            router.push("/login")
            error.message = '請重新登入';
        }
        if (error.response.status === 403) {
            error.message = '權限不足，無法訪問';
        }
        ElMessage({
            showClose: true,
            message: error.message,
            type: 'error'
        });
        return Promise.reject(error)
    }
)