<template>
<div class="totalStyle">
    <div class="tablestyle">
    <div class="searchsize">
      <el-col :span="20" class="searchBox">
        <el-input
          class="w-10 m-2 mr-16"
          v-model="plandata.searchvalue"
          placeholder="请输入标题"
        />
      </el-col>
      <el-col :span="4">
        <el-button  class="searchbutton " @click="queryTableData"
        >查询</el-button>
        <el-button  class="searchbutton mr-16"  @click="handleBuild">新建</el-button>
      </el-col>
    </div>
    <div class="chartstyle">
      <el-table
        :data="plandata.table.tableData"
        :header-cell-style="{ background: '#d9ecff' }"     
        border
        style="width: 100%"
      > 
        <el-table-column label="序号" min-width="7%">
              <template #default="requestscope">
                    <span >{{
                      requestscope.$index+1 + (plandata.table.pageSize*(plandata.table.currentPage-1))
                    }}</span>
              </template>
        </el-table-column>
        <el-table-column prop="username" label="标题" min-width="10%" />
        <el-table-column prop="realname" label="上课方式" min-width="10%" />
        <el-table-column label="操作列" width="250" min-width="28%">
          <!-- <template #default="scope">
            <el-button size="small" @click="changePassword(scope.row.username)"
              >重置密码</el-button
            >
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template> -->
        </el-table-column>
        <template #empty>
            <el-empty v-loading="plandata.table.tableLoading"></el-empty>
        </template>
      </el-table>
      <div class="demo-pagination-block">
        <el-pagination
          :currentPage="plandata.table.currentPage"
          :page-size="plandata.table.pageSize"
          :page-sizes="[5, 10, 15, 20]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="plandata.table.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
</div>
  <!-- 编辑 -->
  <EditUser
    v-model="dialogFormVisible"
    v-if="dialogFormVisible"
    :dialogFormVisible="dialogFormVisible"
    :dialogTitile="dialogTitile"
    :dialogTableValue="dialogTableValue"
    :dropdownValue = 'dropdownValue'
  ></EditUser>
</div>
</template>
<script setup>
// import EditUser from "./edituser.vue";
import { onBeforeMount, watch, getCurrentInstance } from "vue";
import { reactive, ref, markRaw } from "vue";
import { ElMessage, ElMessageBox,ElNotification } from "element-plus";
import { Delete } from "@element-plus/icons-vue";
import store from '@/store'
// import { resetPasswords as resetPasswords,getAdminUser as getAdminUser, deleteUser as deleteUser} from '@/api/user'
// const {proxy} = getCurrentInstance();
let plandata =  reactive({
    searchvalue:'',
    table:{
        tableLoading: false,
        currentPage: 1,
        pageSize: 10,
        total:0,
        tableData: [],
    }
})
const dialogFormVisible = ref(false);
let dialogTitile = ref("编辑");
let dialogPasswordVisible  = ref(false);
let dialogTableValue = reactive({});
const queryTableData = () => {
  plandata.table.tableLoading = false;
//   let obj = JSON.parse(JSON.stringify(searchvalue));
//   obj.username = obj.username.trim();
//   obj.realname = obj.realname.trim();
//   obj.pageindex = state.CurrentPage;
//   obj.pagesize = state.PageSize;
//   getAdminUser(obj)
//     .then((res)=>{
//       plandata.table.tableLoading = false;
//       if(res.code === 200){
//         let data = res.body;
//           state.tableData1=data&&data.data?data.data:[];
//           state.Total = data&&data.total?data.total:0;
//         }else{
//             ElNotification({
//               title: 'Warning',
//               message: res.message?res.message:'服务器异常',
//               type: 'warning',
//             })
//             if(res.code === 100007 ||  res.code === 100008){
//                     store.dispatch('app/logout')
//                 }
//         }
//     })
//     .catch(()=>{})
};
watch(
    () => dialogFormVisible.value,
    () => {
      if(!dialogFormVisible.value){
        queryTableData();
      }
    },
    { deep: true, immediate: true }
)

//切换一页显示多少条数据
const handleSizeChange = (val) => {
  plandata.table.pageSize = val;
  queryTableData();

};
// 点击跳转到第几页
const handleCurrentChange = (val) => {
  plandata.table.currentPage = val;
  queryTableData();
};
//新建
const handleBuild = () => {
  dialogTitile.value = "新建";
  dialogFormVisible.value = true;
};
//编辑
const handleEdit = (index, row) => {
  dialogTitile.value = "编辑";
  dialogTableValue.value = JSON.parse(JSON.stringify(row));
  dialogFormVisible.value = true;
};
//删除
const handleDelete = (index, row) => {
//   ElMessageBox.confirm("你确定删除此人员信息吗?", "删除", {
//     type: "warning",
//     icon: markRaw(Delete),
//   })
//     .then(() => {
//       deleteUser(row.id).then((res)=>{
//         if(res.code === 200){
//             // state.tableData1.splice(index, 1);
//             if(state.tableData1.length === 0&& state.CurrentPage>1){
//               state.CurrentPage = state.CurrentPage -1;
//             }
//             queryTableData();
//             ElMessage({
//               type: "success",
//               message: "删除成功",
//             });
//         }else{
//             ElNotification({
//               title: 'Warning',
//               message: res.message?res.message:'服务器异常',
//               type: 'warning',
//             })
//             if(res.code === 100007 ||  res.code === 100008){
//                     store.dispatch('app/logout')
//                 }
//         }
//       })
//     })
};

</script>
<style  lang = 'less' scoped>
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
.searchsize {
    position: relative;
    width: 100%;
    // height: 114px;
    border: 1px solid #ecf5ff;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0px 0px 6px #d9ecff;
    display: flex;
    justify-content: space-between;
  .batchimport {
    position: absolute;
    right: 24px;
  }
}
.demo-pagination-block {
  margin-top: 16px;
  position: absolute;
  bottom: 32px;
  right: 32px;
}
.lz-dialog {
  .dia-suc {
    margin-left: 16px !important;
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
      border-bottom: 4px solid #409eff;
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
    margin-bottom: 48px;
  }
  :deep(.el-dialog__title) {
    color: #409eff;
    font-size: 20px;
    height: 40px;
    width: 120px;
    border-bottom: 4px solid #409eff;
  }
  :deep(.el-dialog ){
    padding: 24px;
  }
  :deep(.el-dialog__headerbtn) {
    position: static;
    top: 0px;
    right: 0;
    padding: 0;
    width: auto;
    height: auto;
  }
  :deep(.userPassword .el-form--inline .el-form-item){
    margin-left: 32px;
    margin-bottom: 48px;
  }
}
.searchbutton{
  float: right;
}

</style>