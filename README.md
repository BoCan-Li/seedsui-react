# 简介
SeedsUI,专为移动设备设计的UI框架,组件全面可换肤,以后将会有react版和vue版、h5版

# 安装
```js
npm install seedsui-react --save
```

# 导入组件

## 静态导入
工程化项目
```js
import 'seedsui-react/build/seedsui.min.css';
import {Chat} from 'seedsui-react';
```
HTML项目
```css
<link rel="stylesheet" href="https://unpkg.com/seedsui-react/build/seedsui.min.css">
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="https://cdn.bootcss.com/react/16.4.0/umd/react.development.js"></script>
<script src="https://cdn.bootcss.com/react-dom/16.4.0/umd/react-dom.development.js"></script>
<script src="https://cdn.bootcss.com/babel-standalone/6.26.0/babel.min.js"></script>
<script src="https://unpkg.com/seedsui-react/build/seedsui-react.min.js"></script>
<script type="text/babel">
  ReactDOM.render(
    <seedsui.Chat>聊天框</seedsui.Chat>,
    document.getElementById('root')
  );
</script>
```
## 动态导入
用于工程化项目,建议使用动态导入, 以节省打包文件体积, 动态导入需要Less环境支持：
```js
npm install less less-loader --save-dev
```
修改 webpack.config.dev.js 和 webpack.config.prod.js 配置文件:<br>
搜索“/\.css”，修改规则为/\.css|.less$/,use -> {loader: require.resolve('less-loader')}

```js
// 导入seedsui基础库
import 'components/seedsui/index.less'; // 需要手动配置,见下节
import 'seedsui-react/lib/PrototypeArray.js';
import 'seedsui-react/lib/PrototypeMath.js';
import 'seedsui-react/lib/PrototypeObject.js';
import 'seedsui-react/lib/PrototypeString.js';
import 'seedsui-react/lib/PrototypeDate.js';
// 导入组件
import Chat from 'seedsui-react/lib/Chat';
```
### index.less手动配置:
#### 1.图标 src/components/seedsui/iconfont.less:<br>
[下载模板](https://unpkg.com/seedsui-react/lib/seedsui-iconfont.less),放入src/components/seedsui/iconfont.less后修改
<br><br>
#### 2.变量 src/components/seedsui/variables.less:<br/>
[下载模板](https://unpkg.com/seedsui-react/lib/seedsui-variables.less),放入src/components/seedsui/variables.less后修改
<br><br>
#### 3.组件 src/components/seedsui/components.less:<br/>
[下载模板](https://unpkg.com/seedsui-react/lib/seedsui-components.less),放入src/components/seedsui/components.less后修改<br>
引入地址修改如:
```less
@import "styles/top/appearance.less";
```
前缀改为../../../node_modules/seedsui-react/lib/
```less
@import "../../../node_modules/seedsui-react/lib/styles/top/appearance.less";
```

#### 三个less汇集 src/components/seedsui/index.less:
```less
// 图标
// @import "../../../node_modules/seedsui-react/lib/seedsui-iconfont.less";
@import "iconfont.less";
// 变量,依赖图标(换肤文件)
// @import "../../../node_modules/seedsui-react/lib/seedsui-variables.less";
@import "variables.less";
// 组件,依赖变量库
// @import "../../../node_modules/seedsui-react/lib/seedsui-components.less";
@import "components.less";
```

# 组件
- [Actionsheet](#actionsheet) 卡片弹框
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

详见[Bridge 桥接库](#bridge) 桥接库

### 属性
```javascript
<Alert
  portal={传送dom object, 默认document.getElementById('root')}
  args={事件参数 any, 如: [1,2, '$event'], '$event'代表点击元素的e}
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
  onClickSubmit={点击确定按钮 func(args), 有此属性才显示确定按钮}

  cancelStyle={取消按钮style object, 默认无}
  cancelClassName={取消按钮className string, 默认无}
  cancelCaption={取消按钮文字 node, 默认'取消'}
  onClickCancel={点击取消按钮 func(args), 默认无, 有此属性才显示取消按钮}
/>
```

### 示例
```javascript
import Alert from 'seedsui-react/lib/Alert';
<Alert
  show={this.state.alertShow}
  iconClassName="icon-图标"
  submitCaption="确定按钮"
  onClickSubmit={this.onSubmitAlert}>
  提交成功，请线下及时完成支付！
</Alert>
```