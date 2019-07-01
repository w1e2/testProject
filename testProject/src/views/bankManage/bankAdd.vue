<template>
  <!--  pos机信息录入页面-->
  <el-main>
    <p class="content-tit">
      <span @click="isShow('flag')" v-if='flag'>-</span>
      <span @click="isShow('flag')" v-else>+</span>
      本方银行信息
    </p>
    <el-form :model="formData" ref="formData" :rules="rule" label-width="100px" class="demo-ruleForm" label-position="right">
      <el-row type="flex" class="row-bg">
        <el-col :span="7">
          <el-form-item  label="户名" size="small" :required="true" prop="name">
            <el-input v-model="formData.name" maxlength="15" placeholder="请输入户名" size='small' v-on:click.native.prevent="silkFun()"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item  label="银行编码" size="small" :required="true" prop="bankCode">
            <el-select v-model="formData.bankCode" placeholder="请选择">
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
          <el-form-item  label="账号" size="small" :required="true" prop="acccode">
            <el-input v-model="formData.acccode" maxlength="15" placeholder="请输入账号" size='small'></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="7">
          <el-form-item  label="金额" size="small" :required="true" prop="amount">
            <el-input v-model="formData.amount" maxlength="15" placeholder="请输入金额" size='small'></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="ali-right">
      <el-button type="primary" size="small" @click="addClick('formData')">录入</el-button>
    </div>
    <bank-query v-if="showQueryDialog" @silkFuna="silkFuna"></bank-query>
  </el-main>
</template>
<script>
  import bankQuery from '@/components/bankQuery'
  import { addInfo} from "../../api/bankManage/bankManage";
  export default {
    components: {
      bankQuery
    },
    data() {
      return {
        stateOption: [{ code: '0', codeName: '无效' },{ code: '1', codeName: '有效' }],
        bankOption: [],
        flag: true,
        showQueryDialog: false,
        rule: {
          "name":[
            { required: true, message: '户名不能为空' }
          ],
          "acccode":[
            { required: true, message: '账号不能为空' }
          ],
          "amount":[
            { required: true, message: '金额不能为空' }
          ],
          "bankCode": [
            { required: true, message: '开户银行不能为空', trigger: 'change' }
          ]
        },
        formData: {
          name: '',// 姓名
          bankCode: "",// 银行编码
          acccode: '', // 账号
          amount: '',// 金额
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
