<template>
<div class="totalStyle datadictionary">
    <div class="tablestyle">
      <div class="titleStyle">
        <p   class="leftTitle font_w">成员证书</p>
        <el-button type="primary"   @click="handleBuild">新建</el-button>
      </div>
      <div class="bottomBox">
        <div class="searchsize">
          <el-col  class="searchBox">
            <el-input
              class="w-10 m-2 mr-16 float-left"
              v-model="modeldata.searchValue.workSort"
              placeholder="请选择作业类别"
            />
            <el-input
              class="w-10 m-2 mr-16 float-left"
              v-model="modeldata.searchValue.workType"
              placeholder="请选择关联八大作业"
            />
            <el-input
              class="w-10 m-2 mr-16 float-left"
              v-model="modeldata.searchValue.realName"
              placeholder="请输入关联成员"
            />
            <el-button type="primary" plain  @click="queryTableData"
            >查询</el-button>
          </el-col>
        </div>
        <div class="chartstyle">
          <el-table
            :data="modeldata.table.tableData"
            :header-cell-style="{ background: '#F2F5FA' }"     
            border
            style="width: 100%"
          > 
            <el-table-column label="序号" min-width="7%">
                  <template #default="requestscope">
                        <span >{{
                          requestscope.$index+1 + (modeldata.table.pageSize*(modeldata.table.pageIndex-1))
                        }}</span>
                  </template>
            </el-table-column>
            <el-table-column prop="certificateNo"   label="证书编号" min-width="10%" />
            <el-table-column prop="workSort"  label="作业类别" min-width="10%" />
            <el-table-column prop="operateProject" label= '操作项目' min-width="10%" />
            <el-table-column prop="startAndEndTime" label= '有效期限'  min-width="10%" />
            <el-table-column prop="signPlace" label= '签发机关'  min-width="10%" />
            <el-table-column label= '证书照片'  min-width="10%" >
              <template #default="scope">
                      <el-button size="small" @click="handleLook(scope.$index, scope.row)"
                        >查看</el-button
                      >
                    </template>
            </el-table-column>
            <el-table-column prop="workTypeStr" label= '关联八大作业'  min-width="10%" />
            <el-table-column prop="realName" label= '关联成员'  min-width="10%" />
            <el-table-column prop="takeEffect" label= '是否在有效期内'  min-width="10%" />
            <el-table-column label="操作列" width="250" min-width="28%">
              <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button>
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button>
              </template>
            </el-table-column>
            <template #empty>
                <el-empty v-loading="modeldata.table.tableLoading"></el-empty>
            </template>
          </el-table>
          <div class="demo-pagination-block">
            <el-pagination
              :pageIndex="modeldata.table.pageIndex"
              :page-size="modeldata.table.pageSize"
              :page-sizes="[5, 10, 15, 20]"
              :small="small"
              :disabled="disabled"
              :background="background"
              layout="total, sizes, prev, pager, next, jumper"
              :total="modeldata.table.total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </div>
  </div>
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
      <Dialog
      v-model="modeldata.dialog.dialogEditVisible"
      :dialogFormVisible="modeldata.dialog.dialogEditVisible"
      :dialogTitle="modeldata.dialog.title"
      :dialogTableValue="modeldata.dialog.formData"
  ></Dialog>
</div>

</template>
<script setup>
import Dialog from "./editData.vue";
import { onBeforeMount, watch, getCurrentInstance } from "vue";
import { reactive, ref, markRaw} from "vue";
import { ElMessage, ElMessageBox,ElNotification } from "element-plus";
import { Delete } from "@element-plus/icons-vue";
import store from '@/store'
import { certificateList as certificateList} from '@/api/user.js'
import {onMounted} from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const editDataRef = ref('');
const addform = ref('')
let modeldata =  reactive({
    dialogimgVisible:false,
    imgurl:'',
    searchValue:{
      realName:'',
      workSort:'',
      workType:''
    },
    detail:{
      name:'明细',
      isShow: false,
      parentId:0
    },
    dialog: {
      dialogEditVisible:false,
      title:'新增',
      formData:{
      },
      rules:{
        dataValue:[{ required: true, message: "请输入名称", trigger: "blur" }],
        dataNo:[{ required: true, message: "请输入编码", trigger: "blur" }]
      }
    },
    table:{
        tableLoading: false,
        pageIndex: 1,
        pageSize: 10,
        total:0,
        tableData: [],
    }
})
const queryTableData = () => {
  modeldata.table.tableLoading = true;
  let obj = JSON.parse(JSON.stringify(modeldata.searchValue))
  obj.pageIndex = modeldata.table.pageIndex
  obj.pageSize = modeldata.table.pageSize
  certificateList(obj)
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
watch(
    () => modeldata.dialog.dialogEditVisible,
    () => {
      if(!modeldata.dialog.dialogEditVisible){
        queryTableData();
      }
    },
    { deep: true, immediate: true }
)

//切换一页显示多少条数据
const handleSizeChange = (val) => {
  modeldata.table.pageSize = val;
  queryTableData();
};
// 点击跳转到第几页
const handleCurrentChange = (val) => {
  modeldata.table.pageIndex = val;
  queryTableData();
};
//新建
const handleBuild = () => {
  modeldata.dialog.title = modeldata.detail.isShow?'明细新建': "新建";
  modeldata.dialog.dialogEditVisible = true;
};
//编辑
const handleEdit = (index, row) => {
  modeldata.dialog.title =  modeldata.detail.isShow?'明细编辑': "编辑";
  modeldata.dialog.tableData = JSON.parse(JSON.stringify(row));
  modeldata.dialog.dialogEditVisible = true;
};
const closeImg = ()=>{
  modeldata.dialogimgVisible = false;
}
//证件照
const handleLook = (index,row)=>{
  modeldata.imgurl = row.frontFileUrl;
  modeldata.dialogimgVisible = true;
}
//返回
const callback = () => {
  modeldata.detail.isShow = false;
  //获取所有数据
  modeldata.detail.parentId = 0;
  queryTableData()
}
//删除
const handleDelete = (index, row) => {
  ElMessageBox.confirm("你确定删除此数据吗?", "删除", {
    type: "warning",
    icon: markRaw(Delete),
  })
    .then(() => {
      deleteDataDictionary(row.id).then((res)=>{
        if(res.code === 200){
            if(modeldata.table.tableData.length === 0&& modeldata.table.pageIndex>1){
              modeldata.table.pageIndex = modeldata.table.pageIndex -1;
            }
            queryTableData();
            ElMessage({
              type: "success",
              message: "删除成功",
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
      let obj =  JSON.parse(JSON.stringify(modeldata.dialog.tableData));
      obj.parentId = modeldata.detail.isShow?modeldata.detail.parentId:'0'
      operateDataDictionary(obj).then((res)=>{
        if(res.code ===200){
            closeDialog()
            queryTableData()
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
</script>
<style  lang = 'less' scoped>
.datadictionary{
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

.split{
    width: 1px;
    height: 20px;
    background-color: #DADFE6;
    margin: 0 16px;
}
    .callback{
        cursor: pointer;
    }
}
</style>