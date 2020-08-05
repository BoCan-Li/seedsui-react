import React, {useState, useRef, createRef, useEffect, Fragment} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
  Header,
  Titlebar,
  Bridge,
  Container,
  InputLocation,
  MapUtil,
  Share
} from '../../src';
function Demo () {
  const [value, setValue] = useState();
  function addHistory () {
    Bridge.chooseImage({
      isAI: '1',
      count: 2,
      isSaveToAlbum: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      watermark: ['1', '2'],
      success: async (res) => {
        alert(JSON.stringify(res.localIds))
        setValue(res.localIds[0])
      }
    })
    // setValue('bb')
    Bridge.addHistoryBack(() => {
      console.log('一直监听返回');
      Bridge.removeHistoryBack();
    });
    Bridge.addHistoryBack(() => {
      // setValue('aa')
      console.log('返回1');
    }, 'dialog=bb');
  }
  function addHistory2 () {
    // setValue('cc')
    Bridge.addHistoryBack(() => {
      // setValue('bb')
      console.log('返回2');
    }, 'dialog=cc');
  }
  const [config, setConfig] = useState({
    title: '标题', // 分享标题
    desc: '副标题', // 分享描述
    link: 'https://www.waiqin365.com/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: 'https://www.waiqin365.com/p/v3/assets/LOGO2.png', // 分享图标
  });
  function getConfig () {
    return new Promise((resolve) => {
      setTimeout(() => {
        setConfig({
          title: '222', // 分享标题
          desc: '2', // 分享描述
          link: 'https://www.waiqin365.com/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'https://www.waiqin365.com/p/v3/assets/LOGO2.png', // 分享图标
        })
        resolve({
          title: '222', // 分享标题
          desc: '2', // 分享描述
          link: 'https://www.waiqin365.com/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'https://www.waiqin365.com/p/v3/assets/LOGO2.png', // 分享图标
        })
      }, 1000)
    })
  }
  return <Page>
    <Header>
      <Titlebar caption="hh"/>
    </Header>
		<Container>
      <div onClick={addHistory}>拍照</div>
      {value && <img src={value}/>}
      <div onClick={addHistory2}>再加个路由</div>
      <div>{value}</div>
      <InputLocation onChange={(e, value) => alert(JSON.stringify(value))}/>
      <Share
        config={config}
        getConfig={getConfig}
        className="button lg primary">
        分享
      </Share>
    </Container>
  </Page>
}



Bridge.ready(() => {
  // 加载百度地图js库
  MapUtil.load({
    ak: '3pTjiH1BXLjASHeBmWUuSF83',
    success: () => {
      console.log(1)
      render(<Demo/>, document.querySelector('#demo'))
    },
    fail: () => {
      console.log('加载失败')
    }
  })
});
