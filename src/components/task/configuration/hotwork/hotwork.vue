<template>
    <div class="Configuration_hotwork" >
        <div class="bottomBox bg_color">
            <div class="test_paper">
                <el-tabs v-model="tabContent.activeName" class="demo-tabs" @tab-click="handleClick">
                        <el-tab-pane label="安全措施" name="a">
                            <div class="safety_box">
                                <p class="safety_measures" v-for="(item,index) in tabContent.contentData.a" :key="item.configId">
                                    <span class="safety_measures_item">安全措施{{index+1}}：</span>
                                    <span class="safety_measures_content">{{item.configValue}}</span>
                                </p>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="安全交底信息" name="b">
                            <div class="safety_box">
                                <p class="safety_measures" v-for="(item,index) in tabContent.contentData.b" :key="item.configId">
                                    <span class="safety_measures_item">内容{{index+1}}：</span>
                                    <span class="safety_measures_content">{{item.configValue}}</span>
                                </p>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="作业前清单" name="c">
                            <div class="safety_box">
                                <p class="safety_measures" v-for="(item,index) in tabContent.contentData.c" :key="item.configId">
                                    <span class="safety_measures_item">内容{{index+1}}：</span>
                                    <span class="safety_measures_content">{{item.configValue}}</span>
                                </p>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="验收清单" name="d">
                            <div class="safety_box">
                                <p class="safety_measures" v-for="(item,index) in tabContent.contentData.d" :key="item.configId">
                                    <span class="safety_measures_item">内容{{index+1}}：</span>
                                    <span class="safety_measures_content">{{item.configValue}}</span>
                                </p>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="预警设置" name="e">
                            <div class="safety_box">
                                 <p class="titleName">作业票超时</p>
                                    <p class="formItemStyle"><span class="labelStyle">特级：</span>作业票有效时间{{tabContent.contentData.e.a.special}}小时</p>
                                    <p class="formItemStyle"><span class="labelStyle">一级：</span>作业票有效时间{{tabContent.contentData.e.a.one}}小时</p>
                                    <p class="formItemStyle"><span class="labelStyle">二级：</span>作业票有效时间{{tabContent.contentData.e.a.two}}小时</p>
                                     <p class="formItemStyle"><span class="labelStyle">作业建议：</span>{{tabContent.contentData.e.a.suggest}}</p>
                                <p class="titleName mt-16">动火分析超时</p>
                                 <p class="formItemStyle"><span class="labelStyle">动火前分析：</span>作业票有效时间{{tabContent.contentData.e.b.analyse}}小时</p> 
                                 <p class="formItemStyle"><span class="labelStyle">作业建议：</span>{{tabContent.contentData.e.b.suggest}}</p>
                                 
                                 <p class="titleName mt-16">动火分析不合格</p>
                                 <p class="formItemStyle" v-for="(item,index) in tabContent.contentData.e.c.gas" :key="item.gasName"><span class="labelStyle">代表性气体{{index +1}}</span>{{item.gasName}}{{item.gasSymbol}}{{item.gasValue}}时不合格</p>  
                                 <p class="formItemStyle"><span class="labelStyle">作业建议：</span>{{tabContent.contentData.e.c.suggest}}</p>
                                 <p class="titleName mt-16">作业中断原因</p>
                                 <p class="formItemStyle"><span class="labelStyle">作业中断原因：</span>{{tabContent.contentData.e.d.cause.join(',')}}</p>   
                            </div>
                        </el-tab-pane>
                         <el-tab-pane label="其他设置" name="f">
                            <div class="safety_box">
                                 <p class="titleName">关联监控</p>
                                 <p class="formItemStyle" ><span class="labelStyle">监控视频:</span>{{tabContent.contentData.f.a.surveillanceStr.join(',')}}</p>  
                                <p class="titleName mt-16">作业方式</p>
                                 <p class="formItemStyle"><span class="labelStyle">动火方式：</span>{{tabContent.contentData.f.b.method.join(',')}}</p> 
                            </div>
                        </el-tab-pane>
                </el-tabs>

            </div>
            <div class="test_paper editButton" style="margin-top:16px;">
                    <el-button class="btn-mixins-clear-default"
                                @click="editData"
                                >编辑</el-button>
            </div>
        </div>

    </div>
</template>
<script setup>
import { reactive, ref,defineEmits } from "vue";
import {getWorkConfig as getWorkConfig} from "@/api/train.js"
import { ElMessage, ElMessageBox,ElNotification } from "element-plus";
import { onBeforeMount,watch } from "vue";
const emit = defineEmits(['editData'])
const iswacth = ref(true)
let tabContent =  reactive({
    activeName:'a',
    contentData:{
    "a": [
        {
            "configId": 0,
            "configName": "",
            "configValue": "",
            "parentId": 1,
            "configTitle": ''
        }
    ],
    "e": {
        "a": {
            "special": "",
            "one": "",
            "suggest": "",
            "two": ""
        },
        "b": {
            "analyse": "",
            "suggest": ""
        },
        "c": {
            "gas": [
                {
                    "gasName": "",
                    "gasValue": "",
                    "gasSymbol": ''
                },
            ],
            "suggest": ""
        },
        "d": {
            "cause": []
        }
    },
    "f": {
        "a": {
            "surveillance": [],
            "surveillanceStr": []
        },
        "b": {
            "method": []
        }
    }
}
})

const editData = () => {
    emit('editData',{
        showHotworkEdit:true,
        titleName: tabContent.activeName
        // hotWorkId:row.workId,
    })
}
const getWorkConfigFun = ()=>{
        getWorkConfig().then((res)=>{
        if(res.code ===200){
            tabContent.contentData = res.body;
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
    () => iswacth.value,
    () => {
        getWorkConfigFun();
    },
    { deep: true, immediate: true }
)
</script>
<style lang = 'less' scoped>
.Configuration_hotwork{
        height: 100%;
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
            background-color: #ffffff;
            .formStyle{
                width: 100%;
            }
        }
        .totalStyle{
            height: 100%;
        }
        .safety_box{
            padding: 16px 56px;
            .safety_measures{
                display: flex;
                 margin: 8px;
                .safety_measures_item{
                    color: #797F89;
                    font-size: 14px;
                    width: 80px;
                    display: inline-block;
                }
                .safety_measures_content{
                    color: #1C222C;
                    font-size: 14px;
                    display: inline-block;
                    width: calc(100% - 80px);
                }
            }
        }
        .titleName{
                color: #4B515B;
                font-size: 14px;
                padding-left: 8px;
                border-left: 5px solid #2E83FC;
                margin-bottom: 16px;
                
         }
        .formItemStyle{
                color: #1C222C;
                font-size: 14px;
                .labelStyle{
                    display: inline-block;
                    color: #797F89;
                    font-size: 14px;
                    margin-right: 16px;
                    width: 150px;
                    text-align: right;
                    margin-bottom: 16px;
                }
            }
        .editButton{
            margin-top: 16px !important;
            padding: 16px;
            text-align: center;
        }
}

</style>