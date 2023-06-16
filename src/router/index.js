import { createRouter, createWebHashHistory } from "vue-router";
// import HelloWorld from '../components/HelloWorld.vue';
// import BigScreen from '../components/screen/BigScreen.vue';
import HomePage from '../components/homepage.vue';
const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      requiresAuth: false, // false表示不需要登录
      },
    component: () => import('../components/login/login.vue'),
  },
  {
    path: '/homepage',
    name: 'homepage',
    redirect: '/performance',
    component: HomePage,
    meta: {
      title: '安全绩效考核',
      requiresAuth: true, // true表示需要登录
    },
    children: [
      {
        path: '/performance',
        name: '安全绩效考核',
        component: () => import('../components/safety/performance/performance.vue'),
      },
      {
        path: '/audit',
        name: '安全审计',
        component: () => import('../components/safety/audit/audit.vue'),
      },
      {
        path: '/plan',
        name: '培训规划及方式',
        component: () => import('../components/trainingmanagement/plan/plan.vue'),
      },
      {
        path: '/course',
        name: '培训课程及内容',
        component: () => import('../components/trainingmanagement/course/course.vue'),
      },
      {
        path: '/examine',
        name: '培训考核',
        component: () => import('../components/trainingmanagement/examine/examine.vue'),
      },
      {
        path: '/score',
        name: '分数查看',
        component: () => import('../components/trainingmanagement/score/score.vue'),
      },
      {
        path: '/resource',
        name: '应急资源',
        component: () => import('../components/emergency/resource/resource.vue'),
      },
      {
        path: '/genericplan',
        name: '应急预案',
        component: () => import('../components/emergency/genericplan/genericplan.vue'),
      },
      {
        path: '/alarm',
        name: '事故告警',
        component: () => import('../components/emergency/handle/alarm/alarm.vue'),
      },
      {
        path: '/message',
        name: '事故信息报送',
        component: () => import('../components/emergency/handle/message/message.vue'),
      },
      {
        path: '/track',
        name: '事故跟踪',
        component: () => import('../components/emergency/handle/track/track.vue'),
      },
      {
        path: '/analysis',
        name: '事故原因分析及整改',
        component: () => import('../components/emergency/handle/analysis/analysis.vue'),
      },
      {
        path: '/drill',
        name: '应急演练',
        component: () => import('../components/emergency/drill/drill.vue'),
      },
      {
        path: '/recoveryplan',
        name: '恢复方案',
        component: () => import('../components/emergency/recoveryplan/recoveryplan.vue'),
      },
      {
        path: '/angerlist',
        name: '已识别的风险清单',
        component: () => import('../components/danger/angerlist/angerlist.vue'),
      },
      {
        path: '/potentialrisk',
        name: '安全隐患',
        component: () => import('../components/danger/potentialrisk/potentialrisk.vue'),
      },
      {
        path: '/incomplete',
        name: '未完成作业票',
        component: () => import('../components/task/incomplete/incomplete.vue'),
      },
      {
        path: '/archived',
        name: '已归档作业票',
        component: () => import('../components/task/archived/archived.vue'),
      },
      {
        path: '/details',
        name: '作业票详情',
        component: () => import('../components/task/details/details.vue'),
      },
      {
        path: '/report',
        name: '作业票统计报表',
        component: () => import('../components/task/report/report.vue'),
      },
      {
        path: '/credential',
        name: '作业人员资质验证查询',
        component: () => import('../components/task/credential/credential.vue'),
      },
    ]
  },
];
const router = createRouter({
  mode:'history',
  history: createWebHashHistory(),
  routes
});
export default router;