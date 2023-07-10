<template>
  <div class="totalStyle" v-if="examineData.isShowList">
    <div class="tablestyle">
      <div class="titleStyle">
        <p class="leftTitle">培训规划及方式</p>
        <el-button type="primary"   @click="handleBuild">新建</el-button>
      </div>
      <div class="bottomBox">
        <div class="searchsize">
          <el-col  class="searchBox">
            <el-input
              class="w-10 m-2 mr-16 float-left"
              v-model="examineData.searchValue.courseName"
              placeholder="请输入考试科目"
            />
            <span>
              <el-select class="w-10 m-2 mr-16" v-model="examineData.searchValue.examineType" clearable  placeholder="请选择考核方式">
                <el-option
                  v-for="item in examineData.dropdown.examineType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </span>
            <el-button type="primary" plain  @click="queryTableData"
            >查询</el-button>
          </el-col>
        </div>
        <div class="chartstyle">
          <el-table
            :data="examineData.table.tableData"
            :header-cell-style="{ background: '#F2F5FA' }"     
            border
            style="width: 100%"
          > 
            <el-table-column label="序号" min-width="7%">
                  <template #default="requestscope">
                        <span >{{
                          requestscope.$index+1 + (examineData.table.pageSize*(examineData.table.pageIndex-1))
                        }}</span>
                  </template>
            </el-table-column>
            <el-table-column prop="examineTypeStr" label="考核方式" min-width="10%" />
            <el-table-column prop="courseName" label="考核课程" min-width="10%" />
            <el-table-column prop="examineBeginTime" label="考试开始时间" min-width="10%" />
            <el-table-column prop="examineEndTime" label="考试截止时间" min-width="10%" />
            <el-table-column prop="examineDuration" label="考核时长/分钟" min-width="10%" />
            <el-table-column prop="questionNum" label="题量" min-width="10%" />
            <el-table-column prop="gradesSum" label="总分数" min-width="10%" />
            <el-table-column prop="passCriteria" label="及格线" min-width="10%" />
            <el-table-column prop="examineState" label="考试结果" min-width="10%">
              <template #default="scope">
              <span v-if="scope.row.examineState === 0">
                    <el-tag 
                      :type="''"
                      effect="light"
                      disable-transitions
                      >未开考</el-tag>
              </span>
               <span v-if="scope.row.examineState === 1">
                    <el-tag 
                      :type="'danger'"
                      effect="light"
                      disable-transitions
                      >考试中</el-tag> 
              </span>
              <span v-if="scope.row.examineState === 2">
                    <el-tag 
                      :type="'info'"
                      effect="light"
                      disable-transitions
                      >已考完</el-tag>
              </span>
              </template>
            </el-table-column>
            <el-table-column label="操作列" width="250" min-width="28%">
              <template #default="scope">
              <el-button v-if="scope.row.examineState === 1" size="small" @click="examineStart(scope.row)"
                  >开始考试</el-button>
                <el-button size="small" @click="handleLook(scope.row)"
                  >查看</el-button>
                <el-button  size="small" @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button>
                <el-button v-if="scope.row.examineState === 0"
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button>
              </template>
            </el-table-column>
            <template #empty>
                <el-empty v-loading="examineData.table.tableLoading"></el-empty>
            </template>
          </el-table>
          <div class="demo-pagination-block">
            <el-pagination
              :pageIndex="examineData.table.pageIndex"
              :page-size="examineData.table.pageSize"
              :page-sizes="[5, 10, 15, 20]"
              :small="small"
              :disabled="disabled"
              :background="background"
              layout="total, sizes, prev, pager, next, jumper"
              :total="examineData.table.total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 编辑 -->
    <Dialog
      v-model="examineData.dialog.dialogFormVisible"
      :dialogFormVisible="examineData.dialog.dialogFormVisible"
      :dialogTitle="examineData.dialog.title"
      :dialogTableValue="examineData.dialog.dialogTableValue"
    ></Dialog>
  </div>
  <div class="totalStyle" v-if="!examineData.isShowList">
        <Startexamine :examineContent = 'examineData.examineContent'></Startexamine>
  </div>
</template>
<script setup>
import Dialog from "./editDialog.vue";
import Startexamine from "./startexamine.vue";
import { onBeforeMount, watch, getCurrentInstance } from "vue";
import { reactive, ref, markRaw } from "vue";
import { ElMessage, ElMessageBox,ElNotification } from "element-plus";
import { Delete } from "@element-plus/icons-vue";
import store from '@/store'
import { getymd } from "@/utils/auth";
import { findExamineList as findExamineList,deletePlan as deletePlan} from '@/api/train.js'
import { useRouter } from 'vue-router';
const router = useRouter();
let examineData =  reactive({
    isShowList:true,
    examineContent:{},
    searchValue:{
      courseName:'',
      examineType:''
    },
    dropdown:{
      examineType:[{
                      label: '日考',
                      value: 0
                    },{
                      label: '周考',
                      value: 1
                    },{
                      label: '月考',
                      value: 2
                    },{
                      label: '年考',
                      value: 3
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
    },
    examine:{
      countdown:''
    }
})

const queryTableData = () => {
  examineData.table.tableLoading = true;
  let obj = {
    courseName:examineData.searchValue.courseName,
    examineType:examineData.searchValue.examineType,
    pageIndex:examineData.table.pageIndex,
    pageSize:examineData.table.pageSize
  }
  let user = JSON.parse(localStorage.getItem('userData'))
  findExamineList(obj,user.username)
    .then((res)=>{
      examineData.table.tableLoading = false;
      if(res.code === 200){
        console.log(res)
          let data = res.body;
          examineData.table.tableData=data&&data.data?data.data:[];
          examineData.table.total = data&&data.total?data.total:0;
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
    () => examineData.dialog.dialogFormVisible,
    () => {
      if(!examineData.dialog.dialogFormVisible){
        queryTableData();
      }
    },
    { deep: true, immediate: true }
)

//切换一页显示多少条数据
const handleSizeChange = (val) => {
  examineData.table.pageSize = val;
  queryTableData();
};
// 点击跳转到第几页
const handleCurrentChange = (val) => {
  examineData.table.pageIndex = val;
  queryTableData();
};
//新建
const handleBuild = () => {
  examineData.dialog.title = "新建";
  examineData.dialog.dialogFormVisible = true;
};
//编辑
const handleEdit = (index, row) => {
  examineData.dialog.title = "编辑";
  examineData.dialog.dialogTableValue = JSON.parse(JSON.stringify(row));
  examineData.dialog.dialogFormVisible = true;
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
            if(examineData.table.tableData.length === 0&& examineData.table.pageIndex>1){
              examineData.table.pageIndex = examineData.table.pageIndex -1;
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
//开始考试
const examineStart = (row)=>{
  examineData.isShowList = false;
  examineData.examineContent = row;
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

.demo-pagination-block {
  margin-top: 16px;
  position: absolute;
  bottom: 32px;
  right: 32px;
}

.searchbutton{
  float: right;
}

</style>