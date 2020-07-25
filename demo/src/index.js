import React, {useState, useRef, createRef, useEffect, Fragment} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
  Header,
  Titlebar,
  Bridge,
  Container,
  Tree
} from '../../src';
function Demo () {
  useEffect(() => {
  }, [])
  const list = [{
    id: '1',
    thumb: 'https://image-test.waiqin365.com/6069734652819592543/blog/201912/8194157084989375804.png?x-oss-process=style/zk320',
    src: 'https://player.alicdn.com/video/aliyunmedia.mp4'
  },{
    id: '2',
    thumb: 'https://img.zcool.cn/community/01a9a65dfad975a8012165189a6476.jpg',
    src: 'https://www.w3school.com.cn/i/movie.ogg'
  }];
  function onClick (...params) {
    console.log('点击')
    console.log(...params)
  }
  function onChoose (...params) {
    console.log('选择')
    console.log(...params)
  }
  function onDelete (...params) {
    console.log('删除')
    console.log(...params)
  }
  function chooseHandler (e) {
    if (e && e.targetType === 'video') { // 文件框
      console.log(e)
      return;
    }
    Bridge.chooseVideo({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      maxDuration: 2, // 最大录相时长
      camera: 'back', // back || front，默认拉起的是前置或者后置摄像头。非必填，默认back
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        Bridge.uploadFile({
          url: `http://172.31.3.223:6020/fileupload/v1/doUpload.do?uploadPath=cuxiao/2020/07`,
          localId: res.localIds[0],
          success: (result) => {
            if (typeof result.data === 'string') {
              result.data = JSON.parse(result.data);
            }
            const data = result.data[0];
            if (!data) {
              Bridge.showToast(result.errMsg, {mask: false});
              return;
            }
            let tenantId = data.url.replace('/' + data.filePath, '');
            tenantId = tenantId.substring(tenantId.lastIndexOf('/') + 1, tenantId.length)
            Bridge.showAlert(JSON.stringify([{
              thumb: data.url,
              src: data.url,
              tenantId: tenantId,
              path: data.filePath,
              // 周春林测试服务器
              // thumb: data.url.replace('image-test', 'image'),
              // src: data.url.replace('image-test', 'image')
            }]))
          },
          fail: (err) => {
            alert(JSON.stringify(err))
          }
        })
      },
      fail: (res) => alert('错误')
    })
  }
  return <Page>
    <Header>
      <Titlebar caption="hh"/>
    </Header>
		<Container>
      <Tree
        selected={[{parentid: '5377070435626674285', id: '6734269460078366627', name: '测试二组'}]}
        list={[
          {
              "name":"测试二组",
              "parentid":"5377070435626674285",
              "id":"6734269460078366627",
              "keyword":"测试二组 ceshierzu",
              "props":{
                  "node_type":"1"
              }
          },
          {
              "name":"测试一组",
              "parentid":"5377070435626674285",
              "id":"8586232242889919914",
              "keyword":"测试一组 ceshiyizu",
              "props":{
                  "node_type":"1"
              }
          },
          {
              "name":"测试部",
              "parentid":"10",
              "id":"5377070435626674285",
              "keyword":"测试部 ceshibu",
              "props":{
                  "node_type":"1"
              }
          },
          {
              "name":"202",
              "parentid":"6734269460078366627",
              "id":"7278386654397193143",
              "keyword":"202 202",
              "props":{
                  "node_type":"1"
              }
          },
          {
              "name":"测试3组",
              "parentid":"5377070435626674285",
              "id":"8495494582677258794",
              "keyword":"测试3组 ceshi3zu",
              "props":{
                  "node_type":"1"
              }
          }
      ]}
      />
      {/* <Videos
        list={list}
        onChoose={onChoose}
        onDelete={onDelete}
        onClick={onClick}
        onChoose={chooseHandler}
      /> */}
    </Container>
  </Page>
}

// 加载百度地图js库
// MapUtil.load({key: '3pTjiH1BXLjASHeBmWUuSF83'})

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
