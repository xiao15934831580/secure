<template>
  <div class="totalStyle" v-if="hotwork.showList">
    <div class="tablestyle">
        <el-tabs v-model="hotwork.activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="动火作业" name="first">
                <Hotwork @editData = 'editData'> </Hotwork>
            </el-tab-pane>
            <el-tab-pane label="受限空间" name="second">
                <!-- <rank/> -->
            </el-tab-pane>
            <el-tab-pane label="盲板抽堵作业" name="second">
            </el-tab-pane>
        </el-tabs>
    </div>
  </div>
    <div class="totalStyle" v-if="!hotwork.showList">
        <Dialog v-if="hotwork.showHotworkEdit"     @callback = 'callback' :titleName='hotwork.editData.titleName'></Dialog>
        <!-- <Detail v-if="hotwork.showHotworkLook" :hotWorkId = 'hotwork.hotworkContent.hotWorkId' @callback = 'callback'></Detail> -->
    </div>
</template>
<script setup>
import Hotwork from "./hotwork/hotwork.vue";
// import Detail from "./hotwork/detail.vue";
import Dialog from "./hotwork/dialog.vue";
import { reactive, ref,markRaw } from "vue";
let hotwork =  reactive({
    showList:true,
    showHotworkEdit:false,
    activeName:'first',
    hotworkContent:{
      title:'',
      hotWorkId:'',
      dropdown:''
    },
    editData:{
      titleName: ""
    }
})


//重建state
const editData = (obj)=>{
  hotwork.showHotworkEdit = obj.showHotworkEdit;
  hotwork.showList = false;
  hotwork.editData.titleName = obj.titleName
  // hotwork.hotworkContent.title = '重建';
  //  hotwork.hotworkContent.dropdown = obj.dropdown;
  //  hotwork.hotworkContent.hotWorkId = obj.hotWorkId;
}
const allFalse = ()=>{
  hotwork.showList = false;
  hotwork.showHotworkAdd = false;
  hotwork.showHotworkLook = false;
}
const callback = () => {
  console.log("111callback")
  allFalse()
  hotwork.showList = true;
}
</script>
<style  lang = 'less' scoped>
:deep(.el-table--fit){
  height:100%;
}
:deep(.el-tabs__nav-scroll){
    height: 56px;
    padding-top: 3px;
}
:deep(.el-tabs__nav-wrap::after){
    height: 0px;
}
:deep(.el-tabs__item){
    font-size: 15px;
    font-weight: 600;
}
:deep(.el-tabs__header){
    padding: 0 16px;
    margin-bottom: 0;
}
:deep(.el-tabs__content){
    border-top: 1px solid #DADFE6;
    height: calc(100% - 56px);
}
:deep(.el-tabs){
    height: 100%;
}
:deep(.el-tab-pane){
    height: 100%;
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

.searchbutton{
  float: right;
}
</style>