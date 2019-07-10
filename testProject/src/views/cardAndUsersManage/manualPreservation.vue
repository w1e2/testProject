<template>
<div :class="{'content-containter':app.displayStyle!=='normal'}">
  <div class="guide-top">
    <span><b>1</b><em>合同信息</em></span>
    <span :class="{'hs':!changeFlag1}"><b>2</b><em>投保人信息</em></span>
    <span :class="{'hs':!changeFlag2}"><b>3</b><em>被保险人信息</em></span>
  </div>
  <div class="guide-bottom">
    <span :class="{'kd':changeFlag,'hs':!changeFlag}" @click="showContent('cont')">合同信息</span>
    <span :class="{'kd':changeFlag1,'hs':!changeFlag1}" @click="showContent('appnt')">投保人信息</span>
    <span :class="{'kd':changeFlag2,'hs':!changeFlag2}" @click="showContent('insured')">被保险人信息</span>
  </div>
  <div class="content" :class="{'content-yx-full':(app.displayStyle==='normal')&&(app.displayMode!=='normal'),'content-left-right':(app.displayStyle!=='normal')&&(app.displayMode==='normal'),'content-full-left-right':(app.displayStyle!=='normal')&&(app.displayMode!=='normal')}" ref="content">
  </div>
</div>
</template>
<script>
import { mapState } from 'vuex'
import manualPreservation from './components/manual-preservation'
export default {
  name: 'securityApplicationManualUnderwriting',
  components: {
    manualPreservation
  },
  props: {},
  datas() {
    return {
      /* 控制显示开始 */
      changeFlag: true,
      changeFlag1: false,
      changeFlag2: false,
      cont: {
        showFlag: true,
        changeFlag: true
      },
      appnt: {
        showFlag: false,
        changeFlag: false
      },
      insured: {
        showFlag: false,
        changeFlag: false
      }
      /* 控制显示结束 */
    }
  },
  created() {
  },
  methods: {
    /**
     * 显示页签信息
     */
    showContent(content) {
      if (!this[content].changeFlag) {
        return
      } else {
        this.$refs.content.scrollTop = 0
        this.cont.showFlag = false
        this.appnt.showFlag = false
        this.insured.showFlag = false
        this[content].showFlag = true
      }
    }
  },
  computed: {
    ...mapState([
      'app'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../../styles/variables.scss";
.entry-main {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
.containter {
  overflow: hidden;
  padding: 10px 20px 0;
  position: relative;
}
// 影像全屏显示时
.containter-full-screen {
  padding: 10px 10px 0;
}
// 影像左右显示时
.content-containter {
  float: right;
  width: 50%;
}
.guide-top {
  font-size: 14px;
  overflow: hidden;

  span:first-child {
    &:after {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
  }

  span:last-child {
    &:after {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }

  span {
    float: left;
    width: 33%;
    position: relative;
    height: 80px;

    &:after {
      position: absolute;
      content: " ";
      width: 100%;
      height: 8px;
      background: $primary-color;
      left: 0;
      top: 20px;
      z-index: 1;
    }

    b {
      position: absolute;
      color: #fff;
      width: 40px;
      height: 40px;
      background: -webkit-linear-gradient(
        #3ea1ff 50%,
        $primary-color
      ); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(
        #3ea1ff 50%,
        $primary-color
      ); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(
        #3ea1ff 50%,
        $primary-color
      ); /* Firefox 3.6 - 15 */
      background: linear-gradient(#3ea1ff 50%, $primary-color); /* 标准的语法 */
      line-height: 40px;
      text-align: center;
      border-radius: 50%;
      left: calc(50% - 20px);
      top: 0;
      z-index: 2;
    }

    em {
      color: #333;
      display: block;
      text-align: center;
      padding-top: 50px;
    }
  }

  span.hs {
    &:after {
      background: #cecece;
    }

    b {
      background: #cecece;
    }

    em {
      color: #cecece;
    }
  }
}

.guide-bottom {
  font-size: 14px;
  overflow: hidden;
  // margin-top: 25px;
  span {
    float: left;
    width: 33.3%;
    height: 30px;
    background: $primary-color;
    color: #fff;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
  }

  span.hs {
    border: 1px solid #dedede;
    border-left: none;
    color: #dedede;
    background: none;
  }

  span.kd {
    border: 1px solid $primary-color;
    border-left: none;
    color: $primary-color;
    background: none;
  }

  span.kd:first-child {
    border-left: 1px solid $primary-color;
  }
}

.el-form-item__label {
  text-align: right;
}

.common-double-input {
  .first-input {
    width: 40%;
  }

  .second-input {
    width: 59%;
    float: right;
  }
}
.content {
  padding: 10px 0px;
}
.content-yx {
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(50vh - 60px);
  box-sizing: border-box;
  -moz-box-sizing: border-box; /* Firefox */
  -webkit-box-sizing: border-box; /* Safari */
}
.content-yx-full {
  height: calc(50vh - 30px);
}
.content-left-right {
  height: calc(100vh - 200px);
  overflow-x: auto;
}
.content-full-left-right {
  height: calc(100vh - 140px);
  overflow-x: auto;
}
.content-sj-left-right {
  min-width: 1000px;
}
.hide {
  display: none;
}
.next-btn {
  margin: 10px 0px;
}
.address-card {
  .el-card__body {
    padding: 0 !important;
  }
}
.modifylist {
  float: right;
}
.el-popper[x-placement^="bottom"] {
  margin-top: 150px !important;
}
.agent-code {
  border: 1px solid #dcdfe6;
  height: 32px;
  line-height: 32px;
  border-radius: 3px;
  font-size: 13px;
  color: #606266;
  padding: 0 15px;
}
</style>