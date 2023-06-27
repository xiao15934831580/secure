<template>
<div class="totalStyle">
    <div class="tablestyle">
    <div class="searchsize">
      <el-col :span="20" class="searchBox">
        <el-input
          class="w-10 m-2 mr-16 float-left"
          v-model="plandata.searchValue.headline"
          placeholder="请输入培训主题"
        />
        <span>
          <el-date-picker
            class="w-10 m-2 mr-16 float-left"
            v-model="plandata.searchValue.timeframe"
            type="daterange"
            start-placeholder="请选择开始日期"
            end-placeholder="请选择结束日期"
            :default-time="defaultTime"
          />
          <el-select class="w-10 m-2 mr-16" v-model="plandata.searchValue.cultivateType" clearable  placeholder="请选择主题类型">
            <el-option
              v-for="item in plandata.dropdown.cultivateType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </span>

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
                      requestscope.$index+1 + (plandata.table.pageSize*(plandata.table.pageIndex-1))
                    }}</span>
              </template>
        </el-table-column>
        <el-table-column prop="headline" label="培训主题" min-width="10%" >
          <template #default="scope">
                <span class="elispice underline" @click="handleLook(scope.row)">{{
                  scope.row.headline}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cultivateTypeStr" label="主题类型" min-width="10%" />
        <el-table-column prop="creatTime" label="发布时间" min-width="10%" />
        <el-table-column label="操作列" width="250" min-width="28%">
          <template #default="scope">
            <el-button size="small" @click="handleLook(scope.row)"
              >查看</el-button>
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
            <el-empty v-loading="plandata.table.tableLoading"></el-empty>
        </template>
      </el-table>
      <div class="demo-pagination-block">
        <el-pagination
          :pageIndex="plandata.table.pageIndex"
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
  <Dialog
    v-model="plandata.dialog.dialogFormVisible"
    :dialogFormVisible="plandata.dialog.dialogFormVisible"
    :dialogTitle="plandata.dialog.title"
    :dialogTableValue="plandata.dialog.dialogTableValue"
  ></Dialog>
</div>

</template>
<script setup>
import Dialog from "./dialog.vue";
import { onBeforeMount, watch, getCurrentInstance } from "vue";
import { reactive, ref, markRaw } from "vue";
import { ElMessage, ElMessageBox,ElNotification } from "element-plus";
import { Delete } from "@element-plus/icons-vue";
import store from '@/store'
import { getymd } from "@/utils/auth";
import { getPlanList as getPlanList,deletePlan as deletePlan} from '@/api/train.js'
import { useRouter } from 'vue-router';
const router = useRouter();
let plandata =  reactive({
    searchValue:{
      trainingTheme:'',
      timeframe:'',
      cultivateType:''
    },
    dropdown:{
      cultivateType:[{
                      label: '专项培训',
                      value: 0
                    },{
                      label: '常规培训',
                      value: 1
                    }]
      },
    table:{
        tableLoading: false,
        pageIndex: 1,
        pageSize: 10,
        total:0,
        tableData: [],
    },
    dialog:{
      title:'编辑',
      dialogTableValue:{},
      dialogFormVisible:false
    }
})

const queryTableData = () => {
  plandata.table.tableLoading = true;
  let obj = {
    headline:plandata.searchValue.headline,
    cultivateType:plandata.searchValue.cultivateType,
    beginTime:plandata.searchValue.timeframe?getymd(plandata.searchValue.timeframe[0]):'',
    endTime:plandata.searchValue.timeframe?getymd(plandata.searchValue.timeframe[1]):'',
    pageIndex:plandata.table.plandata,
    pageSize:plandata.table.pageSize
  }
  getPlanList(obj)
    .then((res)=>{
      plandata.table.tableLoading = false;
      if(res.code === 200){
        console.log(res)
          let data = res.body;
          plandata.table.tableData=data&&data.data?data.data:[];
          plandata.table.total = data&&data.total?data.total:0;
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
    () => plandata.dialog.dialogFormVisible,
    () => {
      if(!plandata.dialog.dialogFormVisible){
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
  plandata.table.pageIndex = val;
  queryTableData();
};
//新建
const handleBuild = () => {
  plandata.dialog.title = "新建";
  plandata.dialog.dialogFormVisible = true;
};
//编辑
const handleEdit = (index, row) => {
  plandata.dialog.title = "编辑";
  plandata.dialog.dialogTableValue = JSON.parse(JSON.stringify(row));
  plandata.dialog.dialogFormVisible = true;
};
//删除
const handleDelete = (index, row) => {
  ElMessageBox.confirm("你确定删除此数据吗?", "删除", {
    type: "warning",
    icon: markRaw(Delete),
  })
    .then(() => {
      deletePlan(row.planId).then((res)=>{
        if(res.code === 200){
            if(plandata.table.tableData.length === 0&& plandata.table.pageIndex>1){
              plandata.table.pageIndex = plandata.table.pageIndex -1;
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
//查看
const handleLook = (row)=>{
  router.push({
        path:'/course',
        query:{
          id: row.planId
        }
  })
}

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