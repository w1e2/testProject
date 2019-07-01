<template>
  <!--  pos机信息查询页面-->
  <el-main>
    <p class='content-tit'>请输入查询条件:</p>
    <el-form :model="formData" ref="formData" label-width="100px" class="demo-ruleForm" label-position="right">
    <el-row type="flex" class="row-bg">
      <el-col :span="7">
        <el-form-item  label="合作人" size="small">
          <el-input v-model="formData.name" maxlength="15" placeholder="请输入姓名" size='small'></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="7" :offset="1">
        <el-form-item  label="合作人电话" size="small">
          <el-input v-model="formData.telephone" maxlength="15" placeholder="请输入电话号码" size='small'></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="7" :offset="1">
        <el-form-item  label="收款平台" size="small">
          <el-input v-model="formData.platform" maxlength="15" placeholder="请输入收款平台" size='small'></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <div class="ali-right">
      <el-button type="primary" size="small" @click="queryClick('formData')">查询</el-button>
    </div>
  </el-form>
    <p class="content-tit">
      <span @click="isShow('flag')" v-if='flag'>-</span>
      <span @click="isShow('flag')" v-else>+</span>
      查询结果
    </p>
    <el-table :data="selfList" style="width: 100%" class='table-common' :highlight-current-row="true" border>
      <el-table-column label="序号" type='index' width="60" align="center"></el-table-column>
      <el-table-column prop="missionprop1" label="本方银行编码" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop2" label="合作人" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop3" label="合作人电话" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop4" label="收款平台" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop5" label="最小收款金额" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop6" label="最大收款金额" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop7" label="闪付收费比例" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop8" label="Pay收费比例" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop9" label="红卡收费比例" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop3" label="正常收费比例" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop3" label="状态" min-width="15%" align="center"></el-table-column>
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
  import { queryInit, queryInfo } from '@/api/posManage/posManage'
  export default {
    components: {
    },
    data() {
      return {
        searchFlag: false, // 选择查询类型后显示查询条件
        queryOption: [{ code: '0', codeName: '合作人' },{ code: '1', codeName: '合作人电话' },{ code: '2', codeName: '收款平台' }], // 管理机构
        flag: true,
        formData: {
          queryType: '', // 查询类型
          name: '',// 姓名
          telephone: "",// 电话号码
          platform: "",// 卡号
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
    created() {
      this.queryInit() // 初始化表格数据
    },
    methods: {
      handleCommand(command) {
        this.$message('click on item ' + command);
      },
      checkType: function () {
        this.searchFlag = true
        console.log(this.formData.queryType, "dddddddddddddddddd");
      },
      handleCurrentChangeSingle(num) {
        this.formData.pageNum = num;
        this.queryClick()
      },
      isShow(val) {
        this[val] = !this[val];
      },
      // 查询按钮
      queryClick(formData) {
        this.$refs[formData].validate((valid) => {
          if (valid) {
            const formData = { // 参数
            }
            return new Promise((resolve, reject) => {
              queryInit(formData).then(res => {
                console.log('初始化数据')
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
          queryInfo(formData).then(res => {
            console.log('查询按钮')
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
