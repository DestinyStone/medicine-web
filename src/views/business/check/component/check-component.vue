<template>
  <basic-container style="height: 100%;">
    <div :style="{height: height + 'px'}">
      <div style="height: calc(100% - 155px); display: flex;">
        <div style="width: 17%; max-width: 17%;box-sizing: border-box; padding-right: 30px;">
          <div style="height: 50px; line-height: 50px;">病友症状</div>
          <div style="width: 100%; height: calc(100% - 50px); border: 1px solid #DCDFE6; border-radius: 5px;">
            <check-main-select :options="diseaseOptions"/>
          </div>
        </div>
        <div style="width: 17%; max-width: 17%; box-sizing: border-box;padding-right: 30px;">
          <div style="height: 50px; line-height: 50px;">古医经典辨识</div>
          <div style="width: 100%; height: calc(50% - 52px); border: 1px solid #DCDFE6; border-radius: 5px;">
            <check-main-select  :options="medicine1Options" :is-hover-stop="true"  @click="(data) => handlerClick(data, 0)"/>
          </div>
          <div style="height: 50px; line-height: 50px;">名医验案参考</div>
          <div style="width: 100%; height: calc(50% - 52px); border: 1px solid #DCDFE6; border-radius: 5px;">
            <check-main-select  :options="medicine2Options" :is-hover-stop="true"  @click="(data) => handlerClick(data, 1)"/>
          </div>
        </div>
        <div style="width: 32%; max-width: 32%;box-sizing: border-box; padding-right: 10px;">
          <div style="height: 50px; line-height: 50px;"></div>
          <div style="width: 100%; height: calc(50% - 52px); border: 1px solid #DCDFE6; border-radius: 5px;">
            <check-main-detail :data="medicine1Detail" style="height: 100%;"/>
          </div>
          <div style="height: 50px; line-height: 50px;"></div>
          <div style="width: 100%; height: calc(50% - 52px); border: 1px solid #DCDFE6; border-radius: 5px;">
            <check-main-detail :data="medicine2Detail" style="height: 100%;"/>
          </div>
        </div>
        <div style="width: 40%; max-width: 40%;box-sizing: border-box; padding-right: 30px;">
          <div style="height: 50px; line-height: 50px;">药性分析</div>
          <div style="width: 100%; height: calc(100% - 50px); border: 1px solid #DCDFE6; overflow: auto; border-radius: 5px;">
            <check-main-component-detail :data="analyzeList" />
          </div>
        </div>
      </div>
      <div style="display: flex; height: 155px; min-height: 155px; max-height: 155px;">
        <div style=" width: 200px; display: flex; justify-content: center;">
          <div style="display: flex; flex-flow: column; justify-content: space-around;">
            <div><el-button type="success" @click="handlerComponent">智能组方</el-button></div>
            <div><el-button @click="handlerBack" type="warning">返回诊疗</el-button></div>
          </div>
        </div>
        <div style="flex-grow: 1">
          <div style="display: flex;  margin-top: 10px;">
            <div style="line-height: 40px; height: 40px; width: 50px;">处方: </div>
            <div style="width: calc(100% - 50px)"><el-input v-model="form.component"/></div>
          </div>
          <div style="display: flex; margin-top: 10px;">
            <div style="line-height: 40px; height: 40px; width: 50px;">辩证: </div>
            <div style="width: calc(100% - 50px)"><el-input v-model="form.dialectical"/></div>
          </div>
          <div style="display: flex;  margin-top: 10px;">
            <div style="line-height: 40px; height: 40px; width: 50px;">医嘱: </div>
            <div style="width: calc(100% - 50px)"><el-input v-model="form.enjoin"/></div>
          </div>
        </div>
        <div style=" width: 200px; display: flex; justify-content: center;">
          <div style="display: flex; flex-flow: column; justify-content: space-around;">
            <div><el-button type="success" @click="handlerAnalyze">药 性 分 析</el-button></div>
            <div><el-button type="primary" @click="handlerNext">生成处方单</el-button></div>
          </div>
        </div>
      </div>
    </div>
  </basic-container>
</template>

<script>
  import CheckMainSelect from "./check-main-select";
  import CheckMainDetail from "./check-main-detail";
  import Medicine from "../../../../api/business/medicine/medicine";
  import Analyze from "../../../../api/business/analyze/analyze";
  import CheckMainComponentDetail from "./check-main-component-detail";
  export default {
    name: "check-component",
    components: {CheckMainComponentDetail, CheckMainDetail, CheckMainSelect},
    props: {
      diseaseOptions: {
        type: Array,
        default() {
          return []
        }
      },
      medicine1Options: {
        type: Array,
        default() {
          return []
        }
      },
      medicine2Options: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        height: 0,
        medicine1Detail: {},
        medicine2Detail: {},
        form: {},
        analyzeList: [],
      }
    },
    methods: {
      handlerAnalyze() {
        if (this.validatenull(this.form.component)) {
          this.$message({type: "warning", message: "处方信息为空"});
          return;
        }
        Analyze.detailAll(this.form.component).then(res => {
          let data = res.data.data;
          this.analyzeList = data;
        })
      },
      handlerComponent() {
        let params = [];
        if (this.medicine1Options.length === 1) {
          params = [this.medicine1Options[0].label];
        }else {
          params = [this.medicine1Options[0].label, this.medicine2Options[0].label];
        }

        Medicine.component(params).then(res => {
          let data = res.data.data;
          this.$set(this.form, 'component', data.component);
          this.$set(this.form, 'dialectical', data.dialectical);
        })

      },
      handlerClick(data, type) {
        if (type === 0) {
          this.medicine1Detail = data.obj;
        }
        if (type === 1) {
          this.medicine2Detail = data.obj;
        }
      },
      handlerBack() {
        this.$emit("back");
      },
      handlerNext() {
        if (this.validatenull(this.form.component)) {
          this.$message({type: "warning", message: "请填写处方"});
          return;
        }
        if (this.validatenull(this.form.enjoin)) {
          this.$message({type: "warning", message: "请填写医嘱"});
          return;
        }
        this.$emit("next", {component: this.form});
      },
      init() {
        this.height =  document.body.offsetHeight - 180;
      }
    },
    mounted() {
      this.init();
    }
  }
</script>

<style scoped>

</style>
