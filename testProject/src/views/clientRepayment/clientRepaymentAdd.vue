<template>
  <!--  pos机信息录入页面-->
  <el-main>
    <p class="content-tit">
      <span @click="isShow('flag')" v-if='flag'>-</span>
      <span @click="isShow('flag')" v-else>+</span>
      客户还款录入信息
    </p>
    <el-form :model="formData" ref="formData" :rules="rule" label-width="100px" class="demo-ruleForm" label-position="right">
      <el-row type="flex" class="row-bg">
        <el-col :span="7">
          <el-form-item  label="流水号" size="small" :required="true" prop="serialno">
            <el-input v-model="formData.serialno" maxlength="15" placeholder="请输入流水号" size='small' v-on:click.native.prevent="silkFun()"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item  label="出纳人员" size="small" :required="true" prop="cashier">
            <el-input v-model="formData.cashier" placeholder="请输入账号" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item  label="客户编码" size="small" :required="true" prop="cusId">
            <el-input v-model="formData.cusId" maxlength="15" placeholder="请输入客户编码" size='small'></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="7">
          <el-form-item  label="是否还有余款" size="small" :required="true" prop="amount">
            <el-select v-model="formData.amount" placeholder="请选择">
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
          <el-form-item  label="还完欠款后剩余金额" size="small" :required="true" prop="balance">
            <el-input v-model="formData.balance" placeholder="请输入金额" size='small'></el-input>
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
          <el-form-item  label="收款后本方银行编码" size="small" :required="true" prop="partbankid">
            <el-select v-model="formData.partbankid" placeholder="请选择">
              <el-option
                v-for="item in bankOption"
                :key="item.code"
                :label="item.codeName"
                :value="item.code">
                <span>{{ item.code }}</span> - <span>{{ item.codeName }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="ali-right">
      <el-button type="primary" size="small" @click="addClick('formData')">录入</el-button>
    </div>
<!--    <bank-query v-if="showQueryDialog" @silkFuna="silkFuna"></bank-query>-->
  </el-main>
</template>
<script>
  import bankQuery from '@/components/bankQuery'
  import { addInfo } from "../../api/clientRepaymentManage/clientRepaymentManage";
  export default {
    components: {
      bankQuery
    },
    data() {
      return {
        stateOption: [{ code: '0', codeName: '是' },{ code: '1', codeName: '否' }],
        payOption: [{ code: '1', codeName: '现金' },{ code: '2', codeName: '支付宝' },{ code: '3', codeName: '微信' },{ code: '4', codeName: '刷卡消耗' },{ code: '5', codeName: '其他' }],
        flag: true,
        bankOption: [],
        showQueryDialog: false,
        rule: {
          "serialno":[
            { required: true, message: '流水号不能为空' }
          ],
          "cusId":[
            { required: true, message: '客户id不能为空' }
          ],
          "cashier":[
            { required: true, message: '出纳人员不能为空' }
          ],
          "amount": [
            { required: true, message: '金额不能为空' }
          ],
          "balance": [
            { required: true, message: '剩余金额不能为空' }
          ],
          "paymenttype": [
            { required: true, message: '收款渠道不能为空', trigger: 'change' }
          ],
          "describe": [
            { required: true, message: '描述不能为空' }
          ],
          "partbankid": [
            { required: true, message: '本方银行编码不能为空', trigger: 'change' }
          ],
        },
        formData: {
          serialno: '',// 流水号
          cusId: "",// 客户id
          cashier: '', // 出纳人员
          amount: '',// 金额
          balance: '', // 剩余金额
          paymenttype: '', // 收款渠道
          describe: '', // 描述
          partbankid: '', //
          pageNum:1
        }
      };
    },
    methods: {
      checkType: function () {
        console.log(this.formData.queryType, "dddddddddddddddddd");
      },
      silkFun() { // 业务员编码事件
        this.showQueryDialog = true
      },
      handleCurrentChangeSingle(num) {
        this.formData.pageNum = num;
        this.queryClick()
      },
      silkFuna(val) { // 业务员代码
        // this.formData.salesmanCode = val.agentCode
        this.showQueryDialog = val.isShowPages
      },
      isShow(val) {
        this[val] = !this[val];
      },
      // 录入按钮
      addClick(formData) {
        this.$refs[formData].validate((valid) => {
          if (valid) {
            const formData = { // 参数
            }
            return new Promise((resolve, reject) => {
              addInfo(formData).then(res => {
                console.log('添加数据')
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
      }
    }
  }
</script>
<style scoped>
</style>
