import http from './request'
/**************************培训规划和方式******************************** */
//删除培训规划
export const deletePlan = (id) => {
    return http({
        url: `/hongyun-training/plan/deletePlan/${id}`,
        method: 'DELETE',
    })
}
//获取培训列表数据
export const getPlanList = (data) => {
    return http({
        url: '/hongyun-training/plan/getPlanList',
        method: 'POST',
        data
    })
}
//新增/修改培训 规划
export const operatePlan = (data) => {
    return http({
        url: '/hongyun-training/plan/operatePlan',
        method: 'POST',
        data
    })
}
//获取所有培训主题下拉菜单
export const getPlans = () => {
    return http({
        url: '/hongyun-training/plan/getPlans',
        method: 'GET',
    })
}
/**************************培训课程******************************** */
// 课程列表数据获取
export const findCourse = (data) => {
    return http({
        url: '/hongyun-training/course/findCourse',
        method: 'POST',
        data
    })
}
// 删除培训课程
export const deleteCourse = (id) => {
    return http({
        url: `/hongyun-training/course/deleteCourse/${id}`,
        method: 'DELETE',
    })
}
//新建或者编辑时保存数据
export const operateCourse = (data) => {
    return http({
        url: '/hongyun-training/course/operateCourse',
        method: 'POST',
        data
    })
}
//文件上传后获取对应的url
export const uploadCourse = (data) => {
    return http({
        url: '/hongyun-training/course/uploadCourse',
        headers: {'Content-Type': 'multipart/form-data'},
        method: 'POST',
        data
    })
}