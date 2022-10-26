/*封装api，用于发送请求 */

import axios from '../utils/request'

export const getFood = (current) => axios.get(`/home/food?current=${current}&size=8`)







