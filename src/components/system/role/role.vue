<template>
<div class="totalStyle roleBox">
    <div class="tablestyle">
      <div class="titleStyle">
        <p  class="leftTitle font_w">角色管理</p>
        <el-button type="primary"   @click="handleBuild">新建</el-button>
      </div>
      <div class="bottomBox">
        <div class="searchsize">
          <el-col  class="searchBox">
            <el-input
              class="w-10 m-2 mr-16 float-left"
              v-model="modeldata.searchValue.roleName"
              placeholder="请输入名称"
            />
            <el-input
              class="w-10 m-2 mr-16 float-left"
              v-model="modeldata.searchValue.authority"
              placeholder="请输入管理权限"
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
            <el-table-column prop="roleName"  label="名称" min-width="10%" />
            <el-table-column prop="authorityStr"   label="管理权限" min-width="10%" />
            <el-table-column prop="roleDesc"  label= '描述' min-width="10%" />
            <!-- <el-table-column prop="dataNo"  label= '编码' min-width="10%" /> -->
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
  <!-- 编辑 -->
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
                :model="modeldata.dialog.tableData"
                :inline="true"
                label-width="160px"
                :rules="modeldata.dialog.rules"
                ref="addform"
                require-asterisk-position="left"
                size="default"
                scroll-to-error="true"
            >
                <el-form-item label="名称" prop="roleName" required>
                    <el-input
                        placeholder="请输入名称"
                        v-model="modeldata.dialog.tableData.roleName"
                    />
                </el-form-item>
                <el-form-item label="管理权限" prop="authority" required>
                    <el-radio-group v-model="modeldata.dialog.tableData.authority">
                        <el-radio :label="0">管理员(看所有数据)</el-radio>
                        <el-radio :label="1">普通员工(仅看自己数据)</el-radio>
                      </el-radio-group>
                </el-form-item>
                <el-form-item label="后台管理权限" prop="menuNumLbl" required>
                    <el-cascader
                      v-model="modeldata.dialog.tableData.menuNumLbl"
                      :options="modeldata.dropdown.menuList"
                      :props="{ value: 'menuId',label: 'menuName',children: 'children',multiple: true}"
                      collapse-tags
                      collapse-tags-tooltip
                      clearable
                    />
                </el-form-item>                
                <el-form-item label="描述"  >
                    <el-input
                        placeholder="请输入描述"
                        v-model="modeldata.dialog.tableData.roleDesc"
                    />
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


</div>

</template>
<script setup>
// import Dialog from "./dialog.vue";
import { onBeforeMount, watch } from "vue";
import { reactive, ref, markRaw} from "vue";
import { ElMessage, ElMessageBox,ElNotification } from "element-plus";
import { Delete } from "@element-plus/icons-vue";
import store from '@/store'
import { deleteRole as deleteRole,operateRole as operateRole,getRoleAuthorityList as getRoleAuthorityList, getMenuList as getMenuList} from '@/api/user.js'
const editDataRef = ref('');
const addform = ref('')
const props = { multiple: true }
let modeldata =  reactive({
    searchValue:{
      roleName:'',
      authority:''
    },
    dropdown:{
      menuList:[{}]
    },
    dialog: {
      dialogEditVisible:false,
      title:'新增',
      tableData:{
        roleName:'',
        authority:'',
        menuNumLbl:[],
        roleDesc:''
      },
      rules:{
        roleName:[{ required: true, message: "请输入名称", trigger: "blur" }],
        authority:[{ required: true, message: "请输入编码", trigger: "blur" }],
        menuNumLbl:[{ required: true, message: "请选择后台管理权限", trigger: "change" }],
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
  console.log(obj)
  getRoleAuthorityList(obj)
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
const getMenuListFun = () => {
  getMenuList().then((res) => {
    if(res.code === 200){
        modeldata.dropdown.menuList = res.body;
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
  getMenuListFun()
})
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
  modeldata.dialog.title = "新建";
  modeldata.dialog.dialogEditVisible = true;
  modeldata.dialog.tableData = []
};
//编辑
const handleEdit = (index, row) => {
  modeldata.dialog.title =  "编辑";
  modeldata.dialog.tableData = JSON.parse(JSON.stringify(row));
  modeldata.dialog.dialogEditVisible = true;
};


//删除
const handleDelete = (index, row) => {
  ElMessageBox.confirm("你确定删除此数据吗?", "删除", {
    type: "warning",
    icon: markRaw(Delete),
  })
    .then(() => {
      deleteRole(row.roleId).then((res)=>{
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
   addform.value.resetFields();
  modeldata.dialog.dialogEditVisible = false;
};
//表单提交
const saveData = (addform) => {
    if (!addform) return;
  addform.validate(async (valid) => {
    if (valid) {
      let obj={};
      if( modeldata.dialog.title === "新建"){
        obj.roleName = modeldata.dialog.tableData.roleName,
        obj.authority= modeldata.dialog.tableData.authority,
        obj.menuNumLbl= modeldata.dialog.tableData.menuNumLbl,
        obj.roleDesc= modeldata.dialog.tableData.roleDesc
      }else {
        obj =  JSON.parse(JSON.stringify(modeldata.dialog.tableData))
      }
      operateRole(obj).then((res)=>{
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
.roleBox{
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
            width: calc(100% - 160px);
        }
          :deep(.el-dialog__header) {
            border-bottom: 1px solid #cccccc;
            padding: 16px;
            margin-right: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          :deep(.el-dialog__body){
            padding-right:60px
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
          :deep(.el-cascader){
            width: 100%;
          }
    }

    .totalStyle{
        height: 100%;
    }
}
</style>