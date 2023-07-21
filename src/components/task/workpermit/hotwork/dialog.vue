
<template>
    <div  class="totalStyle hotwork">
        <div class="tablestyle">
            <div class="titleStyle">
                <p class="leftTitle dis_center">
                    <el-icon  class="callback" :size = '20' @click="callback"><Back /></el-icon>
                    <span class="callback ml-16" @click="callback">返回</span>
                    <span class="split"></span>
                    <span>{{dialogData.hotworkContent.title}}</span>
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
                                    <p class="titleName">考核课程</p>
                                    <el-form-item label="作业申请单位" prop="courseId" required>
                                        <el-select
                                        :disabled="dialogData.props.title === '查看'"
                                        v-model="dialogData.formData.courseId"
                                        placeholder="请选择作业申请单位"
                                        clearable
                                        >
                                        <el-option v-for="item in dialogData.dropdown.courseName" :key="item.courseId" :label="item.courseName" :value="item.courseId" required>
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="动火位置" prop="courseId" required>
                                        <el-select
                                        :disabled="dialogData.props.title === '查看'"
                                        v-model="dialogData.formData.courseId"
                                        placeholder="请选择动火位置"
                                        clearable
                                        >
                                        <el-option v-for="item in dialogData.dropdown.courseName" :key="item.courseId" :label="item.courseName" :value="item.courseId" required>
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="动火部位" prop="courseId" required>
                                        <el-input
                                        :disabled="dialogData.props.title === '查看'"
                                        placeholder="请输入动火部位"
                                        v-model="dialogData.formData.courseId"
                                        />
                                    </el-form-item>
                                    <el-form-item label="动火作业级别" prop="courseId" required>
                                        <el-radio-group v-model="dialogData.formData.courseId">
                                            <el-radio  :label="'0'"  required>特级</el-radio>
                                            <el-radio  :label="'1'"  required>一级</el-radio>
                                            <el-radio  :label="'2'"  required>二级</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="动火方式" prop="courseId" required>
                                        <el-select
                                        :disabled="dialogData.props.title === '查看'"
                                        v-model="dialogData.formData.courseId"
                                        placeholder="请选择动火方式"
                                        clearable
                                        >
                                        <el-option v-for="item in dialogData.dropdown.courseName" :key="item.courseId" :label="item.courseName" :value="item.courseId" required>
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="动火作业实施时间" prop="courseId" required>
                                        <el-date-picker
                                            :disabled="dialogData.props.title === '查看'"
                                            v-model="dialogData.formData.courseId"
                                            type="daterange"
                                            start-placeholder="请选择开始时间"
                                            end-placeholder="请选择结束时间"
                                            :default-time="defaultTime"
                                            />
                                    </el-form-item>         
                                    <el-form-item label="作业内容" prop="courseId" required>
                                        <el-input
                                        type="textarea"
                                        :disabled="dialogData.props.title === '查看'"
                                        placeholder="请输入作业内容"
                                        v-model="dialogData.formData.courseId"
                                        />
                                    </el-form-item>     
                                    <el-form-item label="风险辨识结果" prop="courseId" required>
                                        <el-input
                                            type="textarea"
                                            :disabled="dialogData.props.title === '查看'"
                                            placeholder="请输入风险辨识结果"
                                            v-model="dialogData.formData.courseId"
                                            />
                                    </el-form-item>               
                                    <el-form-item label="是否需要开锁" prop="courseId" required>
                                        <el-radio-group v-model="dialogData.formData.courseId">
                                            <el-radio  :label="'0'"  required>否</el-radio>
                                            <el-radio  :label="'1'"  required>是</el-radio>
                                        </el-radio-group>
                                    </el-form-item>        
                                    <p class="titleName">关联作业票</p>
                                    <el-form-item class="workCard" v-for="  (item,index) in dialogData.formData.options"
                                                    label= "选择作业票"
                                                    :key = 'index'
                                                    :prop="'options.' + index + '.value'"
                                                    :rules="[{required: true, message: '作业票不能为空', trigger: 'blur'}]"
                                    >
                                        <el-select
                                        :disabled="dialogData.props.title === '查看'"
                                        v-model="dialogData.formData.courseId"
                                        placeholder="请选择作业票"
                                        clearable
                                        >
                                            <el-option v-for="item in dialogData.dropdown.courseName" :key="item.courseId" :label="item.courseName" :value="item.courseId" required>
                                            </el-option>
                                        </el-select>
                                        <el-icon class="ml-16" v-if="dialogData.props.title !== '查看'&& index>0" :size = '20' @click.prevent="removeOption(item,index)"><Remove /></el-icon>
                                    </el-form-item>       
                                    <el-button
                                        :disabled="dialogData.props.title === '查看'"
                                        class="addOptions"
                                        @click="addOptions()"
                                        type="success"
                                        > + 增加选项</el-button>
                                      <p class="titleName">图片/附件</p>      
                                    <el-form-item label="图片"  >
                                        <el-upload
                                            v-model:file-list="dialogData.formData.fileList"
                                            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                                            list-type="picture-card"
                                            :on-preview="handlePictureCardPreview"
                                            :on-remove="handleRemove"
                                        >
                                            <el-icon><Plus /></el-icon>
                                                <template #tip>
                                                    <div class="el-upload__tip">
                                                        最多上传四张图片，只能上传jpg/png格式,且不超过500KB
                                                    </div>
                                                </template>
                                        </el-upload>

                                        <el-dialog v-model="dialogVisible">
                                            <img w-full :src="dialogImageUrl" alt="Preview Image" />
                                        </el-dialog>
                                    </el-form-item>        
                                    <el-form-item label="附件"  >
                                        <el-upload
                                            v-model:file-list="dialogData.formData.fileList"
                                            class="upload-demo"
                                            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                                            multiple
                                            :on-preview="handlePreview"
                                            :on-remove="handleRemove"
                                            :before-remove="beforeRemove"
                                            :on-exceed="handleExceed"
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
                                    <el-form-item label="申请单位监护人" prop="courseId" required>
                                        <el-select
                                        :disabled="dialogData.props.title === '查看'"
                                        v-model="dialogData.formData.courseId"
                                        placeholder="请选择单位监护人"
                                        clearable
                                        >
                                        <el-option v-for="item in dialogData.dropdown.courseName" :key="item.courseId" :label="item.courseName" :value="item.courseId" required>
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="安全交底人" prop="courseId" required>
                                        <el-select
                                        :disabled="dialogData.props.title === '查看'"
                                        v-model="dialogData.formData.courseId"
                                        placeholder="请选择安全交底人"
                                        clearable
                                        >
                                        <el-option v-for="item in dialogData.dropdown.courseName" :key="item.courseId" :label="item.courseName" :value="item.courseId" required>
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="作业单位" prop="courseId" required>
                                        <el-select
                                        :disabled="dialogData.props.title === '查看'"
                                        v-model="dialogData.formData.courseId"
                                        placeholder="请选择作业单位"
                                        clearable
                                        >
                                        <el-option v-for="item in dialogData.dropdown.courseName" :key="item.courseId" :label="item.courseName" :value="item.courseId" required>
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="itemStyle mt-16">
                                <p class="headerMsg">审批信息</p>
                                <div class="formItem">
                                    <p class="titleName">审批流程</p>
                                    <el-form-item label="审批模板" prop="courseId" required>
                                        <el-select
                                        :disabled="dialogData.props.title === '查看'"
                                        v-model="dialogData.formData.courseId"
                                        placeholder="请选择审批模板"
                                        clearable
                                        >
                                        <el-option v-for="item in dialogData.dropdown.courseName" :key="item.courseId" :label="item.courseName" :value="item.courseId" required>
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="itemStyle mt-16 footerStyle">

                                <el-button
                                    size="large"
                                    type="primary"
                                    v-if="dialogData.props.title !== '查看'"
                                    class="btn-mixins dia-suc"
                                    @click="success(addform)"
                                    > &nbsp;&nbsp;提交 &nbsp;&nbsp;</el-button>
                                <el-button
                                    size="large"
                                    class="btn-mixins-clear-default"
                                    @click="close"
                                    >&nbsp;&nbsp; 取消 &nbsp;&nbsp;</el-button
                                >
                            </div>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script  setup>
import { defineProps, ref,defineEmits } from "vue";
import { reactive, watch,onMounted } from "vue";
import {getExtract as getExtract} from "@/api/train.js"
import { ElMessage, ElMessageBox,ElNotification } from "element-plus";
import { useRouter } from 'vue-router';
import { Plus } from '@element-plus/icons-vue'
const router = useRouter();
let props = defineProps({
  hotworkContent: {
    type: Object,
    default: () => {},
  },
}); 
const emit = defineEmits(['callback'])
const dialogData = reactive({
    hotworkContent: {
        title: '新建'
    },
    dropdown:{
        headline:[],
        courseName:[],
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
              }]
    },
    rules:{
        courseId:[{ required: true, message: "请选择考核课程名称", trigger: "change" }],
        examineType:[{ required: true, message: "请选择考核方式", trigger: "change" }],
        gradesSum:[{ required: true, message: "请输入试卷总分（分）", trigger: "blur" }],
        passCriteria:[{ required: true, message: "请输入及格线（分）", trigger: "blur" }],
        examineDuration:[{ required: true, message: "请输入考试时长（分钟）", trigger: "blur" }],
        examineBeginTime:[{ required: true, message: "请选择考试开始时间", trigger: "change" }],
        examineEndTime:[{ required: true, message: "请选择考试截止时间", trigger: "change" }],
        aloneOptionNum:[{ required: true, message: "请输入单选题数量", trigger: "change" }],
        moreOptionsNum:[{ required: true, message: "请输入多选题数量", trigger: "change" }],
        judgeNum:[{ required: true, message: "请输入判断题数量", trigger: "change" }],
        outstanding:[{ required: true, message: "请输入优秀的百分比", trigger: "change" }],
        passRate:[{ required: true, message: "请输入及格的百分比", trigger: "change" }]
    },
    props:{
        title:'',
    },
    formData:{
        planId:'',
        courseId:'',
        courseName:'',
        headline:'',
        examineType:'',
        examineDuration:'',
        examineBeginTime:'',
        examineEndTime:'',
        aloneOptionNum:0,
        moreOptionsNum:0,
        judgeNum:0,
        totalNum:0,
        averageScore:0,
        evaluation:'',
        totalscore:0,
        aloneOptionCount:0,
        moreOptionsCount:0,
        judgeCount:0,
        options:[{
          key: '选择作业票1',
          value:''
        },{
          key: '选择作业票2',
          value:''
        },{
          key: '选择作业票2',
          value:''
        }],
        fileList:[{
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },{
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },{
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },]
    }
})
const getQusetion=(id)=>{
    let user = JSON.parse(localStorage.getItem('userData'))
    getExtract(id,user.username).then((res)=>{
        if(res.code ===200){
            dialogData.question = res.body.questionList;
            dialogData.score = res.body.grade;
            dialogData.examineState = res.body.examineState ===3?'不及格':res.body.examineState ===4?"及格":res.body.examineState === 5?'优秀':'';
            dialogData.answers = res.body.respondenceMap;
            Object.keys(dialogData.answers).forEach(key=>{
                if(dialogData.answers[key].length ===1){
                    dialogData.answers[key] = dialogData.answers[key].toString();
                }
            })
            console.log(dialogData.answers)
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
}
watch(
  () => props,
  () => {
      
        // dialogData.hotworkContent = props.hotworkContent
        // getQusetion(dialogData.hotworkContent.examineId)
  },
  { deep: true, immediate: true }
);

const  scrollToQuestion=(index)=> {
        const questionEl = document.getElementById(`question-${index}`)
        if (questionEl) {
          questionEl.scrollIntoView({ behavior: 'smooth' })
        }
      }

//返回上一级
const callback = () => {
    emit('callback') 
    console.log("111callback")
}
const removeOption = (item,index)=>{
  console.log(item)
  //删除对应的答题选项
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
}


</style>