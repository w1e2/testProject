<template>
  <!--  pos机信息查询页面-->
  <el-main>
    <p class='content-tit'>请输入查询条件:</p>
    <el-form :model="formData" ref="formData" label-width="100px" class="demo-ruleForm" label-position="right">
      <el-row type="flex" class="row-bg">
        <el-col :span="7">
          <el-form-item  label="户名" size="small">
            <el-input v-model="formData.name" maxlength="15" placeholder="请输入姓名" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item  label="银行编码" size="small">
            <el-input v-model="formData.telephone" maxlength="15" placeholder="请输入电话号码" size='small'></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="7">
          <el-form-item  label="账号" size="small">
            <el-input v-model="formData.cardNum" maxlength="15" placeholder="请输入卡号" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item  label="金额" size="small">
            <el-input v-model="formData.money" maxlength="15" placeholder="请输入卡号" size='small'></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="ali-right" v-if="searchFlag">
        <el-button type="primary" size="small" @click="queryClick('formDatas')">查询</el-button>
      </div>
    </el-form>
    <p class="content-tit">
      <span @click="isShow('flag')" v-if='flag'>-</span>
      <span @click="isShow('flag')" v-else>+</span>
      查询结果
    </p>
    <el-table :data="selfList" style="width: 100%" class='table-common' :highlight-current-row="true" border>
      <el-table-column label="序号" type='index' width="60" align="center"></el-table-column>
      <el-table-column prop="missionprop1" label="户名" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop2" label="银行编码" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop3" label="账号" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop4" label="金额" min-width="15%" align="center"></el-table-column>
    </el-table>
    <!--    <el-button type="primary" size="mini" @click="goToBusiDeal()">-->
    <!--      保全受理-->
    <!--    </el-button>-->
    <!--    <el-button type="primary" size="mini" @click="showNotePad()">-->
    <!--      记事本查看-->
    <!--    </el-button>-->
    <div class="mar15 ali-right">
      <el-pagination
        @current-change="handleCurrentChangeSingle"
        :current-page="selfPage.currentPage"
        :page-size="selfPage.perPage"
        layout="total, prev, pager, next, jumper"
        :total="selfPage.totalSize">
      </el-pagination>
    </div>
  </el-main>
</template>
<script>
  export default {
    components: {
    },
    data() {
      return {
        searchFlag: false, // 选择查询类型后显示查询条件
        queryOption: [{ code: '0', codeName: '持卡人' },{ code: '1', codeName: '送卡人' },{ code: '2', codeName: '信用卡' }], // 管理机构
        flag: true,
        formData: {
          queryType: '', // 查询类型
          name: '',// 姓名
          telephone: "",// 电话号码
          cardNum: "",// 卡号
          money: '',// 金额
          pageNum:1
        },
        selfPage: {
          currentPage: 1,
          hasMore: true,
          perPage: 10,
          totalPage: 0,
          totalSize: 0
        },
        selfList: []
      };
    },
    methods: {
      handleCommand(command) {
        this.$message('click on item ' + command);
      },
      checkType: function () {
        this.searchFlag = true
        console.log(this.formData.queryType, "dddddddddddddddddd");
      },
      handleCurrentChangeSingle(num) {
        this.formData.pageNum = num;
        this.queryClick()
      },
      isShow(val) {
        this[val] = !this[val];
      },
      // 查询按钮
      queryClick() {
      }
    }
  }
</script>
<style scoped>

</style>
