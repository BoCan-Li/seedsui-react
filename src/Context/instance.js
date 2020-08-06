import React from 'react';
import locale from './../locale';

const Context = React.createContext({
  locale: function (key, variable) {
    console.log('没有配置国际化, 默认读取国际化文件zh_CN')
    return locale(key, variable)
  },
  language: '',
  portal: null
})

export default Context