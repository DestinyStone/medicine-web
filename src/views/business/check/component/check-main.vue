<template>
  <basic-container style="height: 100%;">
    <div style="display: flex; justify-content: space-between;">
      <div style="display: flex; flex-grow: 1; width: 80%">
        <div style="height: 30px; font-size: 20px; width: 100px;">初诊</div>
        <div style="display: flex;">
          <div style="white-space: nowrap; line-height: 30px; padding-right: 20px;">复诊病例编号:</div>
          <el-input size="small"/>
        </div>
        <div  style="display: flex; padding-left: 40px;">
          <div  style="white-space: nowrap; line-height: 30px; padding-right: 20px;">姓名:</div>
          <el-input  size="small"/>
        </div>
      </div>
      <div>
         <div style="line-height: 30px;">本次就诊时间: <span style="border-bottom: 1px solid #CCCCCC; font-size: 18px; padding: 0 20px;">2022年10月10日20时</span></div>
      </div>
    </div>
    <div style="margin-top: 20px;">
      <div style="display: flex;">
        <div  style="display: flex;">
          <div style="white-space: nowrap; line-height: 30px; padding-right: 20px;">病友姓名:</div>
          <el-input size="small"/>
        </div>
        <div  style="display: flex; margin-left: 40px;">
          <div style="white-space: nowrap; line-height: 30px; padding-right: 20px;">性别:</div>
          <div style="margin-top: 5px;">
            <el-radio v-model="radio" label="0">男</el-radio>
            <el-radio v-model="radio" label="1">女</el-radio>
          </div>
        </div>
        <div  style="display: flex;  margin-left: 40px;">
          <div style="white-space: nowrap; line-height: 30px; padding-right: 20px;">联系电话:</div>
          <el-input size="small"/>
        </div>
        <div  style="display: flex;  margin-left: 40px;">
          <div style="white-space: nowrap; line-height: 30px; padding-right: 20px;">住址:</div>
          <el-input size="small" style="width: 300px"/>
        </div>
      </div>
    </div>
    <div style="display: flex; margin-top: 50px;">
      <div style="width: 210px; padding-right: 10px; height: 360px">
        <el-input placeholder="症状搜索" size="small"/>
        <div style="width: 100%; height: calc(100% - 50px); border: 1px solid #DCDFE6; border-radius: 5px; margin-top: 10px;">

        </div>
      </div>
      <div style="width: 200px;">
        <div></div>
        <div style="width: 100%; height: calc(50%); border: 1px solid #DCDFE6; border-radius: 5px;"></div>
        <div style="width: 100%; height: calc(50%); border: 1px solid #DCDFE6; border-radius: 5px;"></div>
      </div>
      <div style="width: 210px; padding-right: 10px; height: 360px">
        <div>病友症状</div>
        <div style="width: 100%; height: calc(100% - 50px); border: 1px solid #DCDFE6; border-radius: 5px; margin-top: 10px;">

        </div>
      </div>
      <div style="width: 210px; padding-right: 10px; height: 360px">
        <div>古医经典辨识</div>
        <div style="width: 100%; height: calc(50% - 50px); border: 1px solid #DCDFE6; border-radius: 5px; margin-top: 10px;">

        </div>
        <div>名医验案参考</div>
        <div style="width: 100%; height: calc(50% - 50px); border: 1px solid #DCDFE6; border-radius: 5px; margin-top: 10px;">

        </div>
      </div>
      <div style="width: 400px; padding-right: 10px; height: 360px">
        <div style="width: 100%; height: calc(50% - 50px); border: 1px solid #DCDFE6; border-radius: 5px; margin-top: 10px;">

        </div>
        <div style="width: 100%; height: calc(50% - 50px); border: 1px solid #DCDFE6; border-radius: 5px; margin-top: 10px;">

        </div>
      </div>
    </div>
  </basic-container>
</template>

<script>
  export default {
    name: "checkMain",
    data() {
      return {
        radio: 0,
      }
    }
  }
</script>

<style scoped>

</style>
