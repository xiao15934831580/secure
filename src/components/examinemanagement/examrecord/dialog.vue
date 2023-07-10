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
                    v-model="dialogData.formData.courseId"
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
                    placeholder="请选择考试题型"
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
                <el-form-item label="答案" prop="answer" required>
                    <el-select
                    :disabled="dialogData.props.title === '查看'"
                    v-model="dialogData.formData.answer"
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
import { getCourses as getCourses,operateExamine as operateExamine ,getQuestionNum as getQuestionNum} from '@/api/train.js'
const emits = defineEmits(["update:modelValue"]);
const addform = ref('');
const dialogData = reactive({
    formLabelWidth:"40%",
    defaultTime : new Date(2000, 1, 1, 12, 0, 0),
    //每个选项的排序号
    sortList: ["A", "B", "C", "D", "E", "F", "G", "H"],
    rules:{
        courseId:[{ required: true, message: "请选择考核课程名称", trigger: "change" }],
        questionType:[{ required: true, message: "请选择考试题型", trigger: "change" }],
        question:[{ required: true, message: "请输入题干", trigger: "blur" }],
        options:[{ required: true, message: "请输入选项内容", trigger: "blur" }],
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
        courseId:0,
        questionType:'',
        question:'',
        answer:['A','B','C'],
        answerExplain:'',
        optionKeys:['A','B','C'],
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
watch(
  () => props,
  () => {
    dialogData.props.title = props.dialogTitle;
    dialogData.props.dialogFormVisible = props.dialogFormVisible;
    if (dialogData.props.title === "编辑" || dialogData.props.title === "查看"){
        dialogData.formData = props.dialogTableValue;
        console.log(dialogData.formData)
        }
  },
  { deep: true, immediate: true }
);
const close = () => {
  addform.value.resetFields();
  emits("update:modelValue", false);
};
//添加答题选项
const addOptions =()=>{
  //判断当前选项的长度，添加对应的选项名称
  let arr = JSON.parse(JSON.stringify(dialogData.formData.options));
  let key = dialogData.sortList[arr.length+1];
  let obj = {
    key: key,
    value:''
  }
  arr.push(obj)
  dialogData.formData.options = arr;

}
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
  .dia-suc {
    margin-left: 16px !important;
  }

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
  }
  :deep(.el-dialog__body) {
    padding: 0;
    max-height: 550px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  :deep(.el-dialog__header) {
    border-bottom: 1px solid #cccccc;
    padding: 0;
    margin-right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  :deep(.el-dialog__title) {
    color: #409eff;
    font-size: 20px;
    height: 40px;
    width: 100px;
    border-bottom: 4px solid #409eff;
  }
  :deep(.el-dialog) {
    padding: 24px;
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
.imgstyle {
  position: absolute;
  right: 0;
  top: 0;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
:deep(.avatar-uploader .el-upload ){
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
:deep(.el-form-item__content) {
  width: 300px;
}
.address {
  :deep(.el-form-item__content ){
    width: 350px;
  }
}
.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 140px;
  height: 150px;
  text-align: center;
}
.uploadimg {
  text-align: center;
  background-color: rgba(64, 158, 255, 0.1);
  span {
    color: #409eff;
  }
}

/* .basicstyle {
  width: 83%;
} */
.imgstyle {
  width: 15%;
  :deep(.el-form-item) {
    margin: 0;
  }
  :deep(.el-form-item__content) {
    width: 100%;
  }
  :deep(.el-icon) {
    width: 120px;
  }
}
.idinfo {
  position: relative;
  .removeidinfo {
    margin-left: 24px;
    font-size: 20px;
    position: absolute;
    margin-top: 5px;
  }
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
</style>
