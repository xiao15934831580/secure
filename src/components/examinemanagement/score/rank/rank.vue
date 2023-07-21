<template>
                  <div class="bottomBox" >
                    <div class="searchsize">
                        <el-col  class="searchBox">
                        <el-select class="w-10 m-2 mr-16" v-model="scoreData.searchValue.companyId" clearable  placeholder="请选择所属单位">
                            <el-option
                            v-for="item in scoreData.dropdown.company"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            />
                        </el-select>
                        <el-select class="w-10 m-2 mr-16" v-model="scoreData.searchValue.departmentId" clearable  placeholder="请选择所属部门">
                            <el-option
                            v-for="item in scoreData.dropdown.department"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            />
                        </el-select>
                        <el-button type="primary" plain class="searchbutton " @click="queryTableData" >查询</el-button>
                        </el-col>
                    <!-- <el-col :span="4">

                    
                    </el-col> -->
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
                        <el-table-column prop="realName" label="姓名" min-width="10%" />
                        <el-table-column prop="companyName" label="所属单位" min-width="10%" />
                        <el-table-column prop="departmentName" label="所属部门" min-width="10%" />
                        <el-table-column prop="pointsSum" label="累计积分" min-width="10%" />
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
// import Dialog from "./dialog.vue";
import { onBeforeMount, watch, getCurrentInstance } from "vue";
import { reactive, ref,markRaw,defineEmits } from "vue";
import { ElMessage, ElMessageBox,ElNotification } from "element-plus";
import { Delete } from "@element-plus/icons-vue";
import store from '@/store'
import { getymd } from "@/utils/auth";
import { getPoints as getPoints} from '@/api/train.js'
import { useRouter } from 'vue-router';
const router = useRouter();
let scoreData =  reactive({
    searchValue:{
      companyId:'',
      departmentId:'',
    },
    dropdown:{
      company:[{
                    }],
        department:[{
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
        companyId: scoreData.searchValue.companyId,
        departmentId:scoreData.searchValue.departmentId,
        pageIndex:scoreData.table.pageIndex,
        pageSize:scoreData.table.pageSize
  }
  getPoints(obj)
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