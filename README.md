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
桥接, 现支持三个平台的桥接适配, 浏览器、订货、外勤、微信客户端
### 属性
```javascript
Bridge:{
  platform: 'browser', // 'dinghuo' | 'waiqin' | 'weixin'
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
  mask: false,
  onSuccess: () => {
    history.go(-1);
  }
});
```