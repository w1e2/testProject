<template>
  <!--  卡/用户信息录入页面-->
  <el-main>
    <p class="content-tit">
      <span @click="isShow('flag')" v-if='flag'>-</span>
      <span @click="isShow('flag')" v-else>+</span>
      持卡人信息
    </p>
    <el-form :model="formData" ref="formData" label-width="100px" class="demo-ruleForm" label-position="right">
      <el-row type="flex" class="row-bg">
        <el-col :span="6">
          <el-form-item  label="姓名" size="small" :required="true" prop="name">
            <el-input v-model="formData.name" placeholder="请输入姓名" size='small' @focus="focusClick()"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item  label="电话号码1" size="small" :required="true" prop="telephone">
            <el-input v-model="formData.telephone1" maxlength="11" placeholder="请输入电话号码1" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item  label="电话号码2" size="small" :required="true" prop="telephone">
            <el-input v-model="formData.telephone2" maxlength="11" placeholder="请输入电话号码2" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item  label="电话号码3" size="small" :required="true" prop="telephone">
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
    <el-form :model="formData" ref="formData" label-width="100px" class="demo-ruleForm" label-position="right">
      <el-row type="flex" class="row-bg">
        <el-col :span="6">
          <el-form-item  label="姓名" size="small" :required="true" prop="sendName">
            <el-input v-model="formData.sendName" maxlength="15" placeholder="请输入姓名" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item  label="电话号码1" size="small" :required="true" prop="sendTelephone">
            <el-input v-model="formData.sendTelephone1" maxlength="11" placeholder="请输入电话号码1" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item  label="电话号码2" size="small" :required="true" prop="sendTelephone">
            <el-input v-model="formData.sendTelephone2" maxlength="11" placeholder="请输入电话号码2" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item  label="电话号码3" size="small" :required="true" prop="sendTelephone">
            <el-input v-model="formData.sendTelephone3" maxlength="11" placeholder="请输入电话号码3" size='small'></el-input>
          </el-form-item>
        </el-col>
      </el-row>
<!--      <el-row type="flex" class="row-bg">-->
<!--        <el-col :span="8">-->
<!--          <el-form-item  label="送卡时间" size="small" prop="sendDate" :required="true">-->
<!--            <el-input v-model="formData.sendDate" maxlength="15" placeholder="请选择时间" size='small'></el-input>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--      </el-row>-->
    </el-form>
    <p class="content-tit">
      <span @click="isShow('cardFlag')" v-if='cardFlag'>-</span>
      <span @click="isShow('cardFlag')" v-else>+</span>
      信用卡信息
    </p>
    <el-form :model="formData" ref="formData" label-width="100px" class="demo-ruleForm" label-position="right">
      <el-row type="flex" class="row-bg">
        <el-col :span="8">
          <el-form-item  label="卡号" size="small" :required="true" prop="cardID">
            <el-input v-model="formData.cardID" maxlength="21" placeholder="请输入卡号" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
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
        <el-col :span="8">
          <el-form-item  label="欠款总金额" size="small" :required="true" prop="debtMoney">
            <el-input v-model="formData.debtMoney" placeholder="请输入欠款总金额" size='small'></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="8">
          <el-form-item  label="卡上余额" size="small" :required="true" prop="cardBalance">
            <el-input v-model="formData.cardBalance" placeholder="请输入余额" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item  label="账单日期" size="small" :required="true" prop="statementDate">
            <el-input v-model="formData.statementDate" placeholder="请输入账单日" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item  label="最后还款日" size="small" :required="true" prop="finaPaymentDate">
            <el-input v-model="formData.finaPaymentDate" placeholder="请输入最后还款日" size='small'></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="8">
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
        <el-col :span="8">
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
        <el-col :span="8">
          <el-form-item  label="收费比率" size="small" :required="true" prop="chargeRadio">
            <el-input v-model="formData.chargeRadio" placeholder="请输入收费比率" size='small'></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="ali-right">
      <el-button type="primary" size="small" @click="addClick('formDatas')">录入</el-button>
    </div>
  </el-main>
</template>
<script>
  export default {
    components: {
    },
    data() {
      return {
        queryOption: [{ code: '0', codeName: '持卡人' },{ code: '1', codeName: '送卡人' },{ code: '2', codeName: '信用卡' }],
        cardStateOption: [{ code: '0', codeName: '' },{ code: '1', codeName: '正常' },{ code: '2', codeName: '信用卡' }],
        cardOption: [{ code: '0', codeName: '否' },{ code: '1', codeName: '是' }],
        flag: true,
        flags: true,
        cardFlag: true,
        bankOption: [],
        showQueryDialog: false, // 显示查询弹出框标志
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
      focusClick() {

      },
      // 录入按钮
      addClick() {
      }
    }
  }
</script>
<style scoped>
</style>
