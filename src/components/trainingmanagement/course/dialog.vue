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
                <el-form-item label="培训主题" prop="planId" required>
                    <el-select
                    :disabled="dialogData.props.title === '查看'"
                    v-model="dialogData.formData.planId"
                    placeholder="请选择培训主题"
                    >
                    <el-option v-for="item in dialogData.dropdown.headline" :key="item.planId" :label="item.headline" :value="item.planId" required>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="培训课程名称" prop="courseName" required>
                    <el-input
                    :disabled="dialogData.props.title === '查看'"
                    placeholder="请输入培训课程名称"
                    v-model="dialogData.formData.courseName"
                    />
                </el-form-item>
                <!-- <el-form-item label="培训类型" prop="cultivateType" required>
                    <el-select
                    :disabled="dialogData.props.title === '查看'"
                    v-model="dialogData.formData.cultivateType"
                    placeholder="请选择培训类型"
                    >
                        <el-option v-for="item in dialogData.dropdown.cultivateType" :key="item.value" :label="item.label" :value="item.value" required>
                        </el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="课件类型" prop="courseType" required>
                    <el-select
                    :disabled="dialogData.props.title === '查看'"
                    v-model="dialogData.formData.courseType"
                    placeholder="请选择课件类型"
                    >
                        <el-option v-for="item in dialogData.dropdown.courseType" :key="item.value" :label="item.label" :value="item.value" required>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="培训对象" prop="cultivateBody" >
                    <el-select
                    :disabled="dialogData.props.title === '查看'"
                    v-model="dialogData.formData.cultivateBody"
                    placeholder="请选择培训对象"
                    >
                        <el-option v-for="item in dialogData.dropdown.cultivateType" :key="item.value" :label="item.label" :value="item.value" required>
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="讲师" prop="lecturer" required>
                    <el-input
                    :disabled="dialogData.props.title === '查看'"
                    placeholder="请输入培训主题"
                    v-model="dialogData.formData.lecturer"
                    />
                </el-form-item> -->
                <el-form-item label="及格线" prop="passCriteria" required>
                    <el-input
                    type="number"
                    :disabled="dialogData.props.title === '查看'"
                    placeholder="请输入及格线"
                    v-model="dialogData.formData.passCriteria"
                    />
                </el-form-item>
                <el-form-item label="考试时间" prop="checkEndTime" required>
                        <el-date-picker
                        :disabled="dialogData.props.title === '查看'"
                          v-model="dialogData.formData.checkEndTime"
                          type="datetime"
                          placeholder="请选择考试时间"
                          :default-time="defaultTime"
                        />
                </el-form-item>
                 <el-form-item label="上传资料" prop="fileList" required>
                    <el-upload
                        :disabled="dialogData.props.title === '查看'"
                        :limit="1"
                        class="upload-demo"
                        action="#"
                        :auto-upload="false"
                        :show-file-list="false"
                        :on-change="handleExcel"
                        :on-success="uploadSuccess"
                        :file-list="dialogData.formData.fileList"
                    >
                        <el-button type="primary">选择文件</el-button>
                    </el-upload>
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
import { operatePlan as operatePlan,getPlans as getPlans, operateCourse as operateCourse, uploadCourse as uploadCourse } from '@/api/train.js'
const emits = defineEmits(["update:modelValue"]);
const addform = ref('');
const checkFileList = (rule, value, callback)=>{
if( JSON.parse(JSON.stringify(dialogData.formData.fileList)).length === 0) {
          callback(new Error('附件不能为空'))
        } else {
          let notNull = false
          for (let index = 0; index <JSON.parse(JSON.stringify(dialogData.formData.fileList)).length; index++) {
            if (JSON.parse(JSON.stringify(dialogData.formData.fileList))[index].size > 0) {
              notNull = true
            }
          }
          if (notNull) {
            callback()
          } else {
            callback(new Error('附件不能为空'))
          }
        }
}
const dialogData = reactive({
    formLabelWidth:"40%",
    defaultTime : new Date(2000, 1, 1, 12, 0, 0),
    rules:{
        planId:[{ required: true, message: "请选择培训主题", trigger: "change" }],
        courseName:[{ required: true, message: "请输入培训主题", trigger: "blur" }],
        courseType:[{ required: true, message: "请选择课件类型", trigger: "change" }],
        lecturer:[{ required: true, message: "请输入培训讲师", trigger: "blur" }],
        passCriteria:[{ required: true, message: "请输入通过标准", trigger: "blur" }],
        checkEndTime:[{ required: true, message: "请输入培训及考核截止时间", trigger: "blur" }],
        cultivateType:[{ required: true, message: "请选择培训类型", trigger: "change" }],
        fileList:[{ validator:checkFileList, trigger: "change" }],
    },
    props:{
        title:'',
        dialogFormVisible:'',
    },
    dropdown:{
        headline:[],
        courseType:[{
            value: 0,
            label:'视频'
        },{
            value: 1,
            label:'文档'
        }],
        cultivateType:[{
            value: 0,
            label:'专项培训'
        },{
             value: 1,
            label:'常规培训'  
        }]
    },
    formData:{
        planId:'',
        courseName:'',
        courseType:'',
        lecturer:'',
        passCriteria:'',
        learnTime:'',
        checkEndTime:'',
        learnStateStr:'',
        courseUrl:'',
        cultivateBody:'',
        fileList:[]
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
  getData();
});
const getData = ()=>{
    getPlans().then((res)=>{
        if(res.code ===200){
            dialogData.dropdown.headline = res.body;
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
    //  getData();
    if (dialogData.props.title === "编辑" || dialogData.props.title === "查看"){
        dialogData.formData = props.dialogTableValue;
        // let file ={
        //   uid:1687843886596,
        //   size:1000
        // }
        // let arr = []
        // arr.push(file)
        // dialogData.formData.fileList = arr;

    }else {
        dialogData.formData= {}
    }
  },
  { deep: true, immediate: true }
);
// watch({
//   'addform.fileList':{
//     handler(newVal){
//       if(newVal.length){
//         console.log(addform)
//         addform.clearValidate(['fileList'])
//       }
//     }
//   }
// })

const close = () => {
  addform.value.resetFields();
  emits("update:modelValue", false);
};

const success = (addform) => {
  if (!addform) return;
  addform.validate(async (valid) => {
    if (valid) {
      let obj = JSON.parse(JSON.stringify(dialogData.formData));
      obj.checkEndTime = obj.checkEndTime?getymdhms(obj.checkEndTime):''
      operateCourse(obj).then((res)=>{
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
//上传文件
const  handleExcel = (file)=>{
      //调用后台导入的接口
      let obj={
        file:file.raw
      }
      let arr = []
      arr.push(file)
      dialogData.formData.fileList = arr;
      console.log(dialogData.formData.fileList)
      uploadCourse(obj).then(res => {
        if (res.code === 200) {
            dialogData.formData.courseUrl = res.body;
            ElMessage({
              type: "success",
              message: "导入成功",
            });
        } else {
          ElMessage({
              type: "error",
              message: "导入失败",
            });
        }
      }).catch(err => {
          ElMessage({
              type: "error",
              message: "导入失败",
            });
      })
}
const uploadSuccess = (response, file, fileList)=>{
  addform.fileList.push(file)
  addform.validateField('fileList');
}
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
</style>
