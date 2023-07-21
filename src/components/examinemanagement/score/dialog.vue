
<template>
    <div  class="totalStyle">
        <div class="tablestyle">
            <div class="titleStyle">
                <p class="leftTitle">
                    <span class="callback" @click="callback">返回</span>
                    {{dialogData.examineContent.examineTypeStr}}：{{dialogData.examineContent.courseName}}&nbsp;(总分数：{{dialogData.examineContent.gradesSum}} , 及格线：{{dialogData.examineContent.passCriteria}})</p>
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
                                        {{option.key}}.{{ option.value }}
                                        </el-radio>
                                    </el-radio-group>
                            
                                    <!-- 多选 -->
                                    <el-checkbox-group v-else-if="question.questionType === 1" v-model="dialogData.answers[question.questionId]">
                                        <el-checkbox v-for="option in question.options" :key="option.key" :label="option.key">
                                        {{option.key}}.{{ option.value }}
                                        </el-checkbox>
                                    </el-checkbox-group>
                                    <!-- 判断 -->
                                    <el-radio-group v-else-if="question.questionType === 2" v-model="dialogData.answers[question.questionId]">
                                        <el-radio label="1">正确</el-radio>
                                        <el-radio label="0">错误</el-radio>
                                    </el-radio-group>
                                </el-col>
                                <div :span="24" class="answerBox">
                                    <p>正确答案：{{question.t_answer}}</p>
                                    <p class="mt-16"> 答案解析：{{question.t_options}}</p>
                                </div>
                            </el-row>
                        </el-form>
                    </div>
                    <div class="answer">
                        <div class="answer_time " :class="{'unscoreState': dialogData.examineState === '不及格' ,'scoreState':  dialogData.examineState === '及格'|| dialogData.examineState === '优秀'}" >
                            <div class="scoreBox">
                                <p>{{dialogData.score}}</p>
                                <p class="mt-16">得分</p>
                            </div>
                            <p class="borderStyle"></p>
                            <div class="scoreBox">
                                <p>{{dialogData.examineState}}</p>
                                <p class="mt-16">等级</p>
                            </div>
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
</template>
<script  setup>
import { defineProps, ref,defineEmits } from "vue";
import { reactive, watch,onMounted } from "vue";
import {getExtract as getExtract} from "@/api/train.js"
import { ElMessage, ElMessageBox,ElNotification } from "element-plus";
import { useRouter } from 'vue-router';
const router = useRouter();
let props = defineProps({
  examineContent: {
    type: Object,
    default: () => {},
  },
}); 
const emit = defineEmits(['callback'])
const dialogData = reactive({
    examineContent: {},
    answers:{},
    settime:'',
    keepTime:'',
    flag: false,
    showScore:false,
    hr:0,
    min:60,
    sec:0,
    question: [],
    score:'',
    examineState:''
})
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
        dialogData.examineContent = props.examineContent
        getQusetion(dialogData.examineContent.examineId)
  },
  { deep: true, immediate: true }
);

const  scrollToQuestion=(index)=> {
        const questionEl = document.getElementById(`question-${index}`)
        if (questionEl) {
          questionEl.scrollIntoView({ behavior: 'smooth' })
        }
      }

//返回上一级
const callback = () => {
    emit('callback') 
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
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin-bottom: 16px;
            padding: 16px;
            .scoreBox{
                color: #ffffff;
            }
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
.borderStyle{
    height: 24px;
    width: 1px;
    background-color: #ffffff;
}
.unscoreState{
    background-image: url('@/assets/image/scoreState.png');
    background-repeat: no-repeat;
    background-size: cover;
}
.scoreState{
    background-image: url('@/assets/image/successScore.png');
    background-repeat: no-repeat;
    background-size: cover;
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
.callback{
    border-right: 1px solid #DADFE6;
    margin-right: 12px;
    padding: 0 12px;
    cursor: pointer;
}
.answerBox{
    border: 1px solid rgba(255, 148, 88, 0.60);
    padding: 16px;
    width: 100%;
    margin-bottom: 16px;
    background-color: rgba(255, 148, 88, 0.08);
}
</style>