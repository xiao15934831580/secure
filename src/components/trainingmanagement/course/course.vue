<template>
<div class="totalStyle">
    <div class="tablestyle">
      <div class="titleStyle">
        <p class="leftTitle">培训课程及内容</p>
        <el-button type="primary"   @click="handleBuild">新建</el-button>
      </div>
      <div class="bottomBox">
        <div class="searchsize">
          <el-col  class="searchBox">
            <el-input
              class="w-10 m-2 mr-16 float-left"
              v-model="modeldata.searchValue.headline"
              placeholder="请输入培训主题"
            />
            <el-input
              class="w-10 m-2 mr-16 float-left"
              v-model="modeldata.searchValue.courseName"
              placeholder="请输入课程名称"
            />
            <el-select class="w-10 m-2 mr-16" v-model="modeldata.searchValue.cultivateType" clearable  placeholder="请选择培训类型">
              <el-option
                v-for="item in modeldata.dropdown.cultivateType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
            <el-table-column prop="cultivateTypeStr" label="主题类型" min-width="10%" />
            <el-table-column prop="headline" label="培训主题" min-width="10%" />
            <el-table-column prop="courseName" label="课程名称" min-width="10%" >
              <template #default="scope">
                    <span class="elispice underline" @click="lookCourseName(scope.row)">{{
                      scope.row.courseName}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="courseTypeStr" label="课件类型" min-width="10%" />
            <el-table-column prop="lecturer" label="发布人" min-width="10%" />
            <el-table-column prop="passCriteria" label="及格线" min-width="10%" />
            <!-- <el-table-column prop="learnTime" label="累计学习时间" min-width="10%" /> -->
            <!-- <el-table-column prop="checkEndTime" label="考试时间" min-width="10%" /> -->
            <el-table-column prop="learnStateStr" label="培训对象" min-width="10%" />
            <el-table-column label="操作列" width="250" min-width="28%">
              <template #default="scope">
                <el-button size="small" @click="handleLook(scope.$index, scope.row)"
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
  <Dialog
    v-model="modeldata.dialog.dialogFormVisible"
    :dialogFormVisible="modeldata.dialog.dialogFormVisible"
    :dialogTitle="modeldata.dialog.title"
    :dialogTableValue="modeldata.dialog.dialogTableValue"
  ></Dialog>
   <el-dialog ref="modeldata.video.courseFile" 
            :model-value="modeldata.video.fileLog"
            :before-close="close"
            width="900px"
            :close-on-click-modal="false"
            draggable>
      <!-- <video  width="1050" ref="modeldata.video.videoRef" height="700" controls autoplay @timeupdate="updateTime">

            <source :src= 'modeldata.video.courseUrl' type="video/mp4" />

        </video> -->
          <videoPlay 
            v-bind="modeldata.options" 
            id = 'myvideo'
            @play="onPlay"
            @pause="onPause" 
            @timeupdate="onPlayerTimeupdate($event)"
            @canplay="onCanplay" />
  </el-dialog>

</div>

</template>
<script setup>
import Dialog from "./dialog.vue";
import { onBeforeMount, watch, getCurrentInstance } from "vue";
import { reactive, ref, markRaw } from "vue";
import { ElMessage, ElMessageBox,ElNotification } from "element-plus";
import { Delete } from "@element-plus/icons-vue";
import store from '@/store'
import { findCourse as findCourse,deleteCourse as deleteCourse} from '@/api/train.js'
import {onMounted} from 'vue';
import { useRouter } from 'vue-router';
import 'vue3-video-play/dist/style.css'
import { videoPlay } from 'vue3-video-play'
const router = useRouter();
let modeldata =  reactive({
    searchValue:{
      headline:'',
      courseName:'',
      // learnState:'',
      cultivateType:''
    },
    routerId:'',
    dropdown:{
      cultivateType:[{
                      label: '专项培训',
                      value: "0"
                    },{
                      label: '常规培训',
                      value: "1"
                    }],
      // learnState:[{
      //               label: '已学习',
      //               value: "1"
      //             },{
      //               label: '未学习',
      //               value: "0"
      //             }]
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
      dialogFormVisible:false,
    },
    video:{
      fileLog:false,
      courseUrl:'',
      courseFile:'',
      videoRef:''
    },
    options: {
        width: '850px', //播放器宽度
        height: '450px', //播放器高度
        color: "#409eff", //主题色
        muted: false, //静音
        webFullScreen: false,
        speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
        autoPlay: false, //自动播放
        loop: false, //循环播放
        mirror: false, //镜像画面
        ligthOff: false,  //关灯模式
        volume: 0.3, //默认音量大小
        control: true, //是否显示控制器
        title: '', //视频名称
        src: "", //视频源
        poster: '', //封面
        // type: 'mp4', //视频类型
      }
})
const queryTableData = () => {
  modeldata.table.tableLoading = true;
  let obj = JSON.parse(JSON.stringify(modeldata.searchValue))
  obj.pageIndex = modeldata.table.pageIndex
  obj.pageSize = modeldata.table.pageSize
  obj.planId = router.currentRoute.value.query.id
  console.log(obj)
  findCourse(obj)
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
    () => modeldata.dialog.dialogFormVisible,
    () => {
      if(!modeldata.dialog.dialogFormVisible){
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
  modeldata.dialog.dialogFormVisible = true;
};
//编辑
const handleEdit = (index, row) => {
  modeldata.dialog.title = "编辑";
  modeldata.dialog.dialogTableValue = JSON.parse(JSON.stringify(row));
  modeldata.dialog.dialogFormVisible = true;
};
//查看
const handleLook = (index, row) => {
  modeldata.dialog.title = "查看";
  modeldata.dialog.dialogTableValue = JSON.parse(JSON.stringify(row));
  modeldata.dialog.dialogFormVisible = true;
};
//删除
const handleDelete = (index, row) => {
  ElMessageBox.confirm("你确定删除此数据吗?", "删除", {
    type: "warning",
    icon: markRaw(Delete),
  })
    .then(() => {
      deleteCourse(row.courseId).then((res)=>{
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
//查看课程
const lookCourseName = (row)=>{
  if(row.courseTypeStr==='视频'){
    modeldata.options.src = row.courseUrl
    modeldata.video.fileLog = true;
  }else{
    window.open(row.courseUrl)
  }
  
}
// 关闭弹框
const close = () => {
  modeldata.video.fileLog = false;
};
//视频当前播放时间
// 当前播放进度
const onPlayerTimeupdate =(player) =>{
            let ideoTime = document.getElementById("myvideo")
            let  durations = parseInt(ideoTime.currentTime) //当前播放时长
            let videoSumTime = parseInt(ideoTime.duration); //视频总时长
            console.log(durations,videoSumTime);
            // console.log(' onPlayerTimeupdate!', player)
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
:deep(.customer-no-border-table .el-table--border, .el-table--group){
     border: none;
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

</style>