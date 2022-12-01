<template>
  <basic-container style="height: 100%;">
    <div style="display: flex; justify-content: space-between;">
      <div style="display: flex; flex-grow: 1; width: 80%">
        <div style="height: 30px; font-size: 20px; width: 100px;">{{form.type === 0 ? '初诊' : '复诊'}}</div>
        <div  style="display: flex; padding-left: 40px;">
          <div  style="white-space: nowrap; line-height: 30px; padding-right: 20px;">姓名:</div>
          <el-select v-model="query.name" clearable  filterable size="small">
            <el-option
              v-for="item in nameOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div style="display: flex;  padding-left: 40px;">
          <div style="white-space: nowrap; line-height: 30px; padding-right: 20px;">复诊病例编号:</div>
          <el-select v-model="query.code" clearable  @change="handlerChangeCode" filterable size="small">
            <el-option
              v-for="item in codeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <el-button size="small" type="primary" style="margin-left: 20px;" @click="handlerClickBefore">复诊</el-button>
      </div>
      <div style="min-width: 320px;">
         <div style="line-height: 30px; white-space: nowrap">本次就诊时间: <span style="border-bottom: 1px solid #CCCCCC; font-size: 18px; padding: 0 20px;">{{time}}</span></div>
      </div>
    </div>
    <div style="margin-top: 20px;">
      <div style="display: flex;">
        <div  style="display: flex;">
          <div style="white-space: nowrap; line-height: 30px; padding-right: 20px;">病友姓名:</div>
          <el-input size="small" v-model="form.name"/>
        </div>
        <div  style="display: flex; margin-left: 40px;">
          <div style="white-space: nowrap; line-height: 30px; padding-right: 20px;">性别:</div>
          <div style="margin-top: 5px;">
            <el-radio v-model="form.sex" :label="0" >男</el-radio>
            <el-radio v-model="form.sex" :label="1" >女</el-radio>
          </div>
        </div>
        <div  style="display: flex; margin-left: 40px;">
          <div style="white-space: nowrap; line-height: 30px; padding-right: 20px;">年龄:</div>
          <div>
            <el-input size="small" style="width: 100px" v-model="form.age"/>
          </div>
        </div>
        <div  style="display: flex;  margin-left: 40px;">
          <div style="white-space: nowrap; line-height: 30px; padding-right: 20px;">联系电话:</div>
          <el-input size="small" v-model="form.phone"/>
        </div>
        <div  style="display: flex;  margin-left: 40px;">
          <div style="white-space: nowrap; line-height: 30px; padding-right: 20px;">住址:</div>
          <el-input size="small" style="width: 300px" v-model="form.address"/>
        </div>
      </div>
    </div>
    <div style="display: flex; margin-top: 50px;" :style="{height: contentHeight + 'px'}">

      <div style="width: 17%; padding-right: 30px;box-sizing: border-box; height: 100%">
        <el-input placeholder="症状搜索" @input="handlerSearch" v-model="search"/>
        <div style="width: 100%; height: calc(100% - 50px); border: 1px solid #DCDFE6; border-radius: 5px; margin-top: 10px;">
          <check-main-select :options="searchOptions" @dbClick="handlerDbSearch">
            <template slot-scope="{data}">
              <div style="display: flex;">
                <div>{{data.value}}</div>
                <div style="margin-left: 10px; border: 1px solid #E6A23C; background: #E6A23C; color: #ffffff; padding: 3px 5px; border-radius: 5px; font-size: 10px;">同义</div>
              </div>
            </template>
          </check-main-select>
        </div>
      </div>
      <div style="width: 17%; max-width: 17%; box-sizing: border-box; padding-right: 30px;">
        <div style="height: 50px;"></div>
        <div style="width: 100%; height: calc(50% - 40px); border: 1px solid #DCDFE6; border-radius: 5px;">
          <check-main-select :options="with1Options"  @dbClick="handlerDbSearch"/>
        </div>
        <div style="width: 100%; height: calc(50% - 40px); margin-top: 30px; border: 1px solid #DCDFE6; border-radius: 5px;">
          <check-main-select :options="with2Options"  @dbClick="handlerDbSearch"/>
        </div>
      </div>
      <div style="width: 17%; max-width: 17%;box-sizing: border-box; padding-right: 30px;">
        <div style="height: 50px; line-height: 50px;">病友症状</div>
        <div style="width: 100%; height: calc(100% - 50px); border: 1px solid #DCDFE6; border-radius: 5px;">
          <check-main-select :options="diseaseOptions" @close="handlerClose" :is-close="true"/>
        </div>
      </div>
      <div style="width: 17%; max-width: 17%; box-sizing: border-box;padding-right: 30px;">
        <div style="height: 50px; line-height: 50px;">古医经典辨识</div>
        <div style="width: 100%; height: calc(50% - 52px); border: 1px solid #DCDFE6; border-radius: 5px;">
          <check-main-select :loading="medicine1Loading" :loading-text="medicineLoadingText"  :options="medicine1Options" :key="'a' + reloadKey" :is-hover-stop="true"  @click="(data) => handlerClick(data, 0)"/>
        </div>
        <div style="height: 50px; line-height: 50px;">名医验案参考</div>
        <div style="width: 100%; height: calc(50% - 52px); border: 1px solid #DCDFE6; border-radius: 5px;">
          <check-main-select :loading="medicine2Loading" :loading-text="medicineLoadingText"  :options="medicine2Options" :key="'b' + reloadKey" :is-hover-stop="true" @click="(data) => handlerClick(data, 1)"/>
        </div>
      </div>
      <div style="width: 32%; max-width: 32%;box-sizing: border-box; padding-right: 10px;">
        <div style="height: 50px; line-height: 50px;"></div>
        <div style="width: 100%; height: calc(50% - 52px); border: 1px solid #DCDFE6; border-radius: 5px;">
          <check-main-detail :high="diseaseOptions" :data="medicine1Detail" style="height: 100%;"/>
        </div>
        <div style="height: 50px; line-height: 50px;"></div>
        <div style="width: 100%; height: calc(50% - 52px); border: 1px solid #DCDFE6; border-radius: 5px;">
          <check-main-detail  :high="diseaseOptions" :data="medicine2Detail" style="height: 100%;"/>
        </div>
      </div>
    </div>
    <div style="padding: 10px; display: flex; justify-content: center;">
      <el-button type="success" @click="handlerMatch">智能匹配</el-button>
      <el-button type="primary" @click="handlerNext">确定诊疗</el-button>
    </div>
  </basic-container>
</template>

<script>
  import CheckMainSelect from "./check-main-select";
  import Gross from "../../../../api/business/gross/gross";
  import Medicine from "../../../../api/business/medicine/medicine";
  import CheckMainDetail from "./check-main-detail";
  import {userScoreIncr} from "../../../../api/system/user";
  import Case from "../../../../api/business/case/Case";
  export default {
    name: "checkMain",
    components: {CheckMainDetail, CheckMainSelect},
    data() {
      return {
        query: {},
        codeOptions: [],
        nameOptions: [],
        reloadKey: 0,
        form: {
          type: 0,
        },
        radio: 0,
        height: 0,
        search: "",
        searchOptions: [],
        diseaseOptions: [],
        with1Options: [],
        with2Options: [],
        medicine1Options: [],
        medicine2Options: [],
        medicine1Detail: {},
        medicine2Detail: {},
        time: "",
        isChange: false,
        medicine1Loading: false,
        medicine2Loading: false,
        medicineLoadingText: "智能匹配中",

      }
    },
    watch: {
      query: {
        handler() {
          this.loadBefore();
        },
        deep: true,
      }
    },
    methods: {
      handlerClickBefore() {
        if (this.validatenull(this.query.code)) {
          this.$message({type: "warning", message: "请选择病例编号"});
          return;
        }
        Case.detailByCode(this.query.code).then(res => {
          let data = res.data.data;
          data.type = 1;
          this.form = data;
          this.$set(this.query, 'name', data.name);
          this.diseaseOptions = data.medicineList.map(item => {
            return {
              label: item.id,
              value: item.name,
              obj: item,
              slot: true,
            }
          })
          this.loadMedicine();
        })
      },
      handlerChangeCode(value) {
        if (value === "" ) {
          return;
        }
        Case.detailByCode(value).then(res => {
          let data = res.data.data;
          this.$set(this.query, 'name', data.name);
        })
      },
      loadBefore() {
        Case.list(this.query).then(res => {
          let data = res.data.data;
          this.nameOptions = Array.from(new Set(data.map(item => item.name))).map(item => ({
            label: item,
            value: item,
          }));
          this.codeOptions = Array.from(new Set(data.map(item => item.code))).map(item => ({
            label: item,
            value: item,
          }));
        })
      },
      handlerMatch() {
        if (this.diseaseOptions.length === 0) {
          this.$message({message: "请添加病友症状", type: "warning"});
          return;
        }
        if(!this.isChange) {
          this.$message({message: "智能匹配已执行", type: "warning"});
          return;
        }

        this.isChange = false;
        this.medicine1Loading = true;
        this.medicine2Loading = true;
        userScoreIncr().then(res => {
          this.$message({type: "success", message: `已扣除1积分, 当前积分为:${res.data.data}`});
          this.reloadKey++;
          this.loadMedicine();
        }, () => {
          this.isChange = true;
        })
      },
      handlerNext() {
        if (this.validatenull(this.form.name)) {
          this.$message({message: "请填写姓名", type: "warning"});
          return;
        }

        if (this.validatenull(this.form.age)) {
          this.$message({message: "请填写年龄", type: "warning"});
          return;
        }

        if (this.validatenull(this.form.sex)) {
          this.$message({message: "请选择性别", type: "warning"});
          return;
        }

        if (this.validatenull(this.form.phone)) {
          this.$message({message: "请填写联系电话", type: "warning"});
          return;
        }

        if (this.validatenull(this.form.address)) {
          this.$message({message: "请填写住址", type: "warning"});
          return;
        }

        if (this.diseaseOptions.length === 0) {
          this.$message({message: "请添加病友症状", type: "warning"});
          return;
        }

        if(this.isChange) {
          this.$message({message: "请点击智能匹配", type: "warning"});
          return;
        }

        if (this.medicine1Loading === true || this.medicine2Loading === true){
          this.$message({message: "智能匹配中，请稍等一会", type: "warning"});
          return;
        }
        this.form.caseTime = this.time;
        this.$emit("next", {form: this.form, diseaseOptions: this.diseaseOptions, medicine1Options: this.medicine1Options, medicine2Options : this.medicine2Options});
      },
      setTime() {
        let date = new Date();
        this.time = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}时`;
      },
      handlerClick(data, type) {
        if (type === 0) {
          this.medicine1Detail = data.obj;
        }
        if (type === 1) {
          this.medicine2Detail = data.obj;
        }
      },
      handlerClose(item) {
        let copyOptions = JSON.parse(JSON.stringify(this.diseaseOptions.filter(item => item.show === true)));

        let filter = copyOptions.filter(filterItem => filterItem.label === item.label)[0];
        let index = copyOptions.indexOf(filter);

        copyOptions.splice(index, 1);
        let ids = copyOptions.map(item => item.label).join(",");
        Gross.resemblance(ids).then(res => {
          let data = res.data.data;
          if (!this.validatenull(data)) {
            let grossList = data.map(item => ({
              label: item.id,
              value: item.name,
              slot: true,
              show: false,
            }));
            copyOptions = copyOptions.concat(grossList);
          }
          this.$set(this, 'diseaseOptions', copyOptions);
          this.loadWith();
          this.isChange = true;
        });
      },
      handlerDbSearch(item) {
        let filter = this.diseaseOptions.filter(item => item.show === true).filter(filterItem => filterItem.label === item.label);
        if (filter.length > 0) {
          this.$message({type: "warning", message: `病友症状中已存在:${item.value}`});
          return;
        }

        filter = this.diseaseOptions.filter(item => item.show === false).filter(filterItem => filterItem.label === item.label);
        if (filter.length > 0) {
          this.$message({type: "warning", message: `病友同义症状中已存在:${item.value}`});
          return;
        }

        let copy = JSON.parse(JSON.stringify(item));
        copy.slot = true;
        copy.show = true;

        let copyOptions = JSON.parse(JSON.stringify(this.diseaseOptions.filter(item => item.show === true)));
        copyOptions.push(copy);
        let ids = copyOptions.map(item => item.label).join(",");
        Gross.resemblance(ids).then(res => {
          let data = res.data.data;
          if (!this.validatenull(data)) {
            let grossList = data.map(item => ({
              label: item.id,
              value: item.name,
              slot: true,
              show: false,
            }));
            copyOptions = copyOptions.concat(grossList);
          }
          this.$set(this, 'diseaseOptions', copyOptions);
          this.isChange = true;
          this.loadWith();
        });
      },
      init() {
        this.contentHeight = document.body.offsetHeight - 380;
        this.loadSynonymsSearch();
      },
      loadMedicine() {
        let names = this.diseaseOptions.map(item => item.value);
        this.medicine1Options.splice(0, this.medicine1Options.length);
        this.medicine2Options.splice(0, this.medicine2Options.length);
        this.medicine1Detail = {};
        this.medicine2Detail = {};
        if (this.validatenull(names)) {
          return;
        }
        this.medicine1Loading = true;
        this.medicine2Loading = true;
        Medicine.listGross(names, 0).then(res => {
          this.medicine1Options = res.data.data.map(item => ({
            label: item.id,
            value: item.name,
            obj: item,
            slot: true
          }));
        }).finally(() => {
          this.medicine1Loading = false;
        });
        Medicine.listGross(names, 1).then(res => {
          this.medicine2Options = res.data.data.map(item => ({
            label: item.id,
            value: item.name,
            obj: item,
            slot: true
          }));
        }).finally(() => {
          this.medicine2Loading = false;
        });
      },
      loadWith() {
        let names = this.diseaseOptions.map(item => item.value);
        this.with1Options.splice(0, this.with1Options.length);
        this.with2Options.splice(0, this.with2Options.length);

        if (this.validatenull(names)) {
          return;
        }
        Gross.listWith(names, 0).then(res => {
          this.with1Options = res.data.data.map(item => ({
            label: item.id,
            value: item.name,
            obj: item,
            slot: true
          }));
        })
        Gross.listWith(names, 1).then(res => {
          this.with2Options = res.data.data.map(item => ({
            label: item.id,
            value: item.name,
            obj: item,
            slot: true
          }));
        })
      },
      loadSynonymsSearch() {
        Gross.listSynonyms(this.search).then(res => {
          let data = res.data.data;
          this.searchOptions = data.map(item => ({
            label: item.id,
            value: item.name,
            obj: item,
            slot: item.type === 0
          }));
        })
      },
      handlerSearch() {
        this.loadSynonymsSearch();
      }
    },
    created() {
      this.init();
      this.setTime();
      this.loadBefore();
    }
  }
</script>

<style scoped>

</style>
