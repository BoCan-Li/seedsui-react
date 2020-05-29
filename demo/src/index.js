import React, {useState, useRef, useEffect} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  MapUtil,
  Page,
  Header,
  Titlebar,
	Bridge,
  Notice
} from '../../src';
import ContainerPull from '../../src/ContainerPull';
import BottomNoData from '../../src/ContainerPull/BottomNoData';
import BottomRefreshing from '../../src/ContainerPull/BottomRefreshing';

// 全局变量
let page = 1;
let rows = 5;
const data = [
	{
		id: '1',
		name: '数据'
	},
	{
		id: '1',
		name: '数据'
	},
	{
		id: '1',
		name: '数据'
	},
	{
		id: '1',
		name: '数据'
	},
	{
		id: '1',
		name: '数据'
	},
	{
		id: '1',
		name: '数据'
	},
	{
		id: '1',
		name: '数据'
	},
	{
		id: '1',
		name: '数据'
	}
]

function Demo () {
  // 非全局变量
  const refEl = useRef(null);
  let [refreshing, setRefreshing] = useState('');
  let [list, setList] = useState([]);
  // 用于判断是否没有数据了true:有数据 false:没有数据
  let [hasMore, setHasMore] = useState(true);
  // 错误信息
  let [errMsg, setErrMsg] = useState('');

  function onTopRefresh () {
    console.log('头部刷新');
    loadData(false);
  }
  function onBottomRefresh () {
    if (hasMore === true) {
      console.log('底部刷新');
      loadData(true);
    }
  }
  // 获取列表的基本方法
  function getList (options = {}) {
    return new Promise((resolve) => {
      console.log(`第${options.page}页, 开始刷新`)
      setRefreshing(true);
      page = options.page;
      setTimeout(() => {
        console.log(`第${options.page}页, 刷新完成`)
        setRefreshing(false)
        let allList = list;
        // 设置数据
        const serList = data || [];
        allList = options.page === 1 ? serList : allList.concat(serList);
        list = allList;
        // 数据加载完成, 假设共5页, 或者用其它判断方法
        if (options.page >= 5 || allList.length === 0) {
          setHasMore(false);
          if (allList.length === 0) {
            setErrMsg('暂无数据');
          }
        } else {
          setHasMore(true);
          setErrMsg('');
        }
        setList(allList)
        resolve(true)
      }, 1000)
    })
  }
  function loadData (isNext) {
    // 分页
    if (isNext) {
      page++;
    } else {
      page = 1;
      if (refEl && refEl.current) refEl.current.scrollTop = 0;
    }
    // 获得数据
    getList({
      page: page,
      rows: rows
    });
  }

  useEffect(() => {
    loadData();
  }, []); // eslint-disable-line

  return <Page>
    <Header>
      <Titlebar caption="hh"/>
    </Header>
		<ContainerPull ref={refEl} refreshing={refreshing} onTopRefresh={onTopRefresh} onBottomRefresh={onBottomRefresh}>
      {list.map((item, index) => {
        return <div className="flex flex-middle" style={{height: '44px'}} key={index}>{item.name}</div>
      })}
      {hasMore === true && <BottomRefreshing/>}
      {hasMore === false && <BottomNoData/>}
    </ContainerPull>
    {errMsg && <Notice caption={errMsg} style={{top: '44px'}}/>}
  </Page>
}

// 加载百度地图js库
MapUtil.load({key: '3pTjiH1BXLjASHeBmWUuSF83'})

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
