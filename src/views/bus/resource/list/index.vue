<template>
  <el-row>
    <el-col :span="4">
      <div class="box">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="政务视角" name="affair">
            <el-scrollbar>
              <basic-container>
                <avue-tree
                  :option="treeOption"
                  :data="treeData"
                  @node-click="nodeClick"
                />
              </basic-container>
            </el-scrollbar>
          </el-tab-pane>
          <el-tab-pane label="系统视角" name="system">系统视角</el-tab-pane>
        </el-tabs>
      </div>
    </el-col>
    <el-col :span="20">
      <basic-container>
        <avue-crud
          :option="option"
          :search.sync="search"
          :table-loading="loading"
          :data="data"
          ref="crud"
          v-model="form"
          :permission="permissionList"
          @row-del="rowDel"
          @row-update="rowUpdate"
          @row-save="rowSave"
          :before-open="beforeOpen"
          :page.sync="page"
          @search-change="searchChange"
          @search-reset="searchReset"
          @selection-change="selectionChange"
          @current-change="currentChange"
          @size-change="sizeChange"
          @refresh-change="refreshChange"
          @on-load="onLoad"
        >
          <template slot="menuLeft">
            <el-button
              type="primary"
              size="small"
              plain
              icon="el-icon-plus"
              @click="batchCreateOrUpdateTable"
              >选定批量建/更表
            </el-button>
            <el-button
              type="primary"
              size="small"
              plain
              icon="el-icon-upload2"
              @click="importResource"
              >导入资源
            </el-button>
          </template>
          <template slot-scope="{ row }" slot="tenantName">
            <el-tag>{{ row.tenantName }}</el-tag>
          </template>
          <template slot-scope="{ row }" slot="roleName">
            <el-tag>{{ row.roleName }}</el-tag>
          </template>
          <template slot-scope="{ row }" slot="deptName">
            <el-tag>{{ row.deptName }}</el-tag>
          </template>
          <template slot-scope="{ row }" slot="userTypeName">
            <el-tag>{{ row.userTypeName }}</el-tag>
          </template>
        </avue-crud>
      </basic-container>
    </el-col>
  </el-row>
</template>

<script>
import { getList, getUser, remove, update, add } from "@/api/system/user";
import { getDeptTree, getDeptLazyTree } from "@/api/system/dept";
import { getPostList } from "@/api/system/post";
import { mapGetters } from "vuex";
import website from "@/config/website";

export default {
  data() {
    return {
      form: {},
      search: {},
      initFlag: true,
      selectionList: [],
      query: {},
      loading: true,
      activeTab: "affair",
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      init: {
        deptTree: [],
      },
      props: {
        label: "title",
        value: "key",
      },
      treeDeptId: "",
      treeData: [],
      treeOption: {
        nodeKey: "id",
        lazy: true,
        treeLoad: function (node, resolve) {
          const parentId = node.level === 0 ? 0 : node.data.id;
          getDeptLazyTree(parentId).then((res) => {
            resolve(
              res.data.data.map((item) => {
                return {
                  ...item,
                  leaf: !item.hasChildren,
                };
              })
            );
          });
        },
        addBtn: false,
        menu: false,
        size: "small",
        props: {
          labelText: "标题",
          label: "title",
          value: "value",
          children: "children",
        },
      },
      option: {
        height: "auto",
        calcHeight: 80,
        tip: false,
        searchShow: true,
        searchMenuSpan: 6,
        border: true,
        index: true,
        selection: true,
        viewBtn: true,
        column: [
          {
            label: "登录账号",
            prop: "account",
            search: true,
            display: false,
          },
          {
            label: "所属租户",
            prop: "tenantName",
            slot: true,
            display: false,
          },
          {
            label: "用户姓名",
            prop: "realName",
            search: true,
            display: false,
          },
          {
            label: "所属角色",
            prop: "roleName",
            slot: true,
            display: false,
          },
          {
            label: "所属部门",
            prop: "deptName",
            slot: true,
            display: false,
          },
          {
            label: "用户平台",
            prop: "userTypeName",
            slot: true,
            display: false,
          },
          {
            label: "用户平台",
            type: "select",
            dicUrl: "/api/blade-system/dict/dictionary?code=user_type",
            props: {
              label: "dictValue",
              value: "dictKey",
            },
            dataType: "number",
            search: true,
            hide: true,
            display: false,
            prop: "userType",
            rules: [
              {
                required: true,
                message: "请选择用户平台",
                trigger: "blur",
              },
            ],
          },
        ],
        group: [
          {
            label: "基础信息",
            prop: "baseInfo",
            icon: "el-icon-user-solid",
            column: [
              {
                label: "所属租户",
                prop: "tenantId",
                type: "tree",
                dicUrl: "/api/blade-system/tenant/select",
                props: {
                  label: "tenantName",
                  value: "tenantId",
                },
                hide: !website.tenantMode,
                addDisplay: website.tenantMode,
                editDisplay: website.tenantMode,
                viewDisplay: website.tenantMode,
                rules: [
                  {
                    required: true,
                    message: "请输入所属租户",
                    trigger: "click",
                  },
                ],
                span: 24,
              },
              {
                label: "登录账号",
                prop: "account",
                rules: [
                  {
                    required: true,
                    message: "请输入登录账号",
                    trigger: "blur",
                  },
                ],
              },
              {
                label: "用户平台",
                type: "select",
                dicUrl: "/api/blade-system/dict/dictionary?code=user_type",
                props: {
                  label: "dictValue",
                  value: "dictKey",
                },
                dataType: "number",
                slot: true,
                prop: "userType",
                rules: [
                  {
                    required: true,
                    message: "请选择用户平台",
                    trigger: "blur",
                  },
                ],
              },
            ],
          },
        ],
      },
      data: [],
    };
  },
  watch: {
    "form.tenantId"() {
      if (this.form.tenantId !== "" && this.initFlag) {
        this.initData(this.form.tenantId);
      }
    },
    activeTab(value) {
      if (value == "system") {
        this.loadSystemData();
      } else if (value == "affair") {
        this.loadAffairData();
      }
    },
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permission.user_add && false, false),
        viewBtn: this.vaildData(this.permission.user_view, false),
        delBtn: this.vaildData(this.permission.user_delete && false, false),
        editBtn: this.vaildData(this.permission.user_edit && false, false),
      };
    },
  },
  mounted() {
    // 非租户模式默认加载管理组数据
    if (!website.tenantMode) {
      this.initData(website.tenantId);
    }
  },
  methods: {
    loadSystemData() {
      console.info("加载系统数据");
    },
    loadAffairData() {
      console.info("加载政务数据");
    },
    batchCreateOrUpdateTable() {
      console.info("选定批量建/更表");
    },
    importResource() {
      console.info("导入资源");
    },
    nodeClick(data) {
      this.treeDeptId = data.id;
      this.page.currentPage = 1;
      this.onLoad(this.page);
    },
    initData(tenantId) {
      getDeptTree(tenantId).then((res) => {
        const column = this.findObject(this.option.group, "deptId");
        column.dicData = res.data.data;
      });
      getPostList(tenantId).then((res) => {
        const column = this.findObject(this.option.group, "postId");
        column.dicData = res.data.data;
      });
    },
    rowSave(row, done, loading) {
      row.deptId = row.deptId.join(",");
      row.roleId = row.roleId.join(",");
      row.postId = row.postId.join(",");
      add(row).then(
        () => {
          this.initFlag = false;
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
          done();
        },
        (error) => {
          window.console.log(error);
          loading();
        }
      );
    },
    rowUpdate(row, index, done, loading) {
      row.deptId = row.deptId.join(",");
      row.roleId = row.roleId.join(",");
      row.postId = row.postId.join(",");
      update(row).then(
        () => {
          this.initFlag = false;
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
          done();
        },
        (error) => {
          window.console.log(error);
          loading();
        }
      );
    },
    rowDel(row) {
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return remove(row.id);
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        });
    },
    searchReset() {
      this.query = {};
      this.treeDeptId = "";
      this.onLoad(this.page);
    },
    searchChange(params, done) {
      this.query = params;
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
      if (["edit", "view"].includes(type)) {
        getUser(this.form.id).then((res) => {
          this.form = res.data.data;
          if (this.form.hasOwnProperty("deptId")) {
            this.form.deptId = this.form.deptId.split(",");
          }
          if (this.form.hasOwnProperty("roleId")) {
            this.form.roleId = this.form.roleId.split(",");
          }
          if (this.form.hasOwnProperty("postId")) {
            this.form.postId = this.form.postId.split(",");
          }
        });
      }
      this.initFlag = true;
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
      getList(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.query),
        this.treeDeptId
      ).then((res) => {
        const data = res.data.data;
        this.page.total = data.total;
        this.data = data.records;
        this.loading = false;
        this.selectionClear();
      });
    },
  },
};
</script>

<style>
.box {
  height: 800px;
  padding: 0 15px;
}

.box .el-tabs__header {
  background: #fff;
  padding: 0 10px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  margin-bottom: 10px;
}

.el-scrollbar {
  height: 100%;
}

.box .el-scrollbar__wrap {
  overflow: scroll;
}
</style>