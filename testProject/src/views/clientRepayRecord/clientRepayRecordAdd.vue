
<template>
  <!--  pos机信息录入页面-->
  <el-main>
    <p class="content-tit">
      <span @click="isShow('flag')" v-if='flag'>-</span>
      <span @click="isShow('flag')" v-else>+</span>
      客户还款记录信息
    </p>
    <el-form :model="formData" ref="formData" :rules="rule" label-width="100px" class="demo-ruleForm" label-position="right">
      <el-row type="flex" class="row-bg">
        <el-col :span="7">
          <el-form-item  label="信用卡编码" size="small" :required="true" prop="cardCode">
            <el-input v-model="formData.cardCode" maxlength="15" placeholder="请输入姓名" size='small' v-on:click.native.prevent="silkFun()"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item  label="Pos编码" size="small" :required="true" prop="posCode">
            <el-select v-model="formData.posCode" placeholder="请选择" @change="checkType()">
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
          <el-form-item  label="操作金额" size="small" :required="true" prop="amount">
            <el-input v-model="formData.amount" maxlength="15" placeholder="请输入账号" size='small'></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="7">
          <el-form-item  label="操作类型" size="small" :required="true" prop="operator">
            <el-select v-model="formData.operator" placeholder="请选择" @change="checkType()">
              <el-option
                v-for="item in operatorOption"
                :key="item.code"
                :label="item.codeName"
                :value="item.code">
                <span>{{ item.code }}</span> - <span>{{ item.codeName }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item  label="刷卡类型" size="small" :required="true" prop="creditType">
            <el-select v-model="formData.creditType" placeholder="请选择" @change="checkType()">
              <el-option
                v-for="item in creditTypeOption"
                :key="item.code"
                :label="item.codeName"
                :value="item.code">
                <span>{{ item.code }}</span> - <span>{{ item.codeName }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item  label="备注" size="small" :required="true" prop="remarks">
            <el-input v-model="formData.remarks" placeholder="备注" size='small'></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="ali-right">
      <el-button type="primary" size="small" @click="addClick('formData')">录入</el-button>
    </div>
    <client-repay-record v-if="showQueryDialog" @silkFuna="silkFuna"></client-repay-record>
  </el-main>
</template>
<script>
  import clientRepayRecord from '@/components/clientRepayRecord'
  export default {
    components: {
      clientRepayRecord
    },
    data() {
      return {
        operatorOption: [], // 操作类型
        creditTypeOption: [], // 刷卡类型
        stateOption: [{ code: '0', codeName: '无效' },{ code: '1', codeName: '有效' }],
        bankOption: [],
        flag: true,
        showQueryDialog: false,
        formData: {
          cardCode: '',// 卡编码
          posCode: "",// 银行编码
          operator: '', // 操作类型
          creditType: '', // 刷卡类型
          amount: '', // 金额
          remarks: '', // 备注
          pageNum:1
        },
        rule: {
          "cardCode":[
            { required: true, message: '卡编码不能为空' }
          ],
          "amount":[
            { required: true, message: '金额不能为空' }
          ],
          "remarks":[
            { required: true, message: '备注不能为空' }
          ],
          "operator": [
            { required: true, message: '操作类型不能为空', trigger: 'change' }
          ],
          "creditType": [
            { required: true, message: '刷卡类型不能为空', trigger: 'change' }
          ],
          "posCode": [
            { required: true, message: '银行编码不能为空', trigger: 'change' }
          ],
        }
      };
    },
    methods: {
      checkType: function () {
        console.log(this.formData.queryType, "dddddddddddddddddd");
      },
      handleCurrentChangeSingle(num) {
        this.formData.pageNum = num;
        this.queryClick()
      },
      silkFun() { // 业务员编码事件
        this.showQueryDialog = true
      },
      silkFuna(val) { // 业务员代码
        // this.formData.salesmanCode = val.agentCode
        this.showQueryDialog = val.isShowPages
      },
      isShow(val) {
        this[val] = !this[val];
      },
      // 录入按钮
      addClick() {
      }
    }
  }
</script>
<style scoped>
</style>
