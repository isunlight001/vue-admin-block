export default(Mock, qs) => {
  // 测试数据
  Mock.mock(/\/test/, () => ({
    data: 'sunlight  test page',
    error: {
      code: 0,
      msg: 'Get test success'
    }
  }))
}
