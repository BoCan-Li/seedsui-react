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