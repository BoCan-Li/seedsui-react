import React, {useRef, useState, useEffect, Fragment} from 'react'
import {render} from 'react-dom'
import {
  Page,
	Header,
	Titlebar,
  Bridge,
	Container,
	Device,
	MapUtil,
  InputDistrict,
  InputDate
} from '../../src'

import enUS from '../../src/locale/en_US'

function Demo () {
  useEffect(() => {
    console.log(Device.platform, Device.platformVersion)
  }, [])
  // 获取街道
  function getStreet (districtId) {
    return new Promise((resolve) => {
      Bridge.showLoading();
      setTimeout(() => {
        Bridge.hideLoading();
        resolve([
          {
            "parentid": districtId,
            "name": "街道1",
            "id": "1",
          },
          {
            "parentid": districtId,
            "name": "街道2",
            "id": "2",
          }
        ])
      }, 500);
    })
  }

  const [value, setValue] = useState('');

  function onChange (e, value, selected) {
    console.log(e.target)
    console.log(value, selected)
    setValue(value);
  }

  return <Fragment>
	<Page>
		<Header>
			<Titlebar caption="标题"/>
		</Header>
		<Container>
      <InputDistrict
        value={value}
        onChange={onChange}
        placeholder="请选择"
        className="border-b"
        pickerProps={{
          getStreets: getStreet,
          cancelAttribute: {
            show: true
          },
          submitAttribute: {
            show: true,
            onClick: function (e, value, options) {
              if (!options.length) {
                Bridge.showToast('至少选择省份', {mask: false})
                return false
              }
              setValue(value);
              console.log(e, value, options)
            }
          }
        }}
      />
      
      <InputDate
        value={value}
        onChange={onChange}
        placeholder="请选择"
        className="border-b"
        pickerProps={{
          submitAttribute: {
            onClick: function (e, value, options) {
              if (!options.length) {
                Bridge.showToast('至少选择省份', {mask: false})
                return false
              }
              console.log(e, value, options)
            }
          }
        }}
      />
    </Container>
  </Page>
	</Fragment>
}


Bridge.ready(() => {
	// render(<Demo/>, document.querySelector('#demo'))
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
