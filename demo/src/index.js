import React, {useState, useRef, useEffect} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
  Header,
  Titlebar,
  Container,
  Bridge,
  Tree
} from '../../src';

function Demo () {
  const refComponent = useRef(null);
  useEffect(() => {
    console.log(refComponent)
  }, [])
  const mockList = [
    {id: '2', name: '测试数据2', parentid: '-1'},
    {id: '1', name: '测试数据1', parentid: '-1'},
    {id: 'a', name: '测试数据1-a', parentid: '1'},
    {id: 'b', name: '测试数据1-b', parentid: '1'},
    {id: 'I', name: '测试数据1-b-I', parentid: 'b'},
    {id: 'II', name: '测试数据1-b-II', parentid: 'b'}
  ];
  
  const [list, setList] = useState(mockList)
  const [selected, setSelected] = useState([{id: 'I', name: '测试数据1-b-I', parentid: 'b'}])
  
  function clearData () {
    setList([])
  }
  function addData () {
    setList(mockList)
  }
  function onChange (e, value, selected) {
    console.log(e.target)
    console.log(value, selected)
    setSelected(selected);
  }


  return <Page>
    <Header>
      <Titlebar caption="标题"/>
    </Header>
    <Container>
      <Tree ref={refComponent} list={list} selected={selected} onClickLeaf={onChange}/>
      <input type="button" value="置空" onClick={clearData}/>
      <input type="button" value="显示" onClick={addData}/>
    </Container>
  </Page>
}

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
