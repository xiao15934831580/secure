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
      title: '绩效考核和安全审计',
      requiresAuth: true, // true表示需要登录
    },
    children: [
      {
        path: '/performance',
        name: '安全绩效考核',
        component: () => import('../components/safety/performance/performance.vue'),
        meta: {
          title: '安全绩效考核',}
        },
      {
        path: '/audit',
        name: '安全审计',
        component: () => import('../components/safety/audit/audit.vue'),
        meta: {
          title: '安全审计',
        },
      },
      // {
      //   path: '/plan',
      //   name: '培训规划及方式',
      //   component: () => import('../components/trainingmanagement/plan/plan.vue'),
      //   meta: {
      //     title: '培训规划及方式',
      //   },
      // },
      // {
      //   path: '/course',
      //   name: '培训课程及内容',
      //   component: () => import('../components/trainingmanagement/course/course.vue'),
      //   meta: {
      //     title: '培训课程及内容',
      //   },
      // },
      // {
      //   path: '/examine',
      //   name: '培训考核',
      //   component: () => import('../components/examinemanagement/examine/examine.vue'),
      // },





    ]
  },
  {
    path: '/trainingmanagement',
    name: 'trainingmanagement',
    redirect: '/plan',
    component: HomePage,
    meta: {
      title: '培训管理',
    },
    children: [
      {
        path: '/plan',
        name: '培训规划及方式',
        component: () => import('../components/trainingmanagement/plan/plan.vue'),
        meta: {
          title: '培训规划及方式',
        },
      },
      {
        path: '/course',
        name: '培训课程及内容',
        component: () => import('../components/trainingmanagement/course/course.vue'),
        meta: {
          title: '培训课程及内容',
        },
      },

  ]
  },
  {
    path: '/examinemanagement',
    name: 'examinemanagement',
    redirect: '/examine',
    component: HomePage,
    meta: {
      title: '考试管理',
    },
    children: [
      {
        path: '/examine',
        name: '培训考核',
        component: () => import('../components/examinemanagement/examine/examine.vue'),
        meta: {
          title: '培训考核',
        },
      },
      {
        path: '/examquestion',
        name: '考试题库',
        component: () => import('../components/examinemanagement/examquestion/examquestion.vue'),
        meta: {
          title: '考试题库',
        },
      },
      {
        path: '/examrecord',
        name: '考试记录',
        component: () => import('../components/examinemanagement/examrecord/examrecord.vue'),
        meta: {
          title: '考试记录',
        },
      },
      {
        path: '/score',
        name: '分数查看及排名',
        component: () => import('../components/examinemanagement/score/score.vue'),
        meta: {
          title: '分数查看及排名',
        },
      },
  ]
  },
  {
    path: '/emergency',
    name: 'emergency',
    redirect: '/resource',
    component: HomePage,
    meta: {
      title: '应急管理',
    },
    children: [
      {
        path: '/resource',
        name: '应急资源',
        component: () => import('../components/emergency/resource/resource.vue'),
        meta: {
          title: '应急资源',
        },
      },
      {
        path: '/genericplan',
        name: '应急预案',
        component: () => import('../components/emergency/genericplan/genericplan.vue'),
        meta: {
          title: '应急预案',
        },
      },
      {
        path: '/handle',
        menuName: '应急处理',
        meta: {
          title: '应急处理',
        },
        children: [
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
        ]
      },
      {
        path: '/drill',
        name: '应急演练',
        component: () => import('../components/emergency/drill/drill.vue'),
        meta: {
          title: '应急演练',
        },
      },
      {
        path: '/recoveryplan',
        name: '恢复方案',
        component: () => import('../components/emergency/recoveryplan/recoveryplan.vue'),
        meta: {
          title: '恢复方案',
        },
      },
  ]
  },
  {
    path: '/danger',
    name: '风险分级管控和隐患排查治理',
    redirect: '/angerlist',
    component: HomePage,
    meta: {
      title: '风险分级管控和隐患排查治理',
    },
    children: [
      {
        path: '/angerlist',
        name: '已识别的风险清单',
        component: () => import('../components/danger/angerlist/angerlist.vue'),
        meta: {
          title: '已识别的风险清单',
        },
      },
      {
        path: '/potentialrisk',
        name: '安全隐患',
        component: () => import('../components/danger/potentialrisk/potentialrisk.vue'),
        meta: {
          title: '安全隐患',
        },
      },
  ]
  },
  {
    path: '/task',
    name: '作业许可和作业过程管理',
    redirect: '/workpermit',
    component: HomePage,
    meta: {
      title: '作业许可和作业过程管理',
    },
    children: [
      {
        path: '/workpermit',
        name: '作业许可',
        component: () => import('../components/task/workpermit/workpermit.vue'),
        meta: {
          title: '作业许可',
        },
      },
      {
        path: '/incomplete',
        name: '未完成作业票',
        component: () => import('../components/task/incomplete/incomplete.vue'),
        meta: {
          title: '未完成作业票',
        },
      },
      {
        path: '/archived',
        name: '已归档作业票',
        component: () => import('../components/task/archived/archived.vue'),
        meta: {
          title: '已归档作业票',
        },
      },
      {
        path: '/details',
        name: '作业票详情',
        component: () => import('../components/task/details/details.vue'),
        meta: {
          title: '作业票详情',
        },
      },
      {
        path: '/report',
        name: '作业票统计报表',
        component: () => import('../components/task/report/report.vue'),
        meta: {
          title: '作业票统计报表',
        },
      },
      {
        path: '/credential',
        name: '作业人员资质验证查询',
        component: () => import('../components/task/credential/credential.vue'),
        meta: {
          title: '作业人员资质验证查询',
        },
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