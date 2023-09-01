<template>
<div class="totalStyle approval">

    <div class="tablestyle">
      <div class="titleStyle">
        <p   class="leftTitle font_w">审批流程</p>
      </div>
      <div class="bottomBox flex">
          <div class="leftBox">
              <p>审批模板</p>
              <el-button class="mt-16 addPart" type=""   @click="addNewPart"
                >+新建模板</el-button>
                <div class="treeBox mt-16">
                    <div class="between">
                        <p>一级模板</p>
                        <span>
                            <el-dropdown>
                                <span class="el-dropdown-link">
                                <el-icon ><MoreFilled /></el-icon>
                                </span>
                                <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item command="a" @click="editTree(node,data)">编辑</el-dropdown-item>
                                    <el-dropdown-item command="b" @click="addTreeNode(data)">添加子部门</el-dropdown-item>
                                    <el-dropdown-item command="c" @click="moveTreeNode(data.id)">上移</el-dropdown-item>
                                    <el-dropdown-item command="d" @click="delTreeNode(data.id)">删除</el-dropdown-item>
                                </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </span>
                    </div>
                </div>
          </div>
          <div class="rightBox"> 
            <div class="partTitle">
              <p class="partName">一级模板</p>
              <div>
                <el-button type=""   @click="addDirector"
                  >保存</el-button>
              </div>
            </div>
            <div class="chartstyle">
                <div v-if="!modeldata.approvalData.showApproval">
                    <el-empty>
                        <el-button @click="setApproval" type="primary">设置</el-button>
                    </el-empty>
                </div>
                 <div v-else class="approvalBox">
                     <div class="cardBox">
                         <div  class="topBox between">
                             <span>一级模板<el-icon class="edit_icon"><Edit /></el-icon></span>
                             <el-icon style="color:#A9AFB9" class="m-2"><Close /></el-icon>
                         </div>
                         <div  class="bottomContent">
                             <el-select v-model="value" class="m-2" placeholder="请选择人员" >
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                />
                            </el-select>
                         </div>
                     </div>
                     <span :size = '30' class="mt-16 addApproval"><el-icon><Bottom /></el-icon></span>
                     <el-button class="addApproval mt-16" type="primary">添加审批流</el-button>
                 </div>   
            </div>
          </div>
      </div>
</div>
  <div class="dialogBox">
       <el-dialog
        ref="editDataRef"
        :model-value="modeldata.dialog.dialogEditVisible"
        :title="modeldata.dialog.title"
        :before-close="closeDialog"
        width="40%"
        :close-on-click-modal ="false"
        draggable
        >
            <div>
                <el-form
                  :model="modeldata.dialog.userObj"
                  :inline="true"
                  label-width="160px"
                  :rules="modeldata.dialog.rules"
                  ref="addform"
                  require-asterisk-position="left"
                  size="default"
                  scroll-to-error="true"
              >
                  <el-form-item label="姓名" prop="realName" required>
                      <el-select
                        v-model="modeldata.dialog.userObj.realName"
                        :remote="true"
                        placeholder="请选择姓名"
                        filterable
                        clearable
                        >
                            <el-option v-for="item in modeldata.dropdown.userList" :key="item.id" :label="item.realName" :value="item.id" required>
                            </el-option>
                        </el-select>
                  </el-form-item>
              </el-form>
            </div>
            <template #footer>
                    <span class="dialog-footer">
                        <el-button class="btn-mixins-clear-default" @click="closeDialog"
                        >取消</el-button>
                    <el-button class="btn-mixins-clear-default" @click="saveData(addform)"
                        >确定</el-button>
                    
                    </span>
            </template>
        </el-dialog>
  </div>
  <!-- 证件照片 -->
  <div class="lz-dialog">
        <el-dialog
        ref="imgRef"
        :model-value="modeldata.dialogimgVisible"
        title="证件照"
        :before-close="closeImg"
        width="30%"
        :close-on-click-modal ="false"
        draggable
        >
            <div class="userPassword">
              <el-image
              :src="modeldata.imgurl"
              :zoom-rate="1.2"
              :initial-index="4"
              fit="cover"
            />

            </div>
            <template #footer>
                <span class="dialog-footer">
                <el-button class="btn-mixins-clear-default" @click="closeImg"
                    >返回</el-button>
                </span>
        </template>
      </el-dialog>
  </div>
  <!-- 添加成员 -->
    <!-- <Dialog
    v-model="modeldata.dialog.dialogMemberShow"
    :dialogFormVisible="modeldata.dialog.dialogMemberShow"
    :dialogTitle="modeldata.dialog.memberTitle"
    :dialogTableValue="modeldata.dialog.memberData"
  ></Dialog> -->

</div>

</template>
<script setup>
// import Dialog from "./edituser.vue";
import { onBeforeMount, watch, getCurrentInstance } from "vue";
import { reactive, ref, markRaw} from "vue";
import { ElMessage, ElMessageBox,ElNotification } from "element-plus";
import { Warning,Close,Bottom,Edit } from "@element-plus/icons-vue";
import store from '@/store'
import { getCompany as getCompany,operateCompany as operateCompany,deleteCompany as deleteCompany,operateCompanyOrder as operateCompanyOrder,
companyPeopleNum as companyPeopleNum,getUsersByCompanyId as getUsersByCompanyId,setPrincipalUserId as setPrincipalUserId,
getUserList as getUserList, adminResetPasswords as adminResetPasswords} from '@/api/user.js'
const editDataRef = ref('');
const addform = ref('')
const popoverRef = ref()
let modeldata =  reactive({
    dialogimgVisible:false,
    imgurl:'',
    dropdown:{
      userList:[{}]
    },
    dialog: {
      userObj:{
        realName:''
      },
      rules:{
        realName:[{ required: true, message: "请输入姓名", trigger: "Change" }]
      },
      dialogEditVisible:false,
      title:'',
      dialogMemberShow:false,
      memberTitle:'',
      memberData: []
    },
    approvalData:{
        showApproval:false,
        showSaveButton:false,
    }
})
const queryTableData = (companyId) => {
  modeldata.table.tableLoading = true;
  let obj = JSON.parse(JSON.stringify(modeldata.searchValue))
  obj.pageIndex = modeldata.table.pageIndex
  obj.pageSize = modeldata.table.pageSize
  obj.companyId = companyId
  console.log(obj)
  getUsersByCompanyId(obj)
    .then((res)=>{
      modeldata.table.tableLoading = false;
      if(res.code === 200){
        console.log(res)
          let data = res.body;
          modeldata.table.tableData=data&&data.data?data.data:[];
          modeldata.table.total = data&&data.total?data.total:0;
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
    .catch(()=>{})
};

onBeforeMount(()=>{
//   getCompanyFun()
//   companyPeopleNumFun()
//   getUserListFun()
})
watch(
    () => modeldata.dialog.dialogMemberShow,
    () => {
      if(!modeldata.dialog.dialogMemberShow){
        // queryTableData(modeldata.table.componyId)
      }
    },
    { deep: true, immediate: true }
)
//设置
const setApproval = () => {
    modeldata.approvalData.showApproval = true
}
//部门数据改动
const operateCompanyFun = (obj) => {
  operateCompany(obj).then((res) => {
      if(res.code === 200){
        checkCancel()
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
//添加部门
const addNewPart = ()=>{
  let obj = {
    "companyLevel": 1,
    "companyName": "部门名称",
    "companyParentId": 0
  }
  operateCompanyFun(obj)
}
//上移
const moveTreeNode = (id) => {
  operateCompanyOrder(id).then((res) => {
      if(res.code === 200){
            checkCancel()
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
//删除树节点
const delTreeNode = (id) => {
    deleteCompany(id).then((res) => {
      if(res.code === 200){
            checkCancel()
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
/**
 * 编辑树节点
 */
const editTree = (node,data)=>{
  modeldata.treeData.operationVis = data.id;
}
//编辑结束
const nameChange = (node,data,e)=>{
  console.log(node,data)
  data.companyName = e.target.value;
  //部门名称为空时，不能添加或者编辑
  if(data && !data.companyName){
    ElMessage('部门名称不能为空.')
    checkCancel()
    return false
  }
  //编辑时调用的接口
  if(data){
    let obj = {
          id:data.id,
          companyParentId : data.companyParentId,
          companyLevel: data.companyLevel,
          companyName: data.companyName
    }
    operateCompanyFun(obj)
    
  }
}
const checkCancel = ()=>{
  modeldata.treeData.operationVis = '',
  getCompanyFun()
}
//添加子节点
const addTreeNode = (data)=>{
  let obj = {
      "companyName": '部门名称',
      "companyParentId": data.id,
  }
  operateCompanyFun(obj)
}
/**
 * 显示部门数据
 */
const showTreeData = (data)=>{
    modeldata.table.companyName = data.companyName;
    modeldata.table.componyId = data.id;
   queryTableData(data.id)
}
//切换一页显示多少条数据
const handleSizeChange = (val) => {
  modeldata.table.pageSize = val;
 queryTableData(modeldata.table.componyId)
};
// 点击跳转到第几页
const handleCurrentChange = (val) => {
  modeldata.table.pageIndex = val;
  queryTableData(modeldata.table.componyId)
};
//新建
const handleBuild = () => {
  modeldata.dialog.memberTitle = "新建";
  modeldata.dialog.dialogMemberShow = true;
};
//编辑
const handleEdit = (index, row) => {
  modeldata.dialog.memberTitle =  "编辑";
  modeldata.dialog.memberData = JSON.parse(JSON.stringify(row));
  modeldata.dialog.dialogMemberShow = true;
};

//重置密码
const resetPassword = (index, row) => {
  ElMessageBox.confirm("你确定要重置密码吗?重置后密码为@Hy12345", "重置密码", {
    type: "warning",
    icon: markRaw(Warning),
  })
    .then(() => {
      adminResetPasswords(row.id).then((res)=>{
        if(res.code === 200){
            ElMessage({
              type: "success",
              message: "重置成功",
            });
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
    })
};
//添加部门主管
const addDirector = () => {
  modeldata.dialog.title = '部门主管'
  modeldata.dialog.dialogEditVisible = true;
}
// 关闭弹框
const closeDialog = () => {
  // modeldata.dialog.tableData = []
  addform.value.resetFields();
  modeldata.dialog.dialogEditVisible = false;
};
//表单提交
const saveData = (addform) => {
    if (!addform) return;
  addform.validate(async (valid) => {
    if (valid) {
      let companyId = modeldata.table.componyId;
      let userId = modeldata.dialog.userObj.realName
      setPrincipalUserId(companyId,userId).then((res)=>{
        if(res.code ===200){
            closeDialog()
            queryTableData(modeldata.table.componyId)
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
}
const closeImg = ()=>{
  modeldata.dialogimgVisible = false;
}
const handleLook = (index,row)=>{
  modeldata.imgurl = row.certificatePhotoUrl;
  modeldata.dialogimgVisible = true;
}
</script>
<style  lang = 'less' scoped>
.approval{
    :deep(.el-table--fit){
      height:100%;
    }
    :deep(.el-table__body-wrapper) {
      overflow-y: auto;
    }
    .tablestyle {
      position: relative;
      :deep(.el-table__header thead tr) {
        background-color: rgba(64, 158, 255, 0.1);
      }
      :deep(.el-col-3 ){
        max-width: none;
      }
    }

    .demo-pagination-block {
      margin-top: 16px;
      position: absolute;
      bottom: 32px;
      right: 32px;
    }
    .dialogBox{
          :deep(.el-form--inline .el-form-item){
              width: 100%;
          }
          :deep(.el-input){
                width: 100%;
            }
          :deep(.el-select){
            width: 100%;
          }
          :deep(.el-dialog__body){
            padding-right: 160px;
          }
          :deep(.el-form-item--default .el-form-item__content){
            width: calc(100% - 80px);
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

    .totalStyle{
        height: 100%;
    }
    .bottomBox{
      width: 100%;
      padding: 0;
    }
    .rightBox{
      width: 80%;
      padding: 16px;
      .chartstyle {
        height: calc(100% - 41px);
      }
    }
    .leftBox{
      width: 20%;
      padding: 16px;
      border-right: 1px solid #DADFE6;
      height: 100%;
      overflow-y: auto;
      .addPart{
        width: 100%;
      }
    }
    .partTitle{
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .cardBox{
        width: 30%;
        height: 80px;
        background-color: #EDF0F5;
        border-radius: 8px;
        padding: 8px;
        margin: 0 auto;
        .topBox{
            height: 30px;
        }
        :deep(.el-select){
            width: 100%;
        }
        :deep(.el-input){
            width: 100%;
        }

    }
    .approvalBox{
        display: flex;
        flex-direction: column;
    }
    .addApproval{
        width: 30%;
        margin: 0 auto;
        text-align: center;
    }
    .edit_icon{
        margin-left: 8px;
        margin-top: 2px;
    }
}
</style>