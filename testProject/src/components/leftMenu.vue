<template>
  <el-row style="color: rgb(171, 212, 242); background-color: rgb(59, 94, 131)">
  <el-col :span="8">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <span>保全处理</span>
                    <i class="el-icon-location"></i>
        </template>
        <el-menu-item-group>
          <template slot="title">无扫描申请</template>
          <!-- <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item> -->
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</el-row>

</template>
 <script>
export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style>
  .tac{
      width: 30%;
      background-color: aquamarine;
  }
  .el-menu-vertical-demo {
      position: absolute;
      width:10%; 
      left: 0px;
      padding-top: 70px;
      background-color: rgb(59, 94, 131);
  }
  .el-icon-location {

  }
</style>
