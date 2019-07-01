<template>
  <!--  卡/用户信息查询页面-->
  <el-main>
    <p class='content-tit'>请输入查询条件:</p>
    <el-form :model="formData" ref="formData" label-width="100px" class="demo-ruleForm" label-position="right">
      <el-row type="flex" class="row-bg">
        <el-col :span="7">
          <el-form-item  label="查询类型" size="small">
            <el-select v-model="formData.queryType" placeholder="请选择" @change="checkType()">
              <el-option
                v-for="item in queryOption"
                :key="item.code"
                :label="item.codeName"
                :value="item.code">
                <span>{{ item.code }}</span> - <span>{{ item.codeName }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1" v-if="searchFlag && formData.queryType !== '2'">
          <el-form-item  label="姓名" size="small">
            <el-input v-model="formData.name" maxlength="15" placeholder="请输入姓名" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1" v-if="searchFlag && formData.queryType !== '2'">
          <el-form-item  label="电话号码" size="small">
            <el-input v-model="formData.telephone" maxlength="15" placeholder="请输入电话号码" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" v-if="searchFlag && formData.queryType === '2'">
          <el-form-item  label="卡号" size="small">
            <el-input v-model="formData.cardNum" maxlength="15" placeholder="请输入卡号" size='small'></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="ali-right">
        <el-button type="primary" size="small" @click="queryClick('formDatas')">查询</el-button>
      </div>
    </el-form>
    <p class="content-tit">
      <span @click="isShow('flag')" v-if='flag'>-</span>
      <span @click="isShow('flag')" v-else>+</span>
      查询结果
    </p>
    <el-table :data="selfList" style="width: 100%" class='table-common' :highlight-current-row="true" border>
      <el-table-column label="序号" type='index' width="60" align="center"></el-table-column>
      <el-table-column prop="missionprop1" label="持卡人姓名" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop2" label="持卡人电话号码" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop2" label="送卡人姓名" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop2" label="送卡人电话号码" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop1" label="信用卡号" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop2" label="欠款总金额" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop2" label="卡上余额" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop2" label="账单日期" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop1" label="最后还款日" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop2" label="是否为风险卡" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop2" label="卡状态" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop2" label="收费比例" min-width="15%" align="center"></el-table-column>
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
  import { queryInit, initInfo } from "../../api/cardAndUserManage/cardAndUserManage";
  export default {
    components: {
    },
    data() {
      return {
        searchFlag: false, // 选择查询类型后显示查询条件
        queryOption: [{ code: '0', codeName: '持卡人' },{ code: '1', codeName: '送卡人' },{ code: '2', codeName: '信用卡' }], // 管理机构
        flag: true,
        formData: {
          queryType: '', // 查询类型
          name: '',// 姓名
          telephone: "",// 电话号码
          cardNum: "",// 卡号
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
    created () {
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
      // 查询按钮
      queryClick() {
        const formData = { // 参数
        }
        return new Promise((resolve, reject) => {
          queryInit(formData).then(res => {
            console.log('查询按钮')
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      queryInit() {
        const formData = { // 参数
        }
        return new Promise((resolve, reject) => {
          initInfo(formData).then(res => {
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
