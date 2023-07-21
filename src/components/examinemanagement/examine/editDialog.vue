<template>
  <div class="lz-dialog">
    <el-dialog
      ref="ruleFormRef"
      :model-value="dialogData.props.dialogFormVisible"
      :title="dialogData.props.title"
      :before-close="close"
      :width="dialogData.formLabelWidth"
      :close-on-click-modal="false"
      draggable
    >
      <div>
        <div>
          <el-form
            :model="dialogData.formData"
            :inline="true"
            label-width="160px"
            :rules="dialogData.rules"
            ref="addform"
            require-asterisk-position="left"
            size="default"
            scroll-to-error="true"
          >
            <div class="basicstyle">
                <div class="itemStyle">
                    <p class="titleName">考核课程</p>
                    <el-form-item label="考核课程名称" prop="courseId" required>
                        <el-select
                        :disabled="dialogData.props.title === '查看'"
                        v-model="dialogData.formData.courseId"
                        placeholder="请选择考核课程名称"
                        :remote="true"
                        @change = 'getTotalNum(dialogData.formData.courseId)'
                        filterable
                        clearable
                        >
                        <el-option v-for="item in dialogData.dropdown.courseName" :key="item.courseId" :label="item.courseName" :value="item.courseId" required>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="考核方式" prop="examineType" required>
                        <el-select
                        :disabled="dialogData.props.title === '查看'"
                        v-model="dialogData.formData.examineType"
                        placeholder="请选择考核方式"
                        >
                            <el-option v-for="item in dialogData.dropdown.examineType" :key="item.value" :label="item.label" :value="item.value" required>
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="itemStyle typeNumber">
                    <p class="titleName">题型设置</p>
                    <p class="tishi">当前题量共{{dialogData.formData.totalNum}}题，总分共计{{dialogData.formData.totalscore}}分</p>
                        <el-form-item label="单选题" prop="aloneOptionNum" required>
                            <el-input-number :disabled="dialogData.props.title === '查看'"
                                             placeholder="单选题" 
                                            v-model="dialogData.formData.aloneOptionNum" 
                                            :step="5" @change="addQuestions()"/>
                            <p class="wargingMsg">（题库共{{dialogData.formData.aloneOptionCount}}题，每题3分）</p>
                        </el-form-item>
                        <el-form-item label="多选题" prop="moreOptionsNum" required>
                            <el-input-number :disabled="dialogData.props.title === '查看'"
                                             placeholder="多选题" 
                                            v-model="dialogData.formData.moreOptionsNum" 
                                            :step="5" @change="addQuestions()"/>
                            <p class="wargingMsg"> （题库共{{dialogData.formData.moreOptionsCount}}题，每题5分）</p>
                        </el-form-item>
                        <el-form-item label="判断题" prop="judgeNum" required>
                            <el-input-number :disabled="dialogData.props.title === '查看'"
                                            placeholder="判断题" 
                                            v-model="dialogData.formData.judgeNum" 
                                            :step="5" @change="addQuestions()"/>
                            <p class="wargingMsg">（题库共{{dialogData.formData.judgeCount}}题，每题2分）</p>
                        </el-form-item>
                </div>
                <div class="itemStyle typeNumber">
                      <p class="titleName">评定标准</p>
                      <p class="tishi">当前总分共{{dialogData.formData.totalNum}}分，评定标准为总分的百分比</p>
                      <el-form-item label="优秀" prop="outstanding" required>
                          <span> >= </span>&nbsp;&nbsp;
                              <el-input v-model="dialogData.formData.outstanding" :disabled="dialogData.props.title === '查看'" placeholder="百分比">
                                  <template #append>%</template>
                              </el-input>
                      </el-form-item>
                      <el-form-item label="及格" prop="passRate" required>
                         <span> >= </span>&nbsp;&nbsp;
                             <el-input v-model="dialogData.formData.passRate" :disabled="dialogData.props.title === '查看'" placeholder="百分比">
                                <template #append>%</template>
                            </el-input>
                      </el-form-item>
                </div>
                <div class="itemStyle ">
                    <p class="titleName">考核时间</p>
                    <el-form-item label="考试时长（分钟）" prop="examineDuration" required>
                            <el-input
                            type="number"
                            :disabled="dialogData.props.title === '查看'"
                            placeholder="请输入考试时长"
                            v-model="dialogData.formData.examineDuration"
                            />
                        </el-form-item>
                        <el-form-item label="考试开始时间" prop="examineBeginTime" required>
                                <el-date-picker
                                :disabled="dialogData.props.title === '查看'"
                                v-model="dialogData.formData.examineBeginTime"
                                type="datetime"
                                placeholder="请选择考试开始时间"
                                :default-time="defaultTime"
                                />
                        </el-form-item>
                        <el-form-item label="考试截止时间" prop="examineEndTime" required>
                                <el-date-picker
                                :disabled="dialogData.props.title === '查看'"
                                v-model="dialogData.formData.examineEndTime"
                                type="datetime"
                                placeholder="请选择考试截止时间"
                                :default-time="defaultTime"
                                />
                        </el-form-item>
                </div>
            </div>
          </el-form>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            class="btn-mixins-clear-default"
            @click="close"
            >取消</el-button
          >
          <el-button
            v-if="dialogData.props.title !== '查看'"
            class="btn-mixins dia-suc"
            @click="success(addform)"
            >保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script  setup>
import {QuestionFilled} from "@element-plus/icons-vue";
import { defineProps, ref } from "vue";
import { reactive, watch, defineEmits ,onMounted,onBeforeMount} from "vue";
import { ElMessage, ElMessageBox,ElNotification } from "element-plus";
import { getymdhms} from '@/utils/auth'
import { getCourses as getCourses,operateExamine as operateExamine ,getQuestionNum as getQuestionNum} from '@/api/train.js'
const emits = defineEmits(["update:modelValue"]);
const addform = ref('');
const dialogData = reactive({
    formLabelWidth:"30%",
    defaultTime : new Date(2000, 1, 1, 12, 0, 0),
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
        dialogFormVisible:'',
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
    formData:{
        planId:'',
        courseId:'',
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
        judgeCount:0
    }
})
let props = defineProps({
  dialogFormVisible: {
    type: Boolean,
  },
  dialogTitle: {
    type: String,
  },
  dialogTableValue: {
    type: Object,
    default: () => {},
  },
});
onMounted(() => {
  getCoursesData();
});
onBeforeMount(()=>{
    if(dialogData.props.title === "编辑" || dialogData.props.title === "查看"){
      getTotalNum(dialogData.formData.courseId)
  }
})
const getCoursesData = ()=>{
  let obj = {
      courseName:dialogData.formData.courseId,
      // planId:dialogData.formData.headline
  }
  getCourses(obj).then((res)=>{
        if(res.code ===200){
            dialogData.dropdown.courseName = res.body;
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
 const addQuestions =()=>{
   let num = Number(dialogData.formData.aloneOptionNum)  + Number(dialogData.formData.moreOptionsNum)+Number(dialogData.formData.judgeNum);
   dialogData.formData.totalNum =isNaN(num)?0:num ;
   let totalscoreNum = Number(dialogData.formData.aloneOptionNum)*3+Number(dialogData.formData.moreOptionsNum)*5+Number(dialogData.formData.judgeNum)*2
   let score = dialogData.formData.totalNum === 0?0: totalscoreNum
   dialogData.formData.totalscore = isNaN(score)?0:score;
  console.log(dialogData.formData.totalNum)
 }
const getTotalNum = (id)=>{
  getQuestionNum(id).then((res)=>{
    if(res.code ===200){
          // console.log(res)
            dialogData.formData.aloneOptionCount = res.body.aloneOptionCount;
            dialogData.formData.moreOptionsCount = res.body.moreOptionsCount;
            dialogData.formData.judgeCount = res.body.judgeCount;
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
    dialogData.props.title = props.dialogTitle;
    dialogData.props.dialogFormVisible = props.dialogFormVisible;
    if (dialogData.props.title === "编辑" || dialogData.props.title === "查看"){
        dialogData.formData = props.dialogTableValue;
        getTotalNum(dialogData.formData.courseId)
        console.log(dialogData.formData)
        }else{
          dialogData.formData= {}
        }
    addQuestions()
    // getTotalNum(dialogData.formData.courseId)
  },
  { deep: true, immediate: true }
);

const close = () => {
  addform.value.resetFields();
  emits("update:modelValue", false);
};

const success = (addform) => {
  if (!addform) return;
  addform.validate(async (valid) => {
    if (valid) {
      let obj = JSON.parse(JSON.stringify(dialogData.formData));
      obj.examineBeginTime = obj.examineBeginTime?getymdhms(obj.examineBeginTime):'';
      obj.examineEndTime = obj.examineEndTime?getymdhms(obj.examineEndTime): "";
      obj.evaluation = ''
      operateExamine(obj).then((res)=>{
        if(res.code ===200){
            close()
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
    } else {
      return false;
    }
  });
};

</script>



<style lang = 'less' scoped>
.lz-dialog {
//   .dia-suc {
//     margin-left: 16px !important;
//   }
  :deep(.el-input){
    width: 300px;
  }
  .basictitle {
    font-size: 18px;
    margin: 16px 0 24px;
    color: #333333;
  }
  .basicinfo {
    font-size: 18px;
    margin: 16px 0 24px;
    color: #333333;
    border-bottom: 1px solid #cccccc;
    span {
      color: #333333;
      font-size: 20px;
      height: 40px;
      width: 100px;
      border-bottom: 2px solid #409eff;
      display: block;
    }
  }
  :deep(.el-dialog__footer) {
    padding-top: 16px;
    background-color: #ffffff;
  }
  :deep(.el-dialog__body) {
    padding: 0;
    max-height: 550px;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #ffffff;
    padding: 16px;
  }
  :deep(.el-dialog__header) {
    border-bottom: 1px solid #cccccc;
    padding: 16px;
    margin-right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  :deep(.el-dialog__title) {
    color: #1C222C;
    font-size: 20px;
    width: 100px;
  }
  :deep(.el-dialog__headerbtn ){
    position: static;
    top: 0px;
    right: 0;
    padding: 0;
    width: auto;
    height: auto;
  }
}
:deep(.el-form-item__label ){
  font-size: 14px;
}
:deep(.el-form) {
  position: relative;
}

:deep(.el-form-item__content) {
  width: 300px;
}




.typeNumber{
    :deep(.el-input--default){
            width: 150px !important;
    }
}
.itemStyle{
    .titleName{
        color: #4B515B;
        font-size: 14px;
        padding-left: 8px;
        margin-left: 8px;
        border-left: 5px solid #2E83FC;
        margin-bottom: 16px;
        
    }
    .tishi{
        margin-bottom: 16px;
        color: #F46B5A;
        font-size: 12px;
    }

}
.wargingMsg{
    font-size: 12px;
    color: #797F89;
}
</style>
