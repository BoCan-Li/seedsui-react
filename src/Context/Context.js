import React from 'react';
import Instance from './instance';

function Context({
  locale = {},
  language,
  portal,
  children
}) {
  // 根据语言名称获取locale数据
  function initLocale() {
    let languageLocale = null;
    const result = require(`./../locale/${language}.js`)
    if (!result) {
      console.error(`seedsui中, ${language}语言包不存在`);
      locale = null;
      return;
    }
    // 防止没有用babel-plugin-add-module-exports自动加上default
    if (result.default) languageLocale = result.default;
    locale = {
      ...languageLocale,
      ...locale
    }
  }
  // 获取locale数据
  if (language) { // 其次读取locale
    initLocale();
  }
  localStorage.setItem('_seedsui_locale', JSON.stringify(locale))
  return (
    <Instance.Provider
      value={{
        locale: locale,
        language: language,
        portal: portal
      }}
    >
      {children}
    </Instance.Provider>
  );
}

export default Context;
