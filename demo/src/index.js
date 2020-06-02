import React, {useState, useRef, useEffect} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  MapUtil,
  Page,
  Header,
  Titlebar,
  Bridge,
  Container
} from '../../src';
import DropdownDialog from '../../src/Dropdown/DropdownDialog';
const root = [{
  "id": "1",
  "name": "分类",
},
{
  "id": "2",
  "name": "品牌",
},
{
  "id": "3",
  "name": "筛选",
}]
function Demo () {

  return <Page>
    <Header>
      <Titlebar caption="hh"/>
      <DropdownDialog
    dialogProps={{
      maskAttribute: {
        onClick: () => console.log(1),
        style: {top: '44px'}
      }
    }}
    show={true}

    list={root}
    selected={[{
      "id": "2",
      "name": "品牌",
    }]}
    onChange={(e, value, selected) => console.log(selected)}
  />
    </Header>
		<Container>
    </Container>
  </Page>
}

// 加载百度地图js库
MapUtil.load({key: '3pTjiH1BXLjASHeBmWUuSF83'})

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
