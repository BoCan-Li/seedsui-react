## 简介
SeedsUI,专为移动设备设计的UI框架,组件全面可换肤,以后将会有react版和vue版、h5版

## 安装
```js
npm install seedsui-react --save
```

## 换肤
### 不需要换肤,直接引入css
```js
import 'seedsui-react/build/css/index.css';
```
### 需要换肤,需要支持less,引入less
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
- [Alert](#alert) 弹出框
- [Aside](#aside) 侧滑
- [Article](#article) 文章
- [Attribute](#attribute) 键值对
- [Attributes](#attributes) 键值组
- [Badge](#badge) 徽章
- [Button](#button) 按钮
- [Calendar](#calendar) 日历
- [Card](#card) 卡片
- [Carrousel](#carrousel) 轮播
- [Checkbox](#carrousel) 复选框
- [Close](#close) 关闭清除图标
- [Container](#container) page主体
- [Counter](#counter) 计数器
- [Dialog](#dialog) 自定义弹出框
- [Dot](#dot) 小点点
- [Dragrefresh](#dragrefresh) 下拉刷新
- [Dropdown](#dropdown) 菜单下拉
- [Footer](#footer) page底部
- [Grid](#grid) 栅格
- [Group](#group) 分组
- [Handsign](#handsign) 手写签名
- [Header](#header) page头部
- [Icon](#icon) 图标
- [ImgLazy](#imglazy) 懒人加载
- [ImgUploader](#imguploader) 图片上传
- [InputCity](#inputcity) 城市选择
- [InputDate](#inputdate) 日期选择

## Alert
对话框
### 建议
Alert组件更适用于复杂的定制弹框,一般弹框建议直接使用Api直接调用:
* alert框:Bridge.showAlert(msg)代替
* confirm框:Bridge.showConfirm(msg, {onSuccess: fn, onError: fn})代替

详见[Bridge 桥接库](#Bridge-桥接库)

### 属性
```js
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
  onClickCancel={点击取消按钮 func, 默认无, 当有此事件时显示取消按钮}
/>
```

### 示例
```html
<Alert show={this.state.alertShow} iconClassName="icon-rdo-ok" submitCaption="好的，我已知晓" onClickSubmit={this.onSubmitAlert}>提交成功，请线下及时完成支付！</Alert>
```