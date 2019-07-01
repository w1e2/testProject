<template>
  <!--  卡/用户信息查询页面-->
  <el-main>
    <p class='content-tit'>请输入查询条件:</p>
    <el-form :model="formData" ref="formData" :rules="rule" label-width="100px" class="demo-ruleForm" label-position="right">
      <el-row type="flex" class="row-bg">
        <el-col :span="7">
          <el-form-item  label="客户姓名" size="small" :required="true" prop="name">
            <el-input v-model="formData.name" placeholder="请输入客户姓名" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item  label="手机号" size="small" :required="true" prop="telephone">
            <el-input v-model="formData.telephone" maxlength="15" placeholder="请输入客户手机号" size='small'></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="ali-right">
        <el-button type="primary" size="small" @click="queryClick('formData')">查询</el-button>
      </div>
    </el-form>
    <p class="content-tit">
      <span @click="isShow('flag')" v-if='flag'>-</span>
      <span @click="isShow('flag')" v-else>+</span>
      查询结果
    </p>
    <el-table :data="selfList" style="width: 100%" class='table-common' :highlight-current-row="true" border>
      <el-table-column label="序号" type='index' width="60" align="center"></el-table-column>
      <el-table-column prop="cardId" label="卡编码" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="settleMonth" label="结算月份" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="operType" label="操作类型" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="money" label="金额" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="makeDate" label="操作时间" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="operName" label="操作人" min-width="15%" align="center"></el-table-column>
      <el-table-column label="操作" min-width="15%" align="center">
        <el-button type="text" @click.native.prevent="queryDetail(scope.$index)" size="small">
          点击
        </el-button>
      </el-table-column>
    </el-table>
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
  import { queryInit, queryInfo } from '@/api/clientRepaymentManage/clientRepaymentManage'
  export default {
    name: 'clientDetailThird',
    components: {
    },
    data() {
      return {
        queryOption: [{ code: '0', codeName: '持卡人' },{ code: '1', codeName: '送卡人' },{ code: '2', codeName: '信用卡' }], // 管理机构
        flag: true,
        formData: {
          name: '',// 流水号
          telephone: "",// 客户id
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
    created() {
      this.queryInit() // 初始化表格数据
    },
    methods: {
      checkType: function () {
        this.searchFlag = true
        console.log(this.formData.queryType, "dddddddddddddddddd");
      },
      handleCurrentChangeSingle(num) {
        this.formData.pageNum = num;
        this.queryClick()
      },
      queryDetail(index) {

      },
      isShow(val) {
        this[val] = !this[val];
      },
      // 查询按钮
      queryClick(formData) {
        this.$refs[formData].validate((valid) => {
          if (valid) {
            const formData = { // 参数
            }
            return new Promise((resolve, reject) => {
              queryInfo(formData).then(res => {
                console.log('初始化数据')
                resolve()
              }).catch(error => {
                reject(error)
              })
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      queryInit() {
        const formData = { // 参数
        }
        return new Promise((resolve, reject) => {
          queryInit(formData).then(res => {
            console.log('初始化表格数据')
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      }
    }
  }
</script>
<style scoped>

</style>
