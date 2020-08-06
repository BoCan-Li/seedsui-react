import React from 'react';
import Instance from './instance';

function Context({
  locale = {},
  language,
  portal,
  children
}) {
  let data = null;
  // 根据语言名称获取locale数据
  function initLanguageLocale() {
    let seedsuiLocale = {};
    const result = require(`./../locale/${language}.js`);
    if (!result) {
      console.error(`seedsui中, ${language}语言包不存在`);
      data = locale;
      return;
    }
    // 防止没有用babel-plugin-add-module-exports自动加上default
    if (result.default) seedsuiLocale = result.default;
    data = {
      ...seedsuiLocale,
      ...locale
    }
  }
  // 有language属性时, 读取seedsui内部国际化文件
  if (language) {
    initLanguageLocale()
  } else {
    data = locale
  }
  if (!data || Object.keys(data).length === 0) {
    console.log('读取默认国际化文件zh_CN')
    data = require(`./../locale/zh_CN.js`)
  }
  if (data && Object.keys(data).length) localStorage.setItem('_seedsui_locale', JSON.stringify(data))
  return (
    <Instance.Provider
      value={{
        locale: function (key, variable) {
          if (!data) return key || '';
          // 获取key的值
          if (key) {
            let value = data[key] || '';
            if (value && variable && Array.isArray(variable) && variable.length) {
              for (let i = 0; i < variable.length; i++) {
                if (typeof variable[i] !== 'number' && typeof variable[i] !== 'boolean' && typeof variable[i] !== 'string') continue;
                value = value.replace(new RegExp(`\\{${i}\\}`, 'g'), variable[i]);
              }
            }
            return value || key;
          }
          return data
        },
        language: language,
        portal: portal
      }}
    >
      {children}
    </Instance.Provider>
  );
}

export default Context;
