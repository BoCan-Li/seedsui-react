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
  InputLocation
} from '../../src';

{/* <table style="table-layout: fixed;">
<colgroup>
  <col style="width: 100px; min-width: 100px;">
  <col style="width: 100px; min-width: 100px;">
  <col style="width: 150px; min-width: 150px;">
  <col style="width: 150px; min-width: 150px;">
  <col style="width: 150px; min-width: 150px;">
  <col style="width: 150px; min-width: 150px;">
  <col style="width: 150px; min-width: 150px;">
  <col style="width: 150px; min-width: 150px;">
  <col style="width: 150px; min-width: 150px;">
  <col style="width: 150px; min-width: 150px;">
  <col style="width: 100px; min-width: 100px;">
</colgroup>
</table>
*/}

{/* <table style="width: 1500px; min-width: 100%; table-layout: fixed;">
  <colgroup>
    <col style="width: 100px; min-width: 100px;">
    <col style="width: 100px; min-width: 100px;">
    <col style="width: 150px; min-width: 150px;">
    <col style="width: 150px; min-width: 150px;">
    <col style="width: 150px; min-width: 150px;">
    <col style="width: 150px; min-width: 150px;">
    <col style="width: 150px; min-width: 150px;">
    <col style="width: 150px; min-width: 150px;">
    <col style="width: 150px; min-width: 150px;">
    <col>
    <col style="width: 100px; min-width: 100px;">
  </colgroup>
</table> */}

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

// 获取街道
function getStreet (districtId) {
  return new Promise((resolve) => {
    Bridge.showLoading();
    setTimeout(() => {
      Bridge.hideLoading();
      resolve([
        {
          "parentid": districtId,
          "value": "街道1",
          "key": "1",
        },
        {
          "parentid": districtId,
          "value": "街道2",
          "key": "2",
        }
      ])
      // resolve([])
      // resolve('错误')
    }, 500);
  })
}

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

  return <Page>
    <Header>
      <Titlebar caption="SeedsUI"/>
    </Header>
    <Container>
      <FixTable
        style={{height: '300px'}}
        thead={thead}
        tbody={tbody}
        theadFixed={true}
        leftFixed={[0]}
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
