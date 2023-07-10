<template>
     <div class="common-layout homepage">
        <el-container>
        <el-aside width="268px"><AllMenus></AllMenus></el-aside>
        <el-container>
        <el-header><NaviGation></NaviGation></el-header>
        <el-main>
            <TagVue></TagVue>
            <router-view />
        </el-main>
        

        </el-container>
        </el-container>
    </div>

</template>
<script>
import AllMenus from './menus.vue';
import NaviGation from './navigation.vue';
import TagVue from './tag.vue';
export default {
    name: "HomePage",
    components: {AllMenus,NaviGation,TagVue},
    data() {
        return {
        };
     },
     methods: {},
};
</script>
<style scoped>
.homepage{
    background-color: #F0F2F5;
    height: 100vh;
    overflow: hidden;
}
.el-header{
        --el-header-padding: 0;
        border-bottom: 1px solid #DFE2E7;
}
.el-aside{
    background-color: #EDF0F5;
    border-right: 1px solid #DFE2E7;
}
.el-main{
    --el-main-padding:0;
    overflow: hidden;
    height: calc(100% - 16px);
    margin: 16px 16px 0;
}
.el-container.is-vertical{
    height: 100%;
    background-color: #EDF0F5;
}
 :deep(.el-container){
    height: 100Vh;
}
</style>