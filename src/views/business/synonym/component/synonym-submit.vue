<template>
  <el-dialog
    append-to-body
    :title="title"
    :visible.sync="show"
    width="50%"
    :before-close="handleClose">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="同义症状" prop="dictList">

        <div>
          <div>
            <el-select v-model="value"  filterable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-button type="primary" style="margin-left: 20px;" @click="handlerClickAdd">添加</el-button>
          </div>
          <div style="border: 1px solid #DCDFE6; border-radius: 5px; min-height: 100px; margin-top: 10px; max-height: 200px; overflow: auto;">
            <el-tag closable @close="handlerCloseTag(item)" v-for="(item, index) in dictList" :key="index" style="margin: 0 10px;">{{item.label}}</el-tag>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="描述" prop="remark">
        <el-input type="textarea" rows="5" resize="none" v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="handlerSubmit">提 交</el-button>
      </span>
  </el-dialog>
</template>

<script>
  import Synonym from "../../../../api/business/synonym/synonym";
  import Gross from "../../../../api/business/gross/gross";

  export default {
    name: "synonymSubmit",
    props: {
      show: {
        type: Boolean,
        default: false,
      },
      save: {
        type: Function,
        default() {
          return () => {}
        },
      },
      update: {
        type: Function,
        default() {
          return () => {}
        },
      },
      id: {
        type: String,
      },
      defaultDictList: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    watch: {
      show() {
        this.$emit("update:show", this.show);
        this.$emit("change", this.show);
      }
    },
    data() {
      return {
        value: "",
        loading: false,
        options: [],
        dictList: [],
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
          ],
          file: [
            { required: true, message: '请上传名称', trigger: 'blur' },
          ]
        },
        form: {},
      }
    },
    methods: {
      handlerCloseTag(tag) {
        let index = this.dictList.indexOf(tag);
        this.dictList.splice(index, 1);
        this.loadDict();
      },
      handleClose() {
        this.show = false;
      },
      handlerSubmit() {
        this.$refs["form"].validate((valid) => {
          if (valid) {
            this.loading = true;
            let copy = JSON.parse(JSON.stringify(this.form));
            copy.dictIds = this.dictList.map(item => item.value);
            if (this.validatenull(this.id)) {
              this.save(copy, () => {
                this.loading = false;
                this.show = false;
                this.$emit("update:show", this.show);
              });
            }else {
              this.update(copy, () => {
                this.loading = false;
                this.show = false;
                this.$emit("update:show", this.show);
              });
            }

          }
        });
      },
      loadDict() {
        let excludeIds = this.dictList.map(item => item.value).join(",");
        Gross.dictList(excludeIds).then(res => {
          let data = res.data.data;
          this.$set(this, "options", data.map(item => ({value: item.id, label: item.name})));
        })
      },
      handlerClickAdd() {
        if (this.validatenull(this.value)) {
          this.$message({type: "success", message: "请选择同义词"});
          return;
        }
        let item = this.options.filter(item => item.value === this.value)[0];
        this.dictList.push(item);
        this.value = "";
        this.loadDict();
      }
    },
    created() {
      this.dictList = JSON.parse(JSON.stringify(this.defaultDictList));
      this.loadDict();
      if (!this.validatenull(this.id)) {
        Synonym.detail(this.id).then(res => {
          this.form = res.data.data;
        })
      }
    },
    computed: {
      title() {
        if (this.validatenull(this.id)) {
          return "新增";
        }
        return "编辑";
      }
    }
  }
</script>

<style scoped>

</style>
