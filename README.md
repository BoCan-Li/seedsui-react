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

# Component
- [Actionsheet](#actionsheet) 卡片弹框
- [Alert](#alert) 弹出框
- [Article](#article) 文章
- [Attribute](#attribute) 键值对
- [Attributes](#attributes) 键值组
- [Badge](#badge) 徽章
- [BiClock](#biclock) 时钟
- [BiDoughnut](#bidoughnut) 环形图
- [BiGauge](#bigauge) 导航
- [Bridge](#bridge) 桥接
- [Button](#button) 按钮
- [Calendar](#calendar) 日历
- [Card](#card) 卡片
- [Carrousel](#carrousel) 轮播
- [Chat](#chat) 聊天
- [Checkbox](#checkbox) 复选框
- [Close](#close) 关闭清除图标
- [Container](#container) page主体
- [Counter](#counter) 计数器
- [Dialog](#dialog) 自定义弹出框
- [Dot](#dot) 小点点
- [Dragrefresh](#dragrefresh) 下拉刷新
- [Dropdown](#dropdown) 页签菜单
- [Emoji](#emoji) 表情
- [Footer](#footer) page底部
- [Grid](#grid) 栅格
- [Group](#group) 分组
- [Handsign](#handsign) 手写签名
- [Header](#header) page头部
- [Icon](#icon) 图标
- [ImgLazy](#imglazy) 懒人加载
- [ImgUploader](#imguploader) 图片上传
- [IndexBar](#imguploader) 侧边索引栏
- [InputArea](#inputarea) 多行文本框
- [InputCity](#inputcity) 城市选择
- [InputColor](#inputcolor) 颜色选择框
- [InputDate](#inputdate) 日期选择
- [InputLocation](#inputlocation) 定位
- [InputNumber](#inputnumber) 数字输入框
- [InputPassword](#inputpassword) 密码框
- [InputPhone](#inputphone) 手机号码输入框
- [InputPicker](#inputpicker) 滚动选择框
- [InputPre](#inputpre) 自增高输入框
- [InputRange](#inputrange) 范围选择框
- [InputSafe](#inputsafe) 安全强度检验框
- [InputSelect](#inputselect) 选择框
- [InputStar](#inputstar) 评分框
- [InputText](#inputtext) 文本框
- [InputVerify](#inputverify) 验证码文本框
- [InputWaiqin](#inputwaiqin) 外勤原生选择框
- [Verify](#verify) 验证码文本框
- [Jcrop](#jcrop) 图片裁切
- [Legend](#legend) 标题
- [List](#list) 列表
- [ListPull](#listpull) 可推动列表
- [Loading](#loading) 加载中
- [Mark](#mark) 标记
- [Marquee](#marquee) 跑马灯
- [MenuTiled](#menutiled) 平铺弹出菜单
- [MenuTree](#menutree) 侧边树形菜单
- [NoNetwork](#nonetwork) 无网络
- [Notice](#notice) 公告
- [NumBox](#numbox) 数字加减框
- [NumBoxPop](#numboxpop) 数字加减弹出框
- [NumBoxPopPointer](#numboxpoppointer) 数字加减指针
- [OnOff](#onoff) 开关
- [Page](#page) 页面
- [PagePull](#pagepull) 可推动页面
- [Peg](#peg) 小竖条
- [Picker](#picker) 滚动选择弹框
- [PickerCity](#pickercity) 城市选择弹框
- [PickerDate](#pickerdate) 日期选择弹框
- [Popover](#popover) 箭头弹框
- [Price](#price) 价格
- [Progress](#progress) 进度条
- [Radio](#radio) 单选框
- [RouteComment](#routecomment) 评价路由
- [SearchBar](#searchbar) 搜索框
- [SearchBarPointer](#searchbarpointer) 搜索指针
- [SearchBoard](#searchboard) 搜索面板
- [SelectPicker](#selectpicker) 选择弹框
- [Star](#star) 星星
- [Stencil](#stencil) 加载模板
- [Sticker](#sticker) 标签贴
- [Tabbar](#tabbar) 页签
- [Ticket](#ticket) 票券
- [Timeline](#timeline) 时间轴
- [Timepart](#timepart) 时间段
- [Titlebar](#titlebar) 标题栏
- [Toast](#toast) 提示弹框
- [Tree](#tree) 树结构
- [Weather](#weather) 天气

## Actionsheet
[卡片框](#https://unpkg.com/seedsui-react/src/lib/Actionsheet/Actionsheet.js)
### 属性
```javascript
<Actionsheet
  portal={传送dom object, 默认document.getElementById('root')}
  args={事件参数 any, 如: [1,2, '$event'], '$event'代表点击元素的e}
  show={*显隐 bool, 默认false}
  duration={动画时长 number, 默认见seedsui-variables.less}

  list={*按钮项 array, 如: [{caption: string}]}
  onClick={点击项 func(item, index), 有此属性才显示确定按钮}

  maskStyle={遮罩style object, 默认无}
  maskClassName={遮罩className string, 默认无, 基础'mask actionsheet-mask'}
  onClickMask={点击遮罩 func, 默认无}

  style={容器style object, 默认无}
  className={容器className string, 默认无, 基础'actionsheet'}

  groupStyle={组style object, 默认无}
  groupClassName={组className string, 默认无, 基础'actionsheet-group'}

  optionStyle={项style object, 默认无}
  optionClassName={项className string, 默认'border-b', 基础'actionsheet-option'}

  cancelStyle={取消按钮style object, 默认无}
  cancelClassName={取消按钮className string, 默认无, 基础'actionsheet-cancel'}
  cancelCaption={取消按钮文字 node, 默认'取消'}
  onClickCancel={点击取消按钮 func(), 默认无, 有此属性才显示取消按钮}
/>
```
### 示例
```javascript
import Actionsheet from 'seedsui-react/lib/Actionsheet';
onClickActionsheet = (item, index) => {
  console.log(item) // => {caption: '菜单1'}
}
<Actionsheet
  show={this.state.actionsheetShow}
  list={[{caption: '菜单1'}, {caption: '菜单2'}]}
  onClick={this.onClickActionsheet}
  onClickCancel={this.hideActionsheet}
  onClickMask={this.hideActionsheet}/>
```
[返回目录](#component)


## Alert
[对话框](#https://unpkg.com/seedsui-react/src/lib/Alert/Alert.js)
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

  style={容器style object, 默认无}
  className={容器className string, 默认无}

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
  提示内容
</Alert>
```
[返回目录](#component)



## Article
[文章](#https://unpkg.com/seedsui-react/src/lib/Article/Article.js)
### 属性
```javascript
<Article
  caption={标题文字 node, 默认无}
  captionStyle={标题style object, 默认无}
  captionClassName={标题className string, 默认无}

  sndcaption={副标题文字 node, 默认无}
  sndcaptionStyle={副标题style object, 默认无}
  sndcaptionClassName={副标题className string, 默认无}

  paragraphs={段落 array, 如: ['段落1', '段落2']}
  paragraphStyle={段落style object, 默认无}
  paragraphClassName={段落className string, 默认无}
>
  提示内容
</Article>
```
### 示例
```javascript
import Article from 'seedsui-react/lib/Article';
<Article
  caption="标题"
  sndcaption="副标题"
  paragraphs={['段落1', '段落2']}
/>
```
[返回目录](#component)



## Attribute
[属性](#https://unpkg.com/seedsui-react/src/lib/Attribute/Attribute.js)
### 属性
```javascript
<Attribute
  name={标题文字 node, 默认无}
  value={内容文字 node, 默认无}
  required={是否显示'*'号 bool, 默认false}

  showValidValue={value合法时显示 bool, 默认false}
  showValidName={name合法时显示 bool, 默认false}

  className={容器className string[attribute-margin(margin: 10px 12px;) | attribute-padding(padding: 10px 12px;) | align(左右对齐布局) | start(左端对齐) | between(两端对齐)], 默认'attribute-margin', 基础'attribute'}
  style={容器style object, 默认无}

  cellClassName={列className string, 默认无}
  cellStyle={列style object, 默认无}

  nameClassName={name的className string, 默认无, 基础'attribute-left'}
  nameStyle={name的style object, 默认无}
  requiredClassName={'*'号的className string, 默认无, 基础'required required-left'}
  requiredStyle={'*'号的style object, 默认无}
  valueClassName={value的className string, 默认无, 基础'attribute-right'}
  valueStyle={value的style object, 默认无}

  rowAfter={行后DOM node, 默认无}
  onClick={点击项 func(args)}
>
  value下方的DOM node, 默认无
</Attribute>
```
### 示例
```javascript
import Attribute from 'seedsui-react/lib/Attribute';
<Attribute name="收货人:" required="*" className="attribute-padding align border-b" requiredStyle={{left: '-18px'}} nameStyle={{color: '#333'}} style={{padding: '0 12px 0 30px'}}>
  <InputText placeholder="点击输入" valueBindProp value={receive_name} onChange={nameChange}/>
</Attribute>
```
[返回目录](#component)



## Attributes
[属性组合](#https://unpkg.com/seedsui-react/src/lib/Attributes/Attributes.js)
### 属性
```javascript
<Attributes
  showValidValue={value合法时显示 bool, 默认false}
  showValidName={name合法时显示 bool, 默认false}

  list={内容列表 array, 默认[], 格式如下:}
  // [
  //   {
  //     name: string, // 标题文字
  //     value: string, // 内容文字
  //     copy: bool | string, // 复制value的按钮,string时指替换按钮默认的"复制"二字
  //     tel: bool | string, // 打value电话,string时替换默认拨打的电话
  //     price: bool | string, // 显示value金额格式,string时将替换默认显示的金额
  //     priceClassName: string, // 金额className
  //     priceStyle: object, // 金额style
  //     button: bool | string, // value显示成按钮样式,string时则替换按钮中文字
  //     buttonClassName: string, // 按钮className
  //     buttonStyle: object, // 按钮style
  //     buttonClick: func, // 点击按钮,buttonClick(item, index)
  //     show: bool, // 是否显示此行,默认无
  //     mark: string, // 标签
  //     markClassName: string, // 标签className
  //     markStyle: object // 标签style
  //     suffix: node // value后缀
  //     suffixClassName: string,
  //     suffixStyle: object,
  //   }
  // ]
  className={容器className string[attribute-margin(margin: 10px 12px;) | attribute-padding(padding: 10px 12px;) | align(左右对齐布局) | start(左端对齐) | between(两端对齐)], 默认'attribute-margin', 基础'attributes'}
  style={容器style object, 默认无}

  rowClassName={行容器className string[attribute-margin(margin: 10px 12px;) | attribute-padding(padding: 10px 12px;) | align(左右对齐布局) | start(左端对齐) | between(两端对齐)], 默认'attribute-margin', 基础'attribute'}
  rowStyle={行容器style object, 默认无}

  col={列数 string | number, 默认1}
  colClassName={当col为2时列className string, 默认无, 基础'attribute-half'}
  colStyle={当col为2时列style object, 默认无}

  cellClassName={列className string, 默认无}
  cellStyle={列style object, 默认无}

  nameClassName={name的className string, 默认无, 基础'attribute-left'}
  nameStyle={name的style object, 默认无}
  valueClassName={value的className string, 默认无, 基础'attribute-right'}
  valueStyle={value的style object, 默认无}

  rowAfter={行后DOM node, 默认无}
  rowAfterExclude={行后过滤 number, 默认无, 例如最后一行hr不渲染}
  onCopy={拷贝事件 func(text, msg)}
  onClick={点击行 func(item, index, item2?, index2?)}
>
attributes渲染后的DOM
</Attributes>
```
### 示例
```javascript
import Attributes from 'seedsui-react/lib/Attribute';
<Attributes list={list} className="border-b" valueStyle={{marginLeft: '8px'}}>
  <span style={{position: 'absolute', top: '10px', right: '10px'}} className="color-sub">状态</span>
</Attributes>
```
[返回目录](#component)



## Badge
[徽章](#https://unpkg.com/seedsui-react/src/lib/Badge/Badge.js)
### 属性
```javascript
<Badge
  className={容器className string, 默认无, 基础'badge',内容大于两位时会加上'badge-max-width'}
  style={容器style object, 默认无}
  limit={位数限制 number, 默认2, 如:1000,将显示99+}
  ellipsis={位数限制省略号 string, 默认'+'}
  {...others}
/>
```
### 示例
```javascript
import Actionsheet from 'seedsui-react/lib/Actionsheet';

const BadgeStyle = {
  position: 'absolute',
  left: '13px',
  top: '-5px',
};

<Icon className="icon-cart">
  {cartCount > 0 && <Badge style={BadgeStyle}>{cartCount}</Badge>}
</Icon>
```
[返回目录](#component)




## BiClock
[时钟](#https://unpkg.com/seedsui-react/src/lib/BiClock/BiClock.js)
### 属性
```javascript
<BiClock
  lineWidth={边框宽度px number, 默认2}
  size={宽高大小px number, 默认50}
  time={时间 string, 默认'00:00'} // 格式 hh:mm
  className={容器className string, 默认无, 基础'bi-clock'}
  style={容器style object, 默认无}

  duration={动画时长 number, 默认1000}
  delay={延时 number, 默认100}
/>
```
### 示例
```javascript
import BiClock from 'seedsui-react/lib/BiClock';

<BiClock time="11:30"/>
```
[返回目录](#component)



## BiDoughnut
[环形图](#https://unpkg.com/seedsui-react/src/lib/BiDoughnut/BiDoughnut.js)
### 属性
```javascript
<BiDoughnut
  lineWidth={边框宽度px number, 默认3}
  size={宽高大小px number, 默认50}
  duration={动画时长 number, 默认1000}
  rotate={旋转角度 number, 默认0, 最大360}
  delay={延时 number, 默认100}

  className={容器className string, 默认无, 基础'bi-doughtut'}
  captionClassName={标题className string, 默认无, 基础'bi-doughtut-caption'}
  captionStyle={标题style object, 默认无}
>
标题内容
<BiDoughnut>
```
### 示例
```javascript
import BiDoughnut from 'seedsui-react/lib/BiDoughnut';

<BiDoughnut rotate={15} className="success">
  待审批
</BiDoughnut>
<BiDoughnut rotate={45} className="warn">
  准备中
</BiDoughnut>
<BiDoughnut rotate={315} className="submit">
  进行中
</BiDoughnut>
<BiDoughnut rotate={360} className="disabled">
  已结束
</BiDoughnut>
<BiDoughnut rotate={120} className="cancel">
  已取消
</BiDoughnut>
```
[返回目录](#component)




## BiGauge
[仪表盘](#https://unpkg.com/seedsui-react/src/lib/BiGauge/BiGauge.js)
### 属性
```javascript
<BiGauge
  duration={动画时长 number, 默认1000}
  rotate={旋转角度 number, 默认0, 最大270}
  delay={延时 number, 默认100}

  className={容器className string, 默认无, 基础'bi-gauge-box'}
  style={容器style object, 默认无}
  captionClassName={标题className string, 默认无, 基础'bi-gauge-caption'}
  captionStyle={标题style object, 默认无}
>
标题内容
<BiGauge>
```
### 示例
```javascript
import BiGauge from 'seedsui-react/lib/BiGauge';

<BiGauge rotate={15} className="success">
  15
</BiGauge>
```
[返回目录](#component)




## Bridge
[桥接](#https://unpkg.com/seedsui-react/src/lib/Bridge/index.js)
, 现支持四个平台的桥接适配, 浏览器、订货、外勤、微信客户端
### 对象
```javascript
Bridge:{
  platform: 'browser', // 根据不同的环境将返回不同的结果 'browser' | 'dinghuo' | 'waiqin' | 'weixin'
  debug: false, // 在浏览器中,为true时将会启动调试模式,会使用假数据
  config: fn, // Bridge.config(); 在应用初始化时需要执行此方法, 连接桥接
  getAppVersion: fn, // 获取版本信息
  chooseImage: fn({
    count: number,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: fn({sourceType: 'camera | album', errMsg: 'chooseImage:ok', localIds: array}),
    fail: fn({code: number, errMsg: 'chooseImage:fail'})
  }),
  uploadImage: fn({
    success: fn({mediaUrl: string, errMsg: 'uploadImage:ok', serverId: '1237378768e7q8e7r8qwesafdasdfasdfaxss111'}),
  }),
  previewImage: fn({
    urls:'需要预览的图片http链接列表',
    current:'当前显示图片的http链接'
  }),
  getContactMore: fn({ // 外勤客户端专用, 人员插件多选
    selectedIds: '5330457627710680963,5330457627710680963',
    aclType: '0', // 人员权限, 0只能看到下属, 不传或者其他的参数为全部人员, 默认为空串
    onSuccess: fn([{
      "id": "5330457627710680963",
      "name": "张三"
    }])
  }),
  getContact: fn({ // 外勤客户端专用, 人员插件单选
    id: '5330457627710680963',
    aclType: '0', // 人员权限, 0只能看到下属, 不传或者其他的参数为全部人员, 默认为空串
    onSuccess: fn({
      "id": "5330457627710680963",
      "name": "张三"
    })
  }),
  getCustomerMore: fn({ // 外勤客户端专用, 客户插件多选
    selectedIds: '5330457627710680963,5330457627710680963',
    tradeType: '1', // 1:客户 2:经销商 3:门店 空串:全部, 默认为空串
    hiddenAdd: true, // 是否隐藏添加按钮, 默认true
    onSuccess: fn([{
      "check": true,
      "distance": 31,
      "labelType": 0,
      "addr": "南京市建邺区康文路康缘智汇港附近",
      "approval_status": "3",
      "code": "20180403004",
      "cooperate_status": "1",
      "district_id": "",
      "id": "5330457627710680963",
      "lat": "",
      "location": "31.983362,118.73069",
      "lon": "",
      "manager_name": "",
      "name": "20180403003",
      "name_py": "20180403004 20180403004",
      "trade_type": "3",
      "type_id": "",
      "type_image": ""
    }])
  }),
  getCustomer: fn({ // 外勤客户端专用, 客户插件单选
    id: '5330457627710680963',
    tradeType: '1', // 1:客户 2:经销商 3:门店 空串:全部, 默认为空串
    hiddenAdd: true, // 是否隐藏添加按钮, 默认true
    onSuccess: fn({
      "check": true,
      "distance": 31,
      "labelType": 0,
      "addr": "南京市建邺区康文路康缘智汇港附近",
      "approval_status": "3",
      "code": "20180403004",
      "cooperate_status": "1",
      "district_id": "",
      "id": "5330457627710680963",
      "lat": "",
      "location": "31.983362,118.73069",
      "lon": "",
      "manager_name": "",
      "name": "20180403003",
      "name_py": "20180403004 20180403004",
      "trade_type": "3",
      "type_id": "",
      "type_image": ""
    })
  }),
  getCustomerType: fn({ // 外勤客户端专用, 客户插件, 客户类型选择
    id: '5330457627710680963',
    name: '类型1',
    tradeType: '1', // 1:客户 2:经销商 3:门店 其它为客户, 默认为空串
    onSuccess: fn([{
      "id": "5330457627710680963",
      "name": "类型1"
    }])
  }),
  getCustomerArea: fn({ // 外勤客户端专用, 客户插件, 客户区域选择
    id: '5330457627710680963',
    name: '区域1',
    onSuccess: fn([{
      "id": "5330457627710680963",
      "name": "区域1"
    }])
  }),
  getDepartmentMore: fn({ // 外勤客户端专用, 部门插件, 部门多选
    selectedIds: '5330457627710680963,5330457627710680963',
    onSuccess: fn([{
      "id": "5330457627710680963",
      "name": "市场部"
    }])
  }),
  getDepartment: fn({ // 外勤客户端专用, 部门插件, 部门单选
    id: '5330457627710680963',
    name: '市场部',
    onSuccess: fn([{
      "id": "5330457627710680963",
      "name": "市场部"
    }])
  }),
  openWindow: fn( // 打开新窗口
    {
      url: string, // 打开的地址
      title: '', // 外勤客户端专用, 标题, 默认为空串
    },
    fn() // 外勤客户端专用, 打开回调
  ),
  closeWindow: fn( // 关闭窗口, 客户端关闭窗口, 浏览器和微信go(-1)
    fn() // 订货客户端专用, 关闭回调
  ),
  goHome: fn(
    fn() // 外勤客户端专用, 回到首页回调
  )
  isHomePage: fn(
    fn(true | false), // 是否是首页回调
    rule: '地址栏包含的字符串' // 用于判断是不是首页
  ),
  back: fn(), // 返回, 地址栏参数isFromApp: home(调用goHome) | confirm(对话框后go(-1)) | confirm-close(对话框后调用closeWindow) | 1(go(-1))
  addBackPress: fn(), // 绑定返回按键监听back方法
  removeBackPress: fn(), // 移除返回按键监听
  getLocation: fn({ // 定位, 默认为gcj02坐标
    onSuccess: fn({longitude:'118.730515', latitude:'31.982473', speed:'0.0', accuracy:'3.0.0'}),
    onError: fn({code:'locationFail', msg: '定位功能仅可在微信或APP中使用'})
  }),
  getAddress: fn({ // 地址逆解析
    latitude: '',
    longitude: '',
    onSuccess: fn('地址'),
    onError: fn({code: 'addressFail', msg: '获取位置名称失败,请稍后重试'})
  }),
  getDistance: fn({ // 获取两点间的距离,返回km
    point1: {longitude: '', latitude: ''},
    point2: {longitude: '', latitude: ''},
    onError： fn({code: 'distanceFail', msg: '传入的坐标不正确'})
  }),
  getWeather: fn({ // 获得天气
    location: 'lng,lat|lng,lat|lng,lat', // 可以用坐标或者地名, 如:'北京市|上海市', 用|隔开返回结果集
    onSuccess: fn([{
      currentCity: "北京市",
      index: [
        {
          des: "建议着长袖T恤、衬衫加单裤等服装。年老体弱者宜着针织长袖衬衫、马甲和长裤。",
          tipt: "穿衣指数",
          title: "穿衣",
          zs: "舒适"
        }
        ...
      ],
      pm25: "48",
      weather_data: [
        {
          date: "周二 09月25日 (实时：20℃)",
          dayPictureUrl: "http://api.map.baidu.com/images/weather/day/duoyun.png",
          nightPictureUrl: "http://api.map.baidu.com/images/weather/night/duoyun.png",
          temperature: "22 ~ 12℃",
          weather: "多云",
          wind: "南风3-4级"
        },{
          date: "周三",
          dayPictureUrl: "http://api.map.baidu.com/images/weather/day/duoyun.png",
          nightPictureUrl: "http://api.map.baidu.com/images/weather/night/duoyun.png",
          temperature: "24 ~ 14℃",
          weather: "多云",
          wind: "南风微风"
        }
      ]
    }]),
    onFail: fn({code: 'weatherFail', msg: '获取天气失败,请稍后重试'})
  }),
  scanQRCode: fn({
    needResult: 1, // 微信专用, 默认为1，0扫描结果由微信处理，1则直接返回扫描结果
    scanType: ['qrCode', 'barCode'], // 微信专用, 扫码类型
    onSuccess: fn({resultStr: ''}),
    onError: fn({code: 'qrcodeFail', msg: '扫码失败,请退出重试' + res})
  }),
  logOut: fn(), // 外勤和订货客户端专用, 退出到登录页面
  Image: { // 照片选择上传
    onChooseSuccess: fn ({ // 选择完成, 出参为imgMap
      localId: {
        serverId: '',
        sourceType: 'camera | album',
        name: '', // 外勤客户端专用
        base64: '', // 外勤客户端专用
        src: '' //外勤客户端专用, 本地地址
      }
    }),
    onUploadSuccess:fn(imgMap,res) // 微信专用, 单张上传成功
    onUploadFail:fn(index, item) // 微信专用, 单张上传失败
    onUploadsSuccess:fn(imgMap) // 微信专用, 全部上传成功
  },
  logger: fn(el), // 打印日志, el监听触发的元素, 点击十次显示, 用DB.setSession('app_logger', '')设置日志
  tel: fn('13800000000'), // 打电话
  showToast: fn('消息内容', {
    mask: true, // true下层事件会被阻止,false则不阻止
    position: 'middle', // 弹框位置, top | middle | bottom
    icon: 'icon-xx', // 图标class名称
    delay: 2000, // 延时关闭
    onSuccess: fn() // 完成关闭时回调
  }),
  showLoading: fn({ // 弹出loading
    type: 'floating流光 | filling填料环 | custom自定义',
    css: '', // 设置mask的css
    icon: 'icon-xx', // 自定义loading时,图标class名称
    mask: true, // true下层事件会被阻止,false则不阻止
  }),
  hideLoading: fn() // 隐藏loading
  showAlert: fn('消息内容', {
    caption: '', // 标题, 默认为空串
    onSuccess: fn({hide: fn()}) // 点击确定时回调, 默认为隐藏弹出框
  }),
  showConfirm: fn('消息内容', {
    caption: '', // 标题, 默认为空串
    onSuccess: fn({hide: fn()}), // 点击确定时回调
    onError: fn() // 点击取消时回调, 默认为隐藏弹出框
  })
}
```
### 示例
```javascript
import Bridge from 'seedsui-react/lib/Bridge';

Bridge.showToast('提交成功', {
  mask: true,
  onSuccess: () => {
    history.go(-1);
  }
});
```
[返回目录](#component)




## Button
[按钮](#https://unpkg.com/seedsui-react/src/lib/Button/Button.js)
### 属性
```javascript
<Button
  args={事件参数 any, 如: [1,2, '$event'], '$event'代表点击元素的e}
  style={按钮style object, 默认无}
  className={按钮className string, 默认无, 基础'button'} // 尺寸样式'sm | lg | xl'
  disabled={是否禁用 bool, 默认false}
  onClick={点击项 func(args)}
  {...others}
>
  按钮内容
</Button>
```
### 示例
```javascript
import Button from 'seedsui-react/lib/Button';

<Button className="lg">提交</Button>
```
[返回目录](#component)




## Calendar
[日历](#https://unpkg.com/seedsui-react/src/lib/Calendar/Calendar.js)
### 属性
```javascript
<Calendar
  type={日历类型 string, 默认'month'} // week|month
  showTitleDay={是否显示周几 bool, 默认true}
  showTitleWeek={是否显示周数 bool, 默认false}
  disableBeforeDate={禁用此前日期 date, 默认无}
  disableAfterDate={禁用此后日期 date, 默认无}
  verticalDrag={是否允许垂直拖动 bool, 默认true}
  defaultDate={默认选中日期 date, 默认new Date()}
  prevHTML={左箭头html string, 默认'&lt'}
  nextHTML={右箭头html string, 默认'&gt'}
  onChange={选中日期发生变化 func(date)}
  onClick={点击 func(date)}
  onError={非法操作,如选择禁用日期 func(date)}
/>
```
### 示例
```javascript
import Calendar from 'seedsui-react/lib/Calendar';

onChangeCalendar = (date) => {
  console.log(date)
}
onClickCalendar = (date) => {
  console.log(date)
}

<Calendar onChange={this.onChangeCalendar} onClick={this.onClickCalendar}/>
```
[返回目录](#component)




## Card
[卡片](#https://unpkg.com/seedsui-react/src/lib/Card/Card.js)
### 属性
```javascript
<Card
  style={卡片style object, 默认无}
  className={卡片className string, 默认无, 基础'card'}
  onClick={点击项 func(args)}
  {...others}
>
卡片内容
</Card>
```
### 示例
```javascript
import Card from 'seedsui-react/lib/Card';

<Card>
卡片内容
</Card>
```
[返回目录](#component)




## Carrousel
[轮播](#https://unpkg.com/seedsui-react/src/lib/Carrousel/Carrousel.js)
### 属性
```javascript
<Carrousel
  style={容器style object, 默认无}
  classNameclassName={容器className string, 默认无, 基础'carrousel-container'}
  slideStyle={单块style object, 默认无}
  slideClassName={单块className string, 默认无, 基础'carrousel-slide'}
  stopPropagation={是否阻止点击事件的传播 bool, 默认true} // 当touch事件与fastclick插件冲突时可设为false
  loop={是否循环显示 bool, 默认false}
  activeIndex={默认选中第几块 number, 默认0}
  pagination={是否显示小点点 bool, 默认false}
  autoplay={自动播放毫秒数 number, 默认0} // 设置大于0的数值才会触发自动播放
  slidesPerView={一屏显示几块 number, 默认1}
  defaultSrc={默认图片 string, 默认'//res.waiqin365.com/d/seedsui/carrousel/default.png'}
  list={轮播图 array, 默认无} // 格式: [{bg: 'xx', img: 'xx', iconClassName: 'xx', caption: 'xx'}]
  speed={动画过渡的速度 number, 默认300}
  enableOnChange={手动调用slideTo方法是否触发onChange事件回调 bool, 默认true}
  onChange={轮播时事件回调 func()}
  onClick={点击块 func(item, index, s, e)}
>
<div>轮播页时, 用此div, 轮播图则使用list属性</div>
</Carrousel>
```
### 示例
```javascript
import Calendar from 'seedsui-react/lib/Calendar';
// 轮播页
onCarrouselChange = (e) => {
  this.props.changeActiveTab(e.activeIndex);
  if (e.activeIndex === 1) { // 加载第二页内容
    if (!this.sndLoaded) {
      this.loadSnd(false);
      this.sndLoaded = true;
    }
  }
}
<Carrousel style={{top: '84px'}} onChange={this.onCarrouselChange} activeIndex={this.props.tabActiveIndex}>
  <Page>第一页</Page>
  <Page>第二页</Page>
</Carrousel>
// 轮播图
<Carrousel list={imgsList} style={{height: document.getElementById('root').clientWidth + 'px'}} pagination loop/>
```
[返回目录](#component)




## Chat
[聊天框](#https://unpkg.com/seedsui-react/src/lib/Chat/Chat.js)
### 属性
```javascript
<Chat
  args={事件参数 any, 如: [1,2, '$event'], '$event'代表点击元素的e}
  style={容器style object, 默认无}
  className={容器className string, 默认无, 基础'chat'}
  onClick={点击聊天框 func()}

  showAvatar={是否显示照片 bool, 默认false}
  avatarClassName={照片className string, 默认'chat-avatar'}
  avatarStyle={照片style object, 默认无}
  avatarSrc={照片src string, 默认无}
  avatarAfter={照片后元素 node, 默认无}
  onClickAvatar={点击照片 func()}

  author={用户名称 string, 默认无}
  authorClassName={用户名称className string, 默认无, 基础'chat-author'}
  authorStyle={用户名称style object, 默认无}

  contentClassName={内容className string, 默认无, 基础'chat-content'}
  contentStyle={内容style object, 默认无}
  onClickContent={点击内容 func()}
>
内容
</Chat>
```
### 示例
```javascript
import Chat from 'seedsui-react/lib/Chat';

<Chat>
内容
</Chat>
```
[返回目录](#component)




## Checkbox
[复选框](https://unpkg.com/seedsui-react/src/lib/Checkbox/Checkbox.js)
### 属性
```javascript
<Checkbox
  args={事件参数 any, 如: [1,2, '$event'], '$event'代表点击元素的e}
  style={容器style object, 默认无}
  className={容器className string, 默认无, 基础'checkbox-box'}
  onClick={点击复选框 func(checked, args)}

  name={复选框name string, 默认无}
  value={复选框value string, 默认无}
  checked={是否选中 bool, 默认false}
  disabled={是否禁用 bool, 默认false}

  caption={复选框标题 string, 默认无}
  captionClassName={复选框标题className string, 默认无, 基础'checkbox-caption'}
  captionStyle={复选框标题style object, 默认无}
/>
```
### 示例
```javascript
import Checkbox from 'seedsui-react/lib/Checkbox';

onClick = (checked) => {
  this.props.checkChange(!checked)
}

const {checked} = this.props;
<Checkbox caption="全选" checked={checked} onClick={this.onClick}/>
```
[返回目录](#component)




## Close
[关闭删除图标](#https://unpkg.com/seedsui-react/src/lib/Close/Close.js)
### 属性
```javascript
<Close
  style={图标style object, 默认无}
  className={图标className string, 默认'close-icon close-icon-clear size18', 基础'icon'}
  {...others}
/>
```
### 示例
```javascript
import Close from 'seedsui-react/lib/Close';

<Close onClick={this.onClear} className="cancel"/>
```
[返回目录](#component)




## Container
[主体内容](#https://unpkg.com/seedsui-react/src/lib/Container/Container.js)
, 通常与Page、Header一起使用, 位于Header下面的位置
### 属性
```javascript
<Container
  style={容器style object, 默认无}
  className={容器className string, 默认无, 基础'container'}
  lazyLoad={是否启用懒人加载 bool, 默认false} // 只会在didMount时执行lazyLoadInstance.load();
  // 异步加载时需要使用:
  // ref="$container" 和 ref={(el) => {this.$container = el;}}, this.refs.$container === this.$container
  // this.refs.$container.state.lazyLoadInstance.load();或this.$container.state.lazyLoadInstance.load();
  
  {...others}
>
主体内容
</Container>
```
### 示例
```javascript
import Page from 'seedsui-react/lib/Page';
import Header from 'seedsui-react/lib/Header';
import Container from 'seedsui-react/lib/Container';

<Page>
  <Header>
    头部
  </Header>
  <Container>
    中部
  </Container>
</Page>
```
[返回目录](#component)




## Counter
[计数器](#https://unpkg.com/seedsui-react/src/lib/Counter/Counter.js)
### 属性
```javascript
<Counter
  style={容器style object, 默认无}
  className={容器className string, 默认无, 基础'container'}
  duration={动画时长 number, 默认5000}
  from={开始数字 number, 默认0}
  to={结束数字 number, 默认10}
  suffix={数字不变的后缀 string, 默认无} // 如设置为/10, 则显示为0/10
  autoplay={是否自动播放 bool, 默认true}
  {...others}
/>
```
### ref方法
```javascript
play() // 播放
```
### 示例
```javascript
import Counter from 'seedsui-react/lib/Counter';

onClick = () => {
  this.refs.$counter.play();
}

<Counter to={500} autoplay={false} ref="$counter"/>
```
[返回目录](#component)




## Dialog
[弹出框](#https://unpkg.com/seedsui-react/src/lib/Dialog/Dialog.js)
### 属性
```javascript
<Dialog
  portal={传送dom object, 默认document.getElementById('root')}
  args={事件参数 any, 如: [1,2, '$event'], '$event'代表点击元素的e}
  show={*显隐 bool, 默认false}

  animation={动画 string, 默认'fade'}  // slideLeft | slideRight | slideUp | slideDown | zoom | fade
  duration={动画时长 number, 默认见seedsui-variable.less}
  isClickMaskHide={是否点击遮罩隐藏 bool, 默认true}
  onClickMask={点击遮罩 func(s)}
  onShowed={显示完成 func(s)}
  onHid={隐藏完成 func(s)}

  maskClassName={遮罩className string, 默认无, 基础'mask dialog-mask'}
  maskStyle={遮罩style object, 默认无}

  className={容器className string, 默认无, 基础'container'}
  style={容器style object, 默认无}
>
</Dialog>
```
### 示例
```javascript
import Dialog from 'seedsui-react/lib/Dialog';

<Dialog show={this.state.showDialog} animation="zoom" duration={200} style={{width: '80%', height: '80%', backgroundColor: 'white', borderRadius: '10px'}}>
弹出框内容
</Dialog>
```
[返回目录](#component)




## Dot
[小圆点](#https://unpkg.com/seedsui-react/src/lib/Dot/Dot.js)
### 属性
```javascript
<Dot
  style={图标style object, 默认无}
  className={图标className string, 默认无, 基础'dot'}
  size={宽高大小px number, 默认无}
  {...others}
/>
```
### 示例
```javascript
import Dot from 'seedsui-react/lib/Dot';

<Dot size={8}/>
```
[返回目录](#component)




## Dragrefresh
[下拉刷新](#https://unpkg.com/seedsui-react/src/lib/Dragrefresh/Dragrefresh.js)
### 属性
```javascript
<Dragrefresh
  style={容器style object, 默认无}
  className={容器className string, 默认无, 基础'dot'}
  onTopRefresh={头部刷新 func(s)}
  onTopComplete={头部刷新完成 func(s)}
  onBottomRefresh={底部刷新 func(s)}
  onBottomComplete={底部刷新完成 func(s)}
  hasMore={状态标识 string, 默认-2} // 1头部完成 | 2底部完成 | 0没有更多数据 | -1网络错误 | 404找不到数据 | -2空闲但展现底部转圈 | -3空闲但不展现底部转圈

  showNoData={是否允许暂无数据 bool, 默认false}
  noDataClassName={暂无数据容器className string, 默认无}
  noDataStyle={暂无数据容器style object, 默认无}
  noDataCaption={暂无数据标题 string, 默认'暂无数据'}
  noDataIconSrc={暂无数据图标src string, 默认无}
  noDataIconClassName={暂无数据图标className string, 默认'notice-icon-nodata'}
  noDataOnClick={点击暂无数据 func(e)}

  lazyLoad={是否启用懒人加载 bool, 默认false} // 每当didUpdate时会执行lazyLoadInstance.load();

  onScroll={滚动事件 func(e)}
>
内容
</Dragrefresh>
```
### 示例
```javascript
import Dragrefresh from 'seedsui-react/lib/Dragrefresh';

// 下拉刷新配置
onTopRefresh = () => {
  console.log('头部刷新');
  this.loadData(false);
}
onBottomRefresh = () => {
  console.log('底部刷新');
  this.loadData(true);
}
loadData = (isNext) => {
  // 分页
  let page = this.props.page;
  if (isNext) {
    page++;
  } else {
    page = 1;
  }
  const params = {
    page,
    rows: this.props.rows
  };
  // 获得数据
  this.props.getList(params).then((result) => {
    if (result.code !== '1') {
      Bridge.showToast(result.message, {mask: false});
    }
  }).catch((err) => {
    Bridge.showToast('请求错误，请稍后再试', {mask: false});
  });
}

<Dragrefresh ref={(el) => {this.$elDrag = el;}} hasMore={this.props.hasMore} onTopRefresh={this.onTopRefresh} onBottomRefresh={this.onBottomRefresh}>
内容内容
</Dragrefresh>
```
[返回目录](#component)




## Dropdown
[下拉菜单](#https://unpkg.com/seedsui-react/src/lib/Dropdown/Dropdown.js)
### 属性
```javascript
<Dropdown
  portal={弹出框传送至dom object, 默认document.getElementById('root')}
  top={头部距离 number, 默认0}
  disabled={是否禁用 bool, 默认false}
  onChange={选中菜单发生变化 func([{id: '', caption: ''}])}
  list={菜单 array, 默认无} // 格式:[{id: '', caption: '分类', data: [{id: '1',caption: '测试数据1',children:[]}]}]
/>
```
### 示例
```javascript
import Dropdown from 'seedsui-react/lib/Dropdown';

onChangeDropdown = (items) => {
  if (this.props.onChange) this.props.onChange(items)
}
const dropdownList = [
  {
    id: '', caption: '加载中...'
  }, {
    id: '', caption: '加载中...'
  }, {
    id: '', caption: '加载中...'
  }
]
<Dropdown portal={this.state.$page} list={dropdownList} onChange={this.onChangeDropdown}/>
```
[返回目录](#component)




## Emoji
[表情弹出输入框](#https://unpkg.com/seedsui-react/src/lib/Emoji/Emoji.js)
### 属性
```javascript
<Emoji
  portal={弹出框传送至dom object, 默认document.getElementById('root')}
  args={事件参数 any, 如: [1,2, '$event'], '$event'代表点击元素的e}
  show={*显隐 bool, 默认false}

  value={值 string, 默认''}
  placeholder={占位文字 string, 默认''}

  isClickMaskHide={是否点击遮罩隐藏 bool, 默认true}
  onClickMask={点击遮罩 func(s)}

  maskStyle={遮罩style object, 默认无}
  maskClassName={遮罩className string, 默认无, 基础'mask emoji-mask'}

  style={容器style object, 默认无}
  className={容器className string, 默认无, 基础'emoji'}

  onChange={值变化 func(value, args)}
  onSubmit={提交 func(value, args)}
/>
```
### 示例
```javascript
import Emoji from 'seedsui-react/lib/Emoji';

<Emoji show={this.state.showEmoji}/>
```
[返回目录](#component)




## Footer
[底部内容](#https://unpkg.com/seedsui-react/src/lib/Footer/Footer.js)
, 通常与Page、Header、Container一起使用
### 属性
```javascript
<Footer
  style={容器style object, 默认无}
  className={容器className string, 默认无, 基础'container'}
  {...others}
>
底部内容
</Footer>
```
### 示例
```javascript
import Page from 'seedsui-react/lib/Page';
import Header from 'seedsui-react/lib/Header';
import Footer from 'seedsui-react/lib/Footer';
import Container from 'seedsui-react/lib/Container';

<Page>
  <Header>
    头部
  </Header>
  <Container>
    中部
  </Container>
  <Footer>
    底部
  </Footer>
</Page>
```
[返回目录](#component)




## Grid
[栅格](#https://unpkg.com/seedsui-react/src/lib/Grid/Grid.js)
### 属性
```javascript
<Grid
  args={事件参数 any, 如: [1,2, '$event'], '$event'代表点击元素的e}
  type={类型 string, 默认无} // video和空
  preview={是否预览 bool, 默认true}
  lazyLoad={是否启用懒人加载 bool, 默认false}
  className={容器className string, 默认无, 基础'grid'}
  style={容器style object, 默认无}
  space={上下间距 number, 默认12}
  wing={左右间距 number, 默认12}
  col={一行列数 string | number, 默认3}
  showUpload={是否显示上传按钮 bool, 默认false}
  list={单元格 array, 默认[], 格式见下方示例}
  /* list: [{
    type: '',
    iconClassName: '',
    iconStyle: {},
    iconSrc: '',
    type: 'video | image(默认)',
    preview: true | false, // 是否支持预览,默认true
    thumb: '', // 缩略图
    src: '', // 预览地址
    caption: '',
    onClick: function() {},
    iconBadgeCaption: ''
  }] */
  cellClassName={单元格className string, 默认无, 基础'grid-cell'}
  cellStyle={单元格style object, 默认无}

  caption={标题文字 node, 默认无}
  captionStyle={标题style object, 默认无}
  captionClassName={标题className string, 默认无}

  sndcaption={副标题文字 node, 默认无}
  sndcaptionStyle={副标题style object, 默认无}
  sndcaptionClassName={副标题className string, 默认无}

  iconBoxStyle={图标容器style object, 默认无}
  iconBoxClassName={图标容器className string, 默认无, 基础'grid-iconbox'}

  iconClassName={图标className string, 默认无}
  iconStyle={图标style object, 默认无}
  iconDefaultImgClassName={懒人加载默认图标className string, 默认无}
  iconDefaultImgStyle={懒人加载默认图标style object, 默认无}

  iconBadgeClassName={徽章className string, 默认无}

  onClickCell={点击单元格 func(item, index, args)}
  onClickContent={点击图标容器 func(item, index, args)}
  onClickIcon={点击图标 func(item, index, args)}

  closeClassName={删除图标className string, 默认无}
  onClickDelete={点击删除 func(item, index, args)}

  onClickAdd={点击添加 func()}
>
<!-- 直接放子元素，grid将自动排列 -->
<div>菜单按钮1</div>
<div>菜单按钮2</div>
</Grid>
```
### 示例
```javascript
import Grid from 'seedsui-react/lib/Grid';
const products = [
  {
    id: '1',
    iconSrc: 'http://image-test.waiqin365.com/8100630123350000887/bas_pd/201801/5066464767803150144.jpg?x-oss-process=style/zk320',
    caption: '冰红茶',
    sndcaption: '￥100.00'
  }
];
<Grid
  list={products}
  args={combine.ptype}
  onClickIcon={onClick}
  lazyLoad
  col="3"
  className="grid-bordered"
  space={15}
  iconBoxClassName="size100"
  iconClassName="size100"
  captionClassName="text-left nowrap2"
  captionStyle={{height: '38px', lineHeight: '20px', width: '100px'}}
  sndcaptionClassName="text-left nowrap"
  sndcaptionStyle={{height: '18px', width: '100px'}}
/>
```
[返回目录](#component)





## Group
[分组](#https://unpkg.com/seedsui-react/src/lib/Group/Group.js)
### 属性
```javascript
<Group
  style={卡片style object, 默认无}
  className={卡片className string, 默认'border-tb', 基础'group'}
  onClick={点击 func(args)}
  {...others}
>
分组
</Group>
```
### 示例
```javascript
import Group from 'seedsui-react/lib/Group';

<Group>
分组
</Group>
```


## Handsign
[签名](#https://unpkg.com/seedsui-react/src/lib/Handsign/Handsign.js)
### 属性
```javascript
<Handsign
  strokeStyle={签名颜色 string, 默认'#000'}
  lineWidth={签名线粗px number, 默认3}
  quality={存储时的图片质量 number, 默认0.92}
  width={宽度px number, 默认300} // 不能通过style设置宽度,否则canvas会错位
  height={高度px number, 默认300} // 不能通过style设置高度,否则canvas会错位
  style={签名面板style object, 默认无}
  className={签名面板className string, 默认无}
/>
```
### 示例
```javascript
import Handsign from 'seedsui-react/lib/Handsign';

save = () => {
  const sign_pic = this.$handsign.state.instance.save();
  if (!sign_pic) {
    Bridge.showToast('请先签名!', {mask: false})
    return;
  }
}

<Handsign ref={(el) => {this.$handsign = el;}} width={window.innerWidth} strokeStyle="#c72a1d" height={window.innerHeight - 88} style={{marginTop: '44px'}}/>
```
[返回目录](#component)




## Header
[头部内容](#https://unpkg.com/seedsui-react/src/lib/Header/Header.js)
, 通常与Page、Container一起使用
### 属性
```javascript
<Header
  style={容器style object, 默认无}
  className={容器className string, 默认无, 基础'container'}
  {...others}
>
头部内容
</Header>
```
### 示例
```javascript
import Page from 'seedsui-react/lib/Page';
import Header from 'seedsui-react/lib/Header';
import Footer from 'seedsui-react/lib/Footer';
import Container from 'seedsui-react/lib/Container';

<Page>
  <Header>
    头部
  </Header>
  <Container>
    中部
  </Container>
  <Footer>
    底部
  </Footer>
</Page>
```
[返回目录](#component)




## Icon
[图标](#https://unpkg.com/seedsui-react/src/lib/Icon/Icon.js)
### 属性
```javascript
<Icon
  base={基础标签 string, 默认'icon'}
  // img: 返回<span><img class="icon-img"/></span>
  // pureImg: 返回<img class="icon-img"/>
  // icon: 返回<span><i class="icon-full"/></span>
  // pureIcon: 返回<i class="icon-full"/>
  baseClassName={基础className string, 默认无, 基础'icon'}
  className={图标className string, 默认无}
  style={图标style object, 默认无}
  lazyLoad={是否启用懒人加载 bool, 默认false}

  defaultImgClassName={懒人加载默认图标className string, 默认无, 基础icon时'icon-full', img时'icon-img'}
  defaultImgStyle={懒人加载默认图标style object, 默认无}
  src={图标地址 string, 默认无}

  badgeCaption={角标标题 number | string, 默认无}
  badgeClassName={角标className string, 默认无}
  badgeStyle={角标style object, 默认无}
  badgeLimit={角标位数限制 number, 默认2, 如:1000,将显示99+}
  badgeEllipsis={角标位数限制省略号 string, 默认'+'}
  
  onClickClose={点击删除 func(e)}
  closeClassName={关闭className string, 默认无}
  closeStyle={关闭style object, 默认无}
>
图标内容
</Icon>
```
### 示例
```javascript
import Icon from 'seedsui-react/lib/Icon';

<Icon className="icon-edit size20"/>
```
[返回目录](#component)




## ImgLazy
[懒人加载](#https://unpkg.com/seedsui-react/src/lib/ImgLazy/ImgLazy.js)
, 主要为了解决图片过多, 造成网络阻塞的问题, 一般采用的是滚动加载, 并在页面加载完成后, 执行滚动加载方法load()
### 对象实例
```javascript
var imglazy = new ImgLazy({
  overflowContainer: el, // 滚动区域, 滚动加载时需要用到, 默认document.body
  load: 'scroll', // scroll 滚动加载 | queue 队列加载 | all 全部加载
  threshold: 300, // 滚动加载时, 上下扩展px加载
  loadAttr: 'data-load-src', // 加载地址
  errorAttr: 'data-error-src', // 错误地址
  completeAttr: 'data-complete' // 完成加载, data-complete=0代表加载错误, =1代码加载正确
});
```
### 对象方法
```javascript
load(); // 加载图片, load为scroll时加载可见区域, queue时队列加载完所有图片, all时加载所有图片
```
### 示例
```javascript
import ImgLazy from 'seedsui-react/lib/ImgLazy';

// 懒人加载
this.setState({
  lazy: new ImgLazy({
    overflowContainer: this.$elDrag.$el
  })
});

// 在页面加载完成的时候
this.state.lazy.load();
```
[返回目录](#component)




## ImgUploader
[图片上传](#https://unpkg.com/seedsui-react/src/lib/ImgUploader/ImgUploader.js)
### 属性
```javascript
<ImgUploader
  className={容器className string, 默认无}
  style={容器style object, 默认无}

  caption={标题文字 node, 默认无}
  captionStyle={标题style object, 默认无}
  captionClassName={标题className string, 默认无}
  list={内容列表 array, 默认[], 格式如下:}
  // [{
  //   id: '',
  //   src: '',
  //   thumb: ''
  // }]
  enableSafe={是否启动安全模式 object, 默认无} // 安全模式, 指一次传一张
  max={最大选择数 number, 默认5}
  sourceType={上传类型 array, 默认['album', 'camera']}
  sizeType={压缩 array, 默认['compressed']} // ['original', 'compressed']

  showUpload={是否显示上传按钮 bool, 默认false}
  showDelete={是否显示删除按钮 bool, 默认false}
  readOnly={是否只读 bool, 默认false}

  showCount={标题是否显示上传个数 bool, 默认false}
  watermark={增加水印 object, 默认无, 格式如下:} // 订货和外勤客户端专用
  /* 订货: {
    orderNo: 'xx', // 编号
    submitName: 'xx', // 提交人
    customerName: 'xx', // 客户
    cmLocation: '118.730515, 31.982473', // 位置算偏差
    isWaterMark: '1', // 是否启用水印
  } */
  /* 外勤: {
    photoType: 'xx', // 水印名称
    customerName: 'xx', // 客户名
  } */
   
  onChange={照片发生变化 func(list, {op: 'chooseSuccess|uploadsSuccess|deleteSuccess'})}
  onChooseSuccess={照片选择完成 func(list)}
  onUploadsSuccess={照片上传完成 func(list)}
  onDeleteSuccess={照片删除完成 func(list)}
/>
```
### 示例
```javascript
import ImgUploader from 'seedsui-react/lib/ImgUploader';

const list = [
  {
    id: '',
    src: '',
    thumb: ''
  }
];

<ImgUploader caption="上传照片" showUpload list={list} onChange={onChangeImg}/>
```
[返回目录](#component)




## IndexBar
[索引栏](#https://unpkg.com/seedsui-react/src/lib/IndexBar/IndexBar.js)
, IndexBar组件默认fixed定位, 并在父组件中寻找data-indexbar-name属性的元素, 与indexs对应, 滑动或点击切换时, 修改父组件的scrollTop, 以达到滚动的效果
### 属性
```javascript
<IndexBar
  className={索引栏className string, 默认无, 基础'indexbar'}
  style={索引栏style object, 默认无}
  // indexs与父组件中所有data-indexbar-name元素对应即可
  indexs={索引集合 array, 默认['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'G', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']}
/>
```
### 示例
```javascript
import Container from 'seedsui-react/lib/Container';
import IndexBar from 'seedsui-react/lib/IndexBar';
<Container>
  <ul>
    <li data-indexbar-name="A">A</li>
    <li>阿华</li>
    <li>阿敏</li>
    <li>阿全</li>
    <li>阿达</li>
    <li data-indexbar-name="B">B</li>
    <li>白起</li>
    <li>白旭</li>
    <li>冰冰</li>
    <li data-indexbar-name="C">C</li>
    <li>曹操</li>
    <li>曹鸣</li>
    <li>曹捷</li>
    <li>陈真</li>
    <li>陈进</li>
    <li>陈明</li>
    <li>陈伟</li>
    <li>陈文</li>
    <li>陈晓</li>
    <li>陈娟</li>
    <li>成勇</li>
    <li>成婷</li>
    <li>成龙</li>
    <li data-indexbar-name="D">D</li>
    <li>大成子</li>
    <li>大舅子</li>
    <li>戴笠</li>
    <li>戴坤</li>
    <li>戴成虎</li>
    <li>邓小平</li>
    <li>邓稼先</li>
    <li>邓文迪</li>
    <li>邓等</li>
    <li>狄仁杰</li>
    <li>狄弟</li>
    <li>董文华</li>
    <li>董事</li>
    <li data-indexbar-name="F">F</li>
    <li>樊哙</li>
    <li>樊心</li>
    <li>冯晨晨</li>
    <li>冯敬尧</li>
    <li>冯成虎</li>
    <li>冯小平</li>
    <li>冯稼先</li>
    <li>冯文迪</li>
    <li>冯晨</li>
    <li>福尔杰</li>
    <li>福尔康</li>
    <li>福文华</li>
    <li>方文山</li>
  </ul>
  <IndexBar style={{top: '44px'}}/>
</Container>
```
[返回目录](#component)




## IndexArea
[多行文本框](#https://unpkg.com/seedsui-react/src/lib/IndexArea/IndexArea.js)
, 默认高度见seedsui-variable.less中@input-area-height, 其它属性用法与[InputText 文本框](#inputtext) 组件一致

## InputCity
[城市选择框](#https://unpkg.com/seedsui-react/src/lib/InputCity/InputCity.js)
, 其它属性用法与[InputText 文本框](#inputtext) 组件一致, 基于[PickerCity 城市选择弹框](#pickercity)组件
### 属性
```javascript
<InputCity
  type={城市类型 string, 默认'area'} // 'area' | 'city'
  split={分隔符 string, 默认'-'}
  pickerClassName={弹出框className string, 默认无}
  pickerStyle={弹出框style object, 默认无}
  onChange={值改变 func(value, option, args), 默认无}
  {...others}
/>
```
[返回目录](#component)



## InputColor
[颜色选择框](#https://unpkg.com/seedsui-react/src/lib/InputColor/InputColor.js)
, 其它属性用法与[InputText 文本框](#inputtext) 组件一致

## InputDate
[日期选择框](#https://unpkg.com/seedsui-react/src/lib/InputDate/InputDate.js)
, 其它属性用法与[InputText 文本框](#inputtext) 组件一致, 基于[PickerDate 日期选择弹框](#pickerdate)组件
### 属性
```javascript
<InputDate
  type={日期类型 string, 默认'date'} // 'date | month | time | datetime'
  split={分隔符 string, 默认'-'}
  pickerClassName={弹出框className string, 默认无}
  pickerStyle={弹出框style object, 默认无}
  onChange={值改变 func(value, option, args), 默认无}
  onError={错误 func({msg: ''}), 默认无}
  {...others}
/>
```



## InputLocation
[定位框](#https://unpkg.com/seedsui-react/src/lib/InputLocation/InputLocation.js)
, 其它属性用法与[InputText 文本框](#inputtext) 组件一致
### 属性
```javascript
<InputLocation
  locationingText={定位中显示文字 string, 默认'定位中...'}
  onClick={点击 func(value, args), 默认无}
  onChange={值改变 func(value, args), 默认无}
  {...others}
/>
```


## InputNumber
[数字输入框](#https://unpkg.com/seedsui-react/src/lib/InputNumber/InputNumber.js)
, 其它属性用法与[InputText 文本框](#inputtext) 组件一致

## InputPassword
[密码输入框](#https://unpkg.com/seedsui-react/src/lib/InputPassword/InputPassword.js)
, 其它属性用法与[InputText 文本框](#inputtext) 组件一致

## InputPhone
[手机输入框](#https://unpkg.com/seedsui-react/src/lib/InputPhone/InputPhone.js)
, 其它属性用法与[InputText 文本框](#inputtext) 组件一致


## InputPicker
[选择框](#https://unpkg.com/seedsui-react/src/lib/InputPicker/InputPicker.js)
, 其它属性用法与[InputText 文本框](#inputtext) 组件一致, 基于[Picker 滚动选择弹框](#picker)组件
### 属性
```javascript
<InputPicker
  pickerClassName={弹出框className string, 默认无}
  pickerStyle={弹出框style object, 默认无}
  valueForKey={选中key number | string, 默认无}
  list={选择列表 array, 默认无}
  onChange={值改变 func(value, option, args), 默认无}
/>
```
### 示例
```javascript
import InputPicker from 'seedsui-react/lib/InputPicker';

const list = [
  {
    key: '1',
    value: '111'
  },
  {
    key: '2',
    value: '222'
  },
  {
    key: '3',
    value: '333'
  }
];

onChangePicker = (value, option, args) => {
  console.log(value, option, args);
}

<InputPicker value="222" list={list} onChange={this.onChangePicker}/>
```
[返回目录](#component)



## InputPre
[自增高输入框](#https://unpkg.com/seedsui-react/src/lib/InputPre/InputPre.js)
, 其它属性用法与[InputText 文本框](#inputtext) 组件一致


## InputRange
范围选择框
### 属性
```javascript
<InputRange
  args={事件参数 any, 如: [1,2, '$event'], '$event'代表点击元素的e}
  style={容器style object, 默认无}
  className={容器className string, 默认无}
  value={值 string | number, 默认'0'}
  min={最小值 string | number, 默认'0'}
  max={最小值 string | number, 默认'100'}
  step={步进值 string | number, 默认'1'}
  disabled={是否禁用 bool, 默认false}
  onChange={值改变 func(value, args), 默认无}
/>
```
### 示例
```javascript
import InputRange from 'seedsui-react/lib/InputRange';

onChangeRange = (value, args) => {
  console.log(value, args);
}

<InputRange onChange={this.onChangeRange}/>
```
[返回目录](#component)




## InputSafe
[安全强度检验框](#https://unpkg.com/seedsui-react/src/lib/InputSafe/InputSafe.js)
, 展现三个状态: 弱、中、强
### 属性
```javascript
<InputSafe
  style={容器style object, 默认无}
  className={容器className string, 默认无}
  value={值 string | number, 默认''}
/>
```
### 示例
```javascript
import InputSafe from 'seedsui-react/lib/InputSafe';

<InputSafe value="Zk001"/>
```


## InputSelect
[选择框](#https://unpkg.com/seedsui-react/src/lib/InputSelect/InputSelect.js)
, 其它属性用法与[InputText 文本框](#inputtext) 组件一致, 基于[SelectPicker 选择弹框](#selectpicker)组件
### 属性
```javascript
<InputSelect
  multiple={是否允许多选 bool, 默认false}
  pickerClassName={弹出框className string, 默认无}
  pickerStyle={弹出框style object, 默认无}
  valueForKey={选中key number | string, 默认无}
  list={选择列表 array, 默认无}
  onChange={值改变 func(value, options, args), 默认无}
/>
```
### 示例
```javascript
import InputSelect from 'seedsui-react/lib/InputSelect';

const list = [
  {
    key: '1',
    value: '111'
  },
  {
    key: '2',
    value: '222'
  },
  {
    key: '3',
    value: '333'
  }
];

onChangeSelect = (value, options, args) => {
  console.log(value, options, args);
}

<InputSelect value="222" list={list} onChange={this.onChangeSelect}/>
```
[返回目录](#component)





## InputStar
[评分框](https://unpkg.com/seedsui-react/src/lib/InputStar/InputStar.js)
### 属性
```javascript
<InputStar
  args={事件参数 any, 如: [1,2, '$event'], '$event'代表点击元素的e}
  min={最小值 number, 默认0}
  max={最大值 number, 默认5}
  value={值 number, 默认0}
  onChange={值改变 func(value), 默认无}
  style={容器style object, 默认无}
  className={容器className string, 默认无, 基础'input-star'}
/>
```
### 示例
```javascript
import InputStar from '../lib/InputStar';

this.state = {
  value: 0
}

onChange = (value) => {
  this.setState({
    value
  })
}

<InputStar
  min={2}
  value={this.state.value}
  onChange={this.onChange}
/>
```
[返回目录](#component)




## InputText
[文本框](#https://unpkg.com/seedsui-react/src/lib/InputText/InputText.js)
, 很多组件继承自此组件, 拥有此组件的属性, 如: InputPhone、InputPre、InputArea等
### 属性
```javascript
<InputText
  args={事件参数 any, 如: [1,2, '$event'], '$event'代表点击元素的e}
  type={类型 string, 默认'text'} // text | password
  valueBindProp={值是否绑定props bool, 默认无} // 为true时只能通过props修改其value
  pre={是否启用自动扩充功能 bool, 默认无}
  // 容器
  style={容器style object, 默认无}
  className={容器className string, 默认无, 基础'attribute'}
  onClick={点击容器 func(value, args), 默认无}
    
  // 文本框
  name={文本框name string, 默认无}
  maxLength={文本框最大输入长度 string, 默认无}
  max={文本框最大值 string | number, 默认无} // 日期或者数字框专用
  min={文本框最小值 string | number, 默认无} // 日期或者数字框专用
  digits={文本框截取小数 string | number, 默认false} // 日期或者数字框专用
  readOnly={文本是否只读 bool, 默认无}
  disabled={文本是否禁用 bool, 默认无}

  inputStyle={文本框style object, 默认无}
  inputClassName={文本框className string, 默认无}
  value={值 string | number, 默认''}
  placeholder={占位符 string, 默认''}
  onChange={值改变 func(value, args), 默认无}
  onClickInput={点击文本框 func(value, args), 默认无}
  onBlur={失去焦点 func(value, args), 默认无}
  onFocus={获取焦点 func(value, args), 默认无}

  // 左右图标
  licon={左图标 node, 默认无}
  liconSrc={左图标地址 node, 默认无}
  liconClassName={左图标className string, 默认无, 基础'licon'}
  liconStyle={左图标style object, 默认无}
  onClickLicon={点击左图标 func(args), 默认无}
  liconLazyLoad={左图标懒人加载 bool, 默认无}

  ricon={右图标 node, 默认无}
  riconSrc={右图标地址 node, 默认无}
  riconClassName={右图标className string, 默认无, 基础'ricon'}
  riconStyle={右图标style object, 默认无}
  onClickRicon={点击右图标 func(args), 默认无}
  riconLazyLoad={右图标懒人加载 bool, 默认无}

  // 清除按钮
  clear={清除 bool | func('', args), 默认无}
  clearClassName={清除图标className string, 默认'ricon close-icon-clear size18'} // 见Close组件
  clearStyle={清除图标style object, 默认无}

  // 右侧内容
  rcaption={右侧内容 string, 默认无}
/>
```
### 示例
```javascript
import InputText from 'seedsui-react/lib/InputText';

onChangeText = (value, args) => {
  console.log(value, args);
}

<InputText onChange={this.onChangeText}/>
```


## InputVerify
[验证码文本框](#https://unpkg.com/seedsui-react/src/lib/InputVerify/InputVerify.js)
, 其它属性用法与[InputText 文本框](#inputtext) 组件一致
### 属性
```javascript
<InputVerify
  sentCaption={发送验证码文字 string, 默认'发送验证码'}
  sentDisabled={发送按钮是否禁用 bool, 默认无}
  onClickSent={值改变 func(), 默认无}
/>
```
### 示例
```javascript
import InputVerify from 'seedsui-react/lib/InputVerify';

onChangeVali = (value, args) => {
  console.log(value, args);
}
onClickSent = () => {
  console.log('发送验证码');
}
<InputVerify clear onChange={this.onChangeVali} value={verifycode} placeholder="验证码" maxLength="6" onClickSent={this.onClickSent}/>
```



## InputWaiqin
[外勤原生选择框](#https://unpkg.com/seedsui-react/src/lib/InputWaiqin/InputWaiqin.js)
, 其它属性用法与[InputText 文本框](#inputtext) 组件一致, 外勤专用控件
### 属性
```javascript
<InputWaiqin
  valueBindProp={值是否绑定props bool, 默认无} // 为true时只能通过props修改其value
  value={值 string | number, 默认无}
  valueForKey={选中key number | string, 默认无}
  chooseType={选择类型 string, 默认'getCustomer'} // getCustomer|getCustomerMore|getCustomerType|getCustomerArea|getCustomerAreaMore|getDepartment|getDepartmentMore|getContact|getContactMore|getGoods|getLocationMap
  chooseParams={选择参数 object, 默认会带上id-valueForKey和name-value, 配置如下:}
  // 【getCustomer与getCustomerMore 的 chooseParams】:
  // tradeType: PropTypes.string, // 1客户 2经销商 3门店,默认1
  // hiddenAdd: PropTypes.bool, // 是否显示添加按钮, 默认false
  // dms_type: PropTypes.string, // dms类型

  // 【getCustomerType】

  // 【getCustomerArea与getCustomerAreaMore】:

  // 【getDepartment与getDepartmentMore】:

  // 【getContact与getContactMore 的 chooseParams】:
  // aclType: PropTypes.string, // 0只能看到下属 不传或者其他的参数为全部人员,默认为空

  // 【getGoods】

  // 【getLocationMap 的 chooseParams】:
  // editable: PropTypes.string, // 是否可以标记位置, 1可标记
  // latlng: PropTypes.string // 经纬度, 只在editable为0时生效
  // title: PropTypes.string // 标题, 可不传
  onClick={点击 func(value, args), 默认无}
  onChange={值改变 func(value, option, args), 默认无}
  {...others}
/>
```
### 示例
```javascript
import InputWaiqin from 'seedsui-react/lib/InputWaiqin';

this.state = {
  id: '',
  value: ''
}

onValiChange = (error, value, data) => {
  if (data.op === 'input') {
    this.setState({
      verifyCode: value
    })
  }
}

<InputWaiqin chooseType="getCustomer" valueBindProp chooseParams={{tradeType: '1'}} onChange={this.onChange} value={this.state.value} valueForKey={this.state.id} placeholder="客户单择"/>
<InputWaiqin chooseType="getCustomerMore" chooseParams={{tradeType: '1'}} placeholder="客户多择"/>
<InputWaiqin chooseType="getContact" placeholder="全部员工"/>
<InputWaiqin chooseType="getContact" chooseParams={{aclType: '0'}} placeholder="下属员工"/>
```
[返回目录](#component)



## Verify
[验证码文本框](#https://unpkg.com/seedsui-react/src/lib/Verify/Verify.js)
, InputVerify组件的包装组件, 支持真实的发送验证码功能, 其它属性用法与[InputText 文本框](#inputtext) 组件一致
### 属性
```javascript
<Verify
  autoSent={是否自动发送 bool, 默认无}
  url={请求url string, 默认'/login/sendLoginSmsVerifyCode.action'}
  params={请求参数 object, 默认无}
  syncData={值改变 func(
      '错误信息',
      'value',
      {
        result: object,
        status: 'send_fail | send_ok | sent_ok | sent_fail',
        op: 'click | input | timeover'
      }
    )
  }
  beforeSent={点击发送 func() => bool, 默认无} // 如果返回字符串,将弹出信息,并不发短信
  sentDisabled={是否禁用发送验证码 bool, 默认无}
  sentSecond={秒数 bool, 默认60}
  sentCaption={发送按钮文字 bool, 默认'发送验证码'}
  maxLength={长度限制 string | number, 默认6}
  placeholder={占位符 string, 默认'验证码'}
  {...others}
/>
```
### 示例
```javascript
import Verify from 'seedsui-react/lib/Verify';

const VerifyStyle = {
  backgroundColor: 'white',
  padding: '0 12px',
  borderRadius: '4px'
}

onValiChange = (error, value, data) => {
  if (data.op === 'input') {
    this.setState({
      verifyCode: value
    })
  }
}

<Verify url="/biz/esss/client/v1/statementofaccount/sendCarSaleSignPhoneNum.action" autoSent syncData={this.onValiChange} params={{mobile: ''}} className="bordered" style={VerifyStyle}/>
```
[返回目录](#component)



## Legend
[标题](#https://unpkg.com/seedsui-react/src/lib/Legend/Legend.js)
### 属性
```javascript
<Legend
  className={容器className string, 默认无, 基础'legend'}
>
标题
</Legend>
```
### 示例
```javascript
import Legend from 'seedsui-react/lib/Legend';

<Legend>标题</Legend>
```
[返回目录](#component)



## Jcrop
[标题](#https://unpkg.com/seedsui-react/src/lib/Jcrop/Jcrop.js)
### 属性
```javascript
<Jcrop
  src={图片地址 string, 默认无}
  rect={选区方形坐标 array, 默认无} // [10,10,100,100]
  scale={选区比例大小 array, 默认[.7,.5]} // [.7,.5]
  options={初始化选项 obj, 默认{multi: false}}
  onChange={选区变化事件 func({pos, src}), 默认无}
  className={容器className string, 默认无, 基础'legend'}
  {...others}
/>
```
### 示例
```javascript
import CanvasUtil from 'seedsui-react/lib/CanvasUtil';
import Jcrop from 'seedsui-react/lib/Jcrop';

onChange = (e) => {
  console.log(e)
  this.setState({
    pos: e.pos,
    src: e.src
  });
}

onSubmit = () => {
  CanvasUtil.cropImg({
    src: this.state.src,
    ...this.state.pos,
    onSuccess: function (base64) {
      console.log(base64)
    }
  });
}

<Jcrop src={srcData} onChange={this.onChange} style={{width: '300px'}}/>
```
[返回目录](#component)


## List
[列表](#https://unpkg.com/seedsui-react/src/lib/List/List.js)
### 属性
```javascript
<List
  args={事件参数 any, 如: [1,2, '$event'], '$event'代表点击元素的e}
  style={容器style object, 默认无}
  className={容器className string, 默认无, 基础'attribute'}
  onClick={点击容器 func(args), 默认无}
  lazyLoad={懒人加载 bool, 默认无}

  licon={左图标 node, 默认无}
  liconSrc={左图标地址 node, 默认无}
  liconClassName={左图标className string, 默认无, 基础'licon'}
  liconStyle={左图标style object, 默认无}
  onClickLicon={点击左图标 func(args), 默认无}
  liconLazyLoad={左图标懒人加载 bool, 默认无}

  ricon={右图标 node, 默认无}
  riconSrc={右图标地址 node, 默认无}
  riconClassName={右图标className string, 默认无, 基础'ricon'}
  riconStyle={右图标style object, 默认无}
  onClickRicon={点击右图标 func(args), 默认无}
  riconLazyLoad={右图标懒人加载 bool, 默认无}

  showThumbnail={是否显示缩略图 bool, 默认无}
  thumbnailSrc={缩略图地址 node, 默认无}
  thumbnailClassName={缩略图className string, 默认'bg-no-img', 基础'list-thumbnail'}
  thumbnailStyle={缩略图style object, 默认无}
  onClickThumbnail={点击缩略图 func(args), 默认无}
  thumbnailAfter={缩略图后 node, 默认无}

  showAvatar={是否显示照片 bool, 默认无}
  avatarSrc={照片地址 node, 默认无}
  avatarClassName={照片className string, 默认'bg-no-avatar', 基础'list-avatar'}
  avatarStyle={照片style object, 默认无}
  onClickAvatar={点击照片 func(args), 默认无}
  avatarAfter={照片后 node, 默认无}

  caption={标题 node, 默认无}
  captionClassName={标题className string, 默认无, 基础'list-caption'}
  captionStyle={标题style object, 默认无}
  onClickRcaption={点击标题 func(args), 默认无}
  
  sndcaption={副标题 node, 默认无}
  sndcaptionClassName={副标题className string, 默认无, 基础'list-caption'}
  sndcaptionStyle={副标题style object, 默认无}

  containerClassName={中间区域className string, 默认无, 基础'list-caption'}
  containerStyle={中间区域style object, 默认无}
  onClickContainer={点击中间区域 func(args), 默认无}
  containerAfter={中间区域后 node, 默认无}
/>
```
### 示例
```javascript
import List from 'seedsui-react/lib/List';

<List onClick={() => {Bridge.tel('02568736873')}} caption="技术支持" rcaption="02568736873" className="list-li-oneline" rcaptionClassName="color-placeholder" liconClassName="icon-support" riconClassName="shape-arrow-right sm" style={{padding: '10px 12px'}}/>
```
[返回目录](#component)



## ListPull
[推送列表](#https://unpkg.com/seedsui-react/src/lib/ListPull/ListPull.js)
### 属性
```javascript
<ListPull
  list={列表 array, 默认无, 示例如下:}
  // [{
  //   container: node,
  //   lButtons: [{value: '按钮文字', className: 'warn', style: object}],
  //   rButtons: 同lButtons
  // }]
  style={容器style object, 默认无}
  className={容器className string, 默认无, 基础'list-pull'}
  onClick={点击列表 func(item, index, btn), 默认无}
  onShowedLeft={左侧显示 func(s), 默认无}
  onShowedRight={右侧显示 func(s), 默认无}
/>
```
### 示例
```javascript
import ListPull from 'seedsui-react/lib/ListPull';

this.state = {
  listpull: [
    {
      container: <p style={{height: '50px'}}>内容</p>,
      lButtons: [
        {value: '未读', className: 'info', style: {padding: '0 12px'}}
      ],
      rButtons: [
        {value: '收藏', className: 'warn', style: {padding: '0 12px'}},
        {value: '删除', className: 'cancel', style: {padding: '0 12px'}}
      ],
    },
    {
      container: <p style={{height: '50px'}}>内容</p>,
      lButtons: [
        {value: '未读', className: 'info', style: {padding: '0 12px'}}
      ],
      rButtons: [
        {value: '收藏', className: 'warn', style: {padding: '0 12px'}},
        {value: '删除', className: 'cancel', style: {padding: '0 12px'}}
      ],
    }
  ]
}

onShowedLeft = (s) => {
  var target = s.target.previousElementSibling.children[0];
  if (target.innerHTML === '未读') {
    target.classList.add('disabled');
    target.innerHTML = '已读';
  } else {
    target.classList.remove('disabled');
    target.innerHTML = '未读';
  }
  s.hide();
}

onClickListPull = (item, index, btn) => {
  console.log(item, index, btn)
}

<ListPull list={this.state.listpull} onClick={this.onClickListPull} onShowedLeft={this.onShowedLeft}/>
```
[返回目录](#component)


## Loading
[加载中](#https://unpkg.com/seedsui-react/src/lib/Loading/Loading.js)
### 属性
```javascript
<Loading
  portal={加载框传送至dom object, 默认无} // 不设置protal, 则不传送
  type={加载框类型 string, 默认'floating'} // 'floating | filling | custom'

  maskStyle={遮罩style object, 默认无}
  maskClassName={遮罩className object, 默认无}
  maskBefore={遮罩第一层dom node, 默认无}

  style={加载框style object, 默认无}

  iconClassName={图标className string, 默认无, 基础'loading-custom-icon'}
  iconSrc={图标地址 string, 默认无}
  caption={标题 string, 默认'正在加载...'}
/>
```
### 示例
```javascript
import Loading from 'seedsui-react/lib/Loading';

<Loading maskStyle={{top: '44px'}}/>
```
[返回目录](#component)



## Mark
[标记](#https://unpkg.com/seedsui-react/src/lib/Mark/Mark.js)
### 属性
```javascript
<Mark
  className={标记className string, 默认无, 基础'card'} // 'info | success | cancel | warn | disable | primary | hint'
  {...others}
>
标记文字
</Mark>
```
### 示例
```javascript
import Mark from 'seedsui-react/lib/Mark';

<Mark className="success">进行中</Mark>
```
[返回目录](#component)



## Marquee
[跑马灯](#https://unpkg.com/seedsui-react/src/lib/Marquee/Marquee.js)
### 属性
```javascript
<Marquee
  style={容器style object, 默认无}
  className={容器className string, 默认无, 基础'marquee'}
  list={列表 array, 默认无} // [{key: 'xx', value: ''}]

  contentStyle={单条style object, 默认无}
  contentClassName={单条className string, 默认无, 基础'marquee-li'}

  step={一次移动数值 number, 默认50}
  duration={移动动画时长 number, 默认300}
  delay={一次移动停留时长 number, 默认2000}
  direction={移动方向 string, 默认'top'} // 'top | bottom | left | right'
  loop={是否循环 bool, 默认true}
  onClick={点击 func(item, index), 默认无}
/>
```
### 示例
```javascript
import Marquee from 'seedsui-react/lib/Marquee';
const list = [
  {
    key: '1',
    value: '标题标题'
  }
]
<Marquee
  list={list}
  onClick={onClick}
  step={48}
  contentStyle={{height: '38px', padding: '5px 0'}}
  contentClassName="flex flex-center nowrap2"
/>
```
[返回目录](#component)



## MenuTiled
[平铺弹出菜单](#https://unpkg.com/seedsui-react/src/lib/MenuTiled/MenuTiled.js)
, [Dropdown下拉菜单](#dropdown)组件的子组件
### 属性
```javascript
<MenuTiled
  style={容器style object, 默认无}
  className={容器className string, 默认无, 基础'marquee'}
  list={列表 array, 默认无} // [{id: '1',caption: '测试数据1',children:[]}]
  activeId={默认选中项的id string, 默认无}
  onClick={点击 func(item, isActived, extandStatus: -1无子节点 | true展开 | false收缩, childrenCount), 默认无}
/>
```
### 示例
```javascript
import MenuTiled from 'seedsui-react/lib/MenuTiled';
const activeMenuId = '';
const menus = [
  {
    id: '1',
    caption: '测试数据1',
    children: [
      {id: 'a', caption: '测试数据1-a'}
    ]
  }
];
onClickMenu = (item, isActived, extandStatus, childrenCount) => {
  console.log(item, isActived, extandStatus, childrenCount);
}
<MenuTiled list={menus} activeId={activeMenuId} onClick={this.onClickMenu}/>
```
[返回目录](#component)



## MenuTree
[侧边树形菜单](#https://unpkg.com/seedsui-react/src/lib/MenuTree/MenuTree.js)
### 属性
```javascript
<MenuTree
  style={容器style object, 默认无}
  className={容器className string, 默认无, 基础'menutree'}
  list={列表 array, 默认无, 示例如下:}
  /* list: [{
    id: '',
    caption: '',
    active: false,
    children
  }] */
  activeId={默认选中项的id string, 默认无}
  onClick={点击 func(item, isActived, extandStatus: -1无子节点 | true展开 | false收缩, childrenCount), 默认无}
/>
```
### 示例
```javascript
import MenuTree from 'seedsui-react/lib/MenuTree';
const activeId = '';
const list = [
  {
    id: '1',
    caption: '测试数据1',
    children: [
      {id: 'a', caption: '测试数据1-a'}
    ]
  }
];
onClickMenu = (item, isActived, extandStatus, childrenCount) => {
  console.log(item, isActived, extandStatus, childrenCount);
}
const Container = {
  position: 'absolute',
  top: '0',
  bottom: '0'
};
<MenuTree ref="$menutree" list={list} activeId={activeId} onClick={this.onClickMenu} style={Container}/>
```
[返回目录](#component)



## NoNetwork
[无网络](#https://unpkg.com/seedsui-react/src/lib/NoNetwork/NoNetwork.js)
, 基于[Notice 通知公告](#notice)组件, 自动检测网络状态, 无网络时自动显示
### 属性
```javascript
<NoNetwork
  caption={标题 string, 默认'网络状态不佳'}
  sndcaption={副标题 string, 默认'请尝试开关飞行模式后再试'}
/>
```
### 示例
```javascript
import NoNetwork from 'seedsui-react/lib/NoNetwork';

<NoNetwork/>
```
[返回目录](#component)



## Notice
[公告](#https://unpkg.com/seedsui-react/src/lib/Notice/Notice.js)
### 属性
```javascript
<Notice
  args={事件参数 any, 如: [1,2, '$event'], '$event'代表点击元素的e}
  show={显隐 bool, 默认true}
    
  style={容器style object, 默认无}
  className={容器className string, 默认无, 基础'notice'}
  onClick={点击内容区域 func(args), 默认无}
  icon={图标dom node, 默认无}
  iconSrc={图标地址 string, 默认无}
  iconStyle={图标style object, 默认无}
  iconClassName={图标className string, 默认无} // 'notice-icon-nodata | notice-icon-error'

  caption={标题 string, 默认''}
  sndcaption={副标题 string, 默认''}
>
其它内容
</Notice>
```
### 示例
```javascript
import NoNetwork from 'seedsui-react/lib/NoNetwork';

<Notice iconClassName="icon-no-network" caption="网络状态不佳" sndcaption="请尝试开关飞行模式后再试"/>
```
[返回目录](#component)



## NumBox
[数字加减框](#https://unpkg.com/seedsui-react/src/lib/NumBox/NumBox.js)
### 属性
```javascript
<NumBox
  args={事件参数 any, 如: [1,2, '$event'], '$event'代表点击元素的e}
  changeFocus={是否点击加減时获取焦点 bool, 默认无}
  // 容器
  style={容器style object, 默认无}
  className={容器className string, 默认无, 基础'numbox bordered'}
  // 文本框
  inputStyle={文本框style object, 默认无}
  inputClassName={文本框className string, 默认无, 基础'numbox-input'}
  value={值 string, 默认'0'}
  placeholder={占位符 string, 默认''}
  name={文本框name string, 默认无}
  maxLength={输入长度 string, 默认'8'}
  disabled={是否禁用 bool, 默认无}
  readOnly={是否只读 bool, 默认无}
  // events
  onClick={点击容器 func(e), 默认无}
  onClickMinus={点击减 func(value, args), 默认无}
  onClickPlus={点击加 func(value, args), 默认无}
  onClickInput={点击文本框 func(e), 默认无}
  onChange={值发生变化 func(value, args), 默认无}
  onError={值发生变化 func({msg:''}), 默认无}
  // rule设置
  digits={文本框截取小数 string | number, 默认false}
  max={最大值 number, 默认99999999}
  min={最小值 number, 默认0}
/>
```
### 示例
```javascript
import NumBox from 'seedsui-react/lib/NumBox';

onChangeNum = (val, args) => {
  console.log(val, args)
}

<NumBox
  style={{width: '150px'}}
  digits={2}
  value={'1'}
  onChange={this.onChangeNum}
  args={['1', '2']}
/>
```
[返回目录](#component)



## NumBoxPop
[数字加减弹出框](#https://unpkg.com/seedsui-react/src/lib/NumBoxPop/NumBoxPop.js)
, 基于[NumBox 数字加减框](#numbox)组件
### 属性
```javascript
<NumBoxPop
  args={事件参数 any, 如: [1,2, '$event'], '$event'代表点击元素的e}
  // 文本框
  value={值 string, 默认'0'}
  // events
  onClickCancel={点击取消 func(), 默认无}
  onClickSubmit={点击确定 func(), 默认无}
  show={*显隐 bool, 默认false}
  caption={标题 string, 默认'修改购买数量'}
  // rule设置
  digits={文本框截取小数 string | number, 默认false}
  max={最大值 number, 默认99999999}
  min={最小值 number, 默认0}
/>
```
### 示例
```javascript
import NumBoxPop from 'seedsui-react/lib/NumBoxPop';

this.state = {
  show: true
}
onClickCancel = () => {
  this.setState({show: false});
}
onClickSubmit = (count) => {
  this.setState({show: false});
}

<NumBoxPop
  min={1}
  show={this.state.show}
  value='5'
  onClickCancel={this.onClickCancel}
  onClickSubmit={this.onClickSubmit}
/>
```
[返回目录](#component)



## NumBoxPopPointer
[数字加减指针](#https://unpkg.com/seedsui-react/src/lib/NumBoxPopPointer/NumBoxPopPointer.js)
, 基于[NumBoxPop 数字加减弹出框](#numboxpop)组件
### 属性
```javascript
<NumBoxPopPointer
  args={事件参数 any, 如: [1,2, '$event'], '$event'代表点击元素的e}
  // 容器
  style={容器style object, 默认无, 基础{position: 'relative'}}
  className={容器className string, 默认无}
  // numbox
  numboxClassName={加减框className string, 默认无}
  numboxStyle={加减框style object, 默认无}
  value={值 string, 默认无}
  disabled={是否禁用 bool, 默认无}
  unit={单位 string, 默认无}
  // events
  onChange={点击确定时触发 func(value, args), 默认无}
  // rule设置
  min={最小值 number, 默认0}
  max={最大值 number, 默认99999999}
  digits={文本框截取小数 string | number, 默认无}
/>
```
### 示例
```javascript
import NumBoxPopPointer from 'seedsui-react/lib/NumBoxPopPointer';

onChangeCount = (value) => {
  console.log(value)
}

<NumBoxPopPointer
  min={1}
  value={'3'}
  unit={'/箱'}
  onChange={this.onChangeCount}
/>
```
[返回目录](#component)


## OnOff
[开关](#https://unpkg.com/seedsui-react/src/lib/OnOff/OnOff.js)
### 属性
```javascript
<OnOff
  style={容器style object, 默认无}
  className={容器className string, 默认无, 基础'onoff'}
  readOnly={是否只读 bool, 默认无}
  checked={是否选中 bool, 默认无} // 选中时clasName将会增加'active'
  onCaption={开文字 string, 默认无} // 开关文字有一个为空时, className将会增加'notext'
  offCaption={关文字 string, 默认无}
  onClick={点击容器 func(bool), 默认无}
/>
```
### 示例
```javascript
import Checkbox from 'seedsui-react/lib/Checkbox';

onClick = (checked) => {
  this.props.checkChange(!checked)
}

const {checked} = this.props;
<List
  className="list-li-oneline"
  caption="设置为默认收货地址"
  rcaption={
    <OnOff
      readOnly={this.state.isFirst}
      className="reverse"
      checked={is_default === '0'}
      onClick={(isChecked) => {defaultChange(isChecked ? '1' : '0')}}
    />
  }
/>
```
[返回目录](#component)


## Page
[页面](#https://unpkg.com/seedsui-react/src/lib/Page/Page.js)
, 通常与Container、Header一起使用
### 属性
```javascript
<Page
  style={容器style object, 默认无}
  className={容器className string, 默认无, 基础'page'}
  animation={动画 string, 默认无}  // slideLeft | slideRight | slideUp | slideDown | zoom | fade
  {...others}
>
页面
</Page>
```
### 示例
```javascript
import Page from 'seedsui-react/lib/Page';
import Header from 'seedsui-react/lib/Header';
import Container from 'seedsui-react/lib/Container';

<Page>
  <Header>
    头部
  </Header>
  <Container>
    中部
  </Container>
</Page>
```
[返回目录](#component)


## PagePull
[可推动页面](#https://unpkg.com/seedsui-react/src/lib/PagePull/PagePull.js)
, 基于[Page 页面](#page)组件
### 属性
```javascript
<PagePull
  // Side 侧边栏
    drag={是否允许拖拽 bool, 默认true}
    lSide={左侧边栏 node, 默认无}
    lSideStyle={左侧边栏style object, 默认无}
    lSideClassName={左侧边栏className string, 默认无, 基础'page-side-left'}
    rSide={右侧边栏 node, 默认无}
    rSideStyle={右侧边栏style object, 默认无}
    rSideClassName={右侧边栏className string, 默认无, 基础'page-side-right'}
    transition={过渡动画 string, 默认'push'} // 'push | reveal'
    onShowedLeft={左侧显示 func(s), 默认无}
    onShowedRight={右侧显示 func(s), 默认无}
  {...others}
>
页面
</PagePull>
```
### 示例
```javascript
import Page from 'seedsui-react/lib/Page';
import Header from 'seedsui-react/lib/Header';
import Container from 'seedsui-react/lib/Container';

<PagePull lSide={<p>左侧边栏</p>} rSide={<p>右侧边栏</p>}>
  <Header>
    头部
  </Header>
  <Container>
    中部
  </Container>
</PagePull>
```
[返回目录](#component)




## Peg
[小竖条](#https://unpkg.com/seedsui-react/src/lib/Peg/Peg.js)
### 属性
```javascript
<Peg
  className={图标className string, 默认无, 基础'peg'}
  {...others}
/>
```
### 示例
```javascript
import Peg from 'seedsui-react/lib/Peg';

<Peg/>
```
[返回目录](#component)




## Picker
[滚动选择弹框](#https://unpkg.com/seedsui-react/src/lib/Picker/Picker.js)
### 属性
```javascript
<Picker
  portal={传送dom object, 默认document.getElementById('root')}
  show={*显隐 bool, 默认false}
  value={值 number | string, 默认无}
  valueForKey={选中key number | string, 默认无}
  list={列表 array, 默认无} // 格式 [{key: '', value: ''}]
  style={容器style object, 默认无}
  className={容器className string, 默认无, 基础'picker'}
  slotClassName={一槽className string, 默认'text-center'}
  onClickMask={点击遮罩 func, 默认无}
  onClickCancel={点击取消按钮 func(s), 默认无}
  onClickSubmit={点击确定按钮 func(s), 默认无}
/>
```
### 示例
```javascript
import Picker from 'seedsui-react/lib/Picker';

onClickSubmit = (e) => {
  const value = e.activeOptions[0].value;
  console.log(value);
  this.setState({
    show: !this.state.show
  });
}
onClickCancel = () => {
  this.setState({
    show: !this.state.show
  });
}
onClickMask = () => {
  this.setState({
    show: !this.state.show
  });
}

<Picker
  list={[{key: '1', value: '111'}, {key: '2', value: '222'}]}
  value=""
  show={this.state.show}
  onClickSubmit={this.onClickSubmit}
  onClickCancel={this.onClickCancel}
  onClickMask={this.onClickMask}
/>
```
[返回目录](#component)




## PickerCity
[城市选择弹框](#https://unpkg.com/seedsui-react/src/lib/PickerCity/PickerCity.js)
, 基于[Picker 滚动选择弹框](#picker)组件
### 属性
```javascript
<PickerCity
  portal={传送dom object, 默认document.getElementById('root')}
  split={分隔符 string, 默认'-'}
  type={类型 string, 默认'area'} // area | city
  className={容器className string, 默认无, 基础'picker'}
  style={容器style object, 默认无}
  value={值 string, 默认无}
  show={*显隐 bool, 默认false}
  onClickMask={点击遮罩 func, 默认无}
  onClickCancel={点击取消按钮 func(s), 默认无}
  onClickSubmit={点击确定按钮 func(s), 默认无}
/>
```
### 示例
```javascript
import PickerCity from 'seedsui-react/lib/PickerCity';

onClickSubmit = (e) => {
  const value = e.activeOptions[0].value;
  console.log(value);
  this.setState({
    show: !this.state.show
  });
}
onClickCancel = () => {
  this.setState({
    show: !this.state.show
  });
}
onClickMask = () => {
  this.setState({
    show: !this.state.show
  });
}

<PickerCity
  value=""
  show={this.state.show}
  onClickSubmit={this.onClickSubmit}
  onClickCancel={this.onClickCancel}
  onClickMask={this.onClickMask}
/>
```
[返回目录](#component)



## PickerDate
[日期选择弹框](#https://unpkg.com/seedsui-react/src/lib/PickerDate/PickerDate.js)
, 基于[Picker 滚动选择弹框](#picker)组件
### 属性
```javascript
<PickerDate
  portal={传送dom object, 默认document.getElementById('root')}
  split={分隔符 string, 默认'-'}
  type={类型 string, 默认'area'} // area | city
  className={容器className string, 默认无, 基础'picker'}
  style={容器style object, 默认无}
  value={值 string, 默认无}
  show={*显隐 bool, 默认false}
  onClickMask={点击遮罩 func, 默认无}
  onClickCancel={点击取消按钮 func(s), 默认无}
  onClickSubmit={点击确定按钮 func(s), 默认无}
  onError={错误 func(s), 默认无}
/>
```
### 示例
```javascript
import PickerDate from 'seedsui-react/lib/PickerDate';

onClickSubmit = (e) => {
  const value = e.activeOptions[0].value;
  console.log(value);
  this.setState({
    show: !this.state.show
  });
}
onClickCancel = () => {
  this.setState({
    show: !this.state.show
  });
}
onClickMask = () => {
  this.setState({
    show: !this.state.show
  });
}

<PickerDate
  value=""
  show={this.state.show}
  onClickSubmit={this.onClickSubmit}
  onClickCancel={this.onClickCancel}
  onClickMask={this.onClickMask}
/>
```
[返回目录](#component)



## Popover
[箭头弹框](#https://unpkg.com/seedsui-react/src/lib/Popover/Popover.js)
### 属性
```javascript
<Popover
  args={事件参数 any, 如: [1,2, '$event'], '$event'代表点击元素的e}
  portal={传送dom object, 默认document.getElementById('root')}
  show={*显隐 bool, 默认false}

  animation={动画 string, 默认'zoom'}  // slideLeft | slideRight | slideUp | slideDown | zoom | fade
  isClickMaskHide={是否点击遮罩隐藏 bool, 默认true}

  maskStyle={遮罩style object, 默认无}
  maskClassName={遮罩className string, 默认无, 基础'mask popover-mask'}
  onClickMask={点击遮罩 func(args), 默认无}

  className={容器className string, 默认无, 基础'popover'}
  // 'top-left | top-center | top-right | left-top | left-middle | left-bottom', 其中top与bottom、left与right拥有相同属性
  style={容器style object, 默认无}
>
内容内容
</Popover>
```
### 示例
```javascript
import Popover from 'seedsui-react/lib/Popover';

this.state = {
  show: false
}

onHide = () => {
  this.setState({
    show: false
  })
}

<Popover show={this.state.show} className="top-left" style={{left: '10px', top: '44px'}} onClickMask={this.onHide}>
  <List caption="本月" className="border-b"/>
  <List caption="上月" className="border-b"/>
  <List caption="自定义时间"/>
</Popover>
```
[返回目录](#component)



## Price
[价格](https://unpkg.com/seedsui-react/src/lib/Price/Price.js)
### 属性
```javascript
<Price
  showSymbol={是否显示货币符号 bool, 默认true}
  showThousandth={是否显示千分位 bool, 默认true}
  className={容器className string, 默认'capitalize', 基础'price'} // normal | capitalize | capitalize lg
  style={容器style object, 默认无}
  price={价格数值 string | number, 默认无} // 如果不是数字的话, 将原样显示
  unit={单位 string, 默认无}
  digitsFixed={固定小数 bool, 默认true} // 例如100仍然显示100.00
  digits={小数位控制 bool | number, 默认false}
/>
```
### 示例
```javascript
import Price from 'seedsui-react/lib/Price';

<Price price={100} digits={2} digitsFixed/>
```
[返回目录](#component)


## Progress
[进度条](https://unpkg.com/seedsui-react/src/lib/Progress/Progress.js)
### 属性
```javascript
<Progress
  className={容器className string, 默认无, 基础'progress'}
  style={容器style object, 默认无}
  barStyle={进度条style object, 默认无}
  barClassName={进度条className string, 默认无, 基础'progress-bar'}

  percentage={百分比 number, 默认无} // 百分比与max min value, 只要一种就行了
  max={最大值 number, 默认100}
  min={最小值 number, 默认0}
  value={值 string, 默认'0'}
  showPercentage={是否显示百分比文字 bool, 默认true} // 若为false则不显示文字
/>
```
### 示例
```javascript
import Progress from 'seedsui-react/lib/Progress';

<Progress percentage={10}/>
```
[返回目录](#component)


## Radio
[单选框](https://unpkg.com/seedsui-react/src/lib/Radio/Radio.js)
### 属性
```javascript
<Radio
  args={事件参数 any, 如: [1,2, '$event'], '$event'代表点击元素的e}
  style={容器style object, 默认无}
  className={容器className string, 默认无, 基础'radio-box'}
  onClick={点击复选框 func(checked, args)}

  name={复选框name string, 默认无}
  value={复选框value string, 默认无}
  checked={是否选中 bool, 默认false}
  disabled={是否禁用 bool, 默认false}

  caption={复选框标题 string, 默认无}
  captionClassName={复选框标题className string, 默认无, 基础'radio-caption'}
  captionStyle={复选框标题style object, 默认无}
/>
```
### 示例
```javascript
import Radio from 'seedsui-react/lib/Radio';

onClick = (checked, args) => {
  console.log(checked, args)
}

<Radio onClick={this.onClick}/>
```
[返回目录](#component)



## RouteComment
[评价路由](https://unpkg.com/seedsui-react/src/lib/RouteComment/RouteComment.js)
### 属性
```javascript
<RouteComment
  title={标题 string, 默认'填写意见'}
  placeholder={占位符 string, 默认'点击输入'}

  buttons={操作按钮 array, 默认无, 示例如下:}
  /*
  [{
    valid: PropTypes.bool,
    caption: PropTypes.node,
    style: PropTypes.object,
    className: PropTypes.string,
    onClick={点击事件 func(value, item, index)}
  }]
  */
  children={子元素 node, 默认无}
/>
```
### 示例
```javascript
import {Route, withRouter} from 'react-router';
import RouteComment from 'seedsui-react/lib/RouteComment';

onClickCancel = (value, item, index) => {
  console.log(value, item, index);
}
onClickSubmit = (value, item, index) => {
  console.log(value, item, index);
}

<Route
  path={`${this.props.match.path}/approverPop`}
  render={() => <RouteComment
    buttons={[
      {
        valid: false,
        className: 'lg bg-white',
        caption: '取消',
        onClick: this.onClickCancel
      },
      {
        valid: false,
        className: 'lg primary',
        caption: '提交',
        onClick: this.onClickSubmit
      }
    ]}
    maxLength="100"
    title="审批"
    placeholder="请填写审批意见"
  />}
/>
```
[返回目录](#component)



## SearchBar
[搜索栏](https://unpkg.com/seedsui-react/src/lib/SearchBar/SearchBar.js)
### 属性
```javascript
<SearchBar
  style={容器style object, 默认无}
  className={容器className string, 默认无, 基础'searchbar'}
  placeholder={占位文字 string, 默认无}
  value={值 string, 默认无}
  onClear={清空 func(), 默认无}
  onChange={值改变 func(value), 默认无}
  onSubmit={值改变 func(value), 默认无}
  onClickCancel={点击取消 func(e), 默认无}
/>
```
### 示例
```javascript
import SearchBar from 'seedsui-react/lib/SearchBar';

searchOrders = (value) => {
  console.log(value)
}

<SearchBar
  placeholder={'商品名称/单据编号'}
  value={this.state.searchValue}
  className="border-b"
  onSubmit={this.searchOrders}
  style={{marginLeft: '12px'}}
/>
```
[返回目录](#component)



## SearchBarPointer
[搜索指针](https://unpkg.com/seedsui-react/src/lib/SearchBarPointer/SearchBarPointer.js)
### 属性
```javascript
<SearchBarPointer
  className={容器className string, 默认无, 基础'searchbar'}
  style={容器style object, 默认无}

  inputClassName={文本框容器className string, 默认无, 基础'searchbar-form'}
  inputStyle={文本框容器style object, 默认无}
  placeholder={占位符 string, 默认无}

  onClick={点击容器 func(), 默认无}
/>
```
### 示例
```javascript
import SearchBarPointer from 'seedsui-react/lib/SearchBarPointer';

goSearch = () => {
  history.push('/search');
}

<SearchBarPointer
  onClick={this.goSearch}
  placeholder="输入名称查找商品"
  style={{margin: '0 12px'}}
/>
```
[返回目录](#component)



## SearchBoard
[搜索面板](https://unpkg.com/seedsui-react/src/lib/SearchBoard/SearchBoard.js)
### 属性
```javascript
<SearchBoard
  style={容器style object, 默认无}
  className={容器className string, 默认'border-b', 基础'searchboard'}
  dbKey={搜索历史存储到db中的key string, 默认'app_search_history'}
  show={*显隐 bool, 默认true}
  showValidTags={如果没有历史记录是否隐藏面板 bool, 默认true}
  onClick={点击标签 func(item, index), 默认无}
  onClear={点击清除 func(), 默认无}
  expandCaption={扩展标题 string, 默认无}
  expandTags={扩展标签 array, 默认无} // 格式 [{value: 'xx'}]
  onClickExpand={点击扩展标签 func(item, index), 默认无}
>
</SearchBoard>
```
### 示例
```javascript
import SearchBoard from 'seedsui-react/lib/SearchBoard';

this.state = {
  searchValue: ''
}

searchGoods = (value) => {
  this.setState({searchValue: value});
  if (this.$historySearch) this.$historySearch.add({key: value, value: value});
  // 加载数据
}

<SearchBar
  placeholder={'商品名称/单据编号'}
  value={this.state.searchValue}
  className="border-b"
  onSubmit={this.searchGoods}
  style={{marginLeft: '12px'}}
/>

<SearchBoard
  show={goods.length === 0 && !this.state.searchValue}
  ref={(el) => {this.$historySearch = el;}}
  dbKey="app_history_search_goods"
  onClick={(item) => {this.searchGoods(item.value)}}
/>
```
[返回目录](#component)



## SelectPicker
[选择弹框](https://unpkg.com/seedsui-react/src/lib/SelectPicker/SelectPicker.js)
### 属性
```javascript
<SelectPicker
  portal={传送dom object, 默认document.getElementById('root')}
  multiple={是否允许多选 bool, 默认false}
  value={值 number | string, 默认无}
  valueForKey={选中key number | string, 默认无}
  list={选择列表 array, 默认无} // 格式 [key: 'xx', value: 'xx']
  className={容器className string, 默认无, 基础'selectpicker'}
  style={容器style object, 默认无}
  slotClassName={一槽className string, 默认'text-center'}
  show={*显隐 bool, 默认false}
  onClickMask={点击遮罩 func(s), 默认无}
  onClickCancel={点击取消按钮 func(s), 默认无}
  onClickSubmit={点击确定按钮 func(s), 默认无}
/>
```
### 示例
```javascript
import SelectPicker from 'seedsui-react/lib/SelectPicker';

onClickSubmit = (e) => {
  const value = e.activeOptions[0].value;
  console.log(value);
  this.setState({
    show: !this.state.show
  });
}
onClickCancel = () => {
  this.setState({
    show: !this.state.show
  });
}
onClickMask = () => {
  this.setState({
    show: !this.state.show
  });
}

<SelectPicker
  value=""
  show={this.state.show}
  onClickSubmit={this.onClickSubmit}
  onClickCancel={this.onClickCancel}
  onClickMask={this.onClickMask}
/>
```
[返回目录](#component)




## Star
[小竖条](#https://unpkg.com/seedsui-react/src/lib/Star/Star.js)
### 属性
```javascript
<Star
  className={图标className string, 默认无, 基础'star'}
  onClick={点击 func(args), 默认无}
  {...others}
/>
```
### 示例
```javascript
import Star from 'seedsui-react/lib/Star';

<Star/>
```
[返回目录](#component)




## Stencil
[加载模板](#https://unpkg.com/seedsui-react/src/lib/Stencil/Stencil.js)
### 属性
```javascript
<Stencil
  className={图标className string, 默认'stencil-list', 基础'stencil'}
  {...others}
/>
```
### 示例
```javascript
import Stencil from 'seedsui-react/lib/Stencil';

<Stencil/>
```
[返回目录](#component)




## Sticker
[标签贴](#https://unpkg.com/seedsui-react/src/lib/Sticker/Sticker.js)
### 属性
```javascript
<Sticker
  type={类型 string, 默认无} // 默认className加上'sticker', type设置为line时,className加上'sticker-line'
  iconClassName={图标className string, 默认无, 基础'size12'}
  className={容器className string, 默认'top right', 基础'size12'} // 'top | bottom | right | left'
  style={容器style object, 默认无}
>
</Sticker>
```
### 示例
```javascript
import Sticker from 'seedsui-react/lib/Sticker';

<Sticker>NEW</Sticker>
```
[返回目录](#component)




## Tabbar
[页签](#https://unpkg.com/seedsui-react/src/lib/Tabbar/Tabbar.js)
### 属性
```javascript
<Tabbar
  style={容器style object, 默认无}
  className={容器className string, 默认'tabbar-line tabbar-line-width70 border-b'}
  // tabbar-line | tabbar-rect | tabbar-lump | tabbar-dropdown | tabbar-footer
  iconBadgeStyle={图标徽章style object, 默认无}
  iconBadgeClassName={图标徽章className string, 默认无}
  riconBadgeStyle={右图标徽章style object, 默认无}
  riconBadgeClassName={右图标徽章className string, 默认无}
  captionClassName={标题className string, 默认无, 基础'tab-caption'}
  captionStyle={标题style object, 默认无}
  sndCaptionClassName={副标题className string, 默认无, 基础'tab-sndcaption'}
  sndCaptionStyle={副标题style object, 默认无}
  list={列表 array, 默认无, 格式如下:}
  // [
  //   {
  //     iconStyle: object,
  //     iconClassName: string,
  //     iconActiveStyle: object,
  //     iconActiveClassName: string,

  //     iconBadgeClassName: string,
  //     iconBadgeStyle: object,
  //     iconBadgeCaption: string,

  //     riconStyle: object,
  //     riconClassName: string,

  //     riconBadgeClassName: string,
  //     riconBadgeStyle: object,
  //     riconBadgeCaption: string,

  //     caption: string,
  //     sndcaption: string,
  //     active: bool,
  //     id: string
  //   }
  // ]
  tiled={宽度等分 bool, 默认宽度弹性伸缩}
  disabled={是否禁用 bool, 默认无}
  exceptOnClickActive={排除点击选中的菜单 bool, 默认true}
  onClick={点击页签 func(item, index), 默认无}
  activeIndex={选中项 number, 默认0}
/>
```
### 示例
```javascript
import Tabbar from 'seedsui-react/lib/Tabbar';

const tabbar = [
  {caption: '月', dateType: '0'},
  {caption: '季', dateType: '1'},
  {caption: '年', dateType: '2'}
];
const tabActiveIndex = 0;

onClickTab = (item, index) => {
  console.log(item, index)
}

<Tabbar list={tabbar} activeIndex={tabActiveIndex} onClick={this.onClickTab}/>
```
[返回目录](#component)




## Ticket
[票券]](#https://unpkg.com/seedsui-react/src/lib/Ticket/Ticket.js)
### 属性
```javascript
<Ticket
  style={容器style object, 默认无}
  className={左侧容器className string, 默认无, 基础'ticket'}
  legendStyle={左侧容器style object, 默认无}
  legendClassName={左侧容器className string, 默认无, 基础'ticket-legend'}
  legend={左侧容器 node, 默认无}
  containerStyle={左侧容器style object, 默认无}
  containerClassName={内容className string, 默认无, 基础'ticket-container'}
  onClick={点击页签 func(e), 默认无}
  {...others}
/>
```
### 示例
```javascript
import Ticket from 'seedsui-react/lib/Ticket';

<Ticket onClick={this.onClick} className={disabled ? 'disabled' : ''} style={{margin: '12px 14px'}} legend={
    <div className="text-center">
      <p style={{fontSize: '20px'}}>{item.num}{item.input_unit_name}</p>
      <p style={{fontSize: '12px', marginTop: '4px'}}>满30元可用</p>
    </div>
  }
  containerStyle={{padding: '12px'}}>
  <div className="flex flex-top" style={{height: '60px'}}>
    <p className="list-caption nowrap2 flex-1" style={{height: '40px'}}>商品名称 规格</p>
  </div>
  <div className="flex">
    <p className="list-sndcaption font-size-sm flex-1">2017-07-07</p>
    <Price price={item.amount} unit="元" className="normal color-primary"/>
  </div>
</Ticket>
```
[返回目录](#component)




## Timeline
[时间轴](#https://unpkg.com/seedsui-react/src/lib/Timeline/Timeline.js)
### 属性
```javascript
<Timeline
  list={列表 array, 默认无, 格式如下:}
  // [{content: node, icon: node(默认Dot), active: bool}]
  className={容器className string, 默认无, 基础'timeline'}
  style={容器style object, 默认无}
  badgeStyle={左侧style object, 默认无}
  className={左线条className string, 默认无, 基础'timeline-line'}
  style={左线条style object, 默认无}
/>
```
### 示例
```javascript
import Timeline from 'seedsui-react/lib/Timeline';

const timeList = [
  {content: <p>内容</p>, active: true}
]
<Timeline list={timeList} style={{padding: '0 0 0 18px'}}/>
```
[返回目录](#component)




## Timepart
[时间段](#https://unpkg.com/seedsui-react/src/lib/Timepart/Timepart.js)
### 属性
```javascript
<Timepart
  multiple={是否允许多选 bool, 默认false}
  style={容器style object, 默认无}
  className={容器className string, 默认无, 基础'timepart'}

  startTime={开始时间 string, 默认'07:00'}
  endTime={结束时间 string, 默认'22:00'}
  times={设置时间段 array, 默认无}
  // [{className: string, startTime: 'hh:ss', endTime: 'hh:ss', data: string, cover: bool}], 其中cover指允许覆盖显示

  onChange={选中发生变化 func(times:array), 默认无}
  onError={发生冲突错误 func({msg:''}), 默认无}
/>
```
### 示例
```javascript
import Timepart from 'seedsui-react/lib/Timepart';

<Timepart times={[{className: 'disabled', startTime: '09:00', endTime: '10:00'}]}/>
```
[返回目录](#component)




## Titlebar
[标题栏](#https://unpkg.com/seedsui-react/src/lib/Titlebar/Titlebar.js)
### 属性
```javascript
<Titlebar
  className={容器className string, 默认无, 基础'titlebar'}

  showUrlTitle={标题是否显示url中的title bool, 默认true, 将会读取url中'titlebar'参数做为标准}
  caption={标题 node, 默认无}
  captionClassName={标题className string, 默认无, 基础'titlebar-caption nowrap text-center'}
  captionStyle={标题style object, 默认无}
  onClickCaption={点击标题 func(e), 默认无}

  lButtons={左按钮 array, 默认['$back']}
  // '$back' 等同于{iconClassName: 'shape-arrow-left', onClick: this.onClickBack}
  // 格式 [{className: string, style: object, iconClassName: string, icon: node, caption: string}]

  rButtons={右按钮 array, 默认无}
  backClassName={返回按钮className string, 默认无}
  backStyle={返回按钮style object, 默认无}
  backIcon={返回按钮图标 node, 默认无}
  backIconClassName={返回按钮图标className string, 默认无}
  backIconStyle={返回按钮图标style object, 默认无}
  backCaption={返回按钮标题 string, 默认无}
  onClickBack={点击标题 func(), 默认无} // 当设置onClickBack后, 默认的onClickBack事件将被代替
>
如果此处写了内容, 将代替caption
</Titlebar>
```
### 示例
```javascript
import Timepart from 'seedsui-react/lib/Timepart';

<Titlebar caption="SeedsUI" rButtons={[{ caption: 'try' , onClick: () => {console.log(1)}}]} />
```
[返回目录](#component)




## Toast
[提示弹框](#https://unpkg.com/seedsui-react/src/lib/Toast/Toast.js)
### 建议
Toast组件更适用于复杂的定制弹框,一般弹框建议直接使用Api直接调用:
* Bridge.showToast(msg, {mask: false})代替

详见[Bridge 桥接库](#bridge) 桥接库
### 属性
```javascript
<Toast
  portal={传送dom object, 默认document.getElementById('root')}
  show={*显隐 bool, 默认false}

  duration={动画时长 number, 默认false}

  maskClassName={遮罩className string, 默认无, 基础'mask toast-mask'}
  maskStyle={遮罩style object, 默认无}

  className={弹框className string, 默认无, 基础'toast'}
  style={弹框style object, 默认无}

  caption={消息 node, 默认无}
  captionStyle={消息style object, 默认无}
  captionClassName={消息className string, 默认无, 基础'toast-caption'}

  icon={图标dom node, 默认无}
  iconSrc={图标地址 string, 默认无}
  iconStyle={图标style object, 默认无}
  iconClassName={图标className string, 默认无}
/>
```
### 示例
```javascript
import Toast from 'seedsui-react/lib/Toast';

this.state = {
  toastShow: false,
  toastMsg: '',
}

showMsg = (msg) => {
  if (this.timeout) window.clearTimeout(this.timeout);
  this.setState({
    toastShow: true,
    toastMsg: msg
  });
  this.timeout = setTimeout(() => {
    this.setState({
      toastShow: false
    });
  }, 2000);
}

<Toast caption={this.state.toastMsg} show={this.state.toastShow} className="middle" style={{borderRadius: '4px'}}/>
```
[返回目录](#component)




## Tree
[树结构](#https://unpkg.com/seedsui-react/src/lib/Tree/Tree.js)
### 属性
```javascript
<Tree
  // 容器
  style={树容器style object, 默认无}
  className={树容器className string, 默认无, 基础'tree-box'}
  // 树
  treeStyle={树style object, 默认无}
  treeClassName={树className string, 默认无, 基础'tree'}

  checkbox={是否支持选择 bool, 默认无}
  bar={选中项聚合展现栏 string | node, 默认无}
  selected={选中项 array, 默认无} // 格式 [{id: '', name: '', parentid: ''}]
  list={列表项 array, 默认无} // [{id: '', name: '', parentid: ''}]

  buttonAddHTML={添加按钮 string, 默认无}
  buttonAddClassName={添加按钮className string, 默认无}
  buttonAddSrc={添加按钮src string, 默认无}
  onClickAdd={点击添加按钮 func(s), 默认无}

  buttonDelHTML={添加按钮 string, 默认无}
  buttonDelClassName={添加按钮className string, 默认无}
  buttonDelSrc={添加按钮src string, 默认无}
  onClickDel={点击添加按钮 func(s), 默认无}

  onClickLastChild={点击底层节点 func(s), 默认无}
/>
```
### 示例
```javascript
import Tree from 'seedsui-react/lib/Tree';

onClickAdd = () => {
  if (!this.props.multiple) this.onSubmit();
}

onSubmit = () => {
  let selected = this.$customerTree.state.instance.selected;
  console.log(selected) // => {'id1': {id: 'id1', name: '', parentid: ''}, 'id2': {id: 'id2', name: '', parentid: ''}}
}

<Tree
  ref={el => {this.$tree = el;}}
  list={customerList}
  selected={selectedList}
  checkbox
  onClickAdd={this.onClickAdd}
/>
```
[返回目录](#component)




## Weather
[天气](#https://unpkg.com/seedsui-react/src/lib/Weather/Weather.js)
### 属性
```javascript
<Weather
  location={位置 string, 默认'北京市'} // 格式 'lng,lat|lng,lat|lng,lat' 或 '北京市|上海市'
  style={容器style object, 默认无}
  className={容器className string, 默认无, 基础'weather'}

  icons={图标 object, 默认见Weather.js}
/>
```
### 示例
```javascript
import Weather from 'seedsui-react/lib/Weather';

<Weather location="上海市"/>
```
[返回目录](#component)