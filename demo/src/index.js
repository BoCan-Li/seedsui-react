import React, {useState, useRef, useEffect} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
  Header,
  Titlebar,
	Bridge,
	Container,
  Calendar,
} from '../../src';

function Demo () {
  const refComponent = useRef(null);
  useEffect(() => {
    console.log(refComponent)
	}, [])

	const defaultDate = new Date();
	defaultDate.nextMonth();
	const [type, setType] = useState('week');
	const [activeTo, setActiveTo] = useState('');

	function onChangeCalendar (s, value) {
		// 记录滑动后切换的日期
		console.log(s)
		console.log('滑动选中:' + value)
	}
	function onClickCalendar (s, value) {
		// 记录点击的选中日期, 用于滑动不切换日期用
		console.log(s)
		console.log('点击选中:' + value)
	}
	function showMonth () {
		setType('month');
	}
	function showWeek () {
		setType('week');
	}
	function showToday () {
		setActiveTo('today');
	}
	function showReset () {
		setActiveTo('default');
	}
	function showCustom () {
		setActiveTo(new Date('1988,08,22'));
	}
	
	

  return <Page>
    <Header>
      <Titlebar caption="标题"/>
    </Header>
		<Container>
			<Calendar
				ref={refComponent}
				defaultDate={defaultDate}
				type={type}
				activeTo={activeTo}
				titleFormat="YYYY年MM月DD日 周EE 第W周"
				onChange={onChangeCalendar}
				onClick={onClickCalendar}
				// disableBeforeDate={new Date()} // 禁用今天以前的日期
			/>
			<a style={{margin: '8px'}} className="button lg bg-1" onClick={showMonth}>月</a>
			<a style={{margin: '8px'}} className="button lg bg-2" onClick={showWeek}>周</a>
			<a style={{margin: '8px'}} className="button lg bg-3" onClick={showToday}>今天</a>
			<a style={{margin: '8px'}} className="button lg bg-4" onClick={showReset}>默认日期</a>
			<a style={{margin: '8px'}} className="button lg bg-4" onClick={showCustom}>1988-08-22</a>
		</Container>
  </Page>
}

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
