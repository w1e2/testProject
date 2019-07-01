<template>
  <!--  卡/用户信息录入页面-->
  <el-main>
    <p class="content-tit">
      <span @click="isShow('flag')" v-if='flag'>-</span>
      <span @click="isShow('flag')" v-else>+</span>
      规则配置信息
    </p>
    <el-form :model="formData" ref="formData" label-width="100px" class="demo-ruleForm" label-position="right">
      <el-row type="flex" class="row-bg">
        <el-col :span="7">
          <el-form-item  label="操作金额最小范围" size="small" :required="true" prop="minAmount">
            <el-input v-model="formData.minAmount" placeholder="请输入操作最小金额" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item  label="操作的上限" size="small" :required="true" prop="maxAmount">
            <el-input v-model="formData.maxAmount" placeholder="请输入操作的上限" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item  label="是否为风险卡" size="small" :required="true" prop="sex">
            <el-select v-model="formData.risk" placeholder="请选择" @change="checkType()">
              <el-option
                v-for="item in sexOption"
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
          <el-form-item  label="还款的天数" size="small" prop="sendDate" :required="true">
            <el-input v-model="formData.sendDate" maxlength="15" placeholder="请输入还款天数" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item  label="每天还款次数" size="small" prop="sendTime" :required="true">
            <el-input v-model="formData.sendTime" maxlength="15" placeholder="请输入还款次数" size='small'></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="ali-right">
      <el-button type="primary" size="small" @click="addClick('formDatas')">录入</el-button>
    </div>
    <p class="content-tit">
      <span @click="isShow('flag')" v-if='flag'>-</span>
      <span @click="isShow('flag')" v-else>+</span>
      查询结果
    </p>
    <el-table :data="selfList" style="width: 100%" class='table-common' :highlight-current-row="true" border>
      <el-table-column label="序号" type='index' width="60" align="center"></el-table-column>
      <el-table-column prop="missionprop1" label="操作金额最小范围" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop2" label="操作的上限" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop1" label="是否为风险卡" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop2" label="还款的天数" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop1" label="每次还款次数" min-width="15%" align="center"></el-table-column>
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
  import { ruleAddInfo, queryInitInfo } from '@/api/ruleManage/ruleManage'
  export default {
    components: {
    },
    data() {
      return {
        queryOption: [{ code: '0', codeName: '持卡人' },{ code: '1', codeName: '送卡人' },{ code: '2', codeName: '信用卡' }],
        sexOption: [{ code: '0', codeName: '正常卡' },{ code: '1', codeName: '风险卡' }],
        flag: true,
        flags: true,
        cardFlag: true,
        bankOption: [],
        selfPage: {
          currentPage: 1,
          hasMore: true,
          perPage: 10,
          totalPage: 0,
          totalSize: 0
        },
        selfList: [],
        formData: {
          minAmount: '',// 姓名
          maxAmount: "",// 电话号码
          risk: '', // 风险卡
          sendDate: '',
          sendTime: '',
          pageNum:1
        }
      };
    },
    created() {
      this.queryInit() // 初始化表格数据
    },
    methods: {
      handleCurrentChangeSingle(num) {
        this.formData.pageNum = num;
        this.queryClick()
      },
      isShow(val) {
        this[val] = !this[val];
      },
      // 录入按钮
      addClick() {
        this.$refs[formData].validate((valid) => {
          if (valid) {
            const formData = { // 参数
            }
            return new Promise((resolve, reject) => {
              ruleAddInfo(formData).then(res => {
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
      },
      queryInit() {
        const formData = { // 参数
        }
        return new Promise((resolve, reject) => {
          queryInitInfo(formData).then(res => {
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
