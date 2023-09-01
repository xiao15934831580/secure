
<template>
    <div  class="totalStyle hotwork">
        <div class="tablestyle">
            <div class="titleStyle">
                <p class="leftTitle dis_center">
                    <el-icon  class="callback" :size = '20' @click="callback"><Back /></el-icon>
                    <span class="callback ml-16" @click="callback">返回</span>
                    <span class="split"></span>
                    <span class="font_w">编辑</span>
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
                            <div class="itemStyle" v-if="dialogData.props.title === 'a'">
                                <p class="headerMsg">安全措施</p>
                                <div class="formItem">
                                    <el-form-item class="workCard" v-for="  (item,index) in dialogData.formData.listData"
                                                    :label= '"安全措施"+(index+1)'
                                                    :key = 'index'
                                                    :prop="'listData.' + index + '.configValue'"
                                                    :rules="[{required: true, message: '安全措施内容不能为空', trigger: 'blur'}]"
                                    >
                                        <el-input show-word-limit maxlength="100" :disabled = '!item.configEnable' type="textarea" placeholder="请输入安全措施内容" v-model="item.configValue" />
                                        <el-switch class="ml-16" v-model="item.configEnable" />
                                        <el-icon class="ml-16" :size = '16' style="color:red;" @click.prevent="removeOption_a(item,index)"><Delete /></el-icon>
                                    </el-form-item>       
                                    <el-button
                                        class="addOptions"
                                        @click="addOptions_a()"
                                        type="primary" plain
                                        > + 增加选项</el-button>
                                                                                                                                     
                                </div>
                            </div>
                            <div class="itemStyle mt-16" v-if="dialogData.props.title === 'b'">
                                <p class="headerMsg">安全交底信息</p>
                                <div class="formItem">
                                    <el-form-item class="workCard"  v-for="  (item,index) in dialogData.formData.listData"
                                                     :label= '"内容"+(index+1)'
                                                    :key = 'index'
                                                    :prop="'listData.' + index + '.configValue'"
                                                    :rules="[{required: true, message: '安全交底信息内容不能为空', trigger: 'blur'}]"
                                    >
                                        <el-input show-word-limit maxlength="100" :disabled = '!item.configEnable' type="textarea" placeholder="请输入安全交底信息内容" v-model="item.configValue" />
                                        <el-switch class="ml-16" v-model="item.configEnable" />
                                        <el-icon class="ml-16" :size = '16' style="color:red;" @click.prevent="removeOption_a(item,index)"><Delete /></el-icon>
                                    </el-form-item>       
                                    <el-button
                                        class="addOptions"
                                        @click="addOptions_a()"
                                        type="primary" plain
                                        > + 增加选项</el-button>                                                                    
                                </div>
                            </div>
                            <div class="itemStyle mt-16" v-if="dialogData.props.title === 'c'">
                                <p class="headerMsg">作业前清单</p>
                                <div class="formItem">
                                    <el-form-item class="workCard" v-for="  (item,index) in dialogData.formData.listData"
                                                    :label= '"内容"+(index+1)'
                                                    :key = 'index'
                                                    :prop="'listData.' + index + '.configValue'"
                                                    :rules="[{required: true, message: '作业前清单内容不能为空', trigger: 'blur'}]"
                                    >
                                        <el-input show-word-limit maxlength="100" :disabled = '!item.configEnable' type="textarea" placeholder="请输入作业前清单内容" v-model="item.configValue" />
                                        <el-switch class="ml-16" v-model="item.configEnable" />
                                        <el-icon class="ml-16" :size = '16' style="color:red;" @click.prevent="removeOption_a(item,index)"><Delete /></el-icon>
                                    </el-form-item>       
                                    <el-button
                                        class="addOptions"
                                        @click="addOptions_a()"
                                        type="primary" plain
                                        > + 增加选项</el-button>                                                          
                                </div>
                            </div>
                            <div class="itemStyle mt-16" v-if="dialogData.props.title === 'd'">
                                <p class="headerMsg">验收清单</p>
                                <div class="formItem">
                                    <el-form-item class="workCard" v-for="  (item,index) in dialogData.formData.listData"
                                                    :label= '"内容"+(index+1)'
                                                    :key = 'index'
                                                    :prop="'listData.' + index + '.configValue'"
                                                    :rules="[{required: true, message: '验收清单内容不能为空', trigger: 'blur'}]"
                                    >
                                        <el-input show-word-limit maxlength="100" :disabled = '!item.configEnable' type="textarea" placeholder="请输入验收清单内容" v-model="item.configValue" />
                                        <el-switch class="ml-16" v-model="item.configEnable" />
                                        <el-icon class="ml-16" :size = '16' style="color:red;" @click.prevent="removeOption_a(item,index)"><Delete /></el-icon>
                                    </el-form-item>       
                                    <el-button
                                        class="addOptions"
                                        @click="addOptions_a()"
                                        type="primary" plain
                                        > + 增加选项</el-button>
                                                                                                                                     
                                </div>
                            </div>
                             <div class="itemStyle mt-16" v-if="dialogData.props.title === 'e'">
                                <p class="headerMsg">预警设置</p>
                                <div class="formItem">
                                    <p class="titleName">作业票超时</p>
                                    <el-form-item class="workCardTime"  label= '特级：'  :rules="[{required: true, message: '作业票有效时间不能为空', trigger: 'blur'}]">
                                        <span class="mr-16">作业票有效时间</span>
                                        <el-input v-model="dialogData.formData.content.a.special" placeholder="作业票有效时间">
                                            <template #append>小时</template>
                                        </el-input>
                                    </el-form-item>       
                                     <el-form-item class="workCardTime"  label= '一级：' :rules="[{required: true, message: '作业票有效时间不能为空', trigger: 'blur'}]">
                                        <span class="mr-16">作业票有效时间</span>
                                        <el-input v-model="dialogData.formData.content.a.one" placeholder="作业票有效时间">
                                            <template #append>小时</template>
                                        </el-input>
                                    </el-form-item>    
                                    <el-form-item class="workCardTime"  label= '二级：' :rules="[{required: true, message: '作业票有效时间不能为空', trigger: 'blur'}]">
                                        <span class="mr-16">作业票有效时间</span>
                                        <el-input v-model="dialogData.formData.content.a.two" placeholder="作业票有效时间">
                                            <template #append>小时</template>
                                        </el-input>
                                    </el-form-item>                                                                           
                                    <el-form-item class="workCardTime"  label= '作业建议：'>
                                        <el-input show-word-limit maxlength="100"  type="textarea" placeholder="请输入作业建议" v-model="dialogData.formData.content.a.suggest" />
                                    </el-form-item>      
                                    <p class="titleName">动火分析超时</p>
                                    <el-form-item class="workCardTime"  label= '动火前分析：' :rules="[{required: true, message: '动火分析时间不能为空', trigger: 'blur'}]">
                                        <span class="mr-16">动火开始时间距离最近一次动火分析时间不超过</span>
                                        <el-input v-model="dialogData.formData.content.b.analyse" placeholder="动火分析时间">
                                            <template #append>小时</template>
                                        </el-input>
                                    </el-form-item>   
                                    <el-form-item class="workCardTime"  label= '作业建议：'>
                                        <el-input show-word-limit maxlength="100"  type="textarea" placeholder="请输入作业建议" v-model="dialogData.formData.content.b.suggest" />
                                    </el-form-item>        
                                    <p class="titleName">动火分析不合格</p>
                                    <div class="analyse">
                                            <el-form-item class="workCard" v-for="  (item,index) in dialogData.formData.content.c.gas"
                                                            :label= '"代表性气体"+(index+1)'
                                                            :key = 'index'
                                                            :prop="'gas.' + index + '.gasValue'"
                                                            
                                            >
                                                <!-- <el-input  placeholder="请输入安全措施内容" v-model="item.value" /> -->
                                                <el-select
                                                v-model="item.gasId"
                                                class="mr-16"
                                                placeholder="请选择气体"
                                                >
                                                    <el-option v-for="item in dialogData.dropdown.gas" :key="item.id" :label="item.dataValue" :value="item.id" required>
                                                    </el-option>
                                                </el-select>  
                                                <el-select
                                                class="ml-16 mr-16"
                                                v-model="item.gasSymbol"
                                                placeholder="请选择符号"
                                                >
                                                    <el-option v-for="item in dialogData.dropdown.mark" :key="item.value" :label="item.label" :value="item.value" required>
                                                    </el-option>
                                                </el-select>
                                                <el-input class="ml-16 mr-16" placeholder="请输入值" v-model="item.gasValue" />
                                                <span>时不合格</span>
                                                <el-icon class="ml-16" :size = '16' style="color:red;" @click.prevent="removeOption(item,index)"><Delete /></el-icon>
                                            </el-form-item> 
                                    </div>
                                    <el-button
                                        class="addOptions"
                                        @click="addOptions()"
                                        type="primary" plain
                                        > + 增加选项</el-button>                                      
                                    <el-form-item class="workCardTime"  label= '作业建议：'>
                                        <el-input show-word-limit maxlength="100"  type="textarea" placeholder="请输入作业建议" v-model="dialogData.formData.content.c.suggest" />
                                    </el-form-item> 
                                    <p class="titleName">作业中断原因</p>
                                    <el-form-item class="workCardTime"  label= '作业中断原因：' :rules="[{required: true, message: '作业中断原因：不能为空', trigger: 'blur'}]" >
                                        <!-- <template> -->
                                            <el-tag
                                                v-for="tag in dialogData.formData.content.d.cause"
                                                :key="tag"
                                                class="mx-1 mr-16"
                                                closable
                                                :disable-transitions="false"
                                                @close="handleClose(tag)"
                                            >
                                                {{ tag }}
                                            </el-tag>
                                            <el-input
                                                v-if="dialogData.taginfo.inputVisible"
                                                ref="InputRef"
                                                v-model="dialogData.taginfo.inputValue"
                                                class="ml-1 w-20"
                                                size="small"
                                                @keyup.enter="handleInputConfirm"
                                                @blur="handleInputConfirm"
                                            />
                                            <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
                                                + 添加
                                            </el-button>
                                        <!-- </template> -->
                                    </el-form-item>      
                                </div>
                            </div>
                              <div class="itemStyle mt-16" v-if="dialogData.props.title === 'f'">
                                <p class="headerMsg">其他设置</p>
                                <div class="formItem">
                                    <p class="titleName">关联监控</p>
                                    <div class="association">
                                            <el-form-item class="workCard" label= '视频监控' >
                                            <el-cascader
                                                v-model="dialogData.formData.content.a.surveillance"
                                                placeholder="请选择视频监控"
                                                :options="dialogData.dropdown.videoList"
                                                :props="cascaderprops"
                                                filterable
                                            />
                                            </el-form-item> 
                                    </div>     
                                    <p class="titleName">作业方式</p>
                                    <el-form-item class="workCardTime"  label= '动火方式：' >
                                        <!-- <template> -->
                                            <el-tag
                                                v-for="tag in dialogData.formData.content.b.method"
                                                :key="tag"
                                                class="mx-1 mr-16"
                                                closable
                                                :disable-transitions="false"
                                                @close="handleClose(tag)"
                                            >
                                                {{ tag }}
                                            </el-tag>
                                            <el-input
                                                v-if="dialogData.taginfo.inputVisible"
                                                ref="InputRef"
                                                v-model="dialogData.taginfo.inputValue"
                                                class="ml-1 w-20"
                                                size="small"
                                                @keyup.enter="handleInputConfirm"
                                                @blur="handleInputConfirm"
                                            />
                                            <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
                                                + 添加
                                            </el-button>
                                    </el-form-item>      
                                                                                                                                                                                     
                                </div>
                            </div>
                            <div class="itemStyle mt-16 footerStyle">
                                <el-button size="large"  type="primary"   class="btn-mixins dia-suc" @click="success(addform)"> &nbsp;&nbsp;提交 &nbsp;&nbsp;</el-button>
                                <el-button size="large" class="btn-mixins-clear-default" @click="callback" >&nbsp;&nbsp; 取消 &nbsp;&nbsp;</el-button>
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
import {getDataDictionaryList as getDataDictionaryList, fillWorkConfig as fillWorkConfig,  getVideoList as getVideoList,operateWorkConfig as operateWorkConfig,operateWorkConfigEF as operateWorkConfigEF} from "@/api/train.js"
import { ElMessage, ElMessageBox,ElNotification } from "element-plus";
import { useRouter } from 'vue-router';
import { Delete,Avatar } from '@element-plus/icons-vue'
import { getymdhms } from '@/utils/auth'
const router = useRouter();
const addform = ref('');
const user = JSON.parse(localStorage.getItem('userData')) 
let props = defineProps({
    titleName:{
        type:String
    }
}); 
const cascaderprops = {
  multiple: true,
}
const emit = defineEmits(['callback'])
const dialogData = reactive({
    dialogVisible:false,
    dialogImageUrl:'',
    dropdown:{
        gas:[{}],
        videoList:[],
        mark:[{
            label: '大于',
            value: "more",
        },{
            label: "大于等于",
            value: "morethan",
        },{
            label: '小于',
            value: "less",
        },{
            label: "小于等于",
            value: "lessthan",
        }]
    },
    rules:{
        applyCompanyId:[{ required: true, message: "请选择作业申请单位", trigger: "change" }],
        place:[{ required: true, message: "请选择动火位置", trigger: "change" }],
    },
    props:{
        title:'',
    },
    taginfo:{
        inputValue:'',
        inputVisible :false,
        inputValue:''
    },
    formData:{
        listData:[],
        content: {
            a:{
                special:'',
                one:'',
                two:''
            },
            b:{

            },
            c:{
                gas:[]
            },
            d:{
                cause: []
            }
        },
        options:[{
            label:'安全措施1',
            value:'动火设备内部构建清洗干净，烟气吹扫或水洗，置换合格，达到动火条件',
            isSwitch:true,
        },{
            label:'安全措施1',
            value:'动火设备内部构建清洗干净，烟气吹扫或水洗，置换合格，达到动火条件',
            isSwitch:true,
        },{
            label:'安全措施1',
            value:'动火设备内部构建清洗干净，烟气吹扫或水洗，置换合格，达到动火条件',
            isSwitch:true,
        },{
            label:'安全措施1',
            value:'动火设备内部构建清洗干净，烟气吹扫或水洗，置换合格，达到动火条件',
            isSwitch:true,
        }],
        workTime:'',
        dynamicTags:['Tag 1', 'Tag 2', 'Tag 3']
    }
})
//气体
const getDataDictionary = () => {
        getDataDictionaryList(6).then((res)=>{
        if(res.code === 200){
            dialogData.dropdown.gas = res.body;
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
//摄像头
const getVideoListFun = () => {
    getVideoList().then((res)=>{
        if(res.code === 200){
            dialogData.dropdown.videoList = res.body;
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
    getVideoListFun()
})

watch(
  () => props,
  () => {
      dialogData.props.title = props.titleName;
      console.log(dialogData.props.title)
      fillWorkConfig(dialogData.props.title).then((res)=>{
          if(res.code === 200){
              if(dialogData.props.title === 'e'|| dialogData.props.title === 'f'){
                  dialogData.formData.content = res.body;
              }else {
                  dialogData.formData.listData = res.body;
              }
            
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
  },
  { deep: true, immediate: true }
);
const analysisProxy = (value) => {
    return JSON.parse(JSON.stringify(value))
}
/**
 * 添加配置信息
 */
//安全措施
const addOptions_a = ()=>{
    let obj={
        configEnable:true,
        configValue:'',
    }
    dialogData.formData.listData.push(obj)
}
//安全措施删除
const removeOption_a = (item,index)=>{
  dialogData.formData.listData.splice(index,1)
}
const removeOption = (item,index)=>{
  dialogData.formData.content.c.gas.splice(index,1)
}
const addOptions = ()=>{
    let obj = {
            gasId:'',
            gasSymbol:'',
            gasValue:'',
    }
    dialogData.formData.content.c.gas.push(obj)
}
const handleClose = (tag) => {
 dialogData.formData.dynamicTags.splice(dialogData.formData.dynamicTags.indexOf(tag), 1)
}
const showInput = () => {
  dialogData.taginfo.inputVisible = true
  nextTick(() => {
    // InputRef.value!.input!.focus()
  })
}
const handleInputConfirm = () => {
  if (dialogData.taginfo.inputValue) {
    dialogData.formData.content.d.cause.push(dialogData.taginfo.inputValue)
  }
  dialogData.taginfo.inputVisible = false
  dialogData.taginfo.inputValue = ''
}
/**
 * 表单提交
 */
const success = (addform) => {
  if (!addform) return;
  addform.validate(async (valid) => {
    if (valid) {
    //   let obj = JSON.parse(JSON.stringify(dialogData.formData.content));
    //   console.log(obj)

    if(dialogData.props.title === 'e' || dialogData.props.title === 'f'){
        let obj = {
        //   workConfigMap:JSON.parse(JSON.stringify(dialogData.formData.content))
          a:JSON.parse(JSON.stringify(dialogData.formData.content)).a,
          b:JSON.parse(JSON.stringify(dialogData.formData.content)).b,
          c:dialogData.props.title === 'e'?JSON.parse(JSON.stringify(dialogData.formData.content)).c:'',
          d:dialogData.props.title === 'e'?JSON.parse(JSON.stringify(dialogData.formData.content)).d:'',
        }
         operateWorkConfigEF(obj,dialogData.props.title).then((res)=>{
            if(res.code === 200){
                callback()
                console.log(res.body)
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
    }else {
        let obj = {
          workConfigType:dialogData.props.title,
          workConfigInList:JSON.parse(JSON.stringify(dialogData.formData.listData))
        }
        obj.workConfigInList = JSON.parse(JSON.stringify(dialogData.formData.listData))
        operateWorkConfig(obj).then((res)=>{
        if(res.code === 200){
            callback()
            console.log(res.body)
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
    .workCard{
            :deep(.el-textarea){
                width: 80%;
            }
    }
    .workCardTime{
            :deep(.el-input){
                width: 200px;
            }
    }
    .analyse{
             :deep(.el-input){
                width: 150px;
            }
            :deep(.el-select){
                width: 20%;
            }
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