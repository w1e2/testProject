<template>
  <!--  卡/用户信息查询页面-->
  <el-main>
    <p class='content-tit'>请输入查询条件:</p>
    <el-form :model="formData" ref="formData" :rules="rule" label-width="100px" class="demo-ruleForm" label-position="right">
      <el-row type="flex" class="row-bg">
        <el-col :span="7">
          <el-form-item  label="流水号" size="small" :required="true" prop="serialno">
            <el-input v-model="formData.serialno" maxlength="15" placeholder="请输入流水号" size='small' v-on:click.native.prevent="silkFun()"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item  label="出纳人员" size="small" :required="true" prop="cashier">
            <el-input v-model="formData.cashier" placeholder="请输入出纳人员" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item  label="财务类型" size="small" :required="true" prop="financeType">
            <el-input v-model="formData.financeType" maxlength="15" placeholder="请输入客户编码" size='small'></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="7">
          <el-form-item  label="财务收支" size="small" :required="true" prop="sign">
            <el-select v-model="formData.sign" placeholder="请选择">
              <el-option
                v-for="item in stateOption"
                :key="item.code"
                :label="item.codeName"
                :value="item.code">
                <span>{{ item.code }}</span> - <span>{{ item.codeName }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item  label="涉及金额" size="small" :required="true" prop="amount">
            <el-input v-model="formData.amount" placeholder="请输入金额" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item  label="收款渠道" size="small" :required="true" prop="paymenttype">
            <el-select v-model="formData.paymenttype" placeholder="请选择">
              <el-option
                v-for="item in payOption"
                :key="item.code"
                :label="item.codeName"
                :value="item.code">
                <span>{{ item.code }}</span> - <span>{{ item.codeName }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="7">
          <el-form-item  label="描述" size="small" :required="true" prop="describe">
            <el-input v-model="formData.describe" placeholder="请输入描述" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item  label="录入时间" size="small" :required="true" prop="makedate">
            <el-date-picker
              v-model="formData.makedate"
              type="date"
              placeholder="选择日期"
              :format="'yyyy-MM-dd'"
              :value-format="'yyyy-MM-dd'"
              style="">
            </el-date-picker>
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
      <el-table-column prop="missionprop1" label="流水号" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop2" label="出纳人员" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop3" label="财务类型" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop4" label="财务收支" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop5" label="涉及金额" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop6" label="收款渠道" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop7" label="描述" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop8" label="录入时间" min-width="15%" align="center"></el-table-column>
      <el-table-column label="操作" min-width="15%" align="center">
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
  import { queryInit, queryInfo } from '@/api/dailyOperationManage/dailyOperationManage'
  export default {
    components: {
    },
    data() {
      return {
        stateOption: [{ code: '0', codeName: '收入' },{ code: '1', codeName: '支出' }],
        payOption: [{ code: '1', codeName: '现金' },{ code: '2', codeName: '支付宝' },{ code: '3', codeName: '微信' },{ code: '4', codeName: '刷卡消耗' },{ code: '5', codeName: '其他' }],
        financeOption: [{ code: '1', codeName: '提现费用' },{ code: '2', codeName: '日常开销' },{ code: '3', codeName: '其他' }],
        flag: true,
        formData: {
          serialno: '',// 流水号
          financeType: "",// 财务类型
          cashier: '', // 出纳人员
          sign: '', //
          amount: '',// 涉及金额
          paymenttype: '', // 收款渠道
          describe: '', // 描述
          makedate: '', // 录入时间
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
