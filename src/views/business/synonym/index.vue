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
          <el-button type="primary" size="small" @click="handlerClickSubmit">
            新 增
          </el-button>
        </template>
        <template slot-scope="scope" slot="menu">
          <div style="display: flex; justify-content: space-around;">
            <el-link :underline="false" type="primary" @click="handlerClickUpdate(scope.row, scope.index)">修改</el-link>
            <el-link :underline="false" type="warning" @click="handlerDelete(scope.row)">删除</el-link>
          </div>
        </template>
        <template slot="dictDataNames" slot-scope="scope">
          <div style="display: flex; overflow: auto;">
            <el-tag v-for="(item, index) in scope.row.dictList" :key="'tag' + index" style="margin-right: 10px;">{{item.name}}</el-tag>
          </div>
        </template>
      </avue-crud>
    </basic-container>
    <synonym-submit v-if="showSubmit"
                    :id="selectId"
                    :default-dict-list="dictList"
                    :show.sync="showSubmit"
                    :update="handlerUpdate"
                    :save="handlerSave"/>
  </div>
</template>

<script>
  import Medicine from "../../../api/business/medicine/medicine";
  import FileUploadDialog from "../../../components/file/file-upload-dialog";
  import MedicineDetail from "../medicine/component/medicine-detail";
  import Synonym from "../../../api/business/synonym/synonym";
  import SynonymSubmit from "./component/synonym-submit";

  export default {
    name: "medicine",
    components: {SynonymSubmit, MedicineDetail, FileUploadDialog},
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
        dictList: [],
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
              label: "名称",
              prop: "name",
              width: 180,
              search: true,
              span: 24,
              rules: [
                {required: true, message: "请输入名称", trigger: "blur"}
              ],
              searchPlaceholder: "名称"
            },
            {
              label: "同义症状",
              prop: "dictDataNames",
              span: 24,
              slot: true,
            },
            {
              label: "描述",
              prop: "remark",
              span: 24,
              width: 300,
              slot: true,
            },
          ]
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
      handlerSave(data, call) {
        Synonym.save(data).then(() => {
          this.$message({type: "success", message: "新增成功"});
          this.onLoad(this.page);
          call();
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
          return Medicine.delete(this.selectionList.map(item => item.id).join(","));
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
      handlerUpdate(data, call) {
        Synonym.update(this.selectId, data).then(() => {
          this.$message({type: "success", message: "更新成功"});
          this.onLoad(this.page);
          call();
        })
      },
      handlerClickUpdate(row) {
        this.selectId = row.id;
        this.dictList = row.dictList.map(item => ({label: item.name, value: item.id}));
        this.showSubmit = true;
      },
      handlerDelete(row) {
        this.$confirm(`是否确定删除【${row.name}】?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          return Synonym.delete(row.id);
        }).then(() => {
          this.$message({type: "success", message: "删除成功"});
          this.onLoad(this.page);
        })
      },
      handlerClickSubmit() {
        this.selectId = "";
        this.dictList = [];
        this.showSubmit = true;
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
        Synonym.page(Object.assign(params, this.query), this.page.currentPage, this.page.pageSize).then(
          (res) => {
            let data = res.data.data;
            this.data = data.records;
            this.page.total = data.total;
            this.data = this.data.map(item => ({...item, dictDataNames: item.dictList ? item.dictList.map(dictItem => dictItem.name).join(","): ""}))
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
