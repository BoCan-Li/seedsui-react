import React, {useState, useRef, useEffect} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
  Header,
  Titlebar,
	Bridge,
	Container
} from '../../src';
import DropdownDialog from '../../src/Dropdown/DropdownDialog';


function Demo () {
  const [root, setRoot] = useState([
		{
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
		}
	]);
	const [selected, setSelected] = useState();
	const [show, setShow] = useState(true);
	function onSelected (e, value, selected) {
		setSelected(selected)
		setShow(false)
	}
  return <Page>
    <Header>
      <Titlebar caption="hh"/>
			<DropdownDialog
        top={44}
        show={show}

        list={root}
        selected={selected}
        onSelected={onSelected}
      />
    </Header>
		<Container>
		</Container>
  </Page>
}

// 加载百度地图js库
// MapUtil.load({ak: '3pTjiH1BXLjASHeBmWUuSF83'})

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
