<template>
  <div class="totalStyle" v-if="!scoreData.showExamine">
    <div class="tablestyle">
        <el-tabs v-model="scoreData.activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="分数查看" name="first">
                <scoreLook @handleLook = 'handleLook'> </scoreLook>
            </el-tab-pane>
            <el-tab-pane label="积分排名" name="second"><rank/></el-tab-pane>
        </el-tabs>
    </div>
  </div>
    <div class="totalStyle" v-if="scoreData.showExamine">
        <Dialog :examineContent = 'scoreData.examineContent' @callback = 'callback'></Dialog>
    </div>
</template>
<script setup>
import scoreLook from "./scoreLook/scoreLook.vue";
import rank from "./rank/rank.vue";
import Dialog from "./dialog.vue";
import { reactive, ref,markRaw } from "vue";
let scoreData =  reactive({
    showExamine:false,
    activeName:'first',
    examineContent:'',
})


// //查看
const handleLook = (obj)=>{
    scoreData.showExamine = obj.showExamine;
    scoreData.examineContent = obj.examineContent;
}
const callback = () => {
    scoreData.showExamine = false;
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

// .demo-pagination-block {
//   margin-top: 16px;
//   position: absolute;
//   bottom: 32px;
//   right: 32px;
// }

.searchbutton{
  float: right;
}
// .score_chartstyle{
//    height: calc(100% - 65px);
//    margin-top: 16px;
// }
</style>