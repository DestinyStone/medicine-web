<template>
  <el-dialog
    title="上传"
    :visible.sync="show"
    width="30%"
    append-to-body
    :before-close="handleClose">

    <div style="display: flex; justify-content: center;">
      <el-upload
        :http-request="handlerUpload"
        class="upload-demo"
        drag
        :show-file-list="false"
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">{{validatenull(file) ? "只能上传word文件" : `当前上传文件: ${file.name}`}}</div>
      </el-upload>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="show = false">取 消</el-button>
      <el-button type="primary" @click="handlerSubmit">上 传</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {validatenull} from "../../util/validate";

  export default {
    name: "fileUploadDialog",
    props: {
      show: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        file: {},
      }
    },
    watch: {
      show() {
        this.$emit("update:show", this.show);
      }
    },
    methods: {
      validatenull(obj) {
        return validatenull(obj);
      },
      close() {
        this.show = false;
      },
      handlerSubmit() {
        if (this.validatenull(this.file)) {
          this.$message({type: "warning", message: "请上传word文件"});
          return;
        }

        this.$emit("handler", {file: this.file, call: () => {this.show = false}})
      },
      handleClose() {
        this.show = false;
      },
      handlerUpload(request) {
        let name = request.file.name;
        let index = name.indexOf(".");
        let suffix = name.slice(index + 1, name.length);

        if (suffix !== "docx") {
          this.$message({type: "warning", message: "请上传word文件"});
          return;
        }
        this.file = request.file

      },
    }
  }
</script>

<style scoped>

</style>
