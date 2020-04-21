import React, {useState, useEffect, useRef} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
  Header,
  Titlebar,
  Container,
  Bridge,
  FixTable,
  ListPull
} from '../../src';

const thead = (<thead>
  <tr>
    <th>Full Name</th>
    <th>Age</th>
    <th>Column 1</th>
    <th>Column 2</th>
    <th>Column 3</th>
    <th>Column 4</th>
    <th>Column 5</th>
    <th>Column 6</th>
    <th>Column 7</th>
    <th>Column 8</th>
    <th>Action</th>
  </tr>
</thead>);

const tbody = (<tbody>
    <tr>
      <td>Edrward 0</td>
      <td>32</td>
      <td>London Park no. 0</td>
      <td>London Park no. 0</td>
      <td>London Park no. 0</td>
      <td>London Park no. 0</td>
      <td>London Park no. 0</td>
      <td>London Park no. 0</td>
      <td>London Park no. 0</td>
      <td>London Park no. 0</td>
      <td><a>action</a></td>
    </tr>
    <tr>
      <td>Edrward 1</td>
      <td>32</td>
      <td>London Park no. 1</td>
      <td>London Park no. 1</td>
      <td>London Park no. 1</td>
      <td>London Park no. 1</td>
      <td>London Park no. 1</td>
      <td>London Park no. 1</td>
      <td>London Park no. 1</td>
      <td>London Park no. 1</td>
      <td><a>action</a></td>
    </tr>
    <tr>
      <td>Edrward 2</td>
      <td>32</td>
      <td>London Park no. 2</td>
      <td>London Park no. 2</td>
      <td>London Park no. 2</td>
      <td>London Park no. 2</td>
      <td>London Park no. 2</td>
      <td>London Park no. 2</td>
      <td>London Park no. 2</td>
      <td>London Park no. 2</td>
      <td><a>action</a></td>
    </tr>
    <tr>
      <td>Edrward 3</td>
      <td>32</td>
      <td>London Park no. 3</td>
      <td>London Park no. 3</td>
      <td>London Park no. 3</td>
      <td>London Park no. 3</td>
      <td>London Park no. 3</td>
      <td>London Park no. 3</td>
      <td>London Park no. 3</td>
      <td>London Park no. 3</td>
      <td><a>action</a></td>
    </tr>
    <tr>
      <td>Edrward 4</td>
      <td>32</td>
      <td>London Park no. 4</td>
      <td>London Park no. 4</td>
      <td>London Park no. 4</td>
      <td>London Park no. 4</td>
      <td>London Park no. 4</td>
      <td>London Park no. 4</td>
      <td>London Park no. 4</td>
      <td>London Park no. 4</td>
      <td><a>action</a></td>
    </tr>
    <tr>
      <td>Edrward 5</td>
      <td>32</td>
      <td>London Park no. 5</td>
      <td>London Park no. 5</td>
      <td>London Park no. 5</td>
      <td>London Park no. 5</td>
      <td>London Park no. 5</td>
      <td>London Park no. 5</td>
      <td>London Park no. 5</td>
      <td>London Park no. 5</td>
      <td><a>action</a></td>
    </tr>
    <tr>
      <td>Edrward 6</td>
      <td>32</td>
      <td>London Park no. 6</td>
      <td>London Park no. 6</td>
      <td>London Park no. 6</td>
      <td>London Park no. 6</td>
      <td>London Park no. 6</td>
      <td>London Park no. 6</td>
      <td>London Park no. 6</td>
      <td>London Park no. 6</td>
      <td><a>action</a></td>
    </tr>
    <tr>
      <td>Edrward 7</td>
      <td>32</td>
      <td>London Park no. 7</td>
      <td>London Park no. 7</td>
      <td>London Park no. 7</td>
      <td>London Park no. 7</td>
      <td>London Park no. 7</td>
      <td>London Park no. 7</td>
      <td>London Park no. 7</td>
      <td>London Park no. 7</td>
      <td><a>action</a></td>
    </tr>
    <tr>
      <td>Edrward 8</td>
      <td>32</td>
      <td>London Park no. 8</td>
      <td>London Park no. 8</td>
      <td>London Park no. 8</td>
      <td>London Park no. 8</td>
      <td>London Park no. 8</td>
      <td>London Park no. 8</td>
      <td>London Park no. 8</td>
      <td>London Park no. 8</td>
      <td><a>action</a></td>
    </tr>
    <tr>
      <td>Edrward 9</td>
      <td>32</td>
      <td>London Park no. 9</td>
      <td>London Park no. 9</td>
      <td>London Park no. 9</td>
      <td>London Park no. 9</td>
      <td>London Park no. 9</td>
      <td>London Park no. 9</td>
      <td>London Park no. 9</td>
      <td>London Park no. 9</td>
      <td><a>action</a></td>
    </tr>
  </tbody>);

const listpull = [
  {
    container: <p style={{height: '50px'}}>内容</p>,
    lButtons: [
      {caption: '未读', className: 'info', style: {padding: '0 12px'}}
    ],
    rButtons: [
      {caption: '收藏', className: 'warn', style: {padding: '0 12px'}},
      {caption: '删除', className: 'cancel', style: {padding: '0 12px'}}
    ],
  },
  {
    container: <p style={{height: '50px'}}>内容</p>,
    lButtons: [
      {caption: '未读', className: 'info', style: {padding: '0 12px'}}
    ],
    rButtons: [
      {caption: '收藏', className: 'warn', style: {padding: '0 12px'}},
      {caption: '删除', className: 'cancel', style: {padding: '0 12px'}}
    ],
  }
]

function Demo () {
  const refComponentInputDistrict = useRef();
  const refComponentInputLocation = useRef();

  const [value, setValue] = useState('广东-揭阳');
  
  function onChange (e, value, options) {
    console.log(value)
    setValue(value);
  }

  useEffect(() => {
    Bridge.debug = true
    console.log(refComponentInputDistrict)
    console.log(refComponentInputLocation)
  }, [])
  function onShowedLeft (s) {
    var target = s.target.previousElementSibling.children[0];
    if (target.innerHTML === '未读') {
      target.classList.add('disabled');
      target.innerHTML = '已读';
    } else {
      target.classList.remove('disabled');
      target.innerHTML = '未读';
    }
    s.hide();
  }
  
  function onClickListPull (item, index, option, s) {
    console.log(item, index, option)
    // s.hide()
  }

  return <Page>
    <Header>
      <Titlebar caption="SeedsUI"/>
    </Header>
    <Container>
      <ListPull ref={refComponentInputLocation} list={listpull} onClick={onClickListPull} onShowedLeft={onShowedLeft}/>
      <FixTable
        // style={{height: '300px'}}
        thead={thead}
        tbody={tbody}
        theadFixed={true}
        leftFixed={[0, 1]}
        rightFixed={[0]}
        onBottomRefresh={() => console.log('到底了')}
        ref={refComponentInputDistrict}
      />
    </Container>
  </Page>
}
// function loadBd(){
//   window.BMAP_PROTOCOL = "https";
//   window.BMap_loadScriptTime = (new Date).getTime();
//   document.write('<script type="text/javascript" src="https://api.map.baidu.com/getscript?v=3.0&ak=3pTjiH1BXLjASHeBmWUuSF83&services=&t=20200311111417"></script>');
// }
// loadBd();

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
