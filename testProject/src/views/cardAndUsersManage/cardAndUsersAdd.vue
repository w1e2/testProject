<template>
  <!--  卡/用户信息录入页面-->
  <el-main>
    <p class="content-tit">
      <span @click="isShow('flag')" v-if='flag'>-</span>
      <span @click="isShow('flag')" v-else>+</span>
      持卡人信息
    </p>
    <el-form :model="formData" ref="formData" :rules="rule" label-width="100px" class="demo-ruleForm" label-position="right">
      <el-row type="flex" class="row-bg">
        <el-col :span="6">
          <el-form-item  label="姓名" size="small" :required="true" prop="name">
            <el-input v-model="formData.name" placeholder="请输入姓名" size='small' v-on:click.native.prevent="silkFun()"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item  label="电话号码1" size="small" :required="true" prop="telephone1">
            <el-input v-model="formData.telephone1" maxlength="11" placeholder="请输入电话号码1" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item  label="电话号码2" size="small" :required="false" prop="telephone2">
            <el-input v-model="formData.telephone2" maxlength="11" placeholder="请输入电话号码2" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item  label="电话号码3" size="small" :required="false" prop="telephone3">
            <el-input v-model="formData.telephone3" maxlength="11" placeholder="请输入电话号码3" size='small'></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <p class="content-tit">
      <span @click="isShow('flags')" v-if='flags'>-</span>
      <span @click="isShow('flags')" v-else>+</span>
      送卡人信息
    </p>
    <el-form :model="formData" ref="formData" :rules="rule" label-width="100px" class="demo-ruleForm" label-position="right">
      <el-row type="flex" class="row-bg">
        <el-col :span="6">
          <el-form-item  label="姓名" size="small" :required="true" prop="sendName">
            <el-input v-model="formData.sendName" placeholder="请输入姓名" size='small' v-on:click.native.prevent="focusClick1()"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item  label="电话号码1" size="small" :required="true" prop="sendTelephone1">
            <el-input v-model="formData.sendTelephone1" maxlength="11" placeholder="请输入电话号码1" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item  label="电话号码2" size="small" :required="false" prop="sendTelephone2">
            <el-input v-model="formData.sendTelephone2" maxlength="11" placeholder="请输入电话号码2" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item  label="电话号码3" size="small" :required="false" prop="sendTelephone3">
            <el-input v-model="formData.sendTelephone3" maxlength="11" placeholder="请输入电话号码3" size='small'></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <p class="content-tit">
      <span @click="isShow('cardFlag')" v-if='cardFlag'>-</span>
      <span @click="isShow('cardFlag')" v-else>+</span>
      信用卡信息
    </p>
    <el-form :model="formData" ref="formData" :rules="rule" label-width="100px" class="demo-ruleForm" label-position="right">
      <el-row type="flex" class="row-bg">
        <el-col :span="7">
          <el-form-item  label="卡号" size="small" :required="true" prop="cardID">
            <el-input v-model="formData.cardID" maxlength="21" placeholder="请输入卡号" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item  label="开户银行编码" size="small" :required="true" prop="bankName">
            <el-select v-model="formData.bankName" placeholder="请选择" @change="checkType()">
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
        <el-col :span="7" :offset="1">
          <el-form-item  label="欠款总金额" size="small" :required="true" prop="debtMoney">
            <el-input v-model="formData.debtMoney" placeholder="请输入欠款总金额" size='small'></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="7">
          <el-form-item  label="卡上余额" size="small" :required="true" prop="cardBalance">
            <el-input v-model="formData.cardBalance" placeholder="请输入余额" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item  label="账单日期" size="small" :required="true" prop="statementDate">
            <el-input v-model="formData.statementDate" placeholder="请输入账单日" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item  label="最后还款日" size="small" :required="true" prop="finaPaymentDate">
            <el-input v-model="formData.finaPaymentDate" placeholder="请输入最后还款日" size='small'></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="7">
          <el-form-item  label="是否为风险卡" size="small" :required="true" prop="isRiskCard">
            <el-select v-model="formData.isRiskCard" placeholder="请选择">
              <el-option
                v-for="item in cardOption"
                :key="item.code"
                :label="item.codeName"
                :value="item.code">
                <span>{{ item.code }}</span> - <span>{{ item.codeName }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item  label="卡状态" size="small" :required="true" prop="cardState">
            <el-select v-model="formData.cardState" placeholder="请选择" @change="checkType()">
              <el-option
                v-for="item in cardStateOption"
                :key="item.code"
                :label="item.codeName"
                :value="item.code">
                <span>{{ item.code }}</span> - <span>{{ item.codeName }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item  label="收费比率" size="small" :required="true" prop="chargeRadio">
            <el-input v-model="formData.chargeRadio" placeholder="请输入收费比率" size='small'></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="ali-right">
      <el-button type="primary" size="small" @click="addClick('formData')">录入</el-button>
    </div>
    <salesmanCodind v-if="showQueryDialog" @silkFuna="silkFuna"></salesmanCodind>
    <sendCardQuery v-if="showQueryDialogs" @silkFuna="silkFunas"></sendCardQuery>
  </el-main>
</template>
<script>
  import salesmanCodind from '@/components/salesman-coding'
  import sendCardQuery from '@/components/sendCard-query'
  export default {
    components: {
      salesmanCodind,
      sendCardQuery
    },
    data() {
      return {
        queryOption: [{ code: '0', codeName: '持卡人' },{ code: '1', codeName: '送卡人' },{ code: '2', codeName: '信用卡' }],
        cardStateOption: [{ code: '0', codeName: '不还' },{ code: '1', codeName: '正常' },{ code: '2', codeName: '卡被拿走' }],
        cardOption: [{ code: '0', codeName: '否' },{ code: '1', codeName: '是' }],
        flag: true,
        flags: true,
        cardFlag: true,
        bankOption: [],
        showQueryDialog: false, // 显示查询弹出框标志
        showQueryDialogs: false, // 显示查询弹出框标志
        formData: {
          name: '',// 姓名
          telephone1: "",// 电话号码
          telephone2: "",// 电话号码
          telephone3: "",// 电话号码
          sendDate: '', // 送卡时间
          sendName: '',// 姓名
          sendTelephone1: "",// 电话号码
          sendTelephone2: "",// 电话号码
          sendTelephone3: "",// 电话号码
          cardID: '',
          bankName: '', // 开户银行
          cardBalance: '', // 卡上余额
          debtMoney: '', // 欠款总金额
          statementDate: '', // 账单日期，具体日
          finaPaymentDate: '', // 最后还款日
          cardState: '', // 卡状态
          isRiskCard: '', // 是否为风险卡
          chargeRadio: '', // 收费比率
          pageNum:1
        },
        rule:{
          "name":[
            { required: true, message: '持卡人姓名不能为空' }
          ],
          "telephone1":[
            { required: true, message: '持卡人电话号码不能为空' }
          ],
          "sendName":[
            { required: true, message: '送卡人姓名不能为空' }
          ],
          "sendTelephone1":[
            { required: true, message: '送卡人电话号码不能为空' }
          ],
          "cardID": [
            { required: true, message: '信用卡卡号不能为空' }
          ],
          "bankName": [
            { required: true, message: '开户银行不能为空', trigger: 'change' }
          ],
          "debtMoney": [
            { required: true, message: '欠款总金额不能为空' }
          ],
          "cardBalance": [
            { required: true, message: '卡上余额不能为空' }
          ],
          "statementDate": [
            { required: true, message: '账单日期不能为空' }
          ],
          "finaPaymentDate": [
            { required: true, message: '最后还款日期不能为空' }
          ],
          "chargeRadio": [
            { required: true, message: '收费比率不能为空' }
          ],
          "cardState": [
            { required: true, message: '卡状态不能为空', trigger: 'change' }
          ],
          "isRiskCard": [
            { required: true, message: '是否为风险卡不能为空', trigger: 'change' }
          ],
        }
      };
    },
    methods: {
      handleCommand(command) {
        this.$message('click on item ' + command);
      },
      checkType: function () {
        console.log(this.formData.queryType, "dddddddddddddddddd");
      },
      isShow(val) {
        this[val] = !this[val];
      },
      silkFun() { // 业务员编码事件
        this.showQueryDialog = true
      },
      silkFuna(val) { // 业务员代码
        // this.formData.salesmanCode = val.agentCode
        this.showQueryDialog = val.isShowPages
      },
      silkFunas(val) { // 业务员代码
        // this.formDatas.salesmanCode = val.agentCode
        this.showQueryDialogs = val.isShowPages
      },
      focusClick1() {
        this.showQueryDialogs = true
      },
      // 录入按钮
      addClick(formData) {
        this.$refs[formData].validate((valid) => {
          if (valid) {
            alert('submit!');
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
