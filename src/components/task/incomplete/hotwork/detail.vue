
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
                    <!-- <el-button type="">下载</el-button> -->
            </div>
            <div class="bottomBox bg_color">
                <div class="test_paper">
                        <div class="basicstyle">
                            <div class="itemStyle">
                                <p class="backState" v-if="dialogData.formData.state === 1">已关闭,该作业票已结束</p>
                                <p class="approveIng" v-if="dialogData.formData.state === 0">作业中</p>
                            </div> 
                            <div class="itemStyle mt-16">
                                 <el-tabs v-model="dialogData.formData.activeName" class="demo-tabs" @tab-click="handleClick">
                                    <el-tab-pane label="作业前清单确认" name="first">
                                        <div class="formItem">
                                            <p class="titleName">作业前清单确认</p>
                                            <div class="formItemStyle displayFlex" v-for="(item,index) in dialogData.formData.options" :key="index">
                                                    <span class="labelStyle mt-5">内容{{index+ 1}}:</span>
                                                    <span class="contentStyle">
                                                        <p>
                                                            <el-checkbox   v-model="item.value">{{
                                                                item.key}}
                                                            </el-checkbox>                       
                                                        </p>
                                                    </span>
                                            </div>
                                            <el-timeline class="formpadding">
                                                <el-timeline-item
                                                v-for="(activity, index) in dialogData.formData.approverUsers"
                                                :key="index"
                                                >
                                                <!-- {{ activity.content }} -->
                                                    <p class="timeline_title"> <span>{{activity.dutyName}}</span> <span>{{activity.timestamp}}</span></p> 
                                                    <p class="timeline_content">{{ activity.realName }}</p> 
                                                </el-timeline-item>
                                            </el-timeline>
                                        </div>

                                        
                                    </el-tab-pane>
                                    <el-tab-pane label="作业中环境分析" name="second">
                                        <div class="formItem">
                                            <p class="titleName">取样点1</p>
                                            <p class="formItemStyle"><span class="labelStyle">取样位置:</span>{{dialogData.formData.courseId}}</p>
                                            <p class="formItemStyle"><span class="labelStyle">距离动火点:</span>{{dialogData.formData.courseId}}</p>
                                            <p class="formItemStyle"><span class="labelStyle">气体取样时间:</span>{{dialogData.formData.courseId}}</p>
                                            <p class="formItemStyle"><span class="labelStyle">代表性气体1:</span>{{dialogData.formData.courseId}}</p>
                                            <p class="formItemStyle"><span class="labelStyle">提交人:</span>{{dialogData.formData.courseId}}</p>
                                        </div>
                                    </el-tab-pane>
                                    <el-tab-pane label="作业中人员状态" name="third">
                                        <div class="formItem">
                                            <p class="titleName">作业人状态及操作规范</p>
                                            <p class="formItemStyle"><span class="labelStyle">现场照片:</span>{{dialogData.formData.courseId}}</p>
                                            <p class="formItemStyle"><span class="labelStyle">现场描述:</span>{{dialogData.formData.courseId}}</p>
                                            <p class="formItemStyle"><span class="labelStyle">提交人:</span>{{dialogData.formData.courseId}}</p>
                                            <p class="titleName">监控视频1</p>
                                            <p class="formItemStyle"><span class="labelStyle">回放时间:</span>{{dialogData.formData.courseId}}</p>
                                        </div>
                                    </el-tab-pane>
                                    <el-tab-pane label="作业中预警" name="fourth">
                                        <div class="formItem">
                                            <div>
                                                <p class="titleName">作业票超时预警</p>
                                                <div class="formItemStyle boxSize">
                                                    <div class="titlemsg between">
                                                        <span class="titleColor">作业票超时</span><span class="commonColor">预警时间：2021-12-12</span>
                                                    </div>
                                                    <div class="contentmsg mt-16">
                                                        <p class="contentStyle"><span class="bgcolor mr-16">判断依据</span>特级作业票有效时间：8小时,应在2022-12-12 12:00:00前关闭作业票</p>
                                                        <p class="contentStyle mt-16"><span  class="bgcolor">作业建议</span>特级作业票有效时间：8小时,应在2022-12-12 12:00:00前关闭作业票</p>
                                                    </div>
                                                </div>
                                                <p class="titleName mt-16">动火分析超时预警</p>
                                                <div class="formItemStyle boxSize">
                                                    <div class="titlemsg between">
                                                        <span class="titleColor">动火前分析超时</span><span class="commonColor">2021-12-12</span>
                                                    </div>
                                                    <div class="contentmsg mt-16">
                                                        <p class="contentStyle"><span class="bgcolor mr-16">判断依据</span>特级作业票有效时间：8小时,应在2022-12-12 12:00:00前关闭作业票</p>
                                                        <p class="contentStyle mt-16"><span  class="bgcolor">作业建议</span>特级作业票有效时间：8小时,应在2022-12-12 12:00:00前关闭作业票</p>
                                                    </div>
                                                </div>
                                               <p class="titleName mt-16">动火分析不合格预警</p>
                                                <div class="formItemStyle boxSize">
                                                    <div class="titlemsg between">
                                                        <span class="titleColor">动火分析不合格</span><span class="commonColor">2021-12-12</span>
                                                    </div>
                                                    <div class="contentmsg mt-16">
                                                        <p class="contentStyle"><span class="bgcolor mr-16">判断依据</span>特级作业票有效时间：8小时,应在2022-12-12 12:00:00前关闭作业票</p>
                                                        <p class="contentStyle mt-16"><span  class="bgcolor">作业建议</span>特级作业票有效时间：8小时,应在2022-12-12 12:00:00前关闭作业票</p>
                                                    </div>
                                                </div>
                                               <p class="titleName mt-16">作业中断预警</p>
                                                <div class="formItemStyle boxSize">
                                                    <div class="titlemsg between">
                                                        <span class="titleColor">作业内容变更</span><span class="commonColor">2021-12-12</span>
                                                    </div>
                                                    <div class="contentmsg mt-16">
                                                        <p class="contentStyle"><span class="bgcolor mr-16">判断依据</span>特级作业票有效时间：8小时,应在2022-12-12 12:00:00前关闭作业票</p>
                                                        <p class="contentStyle mt-16"><span  class="bgcolor">作业建议</span>特级作业票有效时间：8小时,应在2022-12-12 12:00:00前关闭作业票</p>
                                                    </div>
                                                </div>                                                                                             
                                            </div>
                                        </div>
                                    </el-tab-pane>
                                    <el-tab-pane label="作业中工属具" name="fivth">
                                        <div class="formItem">
                                            <p class="titleName">作业前</p>
                                            <p class="formItemStyle"><span class="labelStyle">照片:</span>{{dialogData.formData.courseId}}</p>
                                            <p class="formItemStyle"><span class="labelStyle">描述:</span>{{dialogData.formData.courseId}}</p>
                                            <p class="formItemStyle"><span class="labelStyle">提交人:</span>{{dialogData.formData.courseId}}</p>
                                            <p class="titleName">作业后</p>
                                            <p class="formItemStyle"><span class="labelStyle">照片:</span>{{dialogData.formData.courseId}}</p>
                                            <p class="formItemStyle"><span class="labelStyle">描述:</span>{{dialogData.formData.courseId}}</p>
                                            <p class="formItemStyle"><span class="labelStyle">提交人:</span>{{dialogData.formData.courseId}}</p>
                                        </div>    
                                    </el-tab-pane>
                                    <el-tab-pane label="作业后验收" name="sixth">
                                         <div class="formItem">
                                             <p class="titleName">作业后验收</p>
                                             <div class="formItemStyle displayFlex" v-for="(item,index) in dialogData.formData.options" :key="index">
                                                    <span class="labelStyle mt-5">内容{{index+ 1}}:</span>
                                                    <span class="contentStyle">
                                                        <p>
                                                            <el-checkbox   v-model="item.value">{{
                                                                item.key}}
                                                            </el-checkbox>                       
                                                        </p>
                                                    </span>
                                            </div>
                                             <p class="formItemStyle"><span class="labelStyle">验收照片:</span>{{dialogData.formData.courseId}}</p>
                                             <p class="formItemStyle"><span class="labelStyle">验收记录:</span>{{dialogData.formData.courseId}}</p>
                                             <p class="formItemStyle"><span class="labelStyle">提交人:</span>{{dialogData.formData.courseId}}</p>
                                        </div>
                                    </el-tab-pane>
                                </el-tabs>
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
import {getWorkPermitInfo as getWorkPermitInfo, operateApprove as operateApprove} from "@/api/train.js"
import { ElMessage, ElMessageBox,ElNotification } from "element-plus";
import { useRouter } from 'vue-router';
import { Plus } from '@element-plus/icons-vue'
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
        approverUsers:[
            {
                dutyName: "提交人",
                orderNum: 0,
                realName: "雨果"
            }
        ],
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

const handleGenerate= (esign)  => {
    return   new Promise((resolve, reject) => {
            esign.generate().then(res => {
                resolve(res)
                // dialogData.approveData.approveformData.canvasData.image = res;
                // console.log(dialogData.approveData.approveformData.canvasData.image)
            }).catch(err => {
                reject('请签字') // 画布没有签字时会执行这里 'Not Signned'
                 ElNotification({
                    title: 'Warning',
                    message: res.message?res.message:'请签字',
                    type: 'warning',
                })
            })
    })
  }
//同意确认
const success = (addform,esign)=>{
    console.log(addform)
    if (!addform) return;
    addform.validate( (valid) => {
    if (valid) {
        handleGenerate(esign).then((res)=>{
            let obj = {
                approveFlg: dialogData.approveData.approveState,
                opinion: dialogData.approveData.approveformData.opinion,
                sign: res,
                workNo: dialogData.formData.workNo
            }
            console.log(obj)
            let user = JSON.parse(localStorage.getItem('userData'))
            operateApprove(obj,user.username).then((res)=>{
                if(res.code ===200){
                    callback()
                }else {
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

    }else {
        return false;
    }
  })
}  

onBeforeMount(()=>{
    // let user = JSON.parse(localStorage.getItem('userData'))
    // getWorkPermitInfo(dialogData.props.hotWorkId,user.username).then((res)=>{
    //     if(res.code ===200){
    //         console.log(res)
    //         dialogData.formData = res.body;
    //         console.log(dialogData.formData)
    //     }else{
    //         ElNotification({
    //             title: 'Warning',
    //             message: res.message?res.message:'服务器异常',
    //             type: 'warning',
    //           })
    //            if(res.message.indexOf('token已过期')>-1  ){
    //                 store.dispatch('app/logout')
    //             }
    //     }
    // })

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
const deleteData = (state) => {
    ElMessageBox.confirm(
    '确认要删除此数据吗?',
    'Warning',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
        //确认删除的逻辑
        dialogData.approveData.approveState = state
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
//撤销
const revoke = (state) => {
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
        dialogData.approveData.approveState = state
        let obj = {
                approveFlg: dialogData.approveData.approveState,
                workNo: dialogData.formData.workNo
            }
            console.log(obj)
            let user = JSON.parse(localStorage.getItem('userData'))
            operateApprove(obj,user.username).then((res)=>{
                if(res.code ===200){
                    ElMessage({
                        type: 'success',
                        message: '撤销成功',
                        })
                    callback()
                }else {
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
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消撤销',
      })
    })
}
//同意
const agree = (state) => {
    dialogData.approveData.approveState = state
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
                font-size: 14px;
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
.boxSize{
    height: 140px;
    width: 100%;
    background-color: #F2F5FA;
    padding: 16px;
    .titleColor{
        color: #F46B5A;
        font-weight: 600;
    }
    .bgcolor{
        background-color: #E4E9F1;
        border-radius: 4px;
        line-height: 28px;
        padding: 4px 8px;
    }
}
}


</style>