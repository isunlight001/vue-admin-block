<template>
<div id="scripts">
  <Search :label-width="80" :elem="searchElem" :model="search" :btn-loading="list.loading" @on-search="handleGetList"></Search>
  <!-- Search -->
  <List>
    <div slot="extra">
      <a href="#" @click.prevent="handleCreate">
        <Icon type="md-document" size="16" style="margin-top: -2px;"></Icon> 新增 </a>
    </div>
    <!-- extra -->
    <div class="toolbar">
      <Button type="primary" @click="handleBatchDelete" :disabled="!toolbar.visible" style="margin-right: 8px;">删除</Button>
      <span class="number">选中 {{ toolbar.number }} 条数据</span>
    </div>
    <!-- .toolbar -->
    <VTablePage ref="list" :columns="columns" :loading="list.loading" :data="list.data" :total="list.total" @on-page-change="handleGetList" @on-selection-change="handleSelectionChange"></VTablePage>
    <!-- VTablePage -->
  </List>
  <!-- List -->
  <Edit ref="edit" :model="edit" @on-update="handleGetList"></Edit>
  <!-- Edit -->
</div>
</template>
<script>
import {
  delScript,
  batchDelScript,
  getScriptList
} from '@/services/manage/scripts'
import Edit from './ScriptEdit'
import Search from '@/views/components/Search'
import List from '@/views/components/List'
export default {
  name: 'Scripts',
  components: {
    Edit,
    Search,
    List
  },
  data() {
    return {
      // 工具条(批量删除)
      toolbar: {
        ids: [], // ID数组
        number: 0, // 选择数量
        visible: false // 按钮可视状态
      },
      // 表单数据(用户)
      edit: {
        script_name: '',
        app_name: '',
        script_filename: '',
        script_manage_id: '',
        created_time: '',
        operation: ''
      },
      // 初始表单数据(用户)
      init: '',
      // 表单数据(搜索)
      search: {
        script_name: '',
        app_name: ''
      },
      // 列表属性
      list: {
        data: [], // 结构化数据
        total: 0, // 数据总数
        loading: false // 加载状态
      },
      // 表单元素(搜索)
      searchElem: [{
        label: '脚本名称',
        prop: 'script-name',
        placeholder: '输入脚本名称',
        icon: 'md-search'
      }, {
        label: '物理子系统',
        prop: 'app_name',
        placeholder: '请输入物理子系统',
        icon: 'md-search'
      }],
      // 表格列的配置描述(用户)
      columns: [{
        type: 'selection',
        width: 60,
        align: 'center'
      }, {
        title: '脚本名称',
        key: 'script_name',
        minWidth: 120,
        render: (h, params) => {
          let script_name = params.row.script_name
          for (let key in script_name) {
            script_name = script_name[key]
          }
          return h('span', script_name)
        }
      }, {
        title: '物理子系统',
        key: 'app_name',
        minWidth: 80,
        render: (h, params) => {
          let app_name = params.row.app_name
          for (let key in app_name) {
            app_name = app_name[key]
          }
          return h('span', app_name)
        }
      }, {
        title: '关联脚本',
        key: 'script_filename',
        minWidth: 160,
        render: (h, params) => {
          let script_filename = params.row.script_filename
          for (let key in script_filename) {
            script_filename = script_filename[key]
          }
          return h('span', script_filename)
        }
        }, {
        title: '创建者',
        key: 'script_manage_id',
        minWidth: 100
      }, {
        title: '创建时间',
        key: 'created_time',
        minWidth: 60
      }, {
        title: '操作',
        key: 'operation',
        align: 'center',
        minWidth: 150,
        render: (h, params) => h('div', [
          h('a', {
            style: {
              marginRight: '16px'
            },
            on: {
              click: () => this.handleEdit(params.row)
            }
          }, [h('Icon', {
            props: {
              type: 'md-create',
              size: 16
            },
            style: {
              marginTop: '-2px',
              marginRight: '4px'
            }
          }), '编辑']),
          h('Poptip', {
            props: {
              confirm: true,
              transfer: true,
              title: '您确定要删除这条记录?',
              'ok-text': '是',
              'cancel-text': '否'
            },
            on: {
              'on-ok': () => this.handleDelete(params.row)
            }
          }, [
            h('a', [h('Icon', {
              props: {
                type: 'md-trash',
                size: 16
              },
              style: {
                marginTop: '-2px',
                marginRight: '4px'
              }
            }), '删除'])
          ])
        ])
      }]
    }
  },
  mounted() {
    this.init = Object.assign({}, this.edit) // 复制初始表单数据
    this.handleGetList() // 获取列表数据
  },
  methods: {
    /**
     * 在多选模式下有效，只要选中项发生变化时就会触发
     * @param  {array} selection 已选项数据
     */
    handleSelectionChange(selection) {
      let ids = []
      let num = selection.length
      let _true = true
      for (var i = 0; i < selection.length; i++) {
        ids.push(selection[i]['id'])
      }
      this.toolbar = {
        ids: ids,
        number: num,
        visible: num ? _true : false
      }
    },
    // 批量删除脚本
    handleBatchDelete() {
      this.list.loading = true
      // 模拟异步请求(批量删除)
      setTimeout(() => {
        batchDelScript({
          ids: this.toolbar.ids.join(',')
        }).then(res => {
          this.$Message.success(res.error.msg)
          this.handleGetList()
        }).catch(() => {
          this.list.loading = false
        })
      }, 500)
    },
    /**
     * 获取用户列表
     * @param  {string} type 是否使用搜索, 默认值 undefined
     */
    handleGetList(type) {
      this.$refs['list'].selectAll(false) // 取消全选
      this.list.loading = true // 列表加载状态
      let page = this.$refs['list'].getPage(type) // 获取分页信息
      // 模拟异步请求(搜索)
      setTimeout(() => {
        getScriptList({
          ...this.search,
          pagePara: {
            current: page.current,
            pageSize: page.pageSize
          }
        }).then(res => {
          let {
            scripts,
            total
          } = res.data
          this.list = {
           data: scripts,
            total: total,
            loading: false
          }
        }).catch(() => {
          this.list.loading = false
        })
      }, 500)
    },
    /**
     * 删除用户
     * @param  {object} row 当前行数据
     */
    handleDelete(row) {
      this.list.loading = true
      // 模拟异步请求(删除)
      setTimeout(() => {
        delScript({
          id: row.id
        }).then(res => {
          this.$Message.success(res.error.msg)
          this.handleGetList()
        }).catch(() => {
          this.list.loading = false
        })
      }, 500)
    },
    /**
     * 编辑界面
     * @param  {object} row 当前行数据
     */
    handleEdit(row) {
      this.$refs['edit'].showModal('edit')
      // 模拟异步请求(获取详情)
      setTimeout(() => {
        let edit = Object.assign({}, row)
        // let birth = row.birth ? this.$Utils.formatDate.parse(row.birth, 'yyyy-MM-dd') : ''
        // let city
        // for (let key in row.city) {
        //   city = key
        // }
        // let hobby = []
        // for (let key in row.hobby) {
        //   hobby.push(key)
        // }
        this.edit = {
          ...edit
          // city,
          // birth,
          // hobby
        }
        this.$refs['edit'].getPatch() // 获取补丁数据
      }, 800)
    },
    // 新增界面
    handleCreate() {
      this.edit = Object.assign({}, this.init)
      this.$refs['edit'].showModal() // 显示模态框
      this.$refs['edit'].getPatch() // 获取补丁数据
    }
  }
}
</script>
<style lang="postcss" scoped>
#scripts {
  & .toolbar {
    padding: 12px 16px;
    border: 1px solid #dcdee2;
    border-bottom-style: none;
  }
}
</style>
