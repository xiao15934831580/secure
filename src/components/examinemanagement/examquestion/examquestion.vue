<template>
  <div class="totalStyle">
    <div class="tablestyle">
      <div class="titleStyle">
        <p class="leftTitle font_w">培训规划及方式</p>
        <el-button type="primary"   @click="handleBuild">新建</el-button>
      </div>
      <div class="bottomBox">
        <div class="searchsize">
          <el-button class="deleteAll" @click="deleteAll">批量删除</el-button>
          <el-col  class="searchBox">
            <el-input
              class="w-10 m-2 mr-16 float-left"
              v-model="examineQuestionData.searchValue.courseName"
              placeholder="请输入考试课程"
            />
            <span>
              <el-select class="w-10 m-2 mr-16" v-model="examineQuestionData.searchValue.questionType" clearable  placeholder="请选择考核题型">
                <el-option
                  v-for="item in examineQuestionData.dropdown.questionType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-date-picker
                  class="w-10 m-2 mr-16 float-left"
                  v-model="examineQuestionData.searchValue.timeframe"
                  type="daterange"
                  start-placeholder="请选择发布开始日期"
                  end-placeholder="请选择发布结束日期"
                  :default-time="defaultTime"
              />
            </span>
            <el-button type="primary" plain  @click="queryTableData">查询</el-button>
          </el-col>
        </div>
        <div class="chartstyle">
          <el-table
              ref="multipleTableRef"
            :data="examineQuestionData.table.tableData"
            :header-cell-style="{ background: '#F2F5FA' }"     
              @selection-change="handleSelectionChange"
              @select="handleSelect"
              :row-key="getRowKeys"
            border
            style="width: 100%"
          > 
          <el-table-column type="selection" width="55" :reserve-selection="true"/>
            <el-table-column label="序号" min-width="7%">
                  <template #default="requestscope">
                        <span >{{
                          requestscope.$index+1 + (examineQuestionData.table.pageSize*(examineQuestionData.table.pageIndex-1))
                        }}</span>
                  </template>
            </el-table-column>
            <!-- <el-table-column prop="examineTypeStr" label="考核方式" min-width="10%" /> -->
            <el-table-column prop="courseNames" label="考核课程" min-width="10%" />
              <!-- <template #default="scope">
                    <span class="elispice underline" @click="handleLook(scope.row)">{{
                      scope.row.headline}}</span>
              </template>
            </el-table-column> -->
            <el-table-column prop="questionTypeStr" label="题型" min-width="10%" />
            <el-table-column prop="question" label="题干" min-width="10%" />
            <el-table-column prop="t_options" label="选项" min-width="10%" />
            <el-table-column prop="t_answer" label="答案" min-width="10%" >
                <template #default="scope">
                  <span v-if="scope.row.t_answer === '0'">错误</span>
                  <span v-else-if="scope.row.t_answer === '1'">正确</span>
                </template>
            </el-table-column>
            <el-table-column prop="answerExplain" label="答案解析" min-width="10%" />
            <el-table-column prop="createTime" label="录入日期" min-width="10%" />
            <el-table-column label="操作列" width="250" min-width="28%">
              <template #default="scope">
              <!-- <el-button size="small" @click="examineStart(scope.row)"
                  >开始考试</el-button> -->
                <el-button size="small" @click="handleLook(scope.row)"
                  >查看</el-button>
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button>
                <!-- <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button> -->
              </template>
            </el-table-column>
            <template #empty>
                <el-empty v-loading="examineQuestionData.table.tableLoading"></el-empty>
            </template>
          </el-table>
          <div class="demo-pagination-block">
            <el-pagination
              :pageIndex="examineQuestionData.table.pageIndex"
              :page-size="examineQuestionData.table.pageSize"
              :page-sizes="[5, 10, 15, 20]"
              :small="small"
              :disabled="disabled"
              :background="background"
              layout="total, sizes, prev, pager, next, jumper"
              :total="examineQuestionData.table.total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 编辑 -->
    <Dialog
      v-model="examineQuestionData.dialog.dialogFormVisible"
      :dialogFormVisible="examineQuestionData.dialog.dialogFormVisible"
      :dialogTitle="examineQuestionData.dialog.title"
      :dialogTableValue="examineQuestionData.dialog.dialogTableValue"
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
import { getymdhms } from "@/utils/auth";
import { getQuestionList as getQuestionList, deleteQuestions as deleteQuestions} from '@/api/train.js'
import { useRouter } from 'vue-router';
const router = useRouter();
const multipleTableRef = ref();
const multipleSelection=ref ([])
let examineQuestionData =  reactive({
    searchValue:{
        courseName:'',
        questionType:'',
        beginTime:'',
        endTime:'',
        timeframe:''
    },
    dropdown:{
      questionType:[{
                      label: '单选',
                      value: 0
                    },{
                      label: '多选',
                      value: 1
                    },{
                      label: '判断',
                      value: 2
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
  examineQuestionData.table.tableLoading = true;
  let obj = {
    beginTime:examineQuestionData.searchValue.timeframe?getymdhms(examineQuestionData.searchValue.timeframe[0]):'',
    endTime:examineQuestionData.searchValue.timeframe?getymdhms(examineQuestionData.searchValue.timeframe[1]):'',
    questionType:examineQuestionData.searchValue.questionType,
    courseName:examineQuestionData.searchValue.courseName,
    pageIndex:examineQuestionData.table.pageIndex,
    pageSize:examineQuestionData.table.pageSize
  }
  getQuestionList(obj)
    .then((res)=>{
      examineQuestionData.table.tableLoading = false;
      if(res.code === 200){
        console.log(res)
          let data = res.body;
          examineQuestionData.table.tableData=data&&data.data?data.data:[];
          examineQuestionData.table.total = data&&data.total?data.total:0;
          handleRowSelection(examineQuestionData.table.tableData)
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
    () => examineQuestionData.dialog.dialogFormVisible,
    () => {
      if(!examineQuestionData.dialog.dialogFormVisible){
        queryTableData();
      }
    },
    { deep: true, immediate: true }
)

//切换一页显示多少条数据
const handleSizeChange = (val) => {
  examineQuestionData.table.pageSize = val;
  queryTableData();
};
// 点击跳转到第几页
const handleCurrentChange = (val) => {
  examineQuestionData.table.pageIndex = val;
  queryTableData();
};
//新建
const handleBuild = () => {
  examineQuestionData.dialog.title = "新建";
  examineQuestionData.dialog.dialogFormVisible = true;
};
//编辑
const handleEdit = (index, row) => {
  examineQuestionData.dialog.title = "编辑";
  examineQuestionData.dialog.dialogTableValue = JSON.parse(JSON.stringify(row));
  examineQuestionData.dialog.dialogFormVisible = true;
};

//查看
const handleLook = (row)=>{
  examineQuestionData.dialog.title = "查看";
  examineQuestionData.dialog.dialogTableValue = JSON.parse(JSON.stringify(row));
  examineQuestionData.dialog.dialogFormVisible = true;
}

const getRowKeys=(row)=> {
    return row.id;
}
let selectedObj = {}
const handleSelect = (selection,row)=>{
  console.log(selection)
  if(!selection.some((item)=>{ item.questionId === row.questionId})){
    delete selectedObj[row.questionId]
  }
}
const handleRowSelection=(data)=>{
  if(data){
      data.forEach((item)=>{
        if(selectedObj[item.questionId]){
          nextTick(()=>{
            multipleTableRef.value.toggleRowSelection(item,true)
          })
        }
      })
  }else{
    multipleTableRef.value.clearSelection()
  }

}
const  handleSelectionChange=(val)=> {
      //全选取消
      if(val.length === 0){
        examineQuestionData.table.tableData.forEach((item)=>{
          delete selectedObj[item.questionId]
        })
      }
      //勾选数据
      selectedObj={}
      val.forEach((item) => {
        selectedObj[item.questionId] = item
      })
      //获取所有分页勾选的数据
      multipleSelection.value = [];
      let arr = []
        for(const key in selectedObj){
          multipleSelection.value.push(selectedObj[key])
        }
      }
//批量删除
const deleteAll = ()=>{
     console.log(multipleSelection._rawValue)  //当前所选中的用户id
     let arr = [];
     if(multipleSelection._rawValue.length > 0){
       multipleSelection._rawValue.forEach((item,index)=>{
         arr.push(item.questionId)
       })
     }
     console.log(arr)
     let obj = {
       questionIds:arr
     }
     deleteQuestions(obj).then((res) => {
       if(res.code === 200){
           if(examineQuestionData.table.tableData.length === 1&& examineQuestionData.table.pageIndex>1){
              examineQuestionData.table.pageIndex = examineQuestionData.table.pageIndex -1;
            }
             ElNotification({
              title: '删除成功',
              message: '删除成功',
              type: 'Success',
            })
            multipleTableRef.value.clearSelection()
            queryTableData();
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
.deleteAll{
  margin-right: 16px;
  border: 1px solid #DADFE6;
}
</style>