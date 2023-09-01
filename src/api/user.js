import http from './request'
export const login = (data) => {
    return http({
        url: '/hongyun-user/admin/login',
        method: 'POST',
        data
    })
}
export const loginOut = (userName) => {
    return http({
        url: '/hongyun-user/admin/exitUser?userName='+userName,
        method: 'GET',
    })
}
/**
 * 重置密码
 */
 export const resetPasswords = (data) => {
    return http({
        url: '/hongyun-user/admin/resetPasswords',
        method: 'POST',
        data
    })
}
/**
 * 获取用户信息
 */
 export const getAdminUser = (data) => {
    return http({
        url: '/hongyun-user/admin/getAdminUser',
        method: 'POST',
        data
    })
}
/**
 * 删除用户信息
 */
 export const deleteUser = (id) => {
    return http({
        url: `/hongyun-user/admin/deleteUser/${id}`,
        method: 'DELETE',
    })
}
/**
 * 新建或者编辑用户
 */
 export const operateAdminUser = (data) => {
    return http({
        url: '/hongyun-user/admin/operateAdminUser',
        method: 'POST',
        data
    })
}
/**
 * 查看个人信息
 */
 export const findMyInformation = (userName) => {
    return http({
        url: '/hongyun-user/admin/findMyInformation?userName='+userName,
        method: 'GET',
    })
}
/*******************************************角色管理**************************************************** */
/**
 * 获取所有菜单列表
 */
 export const getMenuList = () => {
    return http({
        url: '/hongyun-user/role/getMenuList',
        method: 'GET',
    })
}
/**
 * 获取角色列表
 */
 export const getRoleAuthorityList = (data) => {
    return http({
        url: '/hongyun-user/role/getRoleAuthorityList',
        method: 'POST',
        data
    })
}
/**
 * 保存角色信息
 */
 export const operateRole = (data) => {
    return http({
        url: '/hongyun-user/role/operateRole',
        method: 'POST',
        data
    })
}
/**
 * 删除角色信息
 */
 export const deleteRole = (id) => {
    return http({
        url: `/hongyun-user/role/deleteRole/${id}`,
        method: 'DELETE',
    })
}

/***********************************数据字典*************************************** */
//删除数据字典
export const deleteDataDictionary = (id) => {
    return http({
        url: `/hongyun-training/workSystem/deleteDataDictionary/${id}`,
        method: 'DELETE',
    })
}
//添加数据字典
export const operateDataDictionary = (data) => {
    return http({
        url: '/hongyun-training/workSystem/operateDataDictionary',
        method: 'POST',
        data
    })
}
//获取数据字典列表数据
export const getDataDictionaryParent = (data) => {
    return http({
        url: '/hongyun-training/workSystem/getDataDictionaryParent',
        method: 'POST',
        data
    })
}
/*******************************************成员和部门************************************************** */
//获取所有的部门树结构
export const getCompany = () => {
    return http({
        url: '/hongyun-user/company/getCompany',
        method: 'GET',
    })
}
//编辑部门名称
export const operateCompany = (data) => {
    return http({
        url: '/hongyun-user/company/operateCompany',
        method: 'POST',
        data
    })
}
//上移
export const operateCompanyOrder = (id) => {
    return http({
        url: '/hongyun-user/company/operateCompanyOrder?id='+id,
        method: 'GET',
    })
}
//删除
export const deleteCompany = (id) => {
    return http({
        url: `/hongyun-user/company/deleteCompany/${id}`,
        method: 'DELETE',
    })
}
//获取部门人数
export const companyPeopleNum = () => {
    return http({
        url: '/hongyun-user/company/companyPeopleNum',
        method: 'GET',
    })
}
//部門下人員列表
export const getUsersByCompanyId = (data) => {
    return http({
        url: '/hongyun-user/company/getUsersByCompanyId',
        method: 'POST',
        data
    })
}
//新增部门提交
// export const operateCompany = (data) => {
//     return http({
//         url: '/hongyun-user/company/operateCompany',
//         method: 'POST',
//         data
//     })
// }
//设置主管
export const setPrincipalUserId = (companyId,userId) => {
    return http({
        url: '/hongyun-user/company/setPrincipalUserId?companyId='+companyId+'&userId='+userId,
        method: 'GET',
    })
}
//查看所有人员列表
export const getUserList = (companyId) => {
    return http({
        url: '/hongyun-user/user/getUserList?companyId='+companyId,
        method: 'GET',
    })
}
//获取角色列表
export const getRoleList = () => {
    return http({
        url: '/hongyun-user/role/getRoleList',
        method: 'GET',
    })
}
//获取所有的部门
export const getCompanyList = () => {
    return http({
        url: '/hongyun-user/company/getCompanyList',
        method: 'GET',
    })
}
//管理员重置密码
export const adminResetPasswords = (id) => {
    return http({
        url: '/hongyun-user/admin/adminResetPasswords?id='+id,
        method: 'GET',
    })
}
/*************************************成员与证书************************************************ */
export const certificateList = (data) => {
    return http({
        url: '/hongyun-training/certificate/certificateList',
        method: 'POST',
        data
    })
}