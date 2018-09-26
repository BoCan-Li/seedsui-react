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
- [Checkbox](#carrousel) 复选框
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

## Actionsheet
卡片框
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
  optionClassName={项className string, 默认无, 基础'actionsheet-option'}

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


## Article
文章
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

## Attribute
属性
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

## Attributes
属性组合
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
  //   }
  // ]
  className={容器className string[attribute-margin(margin: 10px 12px;) | attribute-padding(padding: 10px 12px;) | align(左右对齐布局) | start(左端对齐) | between(两端对齐)], 默认'attribute-margin', 基础'attributes'}
  style={容器style object, 默认无}

  rowClassName={行容器className string[attribute-margin(margin: 10px 12px;) | attribute-padding(padding: 10px 12px;) | align(左右对齐布局) | start(左端对齐) | between(两端对齐)], 默认'attribute-margin', 基础'attribute'}
  rowStyle={行容器style object, 默认无}

  col={列数 string, 默认1}
  colClassName={当col为2时列className string, 默认无, 基础'attribute-half'}
  colStyle={当col为2时列style object, 默认无}

  cellClassName={列className string, 默认无}
  cellStyle={列style object, 默认无}

  nameClassName={name的className string, 默认无, 基础'attribute-left'}
  nameStyle={name的style object, 默认无}
  valueClassName={value的className string, 默认无, 基础'attribute-right'}
  valueStyle={value的style object, 默认无}

  rowAfter={行后DOM node, 默认无}
  onClick={点击行 func(args)}
  rowAfterExclude={行后过滤 number, 默认无, 例如最后一行hr不渲染}
  onCopy={拷贝事件 func(text, msg)}
  onClick={点击项 func(text, msg)}
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

## Badge
徽章
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

## BiClock
时钟
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


## BiDoughnut
环形图
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


## BiGauge
仪表盘
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


## Bridge
桥接, 现支持四个平台的桥接适配, 浏览器、订货、外勤、微信客户端
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


## Button
按钮
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


## Calendar
日历
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


## Card
卡片
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


## Carrousel
轮播
### 属性
```javascript
<Carrousel
  style={容器style object, 默认无}
  classNameclassName={容器className string, 默认无, 基础'carrousel-container'}
  slideStyle={单块style object, 默认无}
  slideClassName={单块className string, 默认无, 基础'carrousel-slide'}
  loop={是否循环显示 bool, 默认false}
  activeIndex={默认选中第几块 number, 默认0}
  pagination={是否显示小点点 bool, 默认false}
  autoplay={自动播放毫秒数 number, 默认0} // 设置大于0的数值才会触发自动播放
  slidesPerView={一屏显示几块 number, 默认1}
  defaultSrc={默认图片 string, 默认'//res.waiqin365.com/d/seedsui/carrousel/default.png'}
  list={轮播图 array, 默认无} // 格式: [{bg: 'xx', img: 'xx', iconClassName: 'xx', caption: 'xx'}]
  speed={动画过渡的速度 number, 默认300}
  enableOnChange={启用轮播时事件回调 bool, 默认true} // 此事件为true时onChange事件才会生效
  onChange={轮播时事件回调 func()}
  onClick={点击块 func(item, index)}
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


## Chat
聊天框
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


## Checkbox
复选框
### 属性
```javascript
<Checkbox
  args={事件参数 any, 如: [1,2, '$event'], '$event'代表点击元素的e}
  style={容器style object, 默认无}
  className={容器className string, 默认无, 基础'chat'}
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


## Close
关闭删除图标
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


## Container
主体内容, 通常与Page、Header一起使用, 位于Header下面的位置
### 属性
```javascript
<Container
  style={容器style object, 默认无}
  className={容器className string, 默认无, 基础'container'}
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


## Counter
计数器
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


## Dialog
弹出框
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



## Dot
小圆点
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



## Dragrefresh
下拉刷新
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

  lazyLoad={是否启用懒人加载 bool, 默认false}

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



## Dropdown
下拉菜单
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



## Emoji
表情弹出输入框
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



## Footer
底部内容, 通常与Page、Header、Container一起使用
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



## Grid
栅格
### 属性
```javascript
<Grid
  args={事件参数 any, 如: [1,2, '$event'], '$event'代表点击元素的e}
  lazyLoad={是否启用懒人加载 bool, 默认false}
  className={容器className string, 默认无, 基础'grid'}
  style={容器style object, 默认无}
  space={上下间距 number, 默认12}
  wing={左右间距 number, 默认12}
  col={一行列数 string, 默认3}
  showUpload={是否显示上传按钮 bool, 默认false}
  list={单元格 array, 默认[], 格式见下方示例}
  /* list: [{
    iconClassName: '',
    iconStyle: {},
    iconSrc: '',
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


## Group
分组
### 属性
```javascript
<Group
  style={卡片style object, 默认无}
  className={卡片className string, 默认无, 基础'group'}
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
签名
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



## Header
底部内容, 通常与Page、Container一起使用
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


## Icon
图标
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


## ImgLazy
懒人加载, 主要为了解决图片过多, 造成网络阻塞的问题, 一般采用的是滚动加载, 并在页面加载完成后, 执行滚动加载方法load()
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


## ImgUploader
图片上传
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
   
  onChange={照片发生变化 func(list)}
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