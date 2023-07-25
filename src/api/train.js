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
/**************************考试******************************** */
//获取所有的课程
export const getCourses = (data) => {
    return http({
        url: '/hongyun-training/course/getCourses',
        method: 'POST',
        data
    })
}
//获取所有的考试列表
export const findExamineList = (data,username) => {
    return http({
        url: '/hongyun-training/examine/findExamineList',
        headers: {'username' : username},
        method: 'POST',
        data
    })
}
//新增/修改考核
export const operateExamine = (data) => {
    return http({
        url: '/hongyun-training/examine/operateExamine',
        method: 'POST',
        data
    })
}
//获取课程总题数
export const getQuestionNum = (courseId) => {
    return http({
        url: '/hongyun-training/examine/getQuestionNum?courseId='+courseId,
        method: 'GET',
    })
}
//开始考试
export const findExamineGrade = (data,username) => {
    return http({
        url: '/hongyun-training/examine/findExamineGrade',
        method: 'POST',
        headers: {'username' : username},
        data
    })
}
/**************************考试题库******************************** */
export const getQuestionList = (data) => {
    return http({
        url: '/hongyun-training/examine/getQuestionList',
        method: 'POST',
        data
    })
}
//编辑考试题目
export const operateQuestion = (data) => {
    return http({
        url: '/hongyun-training/examine/operateQuestion',
        method: 'POST',
        data
    })
}
//随机选取考题
export const extractQuestions = (examineId) => {
    return http({
        url: '/hongyun-training/examine/extractQuestions?examineId='+examineId,
        method: 'GET',
    })
}
//批量删除
export const deleteQuestions = (data) => {
    return http({
        url: '/hongyun-training/examine/deleteQuestions',
        method: 'DELETE',
        data
    })
}
/**************************分数查看与排名******************************** */
//分数查看
export const ranking = (data,username) => {
    return http({
        url: '/hongyun-training/examine/ranking',
        method: 'POST',
        headers: {'username' : username},
        data
    })
}
//查看考卷
export const getExtract = (examineId,username) => {
    return http({
        url: '/hongyun-training/examine/getExtract?examineId='+examineId,
        headers: {'username' : username},
        method: 'GET',
    })
}
//积分排名
export const getPoints = (data) => {
    return http({
        url: '/hongyun-training/examine/getPoints',
        method: 'POST',
        data
    })
}
/**************************作业许可与作业过程******************************** */
export const getWorkPermitList = (data,username) => {
    return http({
        url: '/hongyun-training/workpermit/getWorkPermitList',
        method: 'POST',
        headers: {'username' : username},
        data
    })
}
export const deleteWorkPermit = (id) => {
    return http({
        url: `/hongyun-training/workpermit/deleteWorkPermit/${id}`,
        method: 'DELETE',
    })
}
export const getWorkPermitInfo = (id,username) => {
    return http({
        url: '/hongyun-training/workpermit/getWorkPermitInfo?id='+id,
        headers: {'username' : username},
        method: 'GET',
    })
}
export const uploadFile = (data) => {
    return http({
        url: '/hongyun-training/workpermit/uploadFile',
        headers: {'Content-Type': 'multipart/form-data'},
        method: 'POST',
        data
    })
}