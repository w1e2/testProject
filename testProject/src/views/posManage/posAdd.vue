<template>
  <!--  pos机信息录入页面-->
  <el-main>
    <p class="content-tit">
      <span @click="isShow('flag')" v-if='flag'>-</span>
      <span @click="isShow('flag')" v-else>+</span>
      Pos机信息
    </p>
    <el-form :model="formData" ref="formData" :rules="rule" label-width="100px" class="demo-ruleForm" label-position="right">
      <el-row type="flex" class="row-bg">
        <el-col :span="7">
          <el-form-item  label="合作人" size="small" :required="true" prop="name">
            <el-input v-model="formData.name" maxlength="15" placeholder="请输入姓名" size='small' v-on:click.native.prevent="silkFun()"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item  label="合作人电话" size="small" :required="true" prop="telephone">
            <el-input v-model="formData.telephone" maxlength="15" placeholder="请输入电话号码" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item  label="本方银行编码" size="small" :required="true" prop="sex">
            <el-select v-model="formData.sex" placeholder="请选择" @change="checkType()">
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
      <el-row type="flex" class="row-bg">
        <el-col :span="7">
          <el-form-item  label="收款平台" size="small" :required="true" prop="platForm">
            <el-input v-model="formData.platForm" maxlength="15" placeholder="请输入收款平台" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item  label="最小收款金额" size="small" :required="true" prop="minAmount">
            <el-input v-model="formData.minAmount" maxlength="15" placeholder="请输入金额" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item  label="最大收款金额" size="small" :required="true" prop="maxAmount">
            <el-input v-model="formData.maxAmount" maxlength="15" placeholder="请输入金额" size='small'></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="7">
          <el-form-item  label="闪付收费比率" size="small" prop="flashRatio" :required="true">
            <el-input v-model="formData.flashRatio" placeholder="请输入1-100整数" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item  label="Pay收费比率" size="small" prop="payRatio" :required="true">
            <el-input v-model="formData.payRatio" placeholder="请输入1-100整数" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item  label="红卡收费比率" size="small" prop="redRatio" :required="true">
            <el-input v-model="formData.redRatio" placeholder="请输入1-100整数" size='small'></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="7">
          <el-form-item  label="正常收费比率" size="small" :required="true" prop="posRatio">
            <el-input v-model="formData.posRatio" maxlength="15" placeholder="请输入1-100整数" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item  label="状态" size="small" :required="true" prop="posState">
            <el-select v-model="formData.posState" placeholder="请选择" @change="checkType()">
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
      </el-row>
    </el-form>
    <div class="ali-right">
      <el-button type="primary" size="small" @click="addClick('formDatas')">录入</el-button>
    </div>
    <pos-query v-if="showQueryDialog" @silkFuna="silkFuna"></pos-query>
  </el-main>
</template>
<script>
  import posQuery from '@/components/posQuery'
  export default {
    components: {
      posQuery
    },
    data() {
      return {
        showQueryDialog: false,
        stateOption: [{ code: '0', codeName: '无效' },{ code: '1', codeName: '有效' }],
        bankOption: [],
        flag: true,
        formData: {
          name: '',// 姓名
          telephone: "",// 电话号码
          platForm: '', // 收款平台
          sendDate: '', // 送卡时间
          minAmount: '',// 最小收款金额
          maxAmount: "",// 最大收款金额
          flashRatio: '', // 闪付收费比率
          payRatio: '', // Pay收费比率
          redRatio: '', // 红卡收费比率
          posRatio: '', // 正常收费比率
          posState: '', // 状态 0-无效 1-有效
          pageNum:1
        },
        rule: {
          "name":[
            { required: true, message: '合作人姓名不能为空' }
          ],
          "telephone":[
            { required: true, message: '合作人电话号码不能为空' }
          ],
          "platForm":[
            { required: true, message: '收款平台不能为空' }
          ],
          "sendDate":[
            { required: true, message: '送卡时间不能为空' }
          ],
          "minAmount": [
            { required: true, message: '最小收款金额不能为空' }
          ],
          "maxAmount": [
            { required: true, message: '最大收款金额不能为空' }
          ],
          "flashRatio": [
            { required: true, message: '闪付费比率不能为空' }
          ],
          "payRatio": [
            { required: true, message: 'pay支付比率不能为空' }
          ],
          "redRatio": [
            { required: true, message: '红卡支付比率不能为空' }
          ],
          "posRatio": [
            { required: true, message: '正常收费比率不能为空' }
          ],
          "cardState": [
            { required: true, message: '卡状态不能为空', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      handleCommand(command) {
        this.$message('click on item ' + command);
      },
      silkFun() { // 业务员编码事件
        this.showQueryDialog = true
      },
      silkFuna(val) { // 业务员代码
        // this.formData.salesmanCode = val.agentCode
        this.showQueryDialog = val.isShowPages
      },
      checkType: function () {
        console.log(this.formData.queryType, "dddddddddddddddddd");
      },
      handleCurrentChangeSingle(num) {
        this.formData.pageNum = num;
        this.queryClick()
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
