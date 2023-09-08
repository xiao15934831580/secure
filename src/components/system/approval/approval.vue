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
                    <div class="between mt-16 cursor" v-for=" item in modeldata.WorkTemplateList" :key="item.templateId" @click="getTemplate(item)">
                        <input v-if="modeldata.editNode === item.templateId" type="text"
                                        style="width: 50%"
                                        size="mini"
                                        ref="inputVal"
                                        :value="item.templateName"
                                        placeholder="请输入分类名"
                                        @change="nameChange(item,$event)">
                        <p v-else>{{item.templateName}}</p>
                        <span>
                            <el-dropdown>
                                <span class="el-dropdown-link">
                                  <el-icon ><MoreFilled /></el-icon>
                                </span>
                                <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item command="a" @click="editTree(item.templateId)">编辑</el-dropdown-item>
                                    <el-dropdown-item command="d" @click="delTreeNode(item.templateId)">删除</el-dropdown-item>
                                </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </span>
                    </div>
                </div>
          </div>
          <div class="rightBox"> 
            <div class="partTitle">
              <p class="partName">{{modeldata.templateTitle}}</p>
              <div >
                <el-button type=""   @click="saveApproval"
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
                   <template  v-for="(aproval,index) in modeldata.tableData" :key="index">
                     <div class="cardBox">
                         <div  class="topBox between">
                           <!-- <el-icon class="edit_icon cursor"><Edit /></el-icon> -->
                             <span v-on:dblclick="updateText($event)" v-on:blur="saveText(aproval,$event)">{{aproval.dutyName}} </span>
                             <el-icon style="color:#A9AFB9" class="m-2 cursor" @click="deleteTemplate(index)"><Close /></el-icon>
                         </div>
                         <div  class="bottomContent">
                             <el-select v-model="aproval.userId" class="m-2" placeholder="请选择人员" >
                                <el-option
                                v-for="item in modeldata.dropdown.userList"
                                :key="item.id"
                                :label="item.realName"
                                :value="item.id"
                                />
                            </el-select>
                         </div>
                     </div>
                     <span v-if="index !== modeldata.tableData.length-1" :size = '30' class=" addApproval"><el-icon><Bottom /></el-icon></span>
                   </template>
                     <el-button @click="addApproval" class="addApproval mt-16 cursor" type="primary">添加审批流</el-button>
                 </div>   
            </div>
          </div>
      </div>
</div>
</div>

</template>
<script setup>
import { onBeforeMount, watch, getCurrentInstance } from "vue";
import { reactive, ref, markRaw} from "vue";
import { ElMessage, ElMessageBox,ElNotification } from "element-plus";
import { Warning,Close,Bottom,Edit } from "@element-plus/icons-vue";
import store from '@/store'
import { getUserList_ as getUserList_,getWorkTemplate as getWorkTemplate, deleteWorkTemplate as deleteWorkTemplate, operateWorkTemplate as operateWorkTemplate } from '@/api/user.js'
const editDataRef = ref('');
const addform = ref('')
const popoverRef = ref()
let modeldata =  reactive({
    WorkTemplateList:[],
    templateTitle:'',
    dropdown:{
      userList:[{}]
    },
    approvalData:{
        showApproval:false,
        showSaveButton:false,
    },
    tableData:[{
      titleName:'',
      userName:''
    }]
})
const getUserListFun = () => {
  getUserList_().then((res)=>{
    if(res.code === 200){
        modeldata.dropdown.userList = res.body;
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
const getWorkTemplateFun = () => {
  getWorkTemplate().then((res) => {
        if(res.code === 200){
        modeldata.WorkTemplateList = res.body;
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
//   getCompanyFun()
  getWorkTemplateFun()
  getUserListFun()
})
//点击模板获取数据
const getTemplate = (item) => {
    modeldata.tableData = item.dutyNames
    modeldata.templateTitle = item.templateName
    modeldata.templateId = item.templateId
    modeldata.approvalData.showApproval = modeldata.tableData&&modeldata.tableData.length>0?true: false;
}
//设置
const setApproval = () => {
    if(modeldata.templateId){
        modeldata.approvalData.showApproval = true
    }
    
}
//删除审批节点
const deleteTemplate = (index) => {
  modeldata.tableData.splice(index,1)
}
//修改审批节点名称
const updateText = (event) => {
  event.target.contentEditable = true;
  // 设置焦点到span标签
  event.target.focus();
}
//审批节点名称失去焦点
const saveText = (aproval,event) =>{
  // 将用户编辑后的文本保存到text中
  aproval.dutyName = event.target.innerText;
  // 让span标签变回不可编辑状态
  event.target.contentEditable = false;
}
//添加审批流
const addApproval = ()=>{
  let obj = {
    dutyName:'审批名称',
    userId:''
  }
  modeldata.tableData.push(obj)
}
//保存模板内容
const operateCompanyFun = (obj) => {
  operateWorkTemplate(obj).then((res) => {
      if(res.code === 200){
        checkCancel()
        getWorkTemplateFun()
        ElNotification({
              title: 'Success',
              message: '操作成功',
              type: 'Success',
            })
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
//添加模板
const addNewPart = ()=>{
  let obj = {
    "templateName": "模板名称",
  }
  operateCompanyFun(obj)
}

//删除模板
const delTreeNode = (id) => {
    deleteWorkTemplate(id).then((res) => {
      if(res.code === 200){
            getWorkTemplateFun()
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
const editTree = (id)=>{
  modeldata.editNode = id;
}
//编辑结束
const nameChange = (item,e)=>{
  item.templateName = e.target.value;
  //部门名称为空时，不能添加或者编辑
  if(!item.templateName){
    ElMessage('模板名称不能为空.')
    checkCancel()
    return false
  }
  //编辑时调用的接口
  if(item){
    let obj = {
          templateId:item.templateId,
          templateName : item.templateName,
    }
    operateCompanyFun(obj)
    
  }
}
const checkCancel = ()=>{
  modeldata.editNode = '';
}

//保存审批流
const saveApproval = () => {
  let obj = {
    dutyNames:modeldata.tableData,
    templateId:modeldata.templateId
  }
  operateCompanyFun(obj)
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
        height: 100%;
        overflow-y: auto;
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