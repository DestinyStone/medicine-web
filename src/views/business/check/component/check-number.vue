<template>
  <basic-container class="check-number" style="height: 100%;">
    <div>
      <div style="padding: 10px; font-size: 25px; border-bottom: 1px solid #2d8cf0; text-align: center;">{{validatenull(id) ? "中药处方单" : "病历"}}</div>
      <div style="border-bottom: 1px solid #2d8cf0; padding: 10px 0;" ref="content" id="content">
        <div style="display: flex; line-height: 30px; height: 30px;">
         <div style="display: flex;">
           <div class="label">病历编号：</div>
           <div class="content">{{code}}</div>
         </div>
          <div style="display: flex;">
            <div class="label">就诊时间：</div>
            <div class="content">{{form.caseTime}}</div>
          </div>
        </div>
        <div style="display: flex; line-height: 30px; height: 30px;">
          <div style="display: flex;">
            <div class="label">姓名：</div>
            <div class="content">{{form.name}}</div>
          </div>
          <div style="display: flex;">
            <div class="label">性别：</div>
            <div class="content">{{form.sex === 1 ? '女' : '男'}}</div>
          </div>
          <div style="display: flex;">
            <div class="label">年龄：</div>
            <div class="content">{{form.age}}</div>
          </div>
        </div>
        <div style="display: flex; line-height: 30px; height: 30px;">
          <div style="display: flex;">
            <div class="label">联系电话：</div>
            <div class="content">{{form.phone}}</div>
          </div>
          <div style="display: flex;">
            <div class="label">住址：</div>
            <div class="content">{{form.address}}</div>
          </div>
        </div>
        <div style="display: flex; line-height: 30px;">
          <div style="display: flex;">
            <div class="label">症状：</div>
            <div class="content" style="width: unset">{{putUp}}</div>
          </div>
        </div>
        <div style="display: flex; line-height: 30px; ">
          <div style="display: flex;">
            <div class="label">辩证：</div>
            <div class="content" style="width: unset;">{{dialectical}}</div>
          </div>
        </div>
      </div>
      <div style="border-bottom: 1px solid #2d8cf0; padding-bottom: 20px;">
        <div>
          <span style="font-size: 35px;">Rp:</span>
          <span style="margin-left: 50px;">(克)</span>
        </div>
        <div style="margin-left: 50px; margin-top: 20px; font-size: 20px;" :style="{height: height + 'px'}">{{componentForm.component}}</div>
      </div>
      <div style=" padding: 20px 0; border-bottom: 1px solid #2d8cf0;">
        <div style="margin-left: 50px;">医嘱：{{componentForm.enjoin}}</div>
      </div>
    </div>
    <div style="padding: 20px; display: flex; justify-content: center;">
      <el-button type="warning" @click="handlerBack">{{rebackText}}</el-button>
      <el-button type="primary" v-if="!isSave" @click="handlerFinish">保存</el-button>
      <el-button type="primary" v-if="isSave" @click="handlerCopy">打印</el-button>
    </div>
  </basic-container>
</template>

<script>
  import Case from "../../../../api/business/case/Case";
  import func from "../../../../util/func";

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
      },
    },
    data() {
      return {
        height: 0,
        code: "",
        isSave: false,
      }
    },
    methods: {
      handlerCopy() {
        window.open(
          `/medicine.html?code=${this.form.code}&caseTime=${this.form.caseTime}&name=${this.form.name}&sex=${this.form.sex === 1 ? '女' : '男'}&age=${this.form.age + ""}&phone=${this.form.phone}&address=${this.form.address}&putUp=${this.putUp}&dialectical=${this.dialectical}&component=${this.componentForm.component}&enjoin=${this.componentForm.enjoin}`
        );
      },
      handlerDownload() {
        if (!this.validatenull(this.id)) {
          Case.download(this.id).then(res => {
            func.downLoadFile(res);
          });
          return;
        }
        Case.downloadObj(this.getFormData()).then(res => {
          func.downLoadFile(res);
        })
      },
      handlerBack() {
        if (!this.validatenull(this.id) || this.isSave === false) {
          this.$emit("back");
          return;
        }
        if (this.isSave === true) {
          this.$emit("reset");
          return;
        }
      },
      handlerFinish() {

        Case.save(this.getFormData()).then(() => {
          this.$message({type: "success", message: "保存成功"});
          this.isSave = true;
        })
      },
      getFormData() {
        let save = {};
        save.code = this.code;
        save.name = this.form.name;
        save.sex = this.form.sex;
        save.phone = this.form.phone;
        save.address = this.form.address;
        save.age = this.form.age;
        save.caseTime = this.form.caseTime;

        save.medicineIds = this.diseaseOptions.map(item => item.label);
        save.dialectical = this.componentForm.dialectical;
        save.component = this.componentForm.component;
        save.enjoin = "医嘱：" + this.componentForm.enjoin;
        save.medicineNames = this.putUp;
        return save;
      },
      setHeight() {
       setInterval(() => {
         let contentHeight = document.getElementById("content").offsetHeight;
         this.height = document.body.offsetHeight - contentHeight - 470;
       }, 30)
      },
      init() {
        if (this.validatenull(this.id)) {
          this.setHeight();
          Case.code().then(res => {
            this.code = res.data.data;
          })
        }

        if (!this.validatenull(this.id)) {
          Case.detail(this.id).then(res => {
            this.setHeight();
            let data = res.data.data;
            let medicineList = data.medicineList;
            this.form = data;
            this.code = data.code;
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
      rebackText() {
        if (!this.validatenull(this.id)) {
          return "返回";
        }

        return this.isSave ? "重新开诊" : "返回组方";
      },
      putUp() {
        return this.diseaseOptions.map(item => item.value).join("，");
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
    },
    created() {
      if (!this.validatenull(this.id)) {
        this.isSave = true;
      }
    }
  }
</script>

<style scoped>
  .check-number .label {
    width: 80px;
    display: inline-block;
    text-align: justify;
    text-align-last:justify;
    text-justify: distribute-all-lines;/*这行必加，兼容ie浏览器*/
  }
  .check-number .content {
    width: 300px;
  }
</style>
