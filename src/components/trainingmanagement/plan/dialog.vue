<template>
  <div class="plan-dialog">
    <el-dialog
      ref="ruleFormRef"
      :model-value="dialogData.props.dialogFormVisible"
      :title="dialogData.props.title"
      :before-close="close"
      :width="dialogData.formLabelWidth"
      :close-on-click-modal="false"
      draggable
    >
      <div>
        <!-- 基础信息 -->
        <!-- <p class="basicinfo"><span>车辆信息</span></p> -->
        <div >
          <el-form
            :model="dialogData.formData"
            :inline="true"
            label-width="160px"
            :rules="dialogData.rules"
            ref="addform"
            require-asterisk-position="left"
            size="default"
            scroll-to-error="true"
          >
            <div class="basicstyle">
              <el-form-item label="主题名称" prop="headline" required>
                <el-input
                :disabled="dialogData.props.title === '查看'"
                  placeholder="请输入主题名称"
                  v-model="dialogData.formData.headline"
                />
              </el-form-item>
              <el-form-item label="主题类型" prop="cultivateType" required>
                    <el-select
                    :disabled="dialogData.props.title === '查看'"
                    v-model="dialogData.formData.cultivateType"
                    placeholder="请选择主题类型"
                    >
                        <el-option v-for="item in dialogData.dropdown.cultivateType" :key="item.value" :label="item.label" :value="item.value" required>
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            class="btn-mixins-clear-default"
            @click="close"
            >取消</el-button
          >
          <el-button
            class="btn-mixins dia-suc"
            @click="success(addform)"
            >保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script  setup>
import { defineProps, ref } from "vue";
import { reactive, watch, defineEmits } from "vue";
import { ElNotification  } from "element-plus";
import { operatePlan as operatePlan } from '@/api/train.js'
const emits = defineEmits(["update:modelValue"]);
const addform = ref('');
const dialogData = reactive({
    formLabelWidth:"30%",
    rules:{
        headline:[{ required: true, message: "请输入培训主题", trigger: "blur" }]
    },
    props:{
        title:'',
        dialogFormVisible:'',
    },
    formData:{
        headline:'',
        cultivateType:''
    },
    dropdown:{
      cultivateType:[{
                      label: '专项培训',
                      value:0
                    },{
                      label: '常规培训',
                      value: 1
                    }]
      },
})
let props = defineProps({
  dialogFormVisible: {
    type: Boolean,
  },
  dialogTitle: {
    type: String,
  },
  dialogTableValue: {
    type: Object,
    default: () => {},
  },
});

watch(
  () => props,
  () => {
    dialogData.props.title = props.dialogTitle;
    dialogData.props.dialogFormVisible = props.dialogFormVisible;
    if (dialogData.props.title === "编辑" ){
        dialogData.formData = props.dialogTableValue;
    }else {
        dialogData.formData= {}
    }
  },
  { deep: true, immediate: true }
);
const close = () => {
  addform.value.resetFields();
  emits("update:modelValue", false);
};

const success = (addform) => {
  if (!addform) return;
  addform.validate(async (valid) => {
    if (valid) {
      let obj = JSON.parse(JSON.stringify(dialogData.formData));
      operatePlan(obj).then((res)=>{
        if(res.code ===200){
            close()
          }else{
              ElNotification({
                title: 'Warning',
                message: res.message?res.message:'服务器异常',
                type: 'warning',
              })
               if(res.message.indexOf('token已过期')>-1  ){
                    store.dispatch('app/logout')
                }
          }
      })
    } else {
      return false;
    }
  });
};

</script>



<style lang = 'less' scoped>
.plan-dialog {
  :deep(.el-input){
    width: 300px;
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
      border-bottom: 2px solid #409eff;
      display: block;
    }
  }
  :deep(.el-dialog__footer) {
    padding-top: 16px;
    background-color: #ffffff;
  }
  :deep(.el-dialog__body) {
    padding: 0;
    max-height: 550px;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #ffffff;
    padding: 16px;
  }
  :deep(.el-dialog__header) {
    border-bottom: 1px solid #cccccc;
    padding: 16px;
    margin-right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  :deep(.el-dialog__title) {
    color: #1C222C;
    font-size: 20px;
    width: 100px;
  }
  :deep(.el-dialog__headerbtn ){
    position: static;
    top: 0px;
    right: 0;
    padding: 0;
    width: auto;
    height: auto;
  }
}
:deep(.el-form-item__label ){
  font-size: 14px;
}
:deep(.el-form) {
  position: relative;
}

:deep(.el-form-item__content) {
  width: 300px;
}


</style>
