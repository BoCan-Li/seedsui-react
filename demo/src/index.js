import React, {useState, useRef, createRef, useEffect, Fragment} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
  Header,
  Dropdown,
  Bridge,
  Container,
  MapUtil,
  Vott,
} from '../../src';

function Demo () {
  useEffect(() => {
  }, [])
  const [root, setRoot] = useState([
		{
			"id": "",
			"name": "分类",
		},
		{
			"id": "",
			"name": "品牌",
		},
		{
			"id": "",
			"name": "筛选",
		}
	]);
	const [items, setItems] = useState([{
		"id": "",
		"name": "分类",
		"data": [{
			"children": [],
			"parentid": "-2",
			"id": "",
			"name": "全部",
			"show_order": -1
		}, {
			"children": [{
				"parentid": "5298852258867337850",
				"id": "6951581541740822152",
				"name": "shuiguo11",
				"show_order": 0
			}],
			"parentid": "",
			"id": "5298852258867337850",
			"name": "水果",
			"show_order": 0
		}, {
			"children": [],
			"parentid": "",
			"id": "7108460982772612211",
			"name": "零食",
			"show_order": 0
		}, {
			"children": [],
			"parentid": "",
			"id": "5542709513952588402",
			"name": "日用品",
			"show_order": 0
		}, {
			"children": [],
			"parentid": "",
			"id": "4787857868379989507",
			"name": "饮料",
			"show_order": 0
		}, {
			"children": [],
			"parentid": "",
			"id": "4911558233711003598",
			"name": "果冻",
			"show_order": 6
		}]
	}, {
		"id": "",
		"name": "品牌",
		"data": [{
			"id": "",
			"name": "全部"
		}, {
			"id": "乐事",
			"name": "乐事"
		}, {
			"id": "百事",
			"name": "百事"
		}, {
			"id": "康师傅",
			"name": "康师傅"
		}, {
			"id": "可口",
			"name": "可口"
		}, {
			"id": "百饮",
			"name": "百饮"
		}]
	}, {
		"id": "",
		"name": "筛选",
		"data": [{
			"id": "",
			"name": "全部",
			"value": ""
		}, {
			"id": "new",
			"name": "新品"
		}, {
			"id": "hot",
			"name": "热销"
		}, {
			"id": "sale",
			"name": "促销"
		}]
	}]);
	
	function changeHandler (e, tabs) {
		var newItems = Object.clone(items);
		tabs.forEach((item, index) => {
			newItems[index].id = item.id;
			newItems[index].name = item.name;
		});
		console.log(newItems)
		setItems(newItems)
	}
	console.log('渲染')
	console.log(items)
  return <Page>
		<Header>
			<Dropdown list={items} listRoot={root} onChange={changeHandler}/>
		</Header>
		<Container>
    </Container>
  </Page>
}


Bridge.ready(() => {
  // 加载百度地图js库
  MapUtil.load({
    ak: '3pTjiH1BXLjASHeBmWUuSF83',
    success: () => {
      render(<Demo/>, document.querySelector('#demo'))
    },
    fail: () => {
      console.log('加载失败')
    }
  })
});
