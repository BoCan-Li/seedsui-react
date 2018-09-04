## 简介
SeedsUI，专为移动设备设计的UI框架，组件全面、丰富、轻量、低耦合、侵入性小，目前有react版和vue版(h5版本可从react的commponets文件中直接抽取)

## 安装
```js
npm install seedsui-react --save
```

## 换肤
```less
// 图标,图标风格
// @import "../../../node_modules/seedsui-react/src/lib/seedsui-iconfont.less";
@import "iconfont.less";

// 变量,换肤文件(需要依赖上面的图标库,因为有一些组件变量用了图标)
// @import "../../../node_modules/seedsui-react/src/lib/seedsui-variables.less";
@import "variables.less";

// 组件
@import "../../../node_modules/seedsui-react/src/lib/seedsui-components.less";
```


## 组件
- [Alert 弹出框](#alert-弹出框)
- [Aside 侧滑](#aside-侧滑)
- [Article 文章](#article-文章)
- [Attribute 键值对](#attribute-键值对)
- [Attributes 键值组](#attributes-键值组)
- [Badge 徽章](#badge-徽章)
- [Button 按钮](#button-按钮)
- [Calendar 日历](#calendar-日历)
- [Card 卡片](#card-卡片)
- [Carrousel 轮播](#carrousel-轮播)
- [Checkbox 复选框](#carrousel-复选框)
- [Close 关闭清除图标](#close-关闭清除图标)
- [Container page主体](#container-page主体)
- [Counter 计数器](#counter-计数器)
- [Dialog 自定义弹出框](#dialog-自定义弹出框)
- [Dot 小点点](#dot-小点点)
- [Dragrefresh 下拉刷新](#dragrefresh-下拉刷新)
- [Dropdown 菜单下拉](#dropdown-菜单下拉)
- [Footer page底部](#footer-page底部)
- [Grid 栅格](#grid-栅格)
- [Group 分组](#group-分组)
- [Handsign 手写签名](#handsign-手写签名)
- [Header page头部](#header-page头部)
- [Icon 图标](#icon-图标)
- [ImgLazy 懒人加载](#imglazy-懒人加载)
- [ImgUploader 图片上传](#imguploader-图片上传)
- [InputCity 城市选择](#inputcity-城市选择)
- [InputDate 日期选择](#inputdate-日期选择)

## Alert 弹出框
### 全部属性
```html
<Alert
  portal={传送dom object, 默认document.getElementById('root')}
  args={事件参数 any}
  show={*显隐 bool, 默认false}
  duration={动画时长 number, 默认见seedsui-variables.less}

  maskStyle={遮罩style object, 默认无}
  maskClassName={遮罩className string, 默认无}
  onClickMask={点击遮罩 func, 默认无}

  style={alert框style object, 默认无}
  className={alert框className string, 默认无}

  caption={标题文字 node, 默认无}
  captionStyle={标题style object, 默认无}
  captionClassName={标题className string, 默认无}

  icon={图标dom node, 默认无}
  iconSrc={图标地址 string, 默认无}
  iconStyle={图标style object, 默认无}
  iconClassName={图标className string, 默认无}

  contentStyle={内容style object, 默认无}
  contentClassName={内容className string, 默认无}
  children={内容 node, 默认无}

  submitStyle={确定按钮style object, 默认无}
  submitClassName={确定按钮className string, 默认无}
  submitCaption={确定按钮文字 node, 默认'确定'}
  disabled={确定按钮是否禁用 bool, 默认false}
  onClickSubmit={点击确定按钮 func, 默认隐藏}

  cancelStyle={取消按钮style object, 默认无}
  cancelClassName={取消按钮className string, 默认无}
  cancelCaption={取消按钮文字 node, 默认'确定'}
  onClickCancel={点击取消按钮 func, 默认隐藏}
/>
```

### 示例
```html
<Alert show={this.state.alertShow} iconSrc={picOk} submitCaption="好的，我已知晓" onClickSubmit={this.onSubmitAlert}>提交成功，请线下及时完成支付！</Alert>
```