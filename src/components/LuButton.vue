<template>
  <div>
    <button
      type="button"
      :class="[isShow ? 'buttonStyle' : 'changeButtonStyle']"
      @click="change()"
    >
      <div id="smallTriangle" v-show="!isShow"></div>
      <i class="iconfont icon-duigou" v-show="!isShow"></i>
      <!-- <slot></slot> -->
      <slot  name="buttonText">
      </slot>
    </button>
  </div>
</template>
<script>
export default {
  name:'lu-button',
  props: ["isShow"],
  data() {
    return {
        // isShow:true,
        change(){
          // this.isShow = !this.isShow
          this.$emit('change')
        }
       
    };
  },
};
</script>
<style scoped>


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