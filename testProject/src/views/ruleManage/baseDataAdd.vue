<template>
  <!--  卡/用户信息查询页面-->
  <el-main>
    <p class='content-tit'>基础数据配置信息:</p>
    <el-form :model="formData" ref="formData" :rules="rule" label-width="100px" class="demo-ruleForm" label-position="right">
      <el-row type="flex" class="row-bg">
        <el-col :span="7">
          <el-form-item  label="类型" size="small" :required="true" prop="type">
            <el-input v-model="formData.type" maxlength="15" placeholder="请输入类型" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item  label="值" size="small" :required="true" prop="value">
            <el-input v-model="formData.value" maxlength="15" placeholder="请输入值" size='small'></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="ali-right">
        <el-button type="primary" size="small" @click="queryClick('formData')">增加</el-button>
      </div>
    </el-form>
    <p class="content-tit">
      <span @click="isShow('flag')" v-if='flag'>-</span>
      <span @click="isShow('flag')" v-else>+</span>
      查询结果
    </p>
    <el-table :data="selfList" style="width: 100%" class='table-common' :highlight-current-row="true" border>
      <el-table-column label="序号" type='index' width="60" align="center"></el-table-column>
      <el-table-column prop="missionprop1" label="类型" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop2" label="值" min-width="15%" align="center"></el-table-column>
    </el-table>
    <!--    <el-button type="primary" size="mini" @click="goToBusiDeal()">-->
    <!--      保全受理-->
    <!--    </el-button>-->
    <!--    <el-button type="primary" size="mini" @click="showNotePad()">-->
    <!--      记事本查看-->
    <!--    </el-button>-->
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
  import { queryInit, addInfo } from '@/api/ruleManage/ruleManage'
  export default {
    components: {
    },
    data() {
      return {
        searchFlag: false, // 选择查询类型后显示查询条件
        queryOption: [{ code: '0', codeName: '持卡人' },{ code: '1', codeName: '送卡人' },{ code: '2', codeName: '信用卡' }], // 管理机构
        flag: true,
        formData: {
          type: '', // 类型
          value: '',// 值
          pageNum:1
        },
        selfPage: {
          currentPage: 1,
          hasMore: true,
          perPage: 10,
          totalPage: 0,
          totalSize: 0
        },
        rule: {
          "type":[
            { required: true, message: '类型不能为空' }
          ],
          "value":[
            { required: true, message: '值不能为空' }
          ]
        },
        selfList: []
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
      // 添加按钮
      queryClick(formData) {
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
