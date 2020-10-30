<template>
  <div id="navbar">
    <div id="navHeader">
      <div class="titleName">南京市规划与自然资源局一体化图形审批系统</div>
      <div class="navbarmain">
        <div class="subitem-container">
          <el-input
            class="searchInput"
            v-model="searchkeywords"
            placeholder="请输入内容"
          ></el-input>
        </div>
        <div class="menu-container">
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="iconfont icon-dayinji"></i>
              业务审批<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" class="el-dropdown-li">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item>双皮奶</el-dropdown-item>
              <el-dropdown-item>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span
            id="examine"
            @click="examineShow = true"
            @mouseenter="examineShow = true"
          >
            <i class="iconfont icon-yinzhang"></i>
            辅助审批 <i class="iconfont icon-RectangleCopy"></i>
          </span>
          <span
            id="analyse"
            @click="analyseShow = true"
            @mouseenter="analyseShow = true"
          >
            <i class="iconfont icon-tubiao"></i>
            辅助分析
            <i class="iconfont icon-RectangleCopy"></i>
          </span>
        </div>
        <div
          class="analyseList"
          v-show="analyseShow"
          @mouseleave="analyseShow = false"
        >
          <ul>
            <li>11</li>
            <li>11</li>
            <li>11</li>
            <li>11</li>
          </ul>
        </div>
      </div>
    </div>
    <div id="navRight">
      <div class="l1 vert">
        <i class="iconfont icon-book1"></i>
      </div>
      <div class="l2 vert">
        <i class="iconfont icon-shizhong"></i>
      </div>
      <div class="l3 vert" @click="isshowCIMBox()">
        <i class="iconfont icon-c"></i>
      </div>
      <div class="l4 vert">
        <i class="iconfont icon-baozhi"></i>
      </div>
      <div class="l5 vert">
        <i class="iconfont icon-chaxun"></i>
      </div>
      <div class="l6 vert">
        <i class="iconfont icon-shenglvehao"></i>
      </div>
    </div>
    <div id="cimbox" v-show="cimboxflag">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>CIM审查</span>
  
          <my-local-btn valuea="新增数据">111</my-local-btn>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            @click="cimboxflag = false"
          >
            <i class="iconfont icon-guanbi"></i>
          </el-button>
        </div>
        <div v-for="o in 1" :key="o" class="text item">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="自动审查" name="自动审查">
              <div>
                <div class="review" id="reviewItem">
                  <h2 class="reviewTitle">审查事项</h2>
                  <div class="chooseButton">
                    <el-button @click="checkAll()">全选</el-button>
                    <el-button>反选</el-button>
                  </div>
                </div>

                <div id="box1">
                 <lu-button ref="luButton" v-bind:isShow="isShow" v-on:change="change">
                   <span slot="buttonText"> 控规
                   </span>
                 </lu-button>
                  <button
                    type="button"
                    :class="[isShow==true ? 'buttonStyle' : 'changeButtonStyle']"
                    @click="isShow = !isShow"
                  >
                    <div id="smallTriangle" v-show="!isShow"></div>
                    <i
                      class="iconfont icon-duigou"
                      v-show="!isShow"
                    ></i>
                    Click Me!
                  </button>
                  <div class="checkboxTitle">建筑高度审查</div>
                  <div class="clear"></div>
                  <div class="checkButton">
                    <el-checkbox
                      v-model="regulatory"
                      label="控规"
                      border
                    ></el-checkbox>
                      <!-- <button
                    type="button"
                    :class="[isActive ? 'buttonStyle' : 'changeButtonStyle']"
                    @click="this.isActive = !this.isActive"
                  >
                    <div id="smallTriangle" v-show="!isActive"></div>
                    <i
                      class="iconfont icon-duigou"
                      v-show="(this.isActive = !this.isActive)"
                    ></i>
                    Click Me!
                  </button> -->
                    <el-checkbox
                      v-model="urbanDesign"
                      label="城市设计"
                      border
                    ></el-checkbox>
                  </div>
                </div>
                <div id="box2">
                  <div class="checkboxTitle">建筑退让审查</div>
                  <div class="clear"></div>
                  <div class="checkButton">
                    <el-checkbox
                      v-model="greenBorder"
                      label="退让绿地边界"
                      border
                    ></el-checkbox>
                    <el-checkbox
                      v-model="boundaryLines"
                      label="退让道路红线"
                      border
                    ></el-checkbox>
                  </div>
                  <div class="checkButton">
                    <el-checkbox
                      v-model="blackLine"
                      label="退让店里黑线"
                      border
                    ></el-checkbox>
                    <el-checkbox
                      v-model="purpleLine"
                      label="退让文物紫线"
                      border
                    ></el-checkbox>
                  </div>
                </div>
                <div id="box3">
                  <div class="checkboxTitle">净空要素冲突审查</div>
                  <div class="clear"></div>
                  <div class="checkButton">
                    <el-checkbox
                      v-model="gallery"
                      label="视线廊道"
                      border
                    ></el-checkbox>
                    <el-checkbox
                      v-model="airport"
                      label="机场净空"
                      border
                    ></el-checkbox>
                  </div>
                </div>
                <div id="examineButton">
                  <el-button type="primary">一键审查</el-button>
                </div>
                <div class="clear"></div>
              </div>
              <div>
                <div class="review" id="reviewResult">
                  <h2 class="reviewTitle">审查结果</h2>
                </div>
                <div id="resultTable">
                  <div class="buildingHeightBox">
                    <el-dropdown>
                      <span class="el-dropdown-link" id="buildingHeight">
                        建筑高度<i
                          class="el-icon-arrow-down el-icon--right"
                        ></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>建筑限低</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                  <div class="clear"></div>
                  <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="house" label="栋号" width="80">
                    </el-table-column>
                    <el-table-column label="审查依据">
                      <el-table-column prop="gist" label="依据" width="60">
                      </el-table-column>
                      <el-table-column prop="llow" label="限低" width="60">
                      </el-table-column>

                      <el-table-column prop="lhigh" label="限高" width="60">
                      </el-table-column>
                    </el-table-column>

                    <el-table-column
                      prop="projectDesign"
                      label="方案设计（米）"
                      width="100"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="inspectionResult"
                      label="检查结果"
                      width="100"
                    >
                    </el-table-column>
                  </el-table>

                  <div class="buildingHeightBox">
                    <el-dropdown>
                      <span class="el-dropdown-link" id="buildingHeight">
                        建筑退让<i
                          class="el-icon-arrow-down el-icon--right"
                        ></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>建筑退让</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                  <div class="clear"></div>
                  <el-table :data="buildingConcession" style="width: 100%">
                    <el-table-column prop="house" label="栋号" width="60">
                    </el-table-column>
                    <el-table-column
                      prop="houseHeight"
                      label="建筑高度"
                      width="100"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="censorship"
                      label="审查依据"
                      width="100"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="concessionDistance"
                      label="退让距离（米）"
                      width="120"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="inspectionResult"
                      label="检查结果"
                      width="100"
                    >
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="半自动审查" name="半自动审查"
              >半自动审查</el-tab-pane
            >
            <el-tab-pane label="人工审查" name="人工审查">人工审查</el-tab-pane>
            <el-tab-pane label="生成报告" name="生成报告">生成报告</el-tab-pane>
          </el-tabs>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import LuButton from './LuButton'
export default {
  name: "navbar",
  props: {
    msg: String,
  },
  components: {
    LuButton,
  },
  data() {
    return {
      isShow: true,
      searchkeywords: "",
      businessShow: false,
      examineShow: false,
      analyseShow: false,
      activeName: "自动审查",
      cimboxflag: false,
      regulatory: true, //控规
      urbanDesign: false, //城市设计
      greenBorder: false, //绿地边界
      boundaryLines: false, //道路红线
      blackLine: false, //店里黑线
      purpleLine: false, //文物紫线
      gallery: false, //廊道
      airport: false, //机场
      tableData: [
        {
          house: "1#",
          gist: "控规",
          llow: "0",
          lhigh: "80",
          projectDesign: "71.9",
          inspectionResult: "通过",
        },
      ],
      buildingConcession: [
        {
          house: "1#",
          houseHeight: "0",
          censorship: "绿地边界",
          projectDesign: "71.9",
          concessionDistance: "通过",
          inspectionResult: "通过",
        },
      ],
    };
  },
  methods: {
    change() {
      this.isShow = !this.isShow;
      this.$refs.luButton.isShow=!this.isShow;//给父组件传值
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    isshowCIMBox() {
      this.cimboxflag = !this.cimboxflag;
    },
    checkAll() {
      this.regulatory = true;
      this.urbanDesign = true;
      this.greenBorder = true;
      this.boundaryLines = true;
      this.blackLine = true;
      this.gallery = true;
      this.airport = true;
      this.purpleLine = true;
    },
  },
};
</script>
<style scoped>
#navHeader {
  height: 48px;
  width: 100%;
  background-color: #324b71;
  color: #466291;
  display: flex;
  justify-content: center;
  align-items: center;
}
.titleName {
  color: #fff;
  margin: 0;
  font-weight: 600;
  line-height: 14pt;
  font-size: 14pt;
  color: white;
  vertical-align: middle;
  position: absolute;
  left: 30px;
}

.navbarmain {
  height: 50px;
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.subitem-container {
  width: 200px;
  height: 40px;
  overflow: hidden;
  position: absolute;
}
.searchInput {
  width: 200px;
}

.menu-container {
  line-height: 45px;
  width: 600px;
  position: absolute;
  right: 20px;
  color: white;
}

.el-dropdown-link {
  cursor: pointer;
  color: white;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-dropdown-li {
  color: white;
  width: 200px;
}
span {
  padding: 15px;
}

.businessList {
  position: absolute;
  top: 31px;
  right: 350px;
  color: white;
}
.examineList {
  position: absolute;
  top: 31px;
  right: 250px;
  color: white;
}
.analyseList {
  position: absolute;
  top: 31px;
  right: 120px;
  color: white;
}
/* ul {
  list-style: none;
  width: 100px;
  height: 200px;
  background-color: #324b71;
} */
li {
  font-size: 14px;
  line-height: 24px;
}
li:hover {
  color: #94baf4;
}
#navRight {
  height: 100%;
  width: 50px;
  background-color: #324b71;
  position: absolute;
  top: 0px;
  right: 0px;
}

#search {
  display: inline;
}

#headIcon {
  position: absolute;
  right: 500px;
  top: 0px;
}

.vert {
  color: white;
  padding-top: 60px;
  /* font-size: 20px;
   font-weight: 500; */
}
.icon-book1 {
  font-size: 15px;
}
.icon-shizhong {
  font-size: 20px;
}
.icon-c {
  font-size: 26px;
}
.icon-baozhi {
  font-size: 25px;
}
.icon-chaxun {
  font-size: 20px;
}
.icon-shenglvehao {
  font-size: 20px;
}

#cimbox {
  width: 500px;
  height: calc(100vh - 100px);
  position: absolute;
  right: 50px;
  z-index: 999;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.reviewTitle {
  display: inline-block;
  position: absolute;
  left: 10px;
}
.chooseButton {
  display: inline-block;
  position: absolute;
  right: 10px;
}

.review {
  width: 500px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* #box1{
  width:400px;
  height: 60px;
  display:flex;
	justify-content:center;
	align-items:center;
} */
#box1 {
  /* position: relative; */
  left: 5px;
}

.el-checkbox.is-bordered {
  width: 150px;
}

.checkboxTitle {
  float: left;
  height: 25px;
}
.clear {
  clear: both;
}
.checkButton {
  height: 50px;
}

#examineButton {
  float: left;
}

#buildingHeight {
  cursor: pointer;
  color: black;
}
.buildingHeightBox {
  float: left;
  height: 30px;
  padding-top: 15px;
}
.box-card {
  height: 100%;
  overflow-y: auto;
  overflow-x: auto;
}

.buttonStyle {
  width: 150px;
  height: 40px;
  background-color: white;
  border: 1px solid #dcdfe6;
  border-radius: 3px;
  position: relative;
}
.changeButtonStyle {
  background-color: #cae5f9;
  width: 150px;
  height: 40px;
  position: relative;
  color: #409eff;
  border: 1px solid #409eff;
  border-radius: 3px;
}
#smallTriangle {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 0px;
  height: 0px;
  border: 15px solid #1287ff;
  border-right: 15px solid transparent;
  border-bottom: 15px solid transparent;
}
.icon-duigou {
  position: absolute;
  top: 0px;
  left: 0px;
  color: white;
  font-size: 16px;
}
</style>
 