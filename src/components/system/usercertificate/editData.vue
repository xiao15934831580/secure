<template>
  <div class="user-dialog">
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
        <!-- 基础信息 -->
        <div >
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
                    <p class="titleName">证书信息</p>
                    <el-form-item label="证书编号" prop="certificateNo" required>
                        <el-input
                            placeholder="请输入证书编号"
                            v-model="dialogData.formData.certificateNo"
                        />
                    </el-form-item>
                    <el-form-item label="作业类别" prop="workSort" required>
                        <el-input
                            placeholder="请输入作业类别"
                            v-model="dialogData.formData.workSort"
                        />
                    </el-form-item>
                    <el-form-item label="操作项目" prop="operateProject" required>
                        <el-input
                            placeholder="请输入操作项目"
                            v-model="dialogData.formData.operateProject"
                            />
                    </el-form-item>
                    <el-form-item label="有效期" prop="startAndEndTime" required>
                        <el-date-picker
                              class="w-10 m-2 mr-16 float-left"
                              v-model="dialogData.formData.startAndEndTime"
                              type="daterange"
                              start-placeholder="请选择开始日期"
                              end-placeholder="请选择结束日期"
                              :default-time="defaultTime"
                          />
                    </el-form-item>
                    <el-form-item label="签发机关" prop="signPlace" required>
                            <el-select
                            v-model="dialogData.formData.signPlace"
                            placeholder="请选择部门"
                            :remote="true"
                            filterable
                            clearable
                            multiple
                            >
                                <el-option v-for="item in dialogData.dropdown.companyList" :key="item.id" :label="item.companyName" :value="item.id" required>
                                </el-option>
                            </el-select>
                    </el-form-item>   
                    <el-form-item label="证件照" prop="frontFileUrl" required>
                        <el-upload
                                    v-model:file-list="dialogData.formData.frontFileUrl"
                                    action="api/hongyun-training/workpermit/uploadFile"
                                    list-type="picture-card"
                                    :show-file-list="false"
                                    :limit="1"
                                    :beforeUpload="beforeAvatarUpload"          
                                    :on-exceed="handleImage"
                                    :on-success="uploadSucceed"
                                >
                                    <span>上传证件照</span>
                                    <template #tip>
                                        <div class="el-upload__tip">
                                            只能上传jpg/png格式,且不超过500KB
                                        </div>
                                    </template>
                                </el-upload>
                    </el-form-item>
                </div>     
                <div class="itemStyle">
                    <p class="titleName">关联信息</p>
                    <el-form-item label="关联八大作业" prop="workType" required>
                        <el-input
                            placeholder="请选择关联八大作业"
                            v-model="dialogData.formData.workType"
                        />
                    </el-form-item>
                    <el-form-item label="关联成员" prop="realName" required>
                        <el-input
                            placeholder="请选择成员"
                            v-model="dialogData.formData.realName"
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
            >取消</el-button>
          <el-button
            class="btn-mixins dia-suc"
            @click="success(addform)"
            >保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script  setup>
import { defineProps, ref,onBeforeMount } from "vue";
import { reactive, watch, defineEmits } from "vue";
import { ElNotification  } from "element-plus";
import { getCompanyList as getCompanyList } from '@/api/user.js'
const emits = defineEmits(["update:modelValue"]);
const addform = ref('');
const dialogData = reactive({
    formLabelWidth:"40%",
    rules:{
        realName:[{ required: true, message: "请输入姓名", trigger: "blur" }],
        userName:[{ required: true, message: "请输入账号", trigger: "blur" }],
        phone:[{ required: true, message: "请输入手机号", trigger: "blur" }],
        roleId:[{ required: true, message: "请选择角色", trigger: "change" }],
        companyIds:[{ required: true, message: "请选择部门", trigger: "change" }],
        status:[{ required: true, message: "请选择账号状态", trigger: "change" }],
        cultivateType:[{ required: true, message: "请上传证件照", trigger: "change" }],
    },
    props:{
        title:'',
        dialogFormVisible:'',
    },
    formData:{
        headline:'',
        cultivateType:''
    },
    dropdown:{
      roleList:[{}],
      companyList:[{}]
      },
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

const getCompanyListFun = () => {
  let companyName = dialogData.formData.companyIds;
  getCompanyList(companyName).then((res)=>{
    if(res.code === 200){
        dialogData.dropdown.companyList = res.body;
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
onBeforeMount(()=>{
  getCompanyListFun()
})
watch(
  () => props,
  () => {
    dialogData.props.title = props.dialogTitle;
    dialogData.props.dialogFormVisible = props.dialogFormVisible;
    if (dialogData.props.title === "编辑" ){
        dialogData.formData = props.dialogTableValue;
    }else {
        dialogData.formData= {}
    }
  },
  { deep: true, immediate: true }
);
const beforeAvatarUpload = (file)=>{
      const testmsg = /^image\/(png|jpg|jpeg)$/.test(file.type)
      if (!testmsg) {
        ElMessage.error('上传格式不正确,只支持JPG/PNG!')
        return false
      } else if (file.size && file.size / 1024 / 1024/1024 > 500) {
        ElMessage.error('上传大小不正确,大小不超过500kb!')
        return false
      }
}
const uploadSucceed = (file)=>{
    console.log(file)
    let obj = {
        url:file.body
    }
    dialogData.formData.cultivateType.push(obj);
}
const  handleImage = (file)=>{
      //调用后台导入的接口
      let obj={
        file:file.raw
      }
      // let arr = []
      // arr.push(file)
      // dialogData.formData.fileList = arr;
      uploadFile(obj).then(res => {
        if (res.code === 200) {
            let obj = {
                url:res.body
            }
            console.log(obj)
            // dialogData.formData.images.push(obj);
            // console.log(dialogData.formData.images)
            // ElMessage({
            //   type: "success",
            //   message: "记载成功",
            // });
        } else {
          ElMessage({
              type: "error",
              message: "加载失败",
            });
        }
      }).catch(err => {
          ElMessage({
              type: "error",
              message: "加载失败",
            });
      })
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
      operatePlan(obj).then((res)=>{
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
.user-dialog {
  :deep(.el-input){
    width: 100%;
  }
  :deep(.el-select){
      width: 100%;
  }
  .basictitle {
    font-size: 18px;
    margin: 16px 0 24px;
    color: #333333;
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
    padding: 16px 160px 16px 16px;
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
  width: 100%;
}
:deep(.el-form--inline .el-form-item){
    width:100%
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
</style>
