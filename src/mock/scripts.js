export default(Mock, qs) => {
  let citys = {
    '110100': 'BeiJing',
    '310100': 'ShangHai',
    '440100': 'GuangZhou',
    '330100': 'HangZhou',
    '330200': 'NingBo'
  }
  let hobbys = {
    'eat': 'Eat',
    'sleep': 'Sleep',
    'run': 'Run',
    'movie': 'Movie'
  }
  let scriptname = {
    '1': 'script jenkins',
    '2': 'oracle script jenkins',
    '3': 'soanr script jenkins',
    '4': 'script jemeter'
  }
  let appname = {
    '1': '物理极限测试',
    '2': '综合门户系统',
    '3': 'P8基准测试',
    '4': '信用卡交易',
    '5': '邮件系统',
    '6': '综合管理系统'
  }
  let filename = {
    '1': '物理极限测试.sh',
    '15': 'asd邮件系统.rar',
    '11': 'asdas信用卡交sdasdaa.xls',
    '13': 'asx信用卡交dasda.sh',
    '144': 'asdasdfile.sh',
    '1123': 'c综合管理系统a.xml',
    '112': 'as综合管理系统rthdasda.sh',
    '12': 'asd综合管理系统da.zip'
  }
  let data = Mock.mock({
    'scripts|11-87': [
      {
        id: '@guid',
        'script_name|1': scriptname,
        'app_name|1': appname,
        'script_filename|1': filename,
        script_manage_id: '@name',
        // email: '@email'
        created_time: '@date',
        operation: ''
        // 'city|1': citys,
        // 'hobby|1-3': hobbys,
        // desc: '@paragraph'
      }
    ]
  })
  let users = data.scripts

  // 参数函数
  let params = (cityStr, hobbyArr) => {
    let city = {}
    if (cityStr) {
      city[cityStr] = citys[cityStr]
    }
    let hobby = {}
    if (hobbyArr) {
      let len = hobbyArr.length
      for (let i = 0; i < len; i++) {
        let k = hobbyArr[i]
        hobby[k] = hobbys[k]
      }
    }
    return {city, hobby}
  }

  // 用户列表
  Mock.mock(/\/script-list/, config => {
    let {pagePara, name} = qs.parse(config.url.split('?')[1])
    let {current, pageSize} = JSON.parse(pagePara)
    let _scripts = users.filter(u => {
      if (name && u.name.indexOf(name) === -1) {
        return false
      }
      return true
    })
    let total = _scripts.length
    let pageMax = Math.ceil(total / pageSize)
    current = current > pageMax
      ? pageMax
      : current
    _scripts = _scripts.filter((u, index) => index < pageSize * current && index >= pageSize * (current - 1))
    return {
      data: {
        total: total,
        scripts: _scripts
      },
      error: {
        code: 0,
        msg: 'Get scripts success'
      }
    }
  })

  // 删除用户
  Mock.mock(/\/script-delete/, config => {
    let {id} = qs.parse(config.body)
    users = users.filter(u => u.id !== id)
    return {
      error: {
        code: 0,
        msg: '删除成功！'
      }
    }
  })

  // 批量删除用户
  Mock.mock(/\/script-batch-delete/, config => {
    let {ids} = qs.parse(config.body)
    ids = ids.split(',')
    users = users.filter(u => !ids.includes(u.id))
    return {
      error: {
        code: 0,
        msg: 'Delete success'
      }
    }
  })

  // 编辑用户
  Mock.mock(/\/script-edit/, config => {
    let {
      id,
      script_name,
      app_name,
      // gender,
      // email,
      // birth,
      // city,
      // hobby,
      desc
    } = qs.parse(config.body)
    //let _params = params(city, hobby)
    users.some(u => {
      if (u.id === id) {
        u.script_name = script_name
        u.app_name = app_name
        // u.gender = parseInt(gender)
        // u.email = email
        // u.birth = birth
        // u.city = _params.city
        // u.hobby = _params.hobby
        u.desc = desc
      }
    })
    return {
      error: {
        code: 0,
        msg: 'Update success'
      }
    }
  })

  // 新增用户
  Mock.mock(/\/script-create/, config => {
    let {
      script_name,
      app_name,
      // age,
      // gender,
      // email,
      // birth,
      // city,
      // hobby,
      desc
    } = qs.parse(config.body)
    // let _params = params(city, hobby)
    users.unshift({
      id: Mock.mock('@guid'),
      
      script_name: script_name,
      app_name: app_name,
      // age: parseInt(age),
      // gender: parseInt(gender),
      // email: email,
      // birth: birth,
      // city: _params.city,
      // hobby: _params.hobby,
      desc: desc
    })
    return {
      error: {
        code: 0,
        msg: 'Create success'
      }
    }
  })
}
