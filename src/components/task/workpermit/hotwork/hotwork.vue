<template>
                <div class="bottomBox" >
                    <div class="searchsize">
                        <el-col  class="searchBox">
                          <el-input
                              class="w-10 m-2 mr-16 float-left"
                              v-model="workData.searchValue.workNo"
                              placeholder="请输入作业票编号"
                          />
                          <el-select class="w-10 m-2 mr-16" v-model="workData.searchValue.source" clearable  placeholder="请选择来源">
                              <el-option
                              v-for="item in workData.dropdown.source"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                              />
                          </el-select>
                          <el-select class="w-10 m-2 mr-16" v-model="workData.searchValue.level" clearable  placeholder="请选择作业级别">
                              <el-option
                              v-for="item in workData.dropdown.level"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                              />
                          </el-select>
                          <el-select class="w-10 m-2 mr-16" v-model="workData.searchValue.applyCompanyId" clearable  placeholder="请选择作业申请单位">
                              <el-option
                              v-for="item in workData.dropdown.applyCompanyId"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                              />
                          </el-select>
                          <el-select class="w-10 m-2 mr-16" v-model="workData.searchValue.placeId" clearable  placeholder="请选择动火位置">
                              <el-option
                              v-for="item in workData.dropdown.placeId"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                              />
                          </el-select>
                          <el-select class="w-10 m-2 mr-16" v-model="workData.searchValue.state" clearable  placeholder="请选择状态">
                              <el-option
                              v-for="item in workData.dropdown.state"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                              />
                          </el-select>
                          <el-button type="primary" plain class="searchbutton " @click="queryTableData">查询</el-button>
                          <el-button type="primary" plain class="searchbutton " @click="addData">新建</el-button>
                        </el-col>
                    </div>
                    <div class="score_chartstyle">
                    <el-table
                        :data="workData.table.tableData"
                        :header-cell-style="{ background: '#F2F5FA' }"     
                        border
                        style="width: 100%"
                    > 
                        <el-table-column label="序号" min-width="7%">
                            <template #default="requestscope">
                                    <span >{{
                                    requestscope.$index+1 + (workData.table.pageSize*(workData.table.pageIndex-1))
                                    }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="workNo" label="作业票编号" min-width="10%" />
                        <el-table-column prop="sourceStr" label="来源" min-width="10%" />
                        <el-table-column prop="level" label="作业级别" min-width="10%" />
                        <el-table-column prop="applyCompanyId" label="作业申请单位" min-width="10%" />
                        <el-table-column prop="placeId" label="动火位置" min-width="10%" />
                        <el-table-column prop="methodId" label="动火方式" min-width="10%" />
                        <el-table-column prop="beginAndEndTime" label="动火作业实施时间" min-width="10%" />
                        <el-table-column prop="workCompanyId" label="作业单位" min-width="10%" />
                        <el-table-column prop="createUser" label="提交人" min-width="10%" />
                        <el-table-column prop="createTime" label="提交时间" min-width="10%" />
                        <el-table-column prop="state" label="状态" min-width="10%" >
                            <template #default="scope">
                                <span v-if="scope.row.state === 0">
                                        <el-tag 
                                        class="mr-16"
                                        :type="'info'"
                                        effect="light"
                                        disable-transitions
                                        >{{scope.row.stateStr}}</el-tag>
                                </span>
                                <span v-if="scope.row.state === 1">
                                        <el-tag 
                                        class="mr-16"
                                        :type="'primary'"
                                        effect="light"
                                        disable-transitions
                                        >{{scope.row.stateStr}}</el-tag>
                                </span>
                                <span v-if="scope.row.state === 2">
                                        <el-tag 
                                        class="mr-16"
                                        :type="'warning'"
                                        effect="light"
                                        disable-transitions
                                        >{{scope.row.stateStr}}</el-tag>
                                </span>
                                <span v-if="scope.row.state === 3">
                                        <el-tag 
                                        class="mr-16"
                                        :type="'success'"
                                        effect="light"
                                        disable-transitions
                                        >{{scope.row.stateStr}}</el-tag>
                                </span>
                                <span v-if="scope.row.state === 4">
                                        <el-tag 
                                        class="mr-16"
                                        :type="'danger'"
                                        effect="light"
                                        disable-transitions
                                        >{{scope.row.stateStr}}</el-tag>
                                </span>                                 
                            </template>
                        </el-table-column>
                        <el-table-column label="操作列" width="250" min-width="28%">
                            <template #default="scope">
                                <el-button size="small" @click="handleLook(scope.row)"
                                >查看</el-button>
                                <el-button v-if="scope.row.rebuildFlg" size="small" @click="editData(scope.row)"
                                >重建</el-button>
                            </template>
                        </el-table-column>
                        <template #empty>
                            <el-empty v-loading="workData.table.tableLoading"></el-empty>
                        </template>
                    </el-table>
                    <div class="demo-pagination-block">
                        <el-pagination
                            :pageIndex="workData.table.pageIndex"
                            :page-size="workData.table.pageSize"
                            :page-sizes="[5, 10, 15, 20]"
                            :small="small"
                            :disabled="disabled"
                            :background="background"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="workData.table.total"
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
import { getWorkPermitList as getWorkPermitList,deletePlan as deletePlan} from '@/api/train.js'
import { useRouter } from 'vue-router';
const router = useRouter();
const emit = defineEmits(['handleLook','addData','editData'])
let workData =  reactive({
    showForm:false,
    activeName:'first',
    examineContent:'',
    searchValue:{
      source:'',
      level:'',
      applyCompanyId:'',
      placeId:'',
      state:'',
      workNo:''
    },
    dropdown:{
      level:[{
                      label: '特级',
                      value: 0
                    },{
                      label: '一级',
                      value: 1
                    },{
                      label: '二级',
                      value: 2
                    }],
        state:[{
                        label: '待审批',
                        value: 0
                    }, {
                        label: '审批中',
                        value: 1
                    }, {
                        label: '已撤销',
                        value: 2
                    }, {
                        label: '通过',
                        value: 3
                    }, {
                        label: '不通过',
                        value: 4
                    }],
          source:[{
                        label: '新建',
                        value: 0
                    }, {
                        label: '重建',
                        value: 1
                    }],
          applyCompanyId:[{
                        label: '新建',
                        value: 0
                    }, {
                        label: '重建',
                        value: 1
                    }],
          placeId:[{
                        label: '新建',
                        value: 0
                    }, {
                        label: '重建',
                        value: 1
                    }],         
      },
    table:{
        tableLoading: false,
        pageIndex: 1,
        pageSize: 10,
        total:0,
        tableData: [{
          courseName:''
        }],
    },
    dialog:{
      title:'编辑',
      dialogTableValue:{},
      dialogFormVisible:false
    }
})

const queryTableData = () => {
  workData.table.tableLoading = true;
  let obj = JSON.parse(JSON.stringify(workData.searchValue))
  obj.pageIndex = workData.table.pageIndex;
  obj.pageSize = workData.table.pageSize;
  // let obj = {
  //       pageIndex:workData.table.pageIndex,
  //       pageSize:workData.table.pageSize
  // }
  let user = JSON.parse(localStorage.getItem('userData'))
  getWorkPermitList(obj,user.username)
    .then((res)=>{
      workData.table.tableLoading = false;
      if(res.code === 200){
        console.log(res)
          let data = res.body;
          workData.table.tableData=data&&data.data?data.data:[];
          workData.table.total = data&&data.total?data.total:0;
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
    () => workData.dialog.dialogFormVisible,
    () => {
      if(!workData.dialog.dialogFormVisible){
        queryTableData();
      }
    },
    { deep: true, immediate: true }
)

//切换一页显示多少条数据
const handleSizeChange = (val) => {
  workData.table.pageSize = val;
  queryTableData();
};
// 点击跳转到第几页
const handleCurrentChange = (val) => {
  workData.table.pageIndex = val;
  queryTableData();
};

//新建
const addData=()=>{
      emit('addData',{
        showHotworkAdd:true
    })
}
//重建
const editData = () => {
    emit('editData',{
        showHotworkAdd:true
    })
}
//查看
const handleLook = (row)=>{
    emit('handleLook',{
        hotWorkId:row.workId,
        showHotworkLook:true
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