import React from 'react'
import Instance from './instance'
import getLocaleValue from './../locale'

function Context({ locale = {}, language, portal, children }) {
  let data = null
  // 根据语言名称获取locale数据
  // function initLanguageLocale() {
  //   let seedsuiLocale = {};
  //   const result = require(`./../locale/${language}.js`);
  //   if (!result) {
  //     console.error(`seedsui中, ${language}语言包不存在`);
  //     data = locale;
  //     return;
  //   }
  //   // 防止没有用babel-plugin-add-module-exports自动加上default
  //   if (result.default) seedsuiLocale = result.default;
  //   data = {
  //     ...seedsuiLocale,
  //     ...locale
  //   }
  // }
  // 有language属性时, 读取seedsui内部国际化文件
  // if (language) {
  //   initLanguageLocale()
  // } else {
  data = locale
  // }
  if (!data || Object.keys(data).length === 0) {
    console.log('国际化数据为空')
    // data = require(`./../locale/zh_CN.js`)
  }
  if (data && Object.keys(data).length) window.localeData = data
  return (
    <Instance.Provider
      value={{
        locale: function (remark, key, variable) {
          return getLocaleValue(remark, key, variable)
        },
        language: language,
        portal: portal
      }}
    >
      {children}
    </Instance.Provider>
  )
}

export default Context
