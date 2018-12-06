import ax from '@/config/axios'

export const getScriptList = params => ax.get('/script-list', {params: params}) // 列表
export const delScript = params => ax.post('/script-delete', params) // 删除
export const batchDelScript = params => ax.post('/script-batch-delete', params) // 批量删除
export const editScript = params => {
  const url = params.id
    ? '/script-edit' // 编辑
    : '/script-create' // 新增
  return ax.post(url, params)
}
