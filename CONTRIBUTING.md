# 引用

此库使用[nwb](https://github.com/insin/nwb) 构建.

# 打包
> 打包命令
```
npm run build
```


# 发布到私有云
## package.json 修改配置上传地址
```
"publishConfig":{
  "registry": "http://172.31.3.153:8080/repository/npm-waiqin365/"
}
```

## 切换到私服的源
```
nrm use 私服源
```


# 发布
```
npm publish
```

# 构建react组件库

> 安装nwb

```
npm install -g nwb
```

> 创建react组件

```
nwb new react-component seedsui-react
```


> .gitignore配置

```
# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

> 安装less

```
npm install less less-loader nwb-less autoprefixer --save-dev
```

> 配置less

~提示:配置文件nwb.config.js~

```js
var path = require('path')

webpack: {
  rules: {
    less: {
      data: '@import "_variables"',
      includePaths: [path.resolve('src/index.js')]
    }
  },
  autoprefixer: '> 1%, last 2 versions, Firefox ESR, ios >= 8',
}
```

> 安装seedsui必备包

```
npm install axios --save
```

> 安装seedsui中PDFView组件依赖包(可选)
```
npm install better-scroll --save
```

> 打包配置

~提示:配置文件package.json~

```
{
  "author": "colaboy <49201650@qq.com>",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/colaboy/seedsui-react.git"
  },
  "homepage": "https://github.com/colaboy/seedsui-react/#readme",
  "scripts": {
    "build": "nwb build-react-component && node build-after.js",
  }
}
```
~提示:打包完需要把.less和.ts拷贝到lib下~

```
npm install cp-file --save-dev
```

~提示:根目录新建build-after.js~

```js
const fs = require('fs');
const cpFile = require('cp-file');

// foo目录文件, 拷贝到out目录文件
async function put (fooSrc, outSrc) {
  try {
    console.log(`===============拷贝${fooSrc}到${outSrc}===============`)
    await cpFile(fooSrc, outSrc);
    console.log(`===============拷贝完成===============`)
  } catch (e) {
    console.error(`===============拷贝src到lib异常===============`)
    console.error(e)
  }
}

// foo目录, 拷贝到out目录
async function push (foo, out) {
  var files = fs.readdirSync(foo)
  files.forEach(file => {
    let _foo = foo + '/' + file
    let _out = out + '/' + file
    let st = fs.statSync( _foo)
    // 判断是否为合法文件
    if(st.isFile() && file !== '.DS_Store') {
      // 提交需要操作的文件
      if (!/\.map$/.test(_foo) && !/\.js$/.test(_foo)) {
        put(_foo, _out)
      }
    }
    // 如果是目录则递归调用自身
    else if (st.isDirectory()) {
      push(_foo, _out)
    }
  })
}

// foo目录
const fooCatalog = `./src`;
// out目录
const outCatalog = `./lib`;

if (fs.readdirSync(fooCatalog).length === 0) { // 判断foo目录是否存在
  console.error(`${fooCatalog}不存在, 请先在根目录运行 npm run build!`);
} else { // 开始操作
  push(fooCatalog, outCatalog);
}
```

> 打包

- 打包命令

```
npm run build
```


> 发布

- "prepublishOnly": "npm run build"项会导致, 发布前会先执行 "npm run build", 建议删除此项

```
npm publish
```
