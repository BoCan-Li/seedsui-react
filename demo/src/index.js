import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container} from '../../src'
import PDFJS from 'pdfjs-dist'
import IScroll from 'iscroll'
import './main.less'

class Demo extends Component {
  componentDidMount () {
    this.loadPDF();
    console.log(IScroll);
  }
  // 创建一页
  createPage = (container) => {
    // page容器
    var page = document.createElement('div')
    page.setAttribute('class', 'pdf-page')
    // canvas用于渲染pdf单页, 并生成img
    var canvas = document.createElement('canvas')
    canvas.setAttribute('class', 'pdf-page-canvas')
    page.appendChild(canvas);
    // img
    var img = document.createElement('img')
    img.setAttribute('class', 'pdf-page-img')
    page.appendChild(img)
    // load
    var load = document.createElement('div')
    load.setAttribute('class', 'pdf-page-load')
    page.appendChild(load)
    
    // 添加到容器
    if (container) container.appendChild(page);

    return page;
  }

  // dataURL转成Blob
  dataURLtoBlob = (dataurl) => {
    var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
    while(n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});
  }
  // canvas转成Blob
  canvasToPng = (canvas) => {
    var dataURL = canvas.toDataURL('image/png', 1.0);
    return dataURL
  }
  // 加载PDF
  loadPDF = () => {
    var url = '/demo/assets/test.pdf';
    PDFJS.getDocument(url).then((pdf) => {
      this.renderPDF(pdf);
    });
  }
  // 渲染PDF
  renderPDF = (pdf) => {
    console.log(pdf)
    var slot = this.$pdfContainer.querySelector('.pdf-list');
    if (!slot) return;

    var total = pdf.numPages // 总页数
    for (let i = 1; i < total; i++) {
      pdf.getPage(i).then((page) => {
        let viewport = page.getViewport(1)
        // 创建页
        let pageDOM = this.createPage(slot)
        let canvas = pageDOM.querySelector('canvas')
        let img = pageDOM.querySelector('img')

        let context = canvas.getContext('2d')
        canvas.height = viewport.height
        canvas.width = viewport.width
        let renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        let renderTask = page.render(renderContext)
        renderTask.promise.then(() => {
          let pngbase64 = this.canvasToPng(canvas)
          img.src = pngbase64
        })
      })
    }
  }
  render() {
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI"/>
      </Header>
      <Container>
        <div className="pdf-container" ref={(el) => {this.$pdfContainer = el}}>
          <div className="pdf-wrapper">
            <div className="pdf-list"></div>
          </div>
        </div>
      </Container>
    </Page>
  }
}

render(<Demo/>, document.querySelector('#demo'))
