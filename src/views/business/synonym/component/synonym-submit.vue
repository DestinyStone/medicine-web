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
      <el-form-item label="上传文件" prop="file">
        <el-upload
          style="width:100%"
          :show-file-list="false"
          :on-change="onFileChange"
          :auto-upload="false"
          class="upload-demo"
          drag
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将obj,glb文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <div v-if="form.file">已上传文件 <em>{{form.file.name}}</em></div>
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
  export default {
    name: "synonymSubmit",
    props: {
      show: {
        type: Boolean,
        default: false,
      },
      save: {
        type: Function,
        default: false,
      },
      id: {
        type: String,
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
        loading: false,
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
      handleClose() {
        this.show = false;
      },
      onFileChange(file)  {
        let type = file.raw.type;
        if (type === "") {
          type = file.raw.name.split(".")[1];
        }

        if (type !== 'obj' && type !== 'glb') {
          this.$message({type: "warning", message: `请上传obj, glb格式文件`})
          return;
        }
        this.$set(this.form, "file", file.raw);
      },
      handlerSubmit() {
        this.$refs["form"].validate((valid) => {
          if (valid) {
            let formData = new FormData();
            for (let key in this.form) {
              formData.append(key, this.form[key]);
            }
            this.loading = true;
            this.save(formData, this.form, () => {
              this.loading = false;
              this.show = false;
              this.$emit("update:show", this.show);
            });
          }
        });
      }
    },
    created() {
      console.log(this.id);
      if (!this.validatenull(this.id)) {
        machineDetail(this.id).then(res => {
          this.form = res.data.data;
        })
      }
    },
    computed: {
      title() {
        if (this.validatenull(this.id)) {
          return "上传模型";
        }
        return "更新模型";
      }
    }
  }
</script>

<style scoped>

</style>
