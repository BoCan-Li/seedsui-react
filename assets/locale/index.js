export default function (remark, key, variable) {
  // let language = navigator.language;
  const ua = navigator.userAgent.toLowerCase()
  let language = 'zh_CN';
  if (ua.indexOf('lang=zh_CN') !== -1) {
    language = 'zh_CN';
  } else if (ua.indexOf('lang=en_US') !== -1) {
    language = 'en_US';
  } else {
    language = 'zh_CN'; // 默认语言
  }
  // seedsui国际化文件
  let seedsLocale = require(`seedsui-react/lib/locale/${language}.js`);
  if (seedsLocale.default) seedsLocale = seedsLocale.default;
  // 本地国际化文件
  let appLocale = require(`./resource/wq-lang-${language}`);
  if (appLocale.default) appLocale = appLocale.default;
  // 合并国际化文件
  let locale = Object.assign({}, seedsLocale, appLocale)
  // 设置语言
  locale.locale_language = language;
  // 获取key的值
  if (key) {
    let value = locale[key] || '';
    if (value && variable && Array.isArray(variable) && variable.length) {
      for (let i = 0; i < variable.length; i++) {
        if (typeof variable[i] !== 'number' && typeof variable[i] !== 'boolean' && typeof variable[i] !== 'string') continue
        value = value.replace(new RegExp(`\\{${i}\\}`, 'g'), variable[i])
      }
    }
    return value || remark || key
  }
  // 获取remark的值
  if (remark) return remark;
  return locale;
}
