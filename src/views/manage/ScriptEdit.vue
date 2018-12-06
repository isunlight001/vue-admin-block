<template>
<div id="script-edit">
  <Modal v-model="modal.visible" :title="modal.title" footer-hide>
    <VForm :key="modal.visible" :width="360" :label-width="80" :elem="userElem" :model="model" :rules="userRule" :loading="loading.form" :btn-loading="loading.btn" @on-submit="handleSubmit" @on-click="modal.visible = false" button button-text="Cancel"></VForm>
    <!-- VForm -->
  </Modal>
</div>
</template>
<script>
import {
  editScript
} from '@/services/manage/scripts'
export default {
  name: 'ScriptEdit',
  props: {
    model: Object
  },
  data() {
    // 自定义验证(年龄)
    const validAge = (rule, value, callback) => {
      
      //模拟异步验证
      setTimeout(() => {
        
      }, 500)
    }
    return {
      // 模态框属性
      modal: {
        title: '',
        visible: false
      },
      // 加载状态
      loading: {
        btn: false,
        form: false
      },
      // 表单元素(用户)
      userElem: [{
        label: '脚本名称',
        prop: 'script_name',
        placeholder: '输入脚本名称'
      }, {
        label: '物理子系统',
        prop: 'app_name',
        placeholder: '请输入物理子系统'
      }, {
        label: '脚本说明',
        prop: 'desc',
        placeholder: '请输入脚本说明...',
        type: 'textarea'
      }],
      // 表单验证(用户)
      userRule: {
        script_name: [{
          required: true,
          message: '脚本名称不能为空!',
          trigger: 'blur'
        }],
        app_name: [{
          required: true,
          message: '子系统名称不能为空！',
          trigger: 'blur'
        }],
        desc: [{
          required: true,
          message: '请输入描述！',
          trigger: 'blur'
        }, {
          message: '描述不能少于20字！',
          trigger: 'blur',
          type: 'string',
          min: 20
        }]
      }
    }
  },
  methods: {
    /**
     * 显示模态框
     * @param  {string} name 模态框标题名称, 默认值, undefined
     */
    showModal(name) {
      this.loading.form = true // 表单加载状态
      switch (name) {
        case 'edit':
          name = 'Edit'
          break
        default:
          name = '新增脚本'
      }
      this.modal = {
        title: name,
        visible: true
      }
    },
    // 获取补丁数据
    getPatch() {
      let data = this.userElem.filter(n => n.option && n.option.length === 0)
      let total = data.length
      let _false = false
      if (total === 0) {
        this.loading.form = _false // 表单加载状态
        return _false
      }
      for (let i = 0; i < total; i++) {
        if (data[i].prop === 'city') {
          // 模拟异步请求(获取补丁数据-城市)
          setTimeout(() => {
            data[i].option = this.city
            total--
            this.loading.form = total === 0 ? _false : true // 补丁完成状态
          }, 800)
        }
        if (data[i].prop === 'hobby') {
          // 模拟异步请求(获取补丁数据-爱好)
          setTimeout(() => {
            data[i].option = this.hobby
            total--
            this.loading.form = total === 0 ? _false : true // 补丁完成状态
          }, 400)
        }
      }
    },
    // 表单提交
    handleSubmit() {
      this.loading.btn = true
      let para = this.model
      // para.birth = para.birth ? this.$Utils.formatDate.format(new Date(para.birth), 'yyyy-MM-dd') : ''
      // 模拟异步请求(编辑 Or 新增)
      setTimeout(() => {
        editScript(para).then(res => {
          this.$Message.success(res.error.msg)
          this.$emit('on-update', false)
          this.loading.btn = false
          this.modal.visible = false
        }).catch(() => {
          this.loading.btn = false
        })
      }, 500)
    }
  }
}
</script>
<style lang="postcss" scoped>
</style>
