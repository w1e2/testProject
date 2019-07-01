<template>
  <!--  pos机信息录入页面-->
  <el-main>
    <p class="content-tit">
      <span @click="isShow('flag')" v-if='flag'>-</span>
      <span @click="isShow('flag')" v-else>+</span>
      操作清单信息
    </p>
    <el-form :model="formData" ref="formData" :rules="rule" label-width="100px" class="demo-ruleForm" label-position="right">
      <el-row type="flex" class="row-bg">
        <el-col :span="7">
          <el-form-item  label="卡编码" size="small" :required="true" prop="cardId">
            <el-input v-model="formData.cardId" maxlength="15" placeholder="请输入卡编码" size='small' v-on:click.native.prevent="silkFun()"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item  label="pos编码" size="small" :required="true" prop="posId">
            <el-select v-model="formData.posId" placeholder="请选择">
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
          <el-form-item  label="刷卡类型" size="small" :required="true" prop="credittype">
            <el-select v-model="formData.credittype" placeholder="请选择">
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
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="7">
          <el-form-item  label="操作金额" size="small" :required="true" prop="amount">
            <el-input v-model="formData.amount" maxlength="15" placeholder="请输入金额" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item  label="操作日期" size="small" :required="true" prop="operationDate">
            <el-date-picker
              v-model="formData.operationDate"
              type="date"
              placeholder="选择日期"
              :format="'yyyy-MM-dd'"
              :value-format="'yyyy-MM-dd'"
              style="">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item  label="操作类型" size="small" :required="true" prop="operateType">
            <el-select v-model="formData.operateType" placeholder="请选择">
              <el-option
                v-for="item in operateOption"
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
          <el-form-item  label="备注" size="small" :required="true" prop="remarks">
            <el-input v-model="formData.remarks" placeholder="请输入备注" size='small'></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="ali-right">
      <el-button type="primary" size="small" @click="addClick('formData')">录入</el-button>
    </div>
    <p class="content-tit">
      <span @click="isShow('flag')" v-if='flag'>-</span>
      <span @click="isShow('flag')" v-else>+</span>
      查询结果
      <el-button type="primary" size="mini">标签一</el-button>
      <el-button type="primary" size="mini">标签二</el-button>
    </p>
    <el-table :data="selfList" style="width: 100%" class='table-common' :highlight-current-row="true" border>
      <el-table-column label="序号" type='index' width="60" align="center"></el-table-column>
      <el-table-column prop="missionprop1" label="卡编码" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop2" label="pos编码" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop3" label="刷卡类型" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop4" label="操作金额" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop1" label="操作日期" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop2" label="操作类型" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop3" label="备注" min-width="15%" align="center"></el-table-column>
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
<!--    <bank-query v-if="showQueryDialog" @silkFuna="silkFuna"></bank-query>-->
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
        operateOption: [{ code: '0', codeName: '刷卡' },{ code: '1', codeName: '还卡' }],
        bankOption: [],
        flag: true,
        showQueryDialog: false,
        cardOption: [],
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
        selfPage: {
          currentPage: 1,
          hasMore: true,
          perPage: 10,
          totalPage: 0,
          totalSize: 0
        },
        selfList: [],
        formData: {
          cardId: '',// 姓名
          posId: "",// 银行编码
          operationDate: '', // 账号
          operateType: '',
          amount: '',// 金额
          credittype: '',
          remarks: '',
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
