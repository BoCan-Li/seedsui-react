import React from 'react';
import locale from './../locale';

const Context = React.createContext({
  locale: function (remark, key, variable) {
    console.log(remark, key, variable)
    console.log('没有配置国际化, 默认读取国际化文件zh_CN')
    return locale(remark, key, variable)
  },
  language: '',
  portal: null
})

export default Context