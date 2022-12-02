<template>
  <div>
    <basic-container>
      <avue-crud :option="option"
                 :table-loading="loading"
                 :data="data"
                 ref="crud"
                 :page.sync="page"
                 v-model="form"
                 @row-update="handlerUpdate"
                 @row-save="handlerSubmit"
                 :permission="permissionList"
                 :before-open="beforeOpen"
                 :before-close="beforeClose"
                 @search-change="searchChange"
                 @search-reset="searchReset"
                 @selection-change="selectionChange"
                 @current-change="currentChange"
                 @size-change="sizeChange"
                 @refresh-change="refreshChange"
                 @on-load="onLoad"
      >
        <template slot="menuLeft">
          <el-button type="primary" size="small"  @click="handlerClickSubmit">
            备 份
          </el-button>
        </template>
        <template slot-scope="scope" slot="menu">
          <div style="display: flex; justify-content: space-around;">
            <el-link :underline="false" type="primary" @click="handlerClickUpdate(scope.row, scope.index)">修改描述</el-link>
            <el-link :underline="false" type="primary" @click="handlerClickReback(scope.row, scope.index)">还原</el-link>
          </div>
        </template>
      </avue-crud>
    </basic-container>
    <file-upload-dialog @handler="handlerUploadFile" :show.sync="showUpload" v-if="showUpload"/>
    <medicine-detail :show.sync="showDetail" v-if="showDetail" :id="selectId"/>
  </div>
</template>

<script>
  import Medicine from "../../../api/business/medicine/medicine";
  import FileUploadDialog from "../../../components/file/file-upload-dialog";
  import MedicineDetail from "../medicine/component/medicine-detail";
  import Analyze from "../../../api/business/analyze/analyze";
  import Reback from "../../../api/business/reback/reback";

  export default {
    name: "reback",
    components: {MedicineDetail, FileUploadDialog},
    props: {
      // 0 古医数据集 1 名医数据集
      type: {
        type: Number,
      },
      uploadButtonText: "",
    },
    data() {
      return {
        showDetail: false,
        showUpload: false,
        showPart: false,
        selectId: "",
        showSubmit: false,
        form: {},
        selectionList: [],
        query: {},
        loading: true,
        orgupNo: 0,
        page: {
          pageSize: 10,
          currentPage: 1,
          total: 0,
        },
        option: {
          rowKey: "id",
          tip: false,
          simplePage: true,
          searchShow: true,
          searchMenuSpan: 6,
          tree: true,
          border: true,
          menu: true,
          index: true,
          selection: false,
          viewBtn: true,
          menuWidth: 220,
          dialogClickModal: false,
          emptyBtnText: "重置",
          indexWidth: 60,
          emptyBtnIcon: "el-icon-refresh",
          indexLabel: "序号",
          column: [
            {
              label: "备份编号",
              prop: "code",
              width: 200,
              span: 24,
              addDisplay: false,
              editDisplay: false,
              search: true,
            },
            {
              label: "备份时间",
              prop: "createTime",
              width: 200,
              span: 24,
              addDisplay: false,
              editDisplay: false,
            },
            {
              label: "备份路径",
              prop: "path",
              overHidden: true,
              addDisplay: false,
              editDisplay: false,
            },
            {
              label: "描述",
              prop: "remark",
              type: "textarea",
              minRows: 5,
              span: 24,
              overHidden: true,
              search: true,
            },
          ],
        },
        data: [],
      };
    },
    computed: {
      // ...mapGetters(["permission"]),
      // permissionList() {
      //   return {
      //     addBtn: this.vaildData(this.permission.org_add, false),
      //     viewBtn: this.vaildData(this.permission.org_view, false),
      //     delBtn: this.vaildData(this.permission.org_delete, false),
      //     editBtn: this.vaildData(this.permission.org_edit, false),
      //   };
      // },
      permissionList() {
        return {
          addBtn: false,
          viewBtn: false,
          delBtn: false,
          editBtn: false,
        };
      },
    },
    methods: {
      handlerClickReback(row) {
        this.$confirm(`高危操作， 还原前请注意备份当前数据?`, "提示", {
          confirmButtonText: "还原",
          cancelButtonText: "取消还原",
          type: "warning"
        }).then(() => {
          this.$message({type: "warning", message: "执行系统还原"});
          return Reback.rebackSystem(row.id);
        }).then(() => {
          this.$message({type: "success", message: "还原成功"});
          this.onLoad(this.page);
        })
      },
      handlerClickDetail(row) {
        this.selectId = row.id;
        this.showDetail = true;
      },
      handlerClickBatchDelete() {
        if (this.selectionList.length === 0) {
          this.$message({type: "warning", message: "请至少选择一条数据"});
          return;
        }
        this.$confirm(`是否确定删除?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          return Analyze.delete(this.selectionList.map(item => item.id).join(","));
        }).then(() => {
          this.$message({type: "success", message: "删除成功"});
          this.onLoad(this.page);
        })
      },
      handlerUploadFile({file, call}) {
        let formData = new FormData();
        formData.append("file", file);
        formData.append("type", this.type);
        Medicine.upload(formData).then(() => {
          this.$message({type: "success", message: "导入成功"});
          this.showUpload = false;
          call();
          this.onLoad(this.page);
        })
      },
      handlerClickImport() {
        this.showUpload = true;
      },
      handlerUpdate(row, index, done, loading) {
        Reback.remark(row.id, row).then(() => {
          this.$message({type: "success", message: "更新成功"});
          this.onLoad(this.page);
          done();
        })
      },
      handlerClickUpdate(row, index) {
        this.$refs["crud"].rowEdit(row, index);
      },
      handlerDelete(row) {
        this.$confirm(`是否确定删除【${row.name}】?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          return Analyze.delete(row.id);
        }).then(() => {
          this.$message({type: "success", message: "删除成功"});
          this.onLoad(this.page);
        })
      },
      handlerSubmit(row,done, loading) {
        row.type = this.type;
        Analyze.save(row).then(() => {
          this.$message({type: "success", message: "新增成功"});
          this.onLoad(this.page);
          done();
        })
      },
      handlerClickSubmit() {
        this.$message({type: "warning", message: "执行系统备份"});
        Reback.save().then(() => {
          this.$message({type: "success", message: "系统备份成功"});
          this.onLoad(this.page);
        })
      },
      searchReset() {
        this.query = {};
        this.orgupNo = 0;
        this.onLoad(this.page);
      },
      searchChange(params, done) {
        this.query = params;
        this.orgupNo = "";
        this.page.currentPage = 1;
        this.onLoad(this.page, params);
        done();
      },
      selectionChange(list) {
        this.selectionList = list;
      },
      selectionClear() {
        this.selectionList = [];
        this.$refs.crud.toggleSelection();
      },
      beforeOpen(done, type) {
        done();
      },
      beforeClose(done) {
        done();
      },
      currentChange(currentPage) {
        this.page.currentPage = currentPage;
      },
      sizeChange(pageSize) {
        this.page.pageSize = pageSize;
      },
      refreshChange() {
        this.onLoad(this.page, this.query);
      },
      onLoad(page, params = {}) {
        this.loading = true;
        this.query.type = this.type;
        Reback.page(Object.assign(params, this.query), this.page.currentPage, this.page.pageSize).then(
          (res) => {
            let data = res.data.data;
            this.data = data.records;
            this.page.total = data.total;

            this.loading = false;
            this.selectionClear();
          }
        );
      },
    },
  };
</script>

<style>

</style>
