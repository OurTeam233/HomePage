/*封装api，用于发送请求 */

import axios from '../utils/request'
// import http from '../utils/http'
// import api from '@/api/api'

// 用户登录
// export const login = (username, password, userType) => http.post('http://175.178.216.63:8888/CanteenWeb/Login', {username, password, userType})
// export const login = (username, password, userType) => api.postListAPI(username, password, userType)
export const login = (username, password) => axios.post('/home/user/login', {username, password})



// 获取店铺数据
export const getStoreInfo = () => axios.get('/CanteenWeb/Store')



// 更改订单状态
export const changeOrderType = (orderId, type) => axios.post('/CanteenWeb/Order/Update', {orderId, type})







