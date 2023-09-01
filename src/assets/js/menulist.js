const menulist = [
    // 绩效考核和安全审计
    {
        menuName: '绩效考核和安全审计',
        path: 'safety',
        children: [
            {
                path: 'audit',
                menuName: '安全审计',
            },
            {
                path: 'performance',
                menuName: '安全绩效考核',
            },
        ]
    },
    // 培训管理
    {
        path: 'trainingmanagement',
        menuName: '培训管理',
        children: [
            {
                path: 'plan',
                menuName: '培训规划及方式',
            },
            {
                path: 'course',
                menuName: '培训课程及内容',
            }, 
        ]
    },
    //考试管理
    {
        path: 'examinemanagement',
        menuName: '考试管理',
        children: [
            {
                path: 'examine',
                menuName: '培训考核',
            },
            {
                path: 'examquestion',
                menuName: '考试题库',
            },
            {
                path: 'examrecord',
                menuName: '考试记录',
            },
            {
                path: 'score',
                menuName: '分数查看及排名',
            },
        ]
    },
    // 应急管理
    {
        path: 'emergency',
        menuName: '应急管理',
        children: [
            {
                path: 'resource',
                menuName: '应急资源',
            },
            {
                path: 'genericplan',
                menuName: '应急预案',
            },
            {
                path: 'handle',
                menuName: '应急处理',
                children: [
                    {
                        path: 'alarm',
                        menuName: '事故告警',
                    },
                    {
                        path: 'message',
                        menuName: '事故信息报送',
                    },
                    {
                        path: 'track',
                        menuName: '事故跟踪',
                    },
                    {
                        path: 'analysis',
                        menuName: '事故原因分析及整改',
                    },
                ]
            },
            {
                path: 'drill',
                menuName: '应急演练',
            },
            {
                path: 'recoveryplan',
                menuName: '恢复方案',
            },

        ]
    },
    // 风险分级管控和隐患排查治理
    {
        path: 'danger',
        menuName: '风险分级管控和隐患排查治理',
        children: [
            {
                path: 'angerlist',
                menuName: '已识别的风险清单'
            },
            {
                path: 'potentialrisk',
                menuName: '安全隐患'
            },
        ]
    },
    //作业许可和作业过程管理
    {
        path: 'task',
        menuName: '作业许可和作业过程管理',
        children: [
            {
                path: 'workpermit',
                menuName: '作业许可'
            },
            {
                path: 'incomplete',
                menuName: '作业过程'
            },
            {
                path: 'archived',
                menuName: '已归档作业票'
            },
            {
                path: 'report',
                menuName: '作业票统计'
            },
            {
                path:'configuration',
                menuName:'配置信息'
            },
        ]
    },
        // 系统管理
    {
            path: 'system',
            menuName: '系统管理',
            children: [

                {
                    path:'datadictionary',
                    menuName:'数据字典',
                },

                {
                    path: 'role',
                    menuName: '角色管理',
                },
                {
                    path: 'user',
                    menuName: '成员和部门',
                },
                {
                    path: 'usercertificate',
                    menuName: '成员证书',
                },
                {
                    path: 'approval',
                    menuName: '审批流程',
                },
            ]
    },

]
export default menulist;