import http from './request'


// 客户基本信息
/**
 * 用户详情
 * @param {*} params 
 * @returns 
 */
export const getAllUserInfo = (id) => {
    return http({
        url: '/User/getUserInfo?userId='+id,
        method: 'GET',
    })
}

/**
 * 获取用户基础信息
 * @param {*} params 
 * @returns 
 */
 export const getAllUserList = (data) => {
    return http({
        url: '/User/getUserList',
        method: 'POST',
        data
    })
}

/**
 * 客户维护与关怀
 * @param {*} data 
 * @returns 
 */
 export const userCare = (data) => {
    return http({
        url: '/User/userCare',
        method: 'POST',
        data
    })
}
//客户电站信息
/**
 * 获取电站列表信息
 * @param {*} data 
 * @returns 
 */
export const getUserPowers = (data) => {
    return http({
        url: '/User/getUserPowers',
        method: 'POST',
        data
    })
}
/**
 * 
 * 获取电站详情
 */
 export const getUserPowerInfo = (id) => {
    return http({
        url: '/User/getUserPowerInfo?powerId='+id,
        method: 'GET',
    })
}


/**
 * 获取日志信息
 */
 export const getLogs = (data) => {
    return http({
        url: '/systemlog/getLogs',
        method: 'POST',
        data
    })
}
