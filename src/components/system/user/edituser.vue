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
                <el-form-item label="姓名" prop="realName" required>
                    <el-input
                        placeholder="请输入姓名"
                        v-model="dialogData.formData.realName"
                    />
                </el-form-item>
                <el-form-item label="账号" prop="userName" required>
                    <el-input
                        placeholder="请输入账号"
                        v-model="dialogData.formData.userName"
                    />
                </el-form-item>
                <el-form-item label="手机号" prop="phone" required>
                    <el-input
                        placeholder="请输入手机号"
                        v-model="dialogData.formData.phone"
                        />
                </el-form-item>
                <el-form-item label="角色" prop="roleId" required>
                        <el-select
                        v-model="dialogData.formData.roleId"
                        placeholder="请选择角色"
                        >
                            <el-option v-for="item in dialogData.dropdown.roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId" required>
                            </el-option>
                        </el-select>
                </el-form-item>
                <el-form-item label="部门" prop="companyIds" required>
                        <el-select
                        v-model="dialogData.formData.companyIds"
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
                <el-form-item label="证件照" prop="photo" required>
                      <el-upload
                                v-model:file-list="dialogData.formData.photo"
                                action="api/hongyun-training/workpermit/uploadFile"
                                list-type="picture-card"
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
                <el-form-item label="账号状态" prop="status" required>
                        <el-switch v-model="dialogData.formData.status"  />
                </el-form-item> 
                <el-form-item label="禁用原因" >
                        <el-input
                        placeholder="请输入禁用原因"
                        v-model="dialogData.formData.disablingReason"
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
import { ElMessage, ElMessageBox,ElNotification } from "element-plus";
import { getRoleList as getRoleList,getCompanyList as getCompanyList,operateAdminUser as operateAdminUser } from '@/api/user.js'
import {uploadFile as uploadFile} from '@/api//train.js'
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
        photo:[{ required: true, message: "请上传证件照", trigger: "change" }],
    },
    props:{
        title:'',
        dialogFormVisible:'',
    },
    formData:{
        headline:'',
        photo:[{url:''}]
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
const getRoleListFun =()=>{
  getRoleList().then((res)=>{
    if(res.code === 200){
        dialogData.dropdown.roleList = res.body;
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
  getRoleListFun()
  getCompanyListFun()
})
watch(
  () => props,
  () => {
    dialogData.props.title = props.dialogTitle;
    dialogData.props.dialogFormVisible = props.dialogFormVisible;
    if (dialogData.props.title === "编辑" ){
        dialogData.formData = props.dialogTableValue;
        dialogData.formData.photo = dialogData.formData.photo&&dialogData.formData.photo.length > 0 ? dialogData.formData.photo:[]
    }else {
        dialogData.formData= {photo:[]}
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
    dialogData.formData.photo = [];
    let obj = {
        url:file.body
    }
    dialogData.formData.photo.push(obj);
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
      // obj.photo = obj.photoUrl
      operateAdminUser(obj).then((res)=>{
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
  :deep(.disUoloadSty .el-upload--picture-card){
    display:none;   /* 上传按钮隐藏 */
  }
  :deep(.showUpload .el-upload--picture-card){
    display:block;   /* 上传按钮隐藏 */
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

</style>
