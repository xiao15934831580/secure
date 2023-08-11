
<template>
    <div  class="totalStyle hotwork">
        <div class="tablestyle">
            <div class="titleStyle">
                <p class="leftTitle dis_center">
                    <el-icon  class="callback" :size = '20' @click="callback"><Back /></el-icon>
                    <span class="callback ml-16" @click="callback">返回</span>
                    <span class="split"></span>
                    <span>查看</span>
                    
                    </p>
                    <el-button type="" @click="pdfFunc">下载</el-button>
            </div>
            <div class="bottomBox bg_color">
                <div class="test_paper">
                        <div class="basicstyle itemStyle" id="pdfDom">
                            <p class="headStyle">动火安全作业票</p>
                            <p class="company between mt-16 tableColor"><span class="danwei">单位：{{滨州港}}</span><span class="bianhao">作业票编号：{{1111}}</span></p>
                             <div class="zuoyepiao mt-16 border_b">
                                 <el-row class="tableColor ">
                                     <el-col :span="6" class="border_l_b font-14">作业申请单位</el-col>
                                     <el-col :span="6" class="border_l_b font-14">{{dialogData.formData.applyCompanyName}}</el-col>
                                     <el-col :span="6" class="border_l_b font-14">作业申请时间</el-col>
                                     <el-col :span="6" class="border_l_b font-14">{{dialogData.formData.beginAndEndTime}}</el-col>
                                 </el-row>
                                 <el-row class="tableColor ">
                                     <el-col :span="6" class="border_l_b font-14">动火地点</el-col>
                                     <el-col :span="6" class="border_l_b font-14">{{dialogData.formData.place}}</el-col>
                                     <el-col :span="6" class="border_l_b font-14">动火部位</el-col>
                                     <el-col :span="6" class="border_l_b font-14">{{dialogData.formData.part}}</el-col>
                                 </el-row>
                                 <el-row class="tableColor ">
                                     <el-col :span="6" class="border_l_b font-14">作业内容</el-col>
                                     <el-col :span="18" class="border_l_b font-14">{{dialogData.formData.content}}</el-col>
                                 </el-row> 
                                 <el-row class="tableColor ">
                                     <el-col :span="6" class="border_l_b font-14">动火作业级别</el-col>
                                     <el-col :span="6" class="border_l_b font-14">{{dialogData.formData.level}}</el-col>
                                     <el-col :span="6" class="border_l_b font-14">动火方式</el-col>
                                     <el-col :span="6" class="border_l_b font-14">{{dialogData.formData.methods}}</el-col>
                                 </el-row>
                                 <el-row class="tableColor ">
                                     <el-col :span="6" class="border_l_b font-14">申请单位监护人</el-col>
                                     <el-col :span="18" class="border_l_b font-14">{{dialogData.formData.guardianUsers}}</el-col>
                                 </el-row> 
                                 <el-row class="tableColor ">
                                     <el-col :span="6" class="border_l_b font-14">作业单位监护人</el-col>
                                     <el-col :span="18" class="border_l_b font-14">{{dialogData.formData.guardianUsers}}</el-col>
                                 </el-row> 
                                 <el-row class="tableColor " v-for="item in dialogData.formData.option1" :key="item.number">
                                     <el-col :span="6" class="border_l_b font-14">动火人及证书编号</el-col>
                                     <el-col :span="18" class="border_l_b font-14">{{item.name}}(&nbsp;证书编号：{{item.number}})</el-col>
                                 </el-row> 
                                <el-row class="tableColor ">
                                     <el-col :span="6" class="border_l_b font-14">作业单位</el-col>
                                     <el-col :span="6" class="border_l_b font-14">{{dialogData.formData.companyName}}</el-col>
                                     <el-col :span="6" class="border_l_b font-14">作业单位负责人</el-col>
                                     <el-col :span="6" class="border_l_b font-14">{{dialogData.formData.compony}}</el-col>
                                 </el-row>
                                 <el-row class="tableColor ">
                                     <el-col :span="6" class="border_l_b font-14">动火部位照片</el-col>
                                     <el-col :span="18" class="border_l_b font-14">{{dialogData.formData.compony}}</el-col>
                                 </el-row>
                                 <el-row class="tableColor ">
                                     <el-col :span="6" class="border_l_b font-14">相关附件</el-col>
                                     <el-col :span="18" class="border_l_b font-14">
                                        <p v-for="(item,index) in dialogData.formData.attachments" :key="index">{{item.name}}</p>
                                     </el-col>
                                 </el-row>
                                <table style="border-collapse: collapse;" frame=lhs border="1" width="100%" bordercolor="#797F89">
                                    <tr>
                                        <th>序号</th>
                                        <th>气体取样时间</th>
                                        <th>取样位置</th>
                                        <th>距离动火点</th>
                                        <th>代表性气体</th>
                                        <th>分析人</th>
                                    </tr>
                                    <tr v-for="(item,index) in dialogData.formData.gases" :key="index">
                                        <td>{{index+1}}</td>
                                        <td>{{item.samplingTime}}</td>
                                        <td>{{item.place}}</td>
                                        <td>{{item.distance}}</td>
                                        <td>{{item.gasStr}}</td>
                                        <td>{{item.fenxiren}}</td>
                                    </tr>
                                </table>
                                <el-row class="tableColor ">
                                     <el-col :span="6" class="border_l_b border_t font-14">关联作业票</el-col>
                                     <el-col :span="18" class="border_l_b border_t font-14">{{dialogData.formData.relationWorkNos}}</el-col>
                                 </el-row>
                                 <el-row class="tableColor ">
                                     <el-col :span="6" class="border_l_b  font-14">风险辨识结果</el-col>
                                     <el-col :span="18" class="border_l_b  font-14">{{dialogData.formData.riskResult}}</el-col>
                                 </el-row>       
                                 <el-row class="tableColor ">
                                     <el-col :span="6" class="border_l_b  font-14">动火作业实施时间</el-col>
                                     <el-col :span="18" class="border_l_b  font-14">{{dialogData.formData.beginAndEndTime}}</el-col>
                                 </el-row> 
                                 <table style="border-collapse: collapse;" frame=lhs border="1" width="100%" bordercolor="#797F89">
                                    <tr>
                                        <th width="8%">序号</th>
                                        <th width="30%">安全措施内容</th>
                                        <th width="10%">是否涉及</th>
                                        <th width="10%">确认人</th>
                                        <th width="42%">确认照片</th>
                                    </tr>
                                    <tr v-for="(item,index) in dialogData.formData.verifySafety" :key="index">
                                        <td>{{index+1}}</td>
                                        <td>{{item.configValue}}</td>
                                        <td>{{item.involve}}</td>
                                        <td>{{item.sign}}</td>
                                        <td>{{item.imageUrls}}</td>
                                    </tr>
                                </table>  
                                <el-row class="tableColor ">
                                     <el-col :span="6" class="border_l_b border_t font-14">申请单位监护人</el-col>
                                     <el-col :span="6" class="border_l_b border_t font-14">{{dialogData.formData.workCompany}}</el-col>
                                     <el-col :span="6" class="border_l_b border_t font-14">作业单位监护人</el-col>
                                     <el-col :span="6" class="border_l_b border_t font-14">{{dialogData.formData.compony}}</el-col>
                                 </el-row>  
                                <el-row class="tableColor ">
                                     <el-col :span="6" class="border_l_b  font-14">安全交底信息附件</el-col>
                                     <el-col :span="18" class="border_l_b  font-14">{{dialogData.formData.compony}}</el-col>
                                 </el-row>   
                                <el-row class="tableColor ">
                                     <el-col :span="6" class="border_l_b  font-14">安全交底人</el-col>
                                     <el-col :span="6" class="border_l_b  font-14">{{dialogData.formData.compony}}</el-col>
                                     <el-col :span="6" class="border_l_b  font-14">接收交底人</el-col>
                                     <el-col :span="6" class="border_l_b  font-14">{{dialogData.formData.compony}}</el-col>
                                 </el-row>          
                                <div class="ideal">
                                       <p class="ideal_person">作业人意见</p> 
                                       <div class="between ideal_content">
                                           <span>{{dialogData.formData.compony}}</span>
                                           <span>签字：{{dialogData.formData.compony}}</span>
                                           <span>{{dialogData.formData.compony}}</span>
                                       </div>
                                </div>     
                                <div class="ideal">
                                       <p class="ideal_person">作业单位意见</p> 
                                       <div class="between ideal_content">
                                           <span>{{dialogData.formData.compony}}</span>
                                           <span>签字：{{dialogData.formData.compony}}</span>
                                           <span>{{dialogData.formData.compony}}</span>
                                       </div>
                                </div>  
                                <div class="ideal">
                                       <p class="ideal_person">安全管理部门意见</p> 
                                       <div class="between ideal_content">
                                           <span>{{dialogData.formData.compony}}</span>
                                           <span>签字：{{dialogData.formData.compony}}</span>
                                           <span>{{dialogData.formData.compony}}</span>
                                       </div>
                                </div>        
                                 <div class="ideal">
                                       <p class="ideal_person">动火审批人意见</p> 
                                       <div class="between ideal_content">
                                           <span>{{dialogData.formData.compony}}</span>
                                           <span>签字：{{dialogData.formData.compony}}</span>
                                           <span>{{dialogData.formData.compony}}</span>
                                       </div>
                                </div>       
                                 <div class="ideal">
                                       <p class="ideal_person">动火前,岗位当班班长验票情况</p> 
                                       <div class="between ideal_content">
                                           <span>{{dialogData.formData.compony}}</span>
                                           <span>签字：{{dialogData.formData.compony}}</span>
                                           <span>{{dialogData.formData.compony}}</span>
                                       </div>
                                </div>          
                                 <div class="ideal">
                                       <p class="ideal_person">完成验收签字</p> 
                                       <div class="between ideal_content">
                                           <span>{{dialogData.formData.compony}}</span>
                                           <span>签字：{{dialogData.formData.compony}}</span>
                                           <span>{{dialogData.formData.compony}}</span>
                                       </div>
                                </div>                                                                                                        
                                <el-row class="tableColor ">
                                     <el-col :span="6" class="border_l_b  font-14">验收照片</el-col>
                                     <el-col :span="18" class="border_l_b  font-14">{{dialogData.formData.compony}}</el-col>
                                 </el-row>
                                 <p class="titleCenter mt-16">作业中环境分析</p>  
                                <table style="border-collapse: collapse;" frame=lhs border="1" width="100%" bordercolor="#797F89">
                                    <tr>
                                        <th>序号</th>
                                        <th>气体取样时间</th>
                                        <th>取样位置</th>
                                        <th>距离动火点</th>
                                        <th>代表性气体</th>
                                        <th>分析人</th>
                                    </tr>
                                    <tr v-for="(item,index) in dialogData.formData.tableData" :key="index">
                                        <td>{{index+1}}</td>
                                        <td>{{item.date}}</td>
                                        <td>{{item.place}}</td>
                                        <td>{{item.juli}}</td>
                                        <td>{{item.qiti}}</td>
                                        <td>{{item.fenxiren}}</td>
                                    </tr>
                                </table>
                                <p class="titleCenter">作业中人员状态</p>  
                                <table style="border-collapse: collapse;" frame=lhs border="1" width="100%" bordercolor="#797F89">
                                    <tr>
                                        <th>序号</th>
                                        <th>现场描述</th>
                                        <th>现场照片</th>
                                        <th>提交人</th>
                                        <th>提交时间</th>
                                    </tr>
                                    <tr v-for="(item,index) in dialogData.formData.tableData" :key="index">
                                        <td>{{index+1}}</td>
                                        <td>{{item.date}}</td>
                                        <td>{{item.place}}</td>
                                        <td>{{item.juli}}</td>
                                        <td>{{item.qiti}}</td>
                                    </tr>
                                </table>
                                <p class="titleCenter">作业中预警</p>  
                                <table style="border-collapse: collapse;" frame=lhs border="1" width="100%" bordercolor="#797F89">
                                    <tr>
                                        <th>序号</th>
                                        <th>预警分类</th>
                                        <th>预警内容</th>
                                        <th>预警时间</th>
                                    </tr>
                                    <tr v-for="(item,index) in dialogData.formData.tableData" :key="index">
                                        <td>{{index+1}}</td>
                                        <td>{{item.date}}</td>
                                        <td>{{item.place}}</td>
                                        <td>{{item.juli}}</td>
                                    </tr>
                                </table>
                                <p class="titleCenter border_t_none">作业中工属具</p>  
                                <table style="border-collapse: collapse;" frame=lhs border="1" width="100%" bordercolor="#797F89">
                                    <tr>
                                        <th width="10%">阶段</th>
                                        <th width="30%">描述</th>
                                        <th width="40%">照片</th>
                                        <th width="10%">提交人</th>
                                        <th width="10%">提交时间</th>
                                    </tr>
                                    <tr v-for="(item,index) in dialogData.formData.tableData" :key="index">
                                        <td>{{index+1}}</td>
                                        <td>{{item.date}}</td>
                                        <td>{{item.place}}</td>
                                        <td>{{item.juli}}</td>
                                        <td>{{item.qiti}}</td>
                                    </tr>
                                </table>          

                             </div>   
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script  setup>
import { defineProps, ref,defineEmits } from "vue";
import { reactive, watch,onBeforeMount } from "vue";
import {getWorkCloseInfo as getWorkCloseInfo} from "@/api/train.js"
import { ElMessage, ElMessageBox,ElNotification } from "element-plus";
import { useRouter } from 'vue-router';
import { Plus } from '@element-plus/icons-vue'
import htmlToPdf from '@/utils/htmlToPdf';
const router = useRouter();
const esign = ref('')
const addform = ref('');
const canvasContent = ref('')
let props = defineProps({
  hotWorkId: {
    type: Number,
  },
}); 
const emit = defineEmits(['callback'])
const dialogData = reactive({
    approveData: {
        dialogFormVisible:false,
        formLabelWidth:'50%',
        approveState:1,
        rules:{
            opinion:[{ required: true, message: "请输入意见", trigger: "blur" }],
        },
        approveformData:{
            opinion:'意见',
            canvasData:{
                clientHeight:'',
                clientWidth:'',
                lineWidth: 6,
                lineColor: '#000000',
                bgColor: '',
                resultImg: '',
                isCrop: false,
                image:''
            }
        }
    },
    dropdown:{
        headline:[],
        courseName:[],
        examineType:[{
                label: '日考',
                value: 0
              },{
                label: '周考',
                value: 1
              },{
                label: '月考',
                value: 2
              },{
                label: '年考',
                value: 3
              }]
    },
    rules:{
        opinion:[{ required: true, message: "请输入意见", trigger: "bulr" }],
    },
    props:{
        hotWorkId:'',
    },
    formData:{
        compony:'部门',
        planId:'',
        courseId:'11111111111',
        courseName:'',
        headline:'',
        examineType:'',
        examineDuration:'',
        examineBeginTime:'',
        examineEndTime:'',
        aloneOptionNum:0,
        moreOptionsNum:0,
        judgeNum:0,
        totalNum:0,
        averageScore:0,
        evaluation:'',
        totalscore:0,
        aloneOptionCount:0,
        moreOptionsCount:0,
        judgeCount:0,
        optionsValue:['true'],
        activities:[ {
            content: 'Custom icon',
            timestamp: '2018-04-12 20:46',
            size: 'large',
            type: 'primary',
            personType:'提交人',
            name:'小吴',
            remind:'同意',
            required:'小吴'
        },
        {
            content: 'Custom color',
            timestamp: '2018-04-03 20:46',
            color: '#0bbd87',
            personType:'提交人',
            name:'小吴',
            remind:'同意',
            required:'小吴'
        },
        {
            content: 'Custom size',
            timestamp: '2018-04-03 20:46',
            size: 'large',
            personType:'提交人',
            name:'小吴',
            remind:'同意',
            required:'小吴'
        },
        {
            content: 'Custom hollow',
            timestamp: '2018-04-03 20:46',
            type: 'primary',
            hollow: true,
            personType:'提交人',
            name:'小吴',
            remind:'同意',
            required:'小吴'
        },
        {
            content: 'Default node',
            timestamp: '2018-04-03 20:46',
            personType:'提交人',
            name:'小吴',
            remind:'同意',
            required:'小吴'
        },],
        option1:[{
            name:'王先生',
            number: '111'
        }],
        tableData: [
        {
            date: '2016-05-03',
            place: '取样位置',
            juli:'5m',
            qiti: 'No. 189, Grove St, Los Angeles',
            fenxiren:'王刚'
        },
        {
            date: '2016-05-03',
            place: '取样位置',
            juli:'5m',
            qiti: 'No. 189, Grove St, Los Angeles',
            fenxiren:'王刚'
        },
        {
            date: '2016-05-03',
            place: '取样位置',
            juli:'5m',
            qiti: 'No. 189, Grove St, Los Angeles',
            fenxiren:'王刚'
        },
        ],
        options:[{
          key: '动火设备内部构件清洗干净，烟气吹扫或者水洗，置换合格，达到动火条件',
          value:true
        },{
          key: '选择作业票2',
          value:true
        },{
          key: '选择作业票2',
          value:false
        }],
        fileList:[{
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        },{
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        },{
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        },]
    }
})


onBeforeMount(()=>{
    // let user = JSON.parse(localStorage.getItem('userData'))
    getWorkCloseInfo(dialogData.props.hotWorkId).then((res)=>{
        if(res.code ===200){
            console.log(res)
            dialogData.formData = res.body;
            console.log(dialogData.formData)
        }else{
            ElNotification({
                title: 'Warning',
                message: res.message?res.message:'服务器异常',
                type: 'warning',
              })
               if(res.message.indexOf('token已过期')>-1  ){
                    store.dispatch('app/logout')
                }
        }
    })

})
watch(
    () => props,
    () => {
        dialogData.props.hotWorkId = props.hotWorkId
        // dialogData.hotworkContent = props.hotworkContent
        // getQusetion(dialogData.hotworkContent.examineId)
  },
  { deep: true, immediate: true }
);
const handleClick = (tab, event) => {
  console.log(tab, event)
}
//文件预览
const checkUrl = (url) => {
        window.open(url)
}
//返回上一级
const callback = () => {
    emit('callback') 
}
const pdfFunc =()=>{
    htmlToPdf.getPdf('动火安全作业票');
     // 定时器模拟按钮loading动画的时间
      setTimeout(() => {
        ElMessage.success('下载成功!');
      }, 200);
}
</script>
<style lang = 'less' scoped>
.hotwork{
    :deep(.el-textarea){
        width: 600px;
    }
    :deep(.el-form--inline .el-form-item){
        width: 100%;
    }
    :deep(.el-form-item--default .el-form-item__content){
        width: calc(100% - 160px);
    }
    :deep(.el-select){
        width: 100%;
    }
    :deep(.el-input){
        width: 100%;
    }
    :deep(.upload-demo){
        width: 100%;
    }
    :deep(.el-dialog__body){
        border-top: 1px solid #DADFE6;
    }
    .bg_color{
    background-color: #EDF0F5;
    }
    .bottomBox{
        height: 100%;
        overflow-y: auto;
    }
    .test_paper{
        width: 60%;
        margin: 0 auto;
        font-weight: 600;
        .formStyle{
            width: 100%;
        }
    }
    .totalStyle{
        height: 100%;
        font-size: 14px;
    }

    .callback{
        cursor: pointer;
    }
    .itemStyle{
        background-color: #ffffff;
        padding: 64px;
        .headStyle{
            text-align: center;
            font-size: 32px;
            color: #000000;
        }
        .company{
            font-size: 14px;
        }
        .zuoyepiao{
            border-top: 1px solid #797F89;
            border-right: 1px solid #797F89;
        }
        .border_l_b{
            border-left: 1px solid #797F89;
            border-bottom: 1px solid #797F89;
            line-height: 36px;
            padding-left: 12px;
        }
        .border_t{
            border-top:1px solid #797F89;
        }
    }
    .addOptions{
    margin-left: 160px;
    margin-bottom: 16px;
    .leftTitle{
        display: flex;
        align-content: center;
    }
}
.footerStyle{
    line-height: 76px;
    display: flex;
    line-height: 76px;
    align-items: center;
    justify-content: center;
    height: 76px;
}
.split{
    width: 1px;
    height: 20px;
    background-color: #DADFE6;
    margin: 0 16px;
}
.timeline_title{
    color: #797F89;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
}
.timeline_content{
    color: #1C222C;
    font-size: 14px;
}
.padding-60{
    padding: 0px 60px;
}

.btn-box {
    display: flex;
    justify-content: space-around;
    font-size: 28px;
}
.approveState{
    background-color: rgba(169, 175, 185, 0.20);
    border: 1px solid rgba(169, 175, 185, 1);
    border-radius: 4px;
    color: rgba(169, 175, 185, 1);
    line-height: 44px;
    padding: 0 16px;
}
.unapproveState{
        background-color: rgba(244, 107, 90, 0.20);
        border: 1px solid rgba(244, 107, 90, 1);
        border-radius: 4px;
        color: rgba(244, 107, 90, 1);
        line-height: 44px;
        padding: 0 16px;
}
.approveStated{
        background-color: rgba(84, 184, 49, 0.20);
        border: 1px solid rgba(84, 184, 49, 1);
        border-radius: 4px;
        color: rgba(84, 184, 49, 1);
        line-height: 44px;
        padding: 0 16px;
}
.backState{
        background-color: rgba(255, 148, 88, 0.20);
        border: 1px solid rgba(255, 148, 88, 1);
        border-radius: 4px;
        color: rgba(255, 148, 88, 1);
        line-height: 44px;
        padding: 0 16px;
}
.approveIng{
        background-color: rgba(46, 131, 252, 0.20);
        border: 1px solid rgba(46, 131, 252, 1);
        border-radius: 4px;
        color: rgba(46, 131, 252, 1);
        line-height: 44px;
        padding: 0 16px;
}
}
table{
    font-size: 14px;
    color: #1C222C;
    text-align: left;
    th{
        line-height: 36px;
        padding-left: 12px;
    }
    td{
         line-height: 36px;
        padding-left: 12px;       
    }
}
.ideal{
    padding: 8px 12px;
    border-left: 1px solid #797F89;
    border-bottom: 1px solid #797F89;
    .ideal_person{
        color: #1C222C;
        font-size: 14px;

    }
    .ideal_content{
        padding-left: 160px;
        margin-top: 24px;
    }
}
.titleCenter{
    line-height: 36px;
    border:1px solid #797F89;
    text-align: center;
    
}

</style>