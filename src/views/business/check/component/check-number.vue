<template>
  <basic-container style="height: 100%;">
    <div>
      <div style="padding: 10px; font-size: 18px; border-bottom: 1px solid #2d8cf0; text-align: center;">{{validatenull(id) ? "中药处方单" : "病历"}}</div>
      <div style="border-bottom: 1px solid #2d8cf0; padding: 10px 0;">
        <div style="display: flex; line-height: 30px; height: 30px;">
         <div>遍历编号：11111111111111</div>
          <div style="margin-left: 50px;">就诊时间： {{form.caseTime}}</div>
        </div>
        <div style="display: flex; line-height: 30px; height: 30px;">
          <div>姓名： {{form.name}}</div>
          <div style="margin-left: 50px;">性别： {{form.sex === 1 ? '女' : '男'}}</div>
          <div style="margin-left: 50px;">年龄：{{form.age}}</div>
        </div>
        <div style="display: flex; line-height: 30px; height: 30px;">
          <div>联系电话：{{form.phone}}</div>
          <div style="margin-left: 50px;">住址： {{form.address}}</div>
        </div>
        <div style="display: flex; line-height: 30px; height: 30px;">
          <div>症状：{{putUp}}</div>
        </div>
        <div style="display: flex; line-height: 30px; height: 30px;">
          <div>辩证：{{dialectical}}</div>
        </div>
      </div>
      <div style="border-bottom: 1px solid #2d8cf0; padding-bottom: 20px;">
        <div>
          <span style="font-size: 35px;">Rp:</span>
          <span style="margin-left: 50px;">(克)</span>
        </div>
        <div style="margin-left: 50px; margin-top: 20px;" :style="{height: height + 'px'}">{{componentForm.component}}</div>
      </div>
      <div style=" padding: 20px 0; border-bottom: 1px solid #2d8cf0;">
        <div style="margin-left: 50px;">医嘱：{{componentForm.enjoin}}</div>
      </div>
    </div>
    <div style="padding: 30px; display: flex; justify-content: center;">
      <el-button type="warning" @click="handlerBack">{{validatenull(id) ? "返回组方" : "返回"}}</el-button>
      <el-button type="primary" v-if="validatenull(id)" @click="handlerFinish">保存</el-button>
      <el-button type="success">下载</el-button>
    </div>
  </basic-container>
</template>

<script>
  import Case from "../../../../api/business/case/Case";

  export default {
    name: "check-number",
    props: {
      id: {
        type: String,
      },
      form: {
        type: Object,
        default() {
          return {}
        }
      },
      diseaseOptions: {
        type: Array,
        default() {
          return []
        }
      },
      componentForm: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        height: 0,
      }
    },
    methods: {
      handlerBack() {
        this.$emit("back");
      },
      handlerFinish() {
        let save = {};
        save.code = "1111111111";
        save.name = this.form.name;
        save.sex = this.form.sex;
        save.phone = this.form.phone;
        save.address = this.form.address;
        save.age = this.form.age;
        save.caseTime = this.form.caseTime;

        save.medicineIds = this.diseaseOptions.map(item => item.label);
        save.dialectical = this.componentForm.dialectical;
        save.component = this.componentForm.component;
        save.enjoin = this.componentForm.enjoin;
        save.medicineNames = this.putUp;
        Case.save(save).then(() => {
          this.$message({type: "success", message: "保存成功"});
          this.$emit("finish");
        })
      },
      init() {
        this.height = document.body.offsetHeight - 600;

        if (!this.validatenull(this.id)) {
          Case.detail(this.id).then(res => {
            let data = res.data.data;
            let medicineList = data.medicineList;
            this.form = data;
            this.componentForm = {
              dialectical: data.dialectical,
              component: data.component,
              enjoin: data.enjoin,
            }
            this.diseaseOptions = medicineList.map(item => {
              return {
                label: item.id,
                value: item.name,
                obj: item,
              }
            })

          })
        }
      }
    },
    computed: {
      putUp() {
        return this.diseaseOptions.map(item => item.obj).map(item => item.name).join("，");
      },
      dialectical() {
        if (this.validatenull(this.componentForm.dialectical)) {
          return "无";
        }
        return this.componentForm.dialectical;
      }
    },
    mounted() {
      this.init();
    }
  }
</script>

<style scoped>

</style>
