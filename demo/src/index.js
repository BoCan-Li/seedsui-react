import React, {useState, useRef, createRef, useEffect, Fragment} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
  Header,
  Titlebar,
  Bridge,
  Container,
  MapUtil,
  MapChoose,
  Context,
  InputLocation,
  Dropdown
} from '../../src';
import locale from '../../src/locale/index.js';
function Demo () {
  useEffect(() => {
    Bridge.debug = true
  }, [])
  // const [value, setValue] = useState('南京南站');
  // const [selected, setSelected] = useState({longitude: 118.798128, latitude: 31.968592, address: '南京南站'});
  // // {longitude: 118.798128, latitude: 31.968592, address: '南京南站'}
  // function changeHandler (e, value, selected) {
  //   console.log(e.target);
  //   console.log(selected)
  //   setValue(value);
  //   setSelected(selected);
  // }
  // function previewHandler (e, err) {
  //   if (err.errMsg.indexOf('preview:fail') !== -1) {
  //     Bridge.showToast(err.errMsg.replace('preview:fail', ''), {mask: false});
  //   }
  // }
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
      "id": "",
      "name": "全部",
      "children": []
    }, {
      "id": "7938034417512813758",
      "name": "饮料",
      "children": [{
        "id": "4622400720177680517",
        "name": "碳酸饮料"
      }, {
        "id": "5800049423243362222",
        "name": "茶饮料"
      }, {
        "id": "5789432343240798823",
        "name": "功能饮料"
      }, {
        "id": "6413548566139705252",
        "name": "饮用水"
      }, {
        "id": "6936207795217715766",
        "name": "中草药饮料"
      }, {
        "id": "8746408135758103957",
        "name": "蛋白质饮料"
      }, {
        "id": "7268945622944992066",
        "name": "果味饮料"
      }, {
        "id": "9138462844675316911",
        "name": "咖啡"
      }]
    }, {
      "id": "7746459719734369628",
      "name": "零食",
      "children": [{
        "id": "9134066222295231258",
        "name": "蜜饯果干"
      }, {
        "id": "5394487194098598325",
        "name": "坚果炒货"
      }, {
        "id": "9070533848545878912",
        "name": "早餐面包"
      }, {
        "id": "5240328190253910837",
        "name": "糖巧果冻"
      }]
    }]
  }, {
    "id": "",
    "name": "品牌",
    "data": [{
      "id": "",
      "name": "全部"
    }, {
      "id": "其他",
      "name": "其他"
    }, {
      "id": "美汁源",
      "name": "美汁源"
    }, {
      "id": "可口",
      "name": "可口"
    }, {
      "id": "宏宝莱",
      "name": "宏宝莱"
    }, {
      "id": "康师傅",
      "name": "康师傅"
    }, {
      "id": "百事",
      "name": "百事"
    }, {
      "id": "卫岗",
      "name": "卫岗"
    }, {
      "id": "蒙牛",
      "name": "蒙牛"
    }, {
      "id": "伊利",
      "name": "伊利"
    }, {
      "id": "三只松鼠",
      "name": "三只松鼠"
    }]
  }, {
    "id": "",
    "name": "筛选",
    "data": [{
      "id": "",
      "name": "全部"
    }, {
      "id": "new",
      "name": "新品"
    }, {
      "id": "importance",
      "name": "重点"
    }]
  }]);
  function changeHandler (e, tabs) {
    var newItems = Object.clone(items);
    tabs.forEach((item, index) => {
      newItems[index].id = item.id;
      newItems[index].name = item.name;
    });
    setItems(newItems)
  }
  return <Page>
    <Header>
      <Titlebar caption="hh"/>
      <Dropdown
        dialogProps={{
          maskAttribute: {
            style: {
              zIndex: '3'
            },
            onClick: (e) => console.log(e)
          }
        }}
        list={items}
        listRoot={root}
        onChange={changeHandler}
      />
    </Header>
		<Container>
      {/* <InputLocation
        type="choose"
        // autoLocation
        // readOnly={false}
        readOnly={true}
        selected={selected}
        value={value}
        placeholder="请点击获取位置信息"
        onChange={changeHandler}
        preview={previewHandler}
      /> */}
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
