import React, {useState, useRef, useEffect} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
  Header,
  Titlebar,
	Bridge,
	Container,
	Alert
} from '../../src';

function Demo () {
  const refComponent = useRef(null);
  useEffect(() => {
    console.log(refComponent)
	}, [])

	const [show, setShow] = useState(false)
	function onClick () {
		setShow(!show);
	}
  return <Page>
    <Header>
      <Titlebar caption="标题"/>
    </Header>
		<Container>
			<Alert
				show={show}
				style={{color: 'green'}}
				className="transition-duration-0"
				maskAttribute={{className: "transition-duration-0"}}
				portal={document.body}
				submitAttribute={{onClick: onClick, className: 'primary', disabled: false}}
				cancelAttribute={{onClick: onClick}}
				captionAttribute={{style: {padding: '30px 12px 5px 12px'}}}
				contentAttribute={{style: {padding: '15px 12px 20px 12px'}}}
			>
				<div>hhh</div>
			</Alert>
			<input type="button" value="显隐" onClick={onClick}/>
		</Container>
  </Page>
}

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
