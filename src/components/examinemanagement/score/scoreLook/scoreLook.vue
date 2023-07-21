<template>
                <div class="bottomBox" >
                    <div class="searchsize">
                        <el-col  class="searchBox">
                          <el-input
                              class="w-10 m-2 mr-16 float-left"
                              v-model="scoreData.searchValue.courseName"
                              placeholder="请输入考核课程"
                          />
                          <el-select class="w-10 m-2 mr-16" v-model="scoreData.searchValue.examineType" clearable  placeholder="请选择考核方式">
                              <el-option
                              v-for="item in scoreData.dropdown.examineType"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                              />
                          </el-select>
                          <el-button type="primary" plain class="searchbutton " @click="queryTableData">查询</el-button>
                        </el-col>
                    </div>
                    <div class="score_chartstyle">
                    <el-table
                        :data="scoreData.table.tableData"
                        :header-cell-style="{ background: '#F2F5FA' }"     
                        border
                        style="width: 100%"
                    > 
                        <el-table-column label="序号" min-width="7%">
                            <template #default="requestscope">
                                    <span >{{
                                    requestscope.$index+1 + (scoreData.table.pageSize*(scoreData.table.pageIndex-1))
                                    }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="courseName" label="考核课程" min-width="10%" />
                        <el-table-column prop="examineTypeStr" label="考核方式" min-width="10%" />
                        <el-table-column prop="examineBeginTime" label="考试开始时间" min-width="10%" />
                        <el-table-column prop="examineEndTime" label="考试结束时间" min-width="10%" />
                        <el-table-column prop="examineDuration" label="考试时长/分钟" min-width="10%" />
                        <el-table-column prop="questionNum" label="题量" min-width="10%" />
                        <el-table-column prop="gradesSum" label="总分" min-width="10%" />
                        <el-table-column prop="passCriteria" label="及格线" min-width="10%" />
                        <el-table-column prop="creatTime" label="考试结果" min-width="10%" >
                            <template #default="scope">
                                <span v-if="scope.row.examineState === 3">
                                        <el-tag 
                                        class="mr-16"
                                        :type="'danger'"
                                        effect="light"
                                        disable-transitions
                                        >不及格</el-tag>{{scope.row.grade}}
                                </span>
                                <span v-if="scope.row.examineState === 4">
                                        <el-tag 
                                        class="mr-16"
                                        :type="''"
                                        effect="light"
                                        disable-transitions
                                        >及格</el-tag> {{scope.row.grade}}
                                </span>
                                <span v-if="scope.row.examineState === 5">
                                        <el-tag 
                                        class="mr-16"
                                        :type="'success'"
                                        effect="light"
                                        disable-transitions
                                        >优秀</el-tag>{{scope.row.grade}}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作列" width="250" min-width="28%">
                            <template #default="scope">
                                <el-button size="small" @click="handleLook(scope.row)"
                                >查看</el-button>
                            </template>
                        </el-table-column>
                        <template #empty>
                            <el-empty v-loading="scoreData.table.tableLoading"></el-empty>
                        </template>
                    </el-table>
                    <div class="demo-pagination-block">
                        <el-pagination
                            :pageIndex="scoreData.table.pageIndex"
                            :page-size="scoreData.table.pageSize"
                            :page-sizes="[5, 10, 15, 20]"
                            :small="small"
                            :disabled="disabled"
                            :background="background"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="scoreData.table.total"
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                        />
                    </div>
                    </div>
                </div>
</template>

<script setup>
import { onBeforeMount, watch, getCurrentInstance } from "vue";
import { reactive, ref,markRaw,defineEmits } from "vue";
import { ElMessage, ElMessageBox,ElNotification } from "element-plus";
import { Delete } from "@element-plus/icons-vue";
import store from '@/store'
import { getymd } from "@/utils/auth";
import { ranking as ranking,deletePlan as deletePlan} from '@/api/train.js'
import { useRouter } from 'vue-router';
const router = useRouter();
const emit = defineEmits(['handleLook'])
let scoreData =  reactive({
    showExamine:false,
    activeName:'first',
    examineContent:'',
    searchValue:{
      courseName:'',
      examineType:'',
      examineState:''
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
                    }],
        examineState:[{
                        label: '优秀',
                        value: 5
                    }, {
                        label: '及格',
                        value: 4
                    }, {
                        label: '不及格',
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
    }
})

const queryTableData = () => {
  scoreData.table.tableLoading = true;
  let obj = {
        courseName: scoreData.searchValue.courseName,
        examineState:scoreData.searchValue.examineState,
        examineType: scoreData.searchValue.examineType,
        pageIndex:scoreData.table.pageIndex,
        pageSize:scoreData.table.pageSize
  }
  let user = JSON.parse(localStorage.getItem('userData'))
  ranking(obj,user.username)
    .then((res)=>{
      scoreData.table.tableLoading = false;
      if(res.code === 200){
        console.log(res)
          let data = res.body;
          scoreData.table.tableData=data&&data.data?data.data:[];
          scoreData.table.total = data&&data.total?data.total:0;
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
    () => scoreData.dialog.dialogFormVisible,
    () => {
      if(!scoreData.dialog.dialogFormVisible){
        queryTableData();
      }
    },
    { deep: true, immediate: true }
)

//切换一页显示多少条数据
const handleSizeChange = (val) => {
  scoreData.table.pageSize = val;
  queryTableData();
};
// 点击跳转到第几页
const handleCurrentChange = (val) => {
  scoreData.table.pageIndex = val;
  queryTableData();
};


//查看
const handleLook = (row)=>{
    emit('handleLook',{
        examineContent:row,
        showExamine:true
    })
}
</script>

<style lang = 'less' scoped>
.score_chartstyle{
   height: calc(100% - 65px);
   margin-top: 16px;
}
.demo-pagination-block {
  margin-top: 16px;
  position: absolute;
  bottom: 32px;
  right: 32px;
}
</style>