
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
            </div>
            <div class="bottomBox bg_color">
                <div class="test_paper">
                        <div class="basicstyle">
                            <div class="itemStyle">
                                <p class="approveState">待审批,关联工作正在进行中</p>
                                <p class="unapproveState">不通过,您可重建作业许可申请</p>
                                <p class="approveStated">通过,此作业许可单可进入作业过程</p>
                                <p class="backState">已撤销,您可重建作业许可申请</p>
                                <p class="approveIng">审批中,您可电话联系对应审批人,快速完成审批</p>
                            </div>
                            <div class="itemStyle mt-16">
                                <p class="headerMsg">申请信息</p>
                                <div class="formItem">
                                    <p class="titleName">申请信息</p>
                                    <p class="formItemStyle"><span class="labelStyle">作业票编号：</span>{{dialogData.formData.courseId}}</p> 
                                    <p class="formItemStyle"><span class="labelStyle">作业申请单位:</span>{{dialogData.formData.courseId}}</p> 
                                    <p class="formItemStyle"><span class="labelStyle">动火位置:</span>{{dialogData.formData.courseId}}</p> 
                                    <p class="formItemStyle"><span class="labelStyle">动火部位:</span>{{dialogData.formData.courseId}}</p> 
                                    <p class="formItemStyle"><span class="labelStyle">动火作业级别:</span>{{dialogData.formData.courseId}}</p> 
                                    <p class="formItemStyle"><span class="labelStyle">动火方式:</span>{{dialogData.formData.courseId}}</p> 
                                    <p class="formItemStyle"><span class="labelStyle">动火作业实施时间:</span>{{dialogData.formData.courseId}}</p> 
                                    <p class="formItemStyle"><span class="labelStyle">作业内容:</span>{{dialogData.formData.courseId}}</p> 
                                    <p class="formItemStyle"><span class="labelStyle">风险辨识结果:</span>{{dialogData.formData.courseId}}</p> 
                                    <p class="formItemStyle"><span class="labelStyle">是否需要开锁:</span>{{dialogData.formData.courseId}}</p> 
                                    <p class="titleName">关联作业票</p>
                                    <p class="formItemStyle"><span class="labelStyle">关联作业票:</span>{{dialogData.formData.courseId}}</p> 
                                    <p class="titleName">图片/附件</p>
                                    <p class="formItemStyle"><span class="labelStyle">图片:</span>{{dialogData.formData.courseId}}</p> 
                                    <p class="formItemStyle"><span class="labelStyle">附件:</span>{{dialogData.formData.courseId}}</p> 
                                </div>
                            </div>  
                            <div class="itemStyle mt-16">
                                 <el-tabs v-model="dialogData.formData.activeName" class="demo-tabs" @tab-click="handleClick">
                                    <el-tab-pane label="关联信息" name="first">
                                        <div class="formItem">
                                            <p class="titleName">关联作业人</p>
                                            <p class="formItemStyle"><span class="labelStyle">申请单位监护人:</span>{{dialogData.formData.courseId}}</p>
                                            <p class="formItemStyle"><span class="labelStyle">安全交底人:</span>{{dialogData.formData.courseId}}</p>
                                            <p class="formItemStyle"><span class="labelStyle">作业单位:</span>{{dialogData.formData.courseId}}</p>
                                        </div>
                                        
                                    </el-tab-pane>
                                    <el-tab-pane label="相关人员指定" name="second">
                                        <div class="formItem">
                                            <p class="titleName">指定内容</p>
                                            <p class="formItemStyle"><span class="labelStyle">指定动火人:</span>{{dialogData.formData.courseId}}</p>
                                            <p class="formItemStyle"><span class="labelStyle">作业单位监护人:</span>{{dialogData.formData.courseId}}</p>
                                            <p class="formItemStyle"><span class="labelStyle">环境监测人:</span>{{dialogData.formData.courseId}}</p>
                                            <p class="formItemStyle"><span class="labelStyle">提交人:</span>{{dialogData.formData.courseId}}</p>
                                        </div>
                                    </el-tab-pane>
                                    <el-tab-pane label="工属具申请" name="third">
                                        <div class="formItem">
                                            <p class="titleName">工属具1</p>
                                            <p class="formItemStyle"><span class="labelStyle">工属具:</span>{{dialogData.formData.courseId}}</p>
                                            <p class="formItemStyle"><span class="labelStyle">提交人:</span>{{dialogData.formData.courseId}}</p>
                                           
                                        </div>
                                    </el-tab-pane>
                                    <el-tab-pane label="安全指南确认" name="fourth">
                                        <div class="formItem">
                                            <div>
                                                <p class="titleName">安全措施1</p>
                                                <div class="formItemStyle displayFlex">
                                                    <span class="labelStyle mt-5">内容:</span>
                                                    <span class="contentStyle">
                                                        <p v-for="(item,index) in dialogData.formData.options" :key="index">
                                                            <el-checkbox   v-model="item.value">{{
                                                                item.key}}
                                                            </el-checkbox>                       
                                                        </p>
                                                    </span>

                                                </div>
                                                <p class="formItemStyle mt-16"><span class="labelStyle">图片:</span>{{dialogData.formData.courseId}}</p>
                                                <p class="formItemStyle"><span class="labelStyle">确认人:</span>{{dialogData.formData.courseId}}</p>
                                                
                                            </div>
                                            
                                        </div>
                                    </el-tab-pane>
                                    <el-tab-pane label="安全信息交底" name="fivth">
                                        <div class="formItem">
                                            <p class="titleName">安全交底内容</p>
                                            <div class="formItemStyle displayFlex">
                                                    <span class="labelStyle mt-5">内容:</span>
                                                    <span class="contentStyle">
                                                        <p v-for="(item,index) in dialogData.formData.options" :key="index">
                                                            <el-checkbox   v-model="item.value">{{
                                                                item.key}}
                                                            </el-checkbox>                       
                                                        </p>
                                                    </span>
                                                </div>
                                            <p class="formItemStyle"><span class="labelStyle">安全交底人:</span>{{dialogData.formData.courseId}}</p>
                                            <p class="titleName">接受安全交底人确认</p>
                                            <p class="formItemStyle"><span class="labelStyle">接受安全交底人:</span>{{dialogData.formData.courseId}}</p>
                                        </div>    
                                    </el-tab-pane>
                                    <el-tab-pane label="环境监测" name="sixth">
                                         <div class="formItem">
                                             <p class="titleName">取样点</p>
                                             <p class="formItemStyle"><span class="labelStyle">取样位置:</span>{{dialogData.formData.courseId}}</p>
                                             <p class="formItemStyle"><span class="labelStyle">距离动火点:</span>{{dialogData.formData.courseId}}</p>
                                             <p class="formItemStyle"><span class="labelStyle">代表性气体1:</span>{{dialogData.formData.courseId}}</p>
                                             <p class="formItemStyle"><span class="labelStyle">代表性气体1:</span>{{dialogData.formData.courseId}}</p>
                                             <p class="formItemStyle"><span class="labelStyle">提交人:</span>{{dialogData.formData.courseId}}</p>
                                        </div>
                                    </el-tab-pane>
                                </el-tabs>
                            </div>  
                            <div class="itemStyle mt-16">
                                <p class="headerMsg">审批信息</p>
                                 <div class="formItem">
                                     <p class="titleName">审批流程</p>
                                       <el-timeline class="formpadding">
                                            <el-timeline-item
                                            v-for="(activity, index) in dialogData.formData.activities"
                                            :key="index"
                                            >
                                            <!-- {{ activity.content }} -->
                                            <p class="timeline_title"> <span>{{activity.personType}}</span> <span>{{activity.timestamp}}</span></p> 
                                            <p class="timeline_content">{{ activity.name }}</p> 
                                            </el-timeline-item>
                                        </el-timeline>
                                 </div>
                            </div>
                            <div class="itemStyle mt-16 footerStyle">

                                <el-button
                                    size="large"
                                    type="success"
                                    class="btn-mixins dia-suc"
                                    @click="agree()"
                                    > &nbsp;&nbsp;同意 &nbsp;&nbsp;</el-button>
                                <el-button
                                    size="large"
                                    type="primary"
                                    class="btn-mixins dia-suc"
                                    @click="revoke()"
                                    > &nbsp;&nbsp;撤销 &nbsp;&nbsp;</el-button>    
                                <el-button
                                    size="large"
                                    class="btn-mixins-clear-default"
                                    @click="close"
                                    >&nbsp;&nbsp; 拒绝 &nbsp;&nbsp;</el-button
                                >
                            </div>
                        </div>
                </div>
            </div>
        </div>
        <!-- 同意/拒绝 -->
        <div class="lz-dialog">
            <el-dialog
                ref="ruleFormRef"
                v-show="dialogData.approveData.dialogFormVisible"
                :model-value="dialogData.approveData.dialogFormVisible"
                title="审批"
                :before-close="approveclose"
                :width="dialogData.approveData.formLabelWidth"
                :close-on-click-modal="false"
                draggable
                >
                <el-form
                    :model="dialogData.approveData.approveformData"
                    :inline="true"
                    label-width="160px"
                    :rules="dialogData.approveData.rules"
                    ref="addform"
                    require-asterisk-position="left"
                    size="default"
                    scroll-to-error="true"
                >
                    <div class="basicstyle">
                        <div class="itemStyle padding-60">
                            <p class="titleName">审批意见</p>
                            <el-form-item label="意见" prop="opinion" required>
                                <el-input
                                    type="textarea"
                                    show-word-limit
                                    maxlength="100"
                                    :autosize="{ minRows: 2, maxRows: 4 }"
                                    placeholder="请输入考试时长"
                                    v-model="dialogData.approveData.approveformData.opinion"
                                    />
                            </el-form-item>
                            <p class="titleName">电子签名</p>
                            <el-form-item label="电子签名" prop="opinion" required>
                               <div class='canvas-box' ref="canvasContent">
                                    <vue-esign id='canvas' ref="esign" :width='600' :height="300" style="border: 1px solid #c2c1c1;" 
                                    :isCrop="dialogData.approveData.approveformData.canvasData.isCrop" :lineWidth="dialogData.approveData.approveformData.canvasData.lineWidth" 
                                    :lineColor="dialogData.approveData.approveformData.canvasData.lineColor"  v-model:bgColor="bgColor"/>

                                </div>
                                <button class="mt-16" @click="clearHandle(esign)">重新签名</button>
                            </el-form-item>
                        </div>
                    </div>

                </el-form>
                <template #footer>
                        <span class="dialog-footer">
                            <el-button
                                class="btn-mixins-clear-default"
                                @click="approveclose"
                                >取消</el-button
                            >
                            <el-button
                            type="primary"
                                class="btn-mixins dia-suc"
                                @click="success(esign)"
                                >确定</el-button>
                        </span>
                    </template>
            </el-dialog>
        </div>
    </div>
</template>
<script  setup>
import { defineProps, ref,defineEmits } from "vue";
import { reactive, watch,onMounted } from "vue";
import {getExtract as getExtract} from "@/api/train.js"
import { ElMessage, ElMessageBox,ElNotification } from "element-plus";
import { useRouter } from 'vue-router';
import { Plus } from '@element-plus/icons-vue'
const router = useRouter();
const esign = ref('')
const canvasContent = ref('')
let props = defineProps({
  hotworkContent: {
    type: Object,
    default: () => {},
  },
}); 
const emit = defineEmits(['callback'])
const dialogData = reactive({
    hotworkContent: {
        title: '新建'
    },
    approveData: {
        dialogFormVisible:false,
        formLabelWidth:'50%',
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
                isCrop: false
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
        courseId:[{ required: true, message: "请选择考核课程名称", trigger: "change" }],
        examineType:[{ required: true, message: "请选择考核方式", trigger: "change" }],
        gradesSum:[{ required: true, message: "请输入试卷总分（分）", trigger: "blur" }],
        passCriteria:[{ required: true, message: "请输入及格线（分）", trigger: "blur" }],
        examineDuration:[{ required: true, message: "请输入考试时长（分钟）", trigger: "blur" }],
        examineBeginTime:[{ required: true, message: "请选择考试开始时间", trigger: "change" }],
        examineEndTime:[{ required: true, message: "请选择考试截止时间", trigger: "change" }],
        aloneOptionNum:[{ required: true, message: "请输入单选题数量", trigger: "change" }],
        moreOptionsNum:[{ required: true, message: "请输入多选题数量", trigger: "change" }],
        judgeNum:[{ required: true, message: "请输入判断题数量", trigger: "change" }],
        outstanding:[{ required: true, message: "请输入优秀的百分比", trigger: "change" }],
        passRate:[{ required: true, message: "请输入及格的百分比", trigger: "change" }]
    },
    props:{
        title:'',
    },
    formData:{
        activeName:'first',
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
// onMounted(()=>{

//     })
//清空画布
const clearHandle=(esign)=>{
           if (esign) {
                    esign.reset();
                }
                var obj = document.getElementById("canvas");
                obj.style.backgroundColor = "#fff";  //保存时背景
        }
   //将base64转换为blob
function dataURLtoBlob(dataurl) {
      const arr = dataurl.split(',');
        const  mime = arr[0].match(/:(.*?);/)[1];
 
      const  bstr = atob(arr[1]);
      let  n = bstr.length;
      const  u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {type: mime});
    }
 
    //将blob转换为file
function blobToFile(theBlob, fileName) {
      const file = new File([theBlob], fileName)
      return file;
    }
//画布生成图片

const handleGenerate= (esign)=> {
    // esign.generate().then(res => {
    //   console.log(res)
    // }).catch(err => {
    //   alert(err) // 画布没有签字时会执行这里 'Not Signned'
    // })
    // try {
    //         const base64Data = await esign.value.generate()
    //         console.log('res', base64Data)
    //         img.value = base64Data
    //         const blob = dataURLtoBlob(base64Data);
    
    //         const file = blobToFile(blob, "业主签字.png");
    
    //         const formData = new FormData();
    //         formData.append("file", file);
    // }
    // catch (e) {
    //     Snackbar({
    //       content: "请先签字",
    //       position: 'top',
    //       duration:1000
    //     })
    //     img.value = ''
    // }
  }
//同意确认
const success = (esign)=>{
    handleGenerate(esign)
}  
const getQusetion=(id)=>{
    let user = JSON.parse(localStorage.getItem('userData'))
    getExtract(id,user.username).then((res)=>{
        if(res.code ===200){
            dialogData.question = res.body.questionList;
            dialogData.score = res.body.grade;
            dialogData.examineState = res.body.examineState ===3?'不及格':res.body.examineState ===4?"及格":res.body.examineState === 5?'优秀':'';
            dialogData.answers = res.body.respondenceMap;
            Object.keys(dialogData.answers).forEach(key=>{
                if(dialogData.answers[key].length ===1){
                    dialogData.answers[key] = dialogData.answers[key].toString();
                }
            })
            console.log(dialogData.answers)
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
}
watch(
  () => props,
  () => {
      
        // dialogData.hotworkContent = props.hotworkContent
        // getQusetion(dialogData.hotworkContent.examineId)
  },
  { deep: true, immediate: true }
);
const handleClick = (tab, event) => {
  console.log(tab, event)
}
const  scrollToQuestion=(index)=> {
        const questionEl = document.getElementById(`question-${index}`)
        if (questionEl) {
          questionEl.scrollIntoView({ behavior: 'smooth' })
        }
      }

//返回上一级
const callback = () => {
    emit('callback') 
    console.log("111callback")
}
//撤销
const revoke = () => {
    ElMessageBox.confirm(
    '确认要撤销此数据吗?',
    'Warning',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
        //确认删除的逻辑
      ElMessage({
        type: 'success',
        message: '撤销成功',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消撤销',
      })
    })
}
//同意
const agree = () => {
    dialogData.approveData.dialogFormVisible = true
}
//弹窗关闭
const approveclose = () => {
    dialogData.approveData.dialogFormVisible = false;
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
    }

    .callback{
        cursor: pointer;
    }
    .itemStyle{
        background-color: #ffffff;
        .headerMsg{
            height: 56px;
            line-height: 56px;
            color: #1C222C;
            font-size: 16px;
            border-bottom: 1px solid #DADFE6;
            padding: 0 16px;
            width: 100%;
        }
        .formItem{
            padding: 16px 56px;
        }
        .formpadding{
            padding: 16px 150px;
        }
        .titleName{
                color: #4B515B;
                font-size: 14px;
                padding-left: 8px;
                border-left: 5px solid #2E83FC;
                margin-bottom: 16px;
                
         }
        .formItemStyle{
                color: #1C222C;
                .labelStyle{
                    display: inline-block;
                    color: #797F89;
                    font-size: 14px;
                    margin-right: 16px;
                    width: 150px;
                    text-align: right;
                    margin-bottom: 16px;
                }
            }
            .displayFlex{
                display: flex;
            }
            .mt-5{
                margin-top: 5px;
            }
        .tishi{
            margin-bottom: 16px;
            color: #F46B5A;
            font-size: 12px;
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
.canvasBox{
    // position: relative;
    // top: 100px;
    // width: 100%;
    // margin: 0 auto;
    // height: 200px;
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


</style>