
<template>
    <div  class="totalStyle hotwork">
        <div class="tablestyle">
            <div class="titleStyle">
                <p class="leftTitle dis_center">
                    <el-icon  class="callback" :size = '20' @click="callback"><Back /></el-icon>
                    <span class="callback ml-16" @click="callback">返回</span>
                    <span class="split"></span>
                    <span class="font_w">{{dialogData.props.title}}</span>
                    </p>
            </div>
            <div class="bottomBox bg_color">
                <div class="test_paper">
                <el-form
                        class="formStyle"
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
                            <div class="itemStyle">
                                <p class="headerMsg">申请信息</p>
                                <div class="formItem">
                                    <p class="titleName">申请信息</p>
                                    <el-form-item label="作业申请单位" prop="applyCompanyId" required>
                                        <el-select
                                        v-model="dialogData.formData.applyCompanyId"
                                        placeholder="请选择作业申请单位"
                                        clearable
                                        >
                                        <el-option v-for="item in dialogData.dropdown.applyCompanyId" :key="item.id" :label="item.companyName" :value="item.id" required>
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="动火地点" prop="place" required>
                                        <el-input
                                        placeholder="请输入动火地点"
                                        v-model="dialogData.formData.place"
                                        />
                                    </el-form-item>
                                    <el-form-item label="动火部位" prop="part" required>
                                        <el-input
                                        placeholder="请输入动火部位"
                                        v-model="dialogData.formData.part"
                                        />
                                    </el-form-item>
                                    <el-form-item label="动火作业级别" prop="level" required>
                                        <el-radio-group v-model="dialogData.formData.level">
                                            <el-radio  :label="0"  required>特级</el-radio>
                                            <el-radio  :label="1"  required>一级</el-radio>
                                            <el-radio  :label="2"  required>二级</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="动火方式" prop="methodIds" required>
                                        <el-select
                                        v-model="dialogData.formData.methodIds"
                                        placeholder="请选择动火方式"
                                        multiple
                                        clearable
                                        >
                                        <el-option v-for="item in dialogData.dropdown.methodIds" :key="item.id" :label="item.dataValue" :value="item.id" required>
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="动火作业实施时间" prop="workTime" required>
                                        <el-date-picker
                                            :disabled="dialogData.props.title === '查看'"
                                            v-model="dialogData.formData.workTime"
                                            type="datetimerange"
                                            start-placeholder="请选择开始时间"
                                            end-placeholder="请选择结束时间"
                                            :default-time="defaultTime"
                                            range-separator="至"
                                            />
                                    </el-form-item>         
                                    <el-form-item label="作业内容" prop="content" required>
                                        <el-input
                                        type="textarea"
                                        :disabled="dialogData.props.title === '查看'"
                                        placeholder="请输入作业内容"
                                        v-model="dialogData.formData.content"
                                        />
                                    </el-form-item>     
                                    <el-form-item label="风险辨识结果" prop="riskResult" required>
                                        <el-input
                                            type="textarea"
                                            :disabled="dialogData.props.title === '查看'"
                                            placeholder="请输入风险辨识结果"
                                            v-model="dialogData.formData.riskResult"
                                            />
                                    </el-form-item>               
                                    <el-form-item label="是否需要开锁" prop="workLock" required>
                                        <el-radio-group v-model="dialogData.formData.workLock">
                                            <el-radio  :label="0"  required>否</el-radio>
                                            <el-radio  :label="1"  required>是</el-radio>
                                        </el-radio-group>
                                    </el-form-item>        
                                    <p class="titleName">关联作业票</p>
                                    <!-- <el-form-item class="workCard" v-for="  (item,index) in dialogData.formData.options"
                                                    label= "作业票"
                                                    :key = 'index'
                                                    :prop="'options.' + index + '.value'"
                                                    :rules="[{required: true, message: '作业票不能为空', trigger: 'blur'}]"
                                    >
                                        <el-select
                                        v-model="item.value"
                                        placeholder="请选择作业票"
                                        clearable
                                        >
                                            <el-option v-for="item in dialogData.dropdown.courseName" :key="item.courseId" :label="item.courseName" :value="item.courseId" required>
                                            </el-option>
                                        </el-select>
                                        <el-icon class="ml-16" v-if="dialogData.props.title !== '查看'&& index>0" :size = '20' @click.prevent="removeOption(item,index)"><Remove /></el-icon>
                                    </el-form-item>       
                                    <el-button
                                        class="addOptions"
                                        @click="addOptions()"
                                        type="success"
                                        > + 增加选项</el-button> -->
                                    <el-form-item label="选择作业票" prop="relationWorkNos" required>    
                                            <el-cascader
                                            v-model="dialogData.formData.relationWorkNos"
                                            placeholder="请选择作业票"
                                            :options="dialogData.dropdown.options"
                                            :props="cascaderprops"
                                            filterable
                                            />
                                    </el-form-item>
                                    <p class="titleName">图片/附件</p>      
                                    <el-form-item label="动火部位照片">
                                        <el-upload
                                            v-model:file-list="dialogData.formData.imageList"
                                            action="api/hongyun-training/workpermit/uploadFile"
                                            list-type="picture-card"
                                            :on-preview="handlePictureCardPreview"
                                            :on-remove="handleRemoveImage"
                                            :beforeUpload="beforeAvatarUpload"
                                            :on-exceed="handleImage"
                                            :on-success="uploadSucceed"
                                            :limit="4"
                                        >
                                            <el-icon><Plus /></el-icon>
                                            <template #tip>
                                                <div class="el-upload__tip">
                                                    最多上传四张图片，只能上传jpg/png格式,且不超过500KB
                                                </div>
                                            </template>
                                        </el-upload>
                                        <el-dialog v-model="dialogData.dialogVisible">
                                            <img class="priviewImg" w-full :src="dialogData.dialogImageUrl" alt="Preview Image" />
                                        </el-dialog>
                                    </el-form-item>        
                                    <el-form-item label="相关附件">
                                        <el-upload
                                            v-model:file-list="dialogData.formData.attachmentsList"
                                            class="upload-demo"
                                            action="api/hongyun-training/workpermit/uploadFile"
                                            multiple
                                            :on-preview="handlePreview"
                                            :on-remove="handleRemove"
                                            :before-remove="beforeRemove"
                                            :on-exceed="handleExceed"
                                            :before-upload="beforeUpload"
                                            :on-success="uploadSuccess"
                                            :limit="4"
                                            accept=".pdf,.docx,.doc,.xls,.xlsx"
                                        >
                                            <el-button type="primary">点击上传</el-button>
                                            <template #tip>
                                            <div class="el-upload__tip">
                                                只能上传WORD/EXCEL/PDF文件,且不超过500KB
                                            </div>
                                            </template>
                                        </el-upload>
                                    </el-form-item>                                                                                                                                         
                                </div>
                            </div>
                            <div class="itemStyle mt-16">
                                <p class="headerMsg">关联信息</p>
                                <div class="formItem">
                                    <p class="titleName">关联工作人</p>
                                    <el-form-item label="申请单位监护人" prop="guardianUserIds" required>
                                        <el-select
                                        v-model="dialogData.formData.guardianUserIds"
                                        placeholder="请选择单位监护人"
                                        multiple
                                        clearable
                                        >
                                        <el-option v-for="item in dialogData.dropdown.person" :key="item.userId" :label="item.realName" :value="item.userId" required>
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="安全交底人" prop="safetyUserIds" required>
                                        <el-select
                                        :disabled="dialogData.props.title === '查看'"
                                        v-model="dialogData.formData.safetyUserIds"
                                        multiple
                                        placeholder="请选择安全交底人"
                                        clearable
                                        >
                                        <el-option v-for="item in dialogData.dropdown.person" :key="item.userId" :label="item.realName" :value="item.userId"  required>
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="作业单位" prop="workCompanyId" required>
                                        <el-select
                                        :disabled="dialogData.props.title === '查看'"
                                        v-model="dialogData.formData.workCompanyId"
                                        placeholder="请选择作业单位"
                                        clearable
                                        >
                                        <el-option v-for="item in dialogData.dropdown.applyCompanyId" :key="item.id" :label="item.companyName" :value="item.id" required>
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="itemStyle mt-16">
                                <p class="headerMsg">审批信息</p>
                                <div class="formItem">
                                    <p class="titleName">审批流程</p>
                                    <el-form-item label="审批模板" prop="templateId" required>
                                        <el-select
                                        :disabled="dialogData.props.title === '查看'"
                                        v-model="dialogData.formData.templateId"
                                        placeholder="请选择审批模板"
                                        @change="changeTemplate"
                                        clearable
                                        >
                                        <el-option v-for="item in dialogData.dropdown.WorkTemplate" :key="item.templateId" :label="item.templateName" :value="item.templateId" required>
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                                <div class="changeTemplateBox">
                                    <template v-for="(item,index) in dialogData.dropdown.templateList" :key="item.index">
                                        <div class="templatebox" > 
                                            <div class="head_image">
                                                <el-icon :size="20"><Avatar /></el-icon>
                                            </div>
                                            <div class="msg_info">
                                                <p class="jobType">{{item.dutyName}}</p>
                                                <p class="realname">{{item.realName}}</p>
                                            </div>
                                        </div>
                                        <span class="mrl" v-if="index+1 < dialogData.dropdown.templateList.length"> > </span>
                                    </template>
                                </div>
                            </div>
                            <div class="itemStyle mt-16 footerStyle">
                                <el-button
                                    size="large"
                                    type="primary"
                                    v-if="dialogData.props.title !== '查看'"
                                    class="btn-mixins dia-suc"
                                    @click="success(addform)"> &nbsp;&nbsp;提交 &nbsp;&nbsp;</el-button>
                                <el-button
                                    size="large"
                                    class="btn-mixins-clear-default"
                                    @click="close"
                                    >&nbsp;&nbsp; 取消 &nbsp;&nbsp;</el-button>
                            </div>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script  setup>
import { defineProps, ref,defineEmits,onBeforeMount } from "vue";
import { reactive, watch,onUpdated } from "vue";
import {operateWorkPermit as operateWorkPermit,uploadFile as uploadFile,getDataDictionaryList as getDataDictionaryList, getWorkNoList as getWorkNoList, getUserList as getUserList, getWorkTemplate as getWorkTemplate, writeWorkRebuild as writeWorkRebuild} from "@/api/train.js"
import { ElMessage, ElMessageBox,ElNotification } from "element-plus";
import { useRouter } from 'vue-router';
import { Plus,Avatar } from '@element-plus/icons-vue'
import { getymdhms } from '@/utils/auth'
const router = useRouter();
const addform = ref('');
const user = JSON.parse(localStorage.getItem('userData')) 
let props = defineProps({
  title: {
    type: String,
  },
  dropdown:{
      type:Object,
  },
    hotWorkId: {
    type: Number,
  },

}); 
const cascaderprops = {
  multiple: true,
}
const emit = defineEmits(['callback'])
const dialogData = reactive({
    dialogVisible:false,
    dialogImageUrl:'',
    dropdown:{
        applyCompanyId:[{
                companyName: '新建',
                id: 0
            }],
        methodIds:[],
        options:[],
        person:[],
        WorkTemplate:[],
        templateList: []
    },
    rules:{
        applyCompanyId:[{ required: true, message: "请选择作业申请单位", trigger: "change" }],
        place:[{ required: true, message: "请选择动火位置", trigger: "change" }],
        part:[{ required: true, message: "请输入动火部位", trigger: "blur" }],
        level:[{ required: true, message: "请选择动火作业级别", trigger: "change" }],
        methodIds:[{ required: true, message: "请选择请选择动火方式", trigger: "change" }],
        workTime:[{ required: true, message: "请选择动火作业实施时间", trigger: "change" }],
        content:[{ required: true, message: "请输入作业内容", trigger: "blur" }],
        riskResult:[{ required: true, message: "请输入风险辨识结果", trigger: "blur" }],
        workLock:[{ required: true, message: "请选择是否需要开锁", trigger: "change" }],
        guardianUserIds:[{ required: true, message: "请选择单位监护人", trigger: "change" }],
        safetyUserIds:[{ required: true, message: "请选择安全交底人", trigger: "change" }],
        workCompanyId:[{ required: true, message: "请选择作业单位", trigger: "change" }],
        templateId:[{ required: true, message: "请选择审批模板", trigger: "change" }],
        relationWorkNos:[{ required: true, message: "请选择作业票", trigger: "change" }],
    },
    props:{
        title:'',
    },
    formData:{
        applyCompanyId:'',
        place:'',
        part:'',
        level:'',
        methodIds:'',
        workTime:'',
        content:'',
        riskResult:'',
        workLock:0,
        images:[],
        attachments:[],
        attachmentsList:[],
        guardianUserIds:0,
        safetyUserIds:0,
        workCompanyId:'',
        templateId:'',
        relationWorkNos:[],
        imageList:[]
    }
})
//动火方式
const getDataDictionary = () => {
        getDataDictionaryList(5).then((res)=>{
        if(res.code === 200){
            dialogData.dropdown.methodIds = res.body;
        }else {
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
//获取作业票
const getWorkNo = () => {
        getWorkNoList().then((res)=>{
        if(res.code === 200){
            dialogData.dropdown.options = res.body;
        }else {
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
//获取审批模板
const WorkTemplate = ()=>{
    getWorkTemplate().then((res) => {
        if(res.code === 200){
            dialogData.dropdown.WorkTemplate = res.body;
        }else {
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
/**
 * 切换审批模板
 */
const changeTemplate = (val)=>{
    let index = dialogData.dropdown.WorkTemplate.findIndex((res)=>{return res.templateId === val});
    if(index>-1){
        dialogData.dropdown.templateList = dialogData.dropdown.WorkTemplate[index].dutyNames
    }
    
    console.log(dialogData.dropdown.templateList)
}
// 查看人员
const getUser = ()=>{
    getUserList().then((res) => {
        if(res.code === 200){
            dialogData.dropdown.person = res.body;
        }else {
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
onBeforeMount(()=>{
    getDataDictionary()
    getWorkNo()
    getUser()
    WorkTemplate()
})
onUpdated(() => {
    if(dialogData.props.title === '重建'){
        setTimeout(() => {
            changeTemplate(dialogData.formData.templateId)
        },1000)
    }
});
watch(
  () => props,
  () => {
      dialogData.props.title = props.title;
      dialogData.dropdown.applyCompanyId =props.dropdown.applyCompanyId;
      if(dialogData.props.title === '重建'){
          writeWorkRebuild(props.hotWorkId,user.username).then((res) => {
              if(res.code ===200){
                    dialogData.formData = res.body;
                    dialogData.formData.imageList = dialogData.formData.images;
                    dialogData.formData.attachmentsList = dialogData.formData.attachments
                }else{
                    ElNotification({
                        title: 'Warning',
                        message: res.message?res.message:'服务器异常',
                        type: 'warning',
                    })
                    if(res.message.indexOf('token已过期')>-1 ){
                            store.dispatch('app/logout')
                        }
                }
          })
      }
  },
  { deep: true, immediate: true }
);
const analysisProxy = (value) => {
    return JSON.parse(JSON.stringify(value))
}
/**
 * 图片处理
 */
const  handleImage = (file)=>{
      //调用后台导入的接口
      let obj={
        file:file.raw
      }
      let arr = []
      arr.push(file)
      dialogData.formData.fileList = arr;
      uploadFile(obj).then(res => {
        if (res.code === 200) {
            let obj = {
                url:res.body
            }
            console.log(obj)
            // dialogData.formData.images.push(obj);
            // console.log(dialogData.formData.images)
            // ElMessage({
            //   type: "success",
            //   message: "记载成功",
            // });
        } else {
          ElMessage({
              type: "error",
              message: "加载失败",
            });
        }
      }).catch(err => {
          ElMessage({
              type: "error",
              message: "加载失败",
            });
      })
}
const handlePictureCardPreview = (uploadFile) => {
    dialogData.dialogImageUrl= uploadFile.url
    dialogData.dialogVisible = true
}
const beforeAvatarUpload = (file)=>{
      const testmsg = /^image\/(png|jpg|jpeg)$/.test(file.type)
      if (!testmsg) {
        ElMessage.error('上传格式不正确,只支持JPG/PNG!')
        return false
      } else if (file.size && file.size / 1024 / 1024/1024 > 500) {
        ElMessage.error('上传大小不正确,大小不超过500kb!')
        return false
      }
}
const uploadSucceed = (file)=>{
    console.log(file)
    let obj = {
        url:file.body
    }
    dialogData.formData.images.push(obj);
}
/**
 * 附件处理
 */
// 上传文件 数量判断 这里设置的只能上传一个文件
const handleExceed = (files, fileList) => {
    console.log(files)
    ElMessage.warning(
        `当前限制选择 4 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
        files.length + fileList.length
        } 个文件`
    )
}
//文件上传成功
const uploadSuccess = (file,uploadFile)=>{
    console.log(uploadFile)
    let obj = {
        name:uploadFile.name,
        url:uploadFile.response.body
    }
    dialogData.formData.attachments.push(obj)
}
//文件预览
const handlePreview = (uploadFile) => {
        let url  = dialogData.props.title === '重建'? analysisProxy(uploadFile).url:analysisProxy(uploadFile).response.body
        window.open(url)
}

/**
 * 表单提交
 */
const success = (addform) => {
  if (!addform) return;
  addform.validate(async (valid) => {
    if (valid) {
      let obj = JSON.parse(JSON.stringify(dialogData.formData));
      obj.beginTime = obj.workTime?getymdhms(obj.workTime[0]):'',
      obj.endTime = obj.workTime?getymdhms(obj.workTime[1]):'',
      obj.workType = 0
      let user = JSON.parse(localStorage.getItem('userData')) 
      operateWorkPermit(obj,user.username).then((res)=>{
        if(res.code ===200){
            callback()
          }else{
              ElNotification({
                title: 'Warning',
                message: res.message?res.message:'服务器异常',
                type: 'warning',
              })
               if(res.message.indexOf('token已过期')>-1 ){
                    store.dispatch('app/logout')
                }
          }
      })
    } else {
      return false;
    }
  });
};
//返回上一级
const callback = () => {
    emit('callback') 
    console.log("111callback")
}
const removeOption = (item,index)=>{
  dialogData.formData.options.splice(index,1)
}
</script>
<style lang = 'less' scoped>
.hotwork{
    :deep(.el-form--inline .el-form-item){
        width: 100%;
    }
    :deep(.el-form-item--default .el-form-item__content){
        width: calc(100% - 160px);
    }
    :deep(.el-select){
        width: 100%;
    }
    :deep(.el-input){
        width: 100%;
    }
    :deep(.upload-demo){
        width: 100%;
    }
    :deep(.el-cascader){
        width: 100%;
    }
    .bg_color{
    background-color: #EDF0F5;
    }
    .bottomBox{
        height: 100%;
        overflow-y: auto;
    }
    .test_paper{
        width: 60%;
        margin: 0 auto;
        font-weight: 600;
        .formStyle{
            width: 100%;
        }
    }
    .totalStyle{
        height: 100%;
    }

    .callback{
        cursor: pointer;
    }
    .itemStyle{
        background-color: #ffffff;
        .headerMsg{
            height: 56px;
            line-height: 56px;
            color: #1C222C;
            font-size: 16px;
            border-bottom: 1px solid #DADFE6;
            padding: 0 16px;
            width: 100%;
        }
        .formItem{
            padding: 16px 56px 0;
            .titleName{
                color: #4B515B;
                font-size: 14px;
                padding-left: 8px;
                border-left: 5px solid #2E83FC;
                margin-bottom: 16px;
                
            }
        }

        .tishi{
            margin-bottom: 16px;
            color: #F46B5A;
            font-size: 12px;
        }

    }
    .workCard{
        :deep(.el-select){
            width: 90%;
        }
    }
    .addOptions{
    margin-left: 160px;
    margin-bottom: 16px;
    .leftTitle{
        display: flex;
        align-content: center;
    }
}
.footerStyle{
    line-height: 76px;
    display: flex;
    line-height: 76px;
    align-items: center;
    justify-content: center;
    height: 76px;
}
.split{
    width: 1px;
    height: 20px;
    background-color: #DADFE6;
    margin: 0 16px;
}
.priviewImg{
    width: 100%;
    height: 100%;
    background-size: cover;
}
.changeTemplateBox{
    padding: 0 56px 16px 160px;
    .templatebox{
        width: 180px;
        height: 54px;
        background-color: #EDF0F5;
        border-radius: 4px;
        align-content: center;
         display: inline-flex;
         margin-bottom: 16px;
        .head_image{
            width: 38px;
            height: 38px;
            border-radius: 50%;
            background-color: #2E83FC;
            color: #ffffff;
            margin: 8px;
            line-height: 38px;
            text-align: center;
        }
        .msg_info{
            .jobType{
                color: #797F89;
                font-size: 12px;
                margin: 8px 0 4px 0;
            }
            .realname{
                color: #1C222C;
                font-size: 14px;
            }
        }
    }
    .mrl{
        margin: 0 16px;
        line-height: 54px;
        color: #A9AFB9;
    }
}
}


</style>