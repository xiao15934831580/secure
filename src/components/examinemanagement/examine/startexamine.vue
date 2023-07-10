
<template>
    <div  class="totalStyle">
        <div class="tablestyle">
            <div class="titleStyle">
                <p class="leftTitle">{{dialogData.examineContent.examineTypeStr}}：{{dialogData.examineContent.courseName}}&nbsp;(总分数：{{dialogData.examineContent.gradesSum}} , 及格线：{{dialogData.examineContent.passCriteria}})</p>
                <el-button type="primary"   @click="handleBuild">交卷</el-button>
            </div>
            <div class="bottomBox">
                <div class="test_paper">
                    <div class="test_questions">
                        <el-form class="test_form" ref="form" :model="dialogData.answers" label-width="120px">
                            <el-row v-for="(question, index) in dialogData.question" :key="index" :id="'question-' + index">
                                <el-col :span="24" >
                                <p class="test_options" v-if="question.questionType===0">【单选题】{{ index + 1 }}. {{ question.question }}</p>
                                <p class="test_options" v-else-if="question.questionType===1">【多选题】{{ index + 1 }}. {{ question.question }}</p>
                                <p class="test_options" v-if="question.questionType===2">【判断题】{{ index + 1 }}. {{ question.question }}</p>
                                </el-col>
                        
                                <el-col :span="24">
                                <!-- 单选 -->
                                    <el-radio-group v-if="question.questionType === 0" v-model="dialogData.answers[question.questionId]">
                                        <el-radio v-for="option in question.options" :key="option.key" :label="option.key">
                                        {{ option.value }}
                                        </el-radio>
                                    </el-radio-group>
                            
                                    <!-- 多选 -->
                                    <el-checkbox-group v-else-if="question.questionType === 1" v-model="dialogData.answers[question.questionId]">
                                        <el-checkbox v-for="option in question.options" :key="option.key" :label="option.key">
                                        {{ option.value }}
                                        </el-checkbox>
                                    </el-checkbox-group>
                                    <!-- 判断 -->
                                    <el-radio-group v-else-if="question.questionType === 2" v-model="dialogData.answers[question.questionId]">
                                        <el-radio label="1">正确</el-radio>
                                        <el-radio label="0">错误</el-radio>
                                    </el-radio-group>
                                </el-col>
                            </el-row>
                        </el-form>
    
 
                    </div>
                    <div class="answer">
                        <div class="answer_time">考试倒计时
                            <p>{{dialogData.keepTime}}</p>
                        </div>
                        <div class="answer_sheet">
                            <p class="answer_card">答题卡</p>
                            <div class="answer-sheet-content">
                                <ul>
                                    <li 
                                    v-for="(question, index) in dialogData.question" 
                                    :key="question.index" 
                                    :class="{ 'answered': dialogData.answers[question.questionId] !== undefined && dialogData.answers[question.questionId].length > 0 }" 
                                    @click="scrollToQuestion(index)">
                                        {{ index + 1 }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="lz-dialog">
        <el-dialog
        ref="ruleFormRef"
        :model-value="true"
        :title="答题时间到"
        :before-close="close"
        width="40%"
        :close-on-click-modal="false"
        draggable
        >
            <template #footer>
                <span class="dialog-footer">
                    <el-button   class="btn-mixins dia-suc" @click="success(addform)" >确定</el-button>
                </span>
            </template>
        </el-dialog>
      </div>
</template>
<script  setup>
import { defineProps, ref } from "vue";
import { reactive, watch, defineEmits ,onMounted} from "vue";
import {extractQuestions as extractQuestions, findExamineGrade as findExamineGrade} from "@/api/train.js"
import { ElMessage, ElMessageBox,ElNotification } from "element-plus";
let props = defineProps({
  examineContent: {
    type: Object,
    default: () => {},
  },
});
const dialogData = reactive({
    examineContent: {},
    answers:{},
    settime:'',
    keepTime:'',
    flag: false,
    hr:0,
    min:60,
    sec:0,
    question: []
})
const getQusetion=(id)=>{
    extractQuestions(id).then((res)=>{
        if(res.code ===200){
            dialogData.question = res.body;
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
        dialogData.examineContent = props.examineContent
        getQusetion(dialogData.examineContent.examineId)
  },
  { deep: true, immediate: true }
);
onMounted(() => {
    startExamine()
});
const startExamine = () => {
    let mydate = new Date();
    mydate.setMinutes(mydate.getMinutes() + dialogData.examineContent.examineDuration);
            dialogData.settime=mydate;
            let time = setInterval(() => {
                if (dialogData.flag == true) {
                    clearInterval(time)
                }
                timeDown()
            }, 100)

}
const timeDown = () =>{
            const endTime = new Date(dialogData.settime);
            const nowTime = new Date();
            let leftTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000);
            let d = parseInt(leftTime / (24 * 60 * 60));
            let h = formate(parseInt(leftTime / (60 * 60) % 24));
            let m = formate(parseInt(leftTime / 60 % 60));
            let s = formate(parseInt(leftTime % 60));
            if (leftTime <= 0) {
                dialogData.flag = true;
                alert("时间到，停止作答");
            }
            dialogData.keepTime = `${h}:${m}:${s}`;
        }
const   formate=(time) =>{
            if (time >= 10) {
                return time
            } else {
                return `0${time}`
            }
}

const  scrollToQuestion=(index)=> {
        const questionEl = document.getElementById(`question-${index}`)
        if (questionEl) {
          questionEl.scrollIntoView({ behavior: 'smooth' })
        }
      }
//交卷
const handleBuild = () => {
    const answerSheets = []
    for(let [questionId,answer] of Object.entries(dialogData.answers)){
        if(typeof(answer) != "string"){
            let b = JSON.parse(JSON.stringify(answer));
            let c = []
            for(let key in b){
                c.push(b[key])
            }
            answer = c.toString()
        }
        answerSheets.push({questionId,answer})
    }
    let user = JSON.parse(localStorage.getItem('userData'))
    let obj = {
        answerSheets:answerSheets,
        examineId:dialogData.examineContent.examineId
    }
    findExamineGrade(obj,user.username).then((res)=>{
        if(res.code === 200){
            console.log(res)
        }else{
            ElNotification({
              title: 'Warning',
              message: res.message?res.message:'服务器异常',
              type: 'warning',
            })
            if(res.code === 100007 ||  res.code === 100008){
                    store.dispatch('app/logout')
                }
        }
    })
}
</script>
<style lang = 'less' scoped>
.test_paper{
    display: flex;
    width: 60%;
    margin: 0 auto;
    height: calc(100% - 24px);
    .test_questions{
        width: calc(100% - 300px);
        .test_form{
            // height: 100%;
            // overflow-y: auto;
            height: 100%;
            overflow-y: auto;
            margin-right: 16px;
            border: 1px solid #DADFE6;
            :deep(.el-row){
                border-bottom: 1px solid #DADFE6;
                padding: 0 16px;
            }
        }
    }
    .answer{
        width: 222px;
        .answer_time{
            height: 100px;
        }
        .answer_sheet{
            background-color: #F2F5FA;
        }
        .answer_card{
            // line-height: 36px;
            padding: 16px;
            color: #1C222C;
            border-bottom: 1px solid #DADFE6;
        }
    }
}
.totalStyle{
    height: 100%;
}
.test_options{
    color: #1C222C;
    margin: 16px 0;
}
:deep(.el-radio){
    display: block;
    margin:10px 0;
}
:deep(.el-checkbox){
    display: block;
    margin:10px 0;
}
:deep(.el-radio-group){
    display: flex;
    font-size: 0;
    flex-direction: column;
    align-items: unset;
}
:deep(.el-checkbox-group){
    display: flex;
    font-size: 0;
    flex-direction: column;
}
.answer-sheet {
    position: fixed;
    top: 20px;
    right: 20px;
    border: 1px solid #ddd;
    background-color: #fff;
    padding: 10px;
    border-radius: 4px;
  }
  
  .answer-sheet-header {
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .answer-sheet-content {
    max-height: 400px;
    overflow: auto;
    padding: 16px;
  }
  
  .answer-sheet-content ul {
    list-style: none;
    padding: 0;
    margin: 0;
    :nth-child(5n){
        margin-right: 0px !important;
    }
  }
  
  .answer-sheet-content ul li {
    display: inline-block;
    width: 30px;
    height: 30px;
    // border-radius: 50%;
    text-align: center;
    line-height: 30px;
    margin-right: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    background-color: #ffffff;
    border: 1px solid #DADFE6;
  }
.answered{
    background-color: #2E83FC !important;
    color: #ffffff;
}
</style>