<template>
    <div class="Configuration_hotwork" >
        <div class="bottomBox bg_color">
            <div class="test_paper">
                <el-tabs v-model="tabContent.activeName" class="demo-tabs" @tab-click="handleClick">
                        <el-tab-pane label="安全措施" name="aa">
                            <div class="safety_box">
                                <p class="safety_measures">
                                    <span class="safety_measures_item">安全措施1：</span>
                                    <span class="safety_measures_content">动火设备内部构件清洗干净，烟气吹扫或者水洗，置换合格，达到动火条件,动火设备内部构件清洗干净，烟气吹扫或者水洗，置换合格，达到动火条件</span>
                                </p>
                            </div>

                        </el-tab-pane>
                        <el-tab-pane label="安全交底信息" name="bb">
                            <div class="safety_box">
                                <p class="safety_measures">
                                    <span class="safety_measures_item">安全措施1：</span>
                                    <span class="safety_measures_content">动火设备内部构件清洗干净，烟气吹扫或者水洗，置换合格，达到动火条件,动火设备内部构件清洗干净，烟气吹扫或者水洗，置换合格，达到动火条件</span>
                                </p>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="作业前清单" name="cc">
                            <div class="safety_box">
                                <p class="safety_measures">
                                    <span class="safety_measures_item">安全措施1：</span>
                                    <span class="safety_measures_content">动火设备内部构件清洗干净，烟气吹扫或者水洗，置换合格，达到动火条件,动火设备内部构件清洗干净，烟气吹扫或者水洗，置换合格，达到动火条件</span>
                                </p>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="验收清单" name="dd">
                            <div class="safety_box">
                                <p class="safety_measures">
                                    <span class="safety_measures_item">安全措施1：</span>
                                    <span class="safety_measures_content">动火设备内部构件清洗干净，烟气吹扫或者水洗，置换合格，达到动火条件,动火设备内部构件清洗干净，烟气吹扫或者水洗，置换合格，达到动火条件</span>
                                </p>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="预警设置" name="ee">
                            <div class="safety_box">
                                 <p class="titleName">作业票超时</p>
                                 <p class="formItemStyle"><span class="labelStyle">特级：</span>作业票有效时间8小时</p>
                                <p class="titleName mt-16">动火分析超时</p>
                                 <p class="formItemStyle"><span class="labelStyle">动火前分析：</span>作业票有效时间8小时</p> 
                                 <p class="titleName mt-16">动火分析不合格</p>
                                 <p class="formItemStyle"><span class="labelStyle">动火前分析：</span>作业票有效时间8小时</p>  
                                 <p class="titleName mt-16">作业中断原因</p>
                                 <p class="formItemStyle"><span class="labelStyle">动火前分析：</span>作业票有效时间8小时</p>   
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="其他设置" name="ff">
                            <div class="safety_box">
                                 <p class="titleName">作业票超时</p>
                                 <p class="formItemStyle"><span class="labelStyle">特级：</span>作业票有效时间8小时</p>
                                <p class="titleName mt-16">动火分析超时</p>
                                 <p class="formItemStyle"><span class="labelStyle">动火前分析：</span>作业票有效时间8小时</p> 
                                 <p class="titleName mt-16">动火分析不合格</p>
                                 <p class="formItemStyle"><span class="labelStyle">动火前分析：</span>作业票有效时间8小时</p>  
                                 <p class="titleName mt-16">作业中断原因</p>
                                 <p class="formItemStyle"><span class="labelStyle">动火前分析：</span>作业票有效时间8小时</p>   
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
const emit = defineEmits(['editData'])
let tabContent =  reactive({
    activeName:'aa',
})
const editData = () => {
    emit('editData',{
        showHotworkEdit:true,
        // hotWorkId:row.workId,
    })
}

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