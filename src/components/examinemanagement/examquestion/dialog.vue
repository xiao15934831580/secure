<template>
  <div class="question-dialog">
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
        <div style="margin-top:24px;">
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
                <el-form-item label="考核课程名称" prop="courseId" required>
                    <el-select
                    :disabled="dialogData.props.title === '查看'"
                    v-model="dialogData.formData.courseIds"
                    placeholder="请选择考核课程名称"
                    :remote="true"
                    filterable
                    clearable
                    multiple
                    >
                    <el-option v-for="item in dialogData.dropdown.courseName" :key="item.courseId" :label="item.courseName" :value="item.courseId" required>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="考试题型" prop="questionType" required>
                    <el-select
                    :disabled="dialogData.props.title === '查看'"
                    v-model="dialogData.formData.questionType"
                    placeholder="请选择考核方式"
                    >
                        <el-option v-for="item in dialogData.dropdown.questionType" :key="item.value" :label="item.label" :value="item.value" required>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="题干" prop="question" required>
                    <el-input
                    type="textarea"
                    :disabled="dialogData.props.title === '查看'"
                    placeholder="请输入题干"
                    v-model="dialogData.formData.question"
                    />
                </el-form-item>
                <div>
                   <div class="answerTitle">
                     <p class="answerOptions">答题选项</p>
                     <!-- <p @click="addOptions" class="addOptions">新增答题选项</p>  -->
                     <el-button
                        class="addOptions"
                        @click="addOptions()"
                        type="success"
                        >新增答题选项</el-button>
                   </div>
                   <el-form-item class="optionBox" v-for="  (item,index) in dialogData.formData.options" 
                                :label="item.key"  
                                :key = 'index'
                                :prop="'options.' + index + '.value'"
                                :rules="[{required: true, message: '答题选项不能为空', trigger: 'blur'}]"
                                >
                              <el-input
                              type="textarea"
                              :disabled="dialogData.props.title === '查看'"
                              placeholder="请输入选项内容"
                              v-model= 'item.value'
                              />
                              <el-icon :size = '20' @click.prevent="removeOption(item,index)"><Remove /></el-icon>
                    </el-form-item>
                </div>
                <el-form-item label="答案" prop="answer" required>
                    <el-select
                    :disabled="dialogData.props.title === '查看'"
                    v-model="dialogData.formData.answer"
                    :multiple = "true"
                    placeholder="请选择答案选项"
                    >
                        <el-option v-for="(item,index) in dialogData.formData.optionKeys" :key="index" :label="item" :value="item" required>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="答案解析" prop="answerExplain" required>
                    <el-input
                    type="textarea"
                    :disabled="dialogData.props.title === '查看'"
                    placeholder="请输入答案解析"
                    v-model="dialogData.formData.answerExplain"
                    />
                </el-form-item>

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
import { defineProps, ref } from "vue";
import { reactive, watch, defineEmits ,onMounted} from "vue";
import { ElMessage, ElMessageBox,ElNotification } from "element-plus";
import { getymdhms } from '@/utils/auth'
import { getCourses as getCourses,operateQuestion as operateQuestion} from '@/api/train.js'
const emits = defineEmits(["update:modelValue"]);
const addform = ref('');
const dialogData = reactive({
    formLabelWidth:"40%",
    defaultTime : new Date(2000, 1, 1, 12, 0, 0),
    sortList: ["A", "B", "C", "D", "E", "F", "G", "H"],
    rules:{
        courseId:[{ required: true, message: "请选择考核课程名称", trigger: "change" }],
        questionType:[{ required: true, message: "请选择考试题型", trigger: "change" }],
        question:[{ required: true, message: "请输入题干", trigger: "blur" }],
        answer:[{ required: true, message: "请选择答案选项", trigger: "change" }],
        answerExplain:[{ required: true, message: "请输入答案解析", trigger: "blue" }],
       
    },
    props:{
        title:'',
        dialogFormVisible:'',
    },
    dropdown:{
        courseName:[],
        questionType:[{
                      label: '单选',
                      value: 0
                    },{
                      label: '多选',
                      value: 1
                    },{
                      label: '判断',
                      value: 2
                    }],
    },
    formData:{
        courseId:'',
        questionType:'',
        question:'',
        answer:['A','B','C'],
        optionKeys:['A','B','C'],
        answerExplain:'',
        options:[{
          key: 'A',
          value:''
        },{
          key: 'B',
          value:''
        },{
          key: 'C',
          value:''
        }],
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
   let score = dialogData.formData.totalNum === 0?0: parseFloat(Number(dialogData.formData.gradesSum)/dialogData.formData.totalNum)
   dialogData.formData.averageScore = isNaN(score)?0:score;
  console.log(dialogData.formData.totalNum)
 }
watch(
  () => props,
  () => {
    dialogData.props.title = props.dialogTitle;
    dialogData.props.dialogFormVisible = props.dialogFormVisible;
    //  getData();
    if (dialogData.props.title === "编辑" || dialogData.props.title === "查看"){
        dialogData.formData = props.dialogTableValue;
        console.log(dialogData.formData)
        }else{
          dialogData.formData= {
            options:[{
              key: 'A',
              value:''
            },{
              key: 'B',
              value:''
            },{
              key: 'C',
              value:''
            },{
              key: 'D',
              value:''
            }],
            optionKeys:['A','B','C','D'],
          }
        }
    addQuestions()
  },
  { deep: true, immediate: true }
);
//去除数组中arr1及arr2中数组不同的数
const getArrDifference = (arr1, arr2) =>{
  return arr1.concat(arr2).filter(function(v, i, arr) {
    return arr.indexOf(v) === arr.lastIndexOf(v);
  });
}
//获取到两个数组交集部分
const  array_intersection = (a, b)=> {
  // 交集
  let result = [];
  for (let i = 0; i < b.length; i++) {
    let temp = b[i];
    for (let j = 0; j < a.length; j++) {
      if (temp === a[j]) {
        result.push(temp);
        break;
      }
    }
  }
  return result;
}
//添加答题选项
const addOptions =()=>{
  if(JSON.parse(JSON.stringify(dialogData.formData.options)).length>8){
       ElNotification({
                title: 'Warning',
                message: res.message?res.message:'抱歉，答题选项已经超过上限了',
                type: 'warning',
              })    
      return;
  }
  let domainObj = []; //添加的答题选项的abc值保存
  let domainLen = JSON.parse(JSON.stringify(dialogData.formData.options)).length; //答题选项长度获取 
  let alphaObj = dialogData.sortList.slice(0, domainLen); //截取sortList字符串长度作为数组
  JSON.parse(JSON.stringify(dialogData.formData.options)).map(res => {
    domainObj.push(res.key);
  });
  let unqualList = getArrDifference(alphaObj, domainObj); //获取字符串中不相等的内容
  if (unqualList.length > 0) {
        let arr = JSON.parse(JSON.stringify(dialogData.formData.options));
        let interList = array_intersection(unqualList, alphaObj); //交集的数组
        let alphaIndex = alphaObj.indexOf(interList[0]);
        arr.splice(alphaIndex, 0, {
          value: "",
          key: dialogData.sortList[alphaIndex]
        });
        dialogData.formData.options = arr;
      } else {
        let arr = JSON.parse(JSON.stringify(dialogData.formData.options));
        arr.push({
          value: "",
          key: dialogData.sortList[arr.length]
        });
        dialogData.formData.options = arr;
      }
    let arr1=[]
    JSON.parse(JSON.stringify(dialogData.formData.options)).map(res => {
      arr1.push(res.key);
    });  
    dialogData.formData.optionKeys = arr1;
}
//删除答题选项
const removeOption = (item,index)=>{
  console.log(item)
  //删除对应的答题选项
  dialogData.formData.options.splice(index,1)
  //删除下拉答题选项
  let arr1=[]
  JSON.parse(JSON.stringify(dialogData.formData.options)).map(res => {
    arr1.push(res.key);
  });  
  dialogData.formData.optionKeys = arr1;
  let arr = JSON.parse(JSON.stringify(dialogData.formData.answer));
  let answerIndex = arr.findIndex((res)=>{ return res ===item.key})
  if(answerIndex>-1){
    dialogData.formData.answer.splice(answerIndex, 1)
  }
}
const close = () => {
  addform.value.resetFields();
  emits("update:modelValue", false);
};

const success = (addform) => {
  if (!addform) return;
  addform.validate(async (valid) => {
    if (valid) {
      let obj = JSON.parse(JSON.stringify(dialogData.formData));
      console.log(obj)
      // obj.examineBeginTime = obj.examineBeginTime?getymdhms(obj.examineBeginTime):'';
      // obj.examineEndTime = obj.examineEndTime?getymdhms(obj.examineEndTime): "";
      // obj.evaluation = ''
      operateQuestion(obj).then((res)=>{
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
.question-dialog {
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
.answerOptions{
    width: 160px;
    text-align: right;
    display: inline-block;
}
.answerTitle{
  width: 460px;
  margin-bottom: 16px;
}
.addOptions{
  float: right;
}
.optionBox{
  :deep(.el-form-item__content){
    width: 360px;
  }
  :deep(.el-textarea){
    width: 300px;
  }
  :deep(.el-icon){
    margin: 0 16px;
  }
}
</style>
